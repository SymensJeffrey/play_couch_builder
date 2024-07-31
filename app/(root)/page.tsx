'use client';

import { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import PieceCard from '../components/pieceCard';
import Hero from '../components/hero';
import { createClient } from '../../utils/supabase/client';
import Link from 'next/link';

const HomePage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const supabase = createClient();

  const handleSelect = (id: number) => {
    console.log('Selecting ID:', id);
    setSelectedIds((prevSelectedIds) => {
      const newSelectedIds = prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((itemId) => itemId !== id)
        : [...prevSelectedIds, id];
      console.log('Updated selected IDs:', newSelectedIds);
      return newSelectedIds;
    });
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data: items, error } = await supabase.from('pieces').select('*');

        if (error) {
          console.error('Error loading items:', error);
          return;
        }

        if (items) {
          setItems(items);
        }
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
      }
    };

    fetchItems();
  }, [supabase]);

  return (
    <div className='bg-inherit'>
      <NavBar />
      <Hero />
      <h1 className='m-3 text-2xl'>Select Pieces</h1>
      <Link href='/builds' >
        <button className='btn btn-primary'>Find Builds</button>
      </Link>
      <div className="card-container w-auto m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <PieceCard
            key={item.id}
            id={item.id}
            name={item.name}
            image_url={item.image_url}
            onSelect={handleSelect}
            isSelected={selectedIds.includes(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

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

  const handleSelect = (id: number, quantity: number) => {
    setSelectedIds((prevSelectedIds) => {
      const newSelectedIds = [...prevSelectedIds];
      const currentCount = newSelectedIds.filter((itemId) => itemId === id).length;

      if (quantity > currentCount) {
        for (let i = 0; i < quantity - currentCount; i++) {
          newSelectedIds.push(id);
        }
      } else {
        for (let i = 0; i < currentCount - quantity; i++) {
          const index = newSelectedIds.indexOf(id);
          if (index !== -1) {
            newSelectedIds.splice(index, 1);
          }
        }
      }

      return newSelectedIds;
    });
  };

  const handleNavigateToBuilds = () => {
    localStorage.setItem('selectedIds', JSON.stringify(selectedIds));
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
    <div className="bg-gray-900 min-h-screen text-white">
      <NavBar />
      <Hero />
      <div className="container mx-auto px-6 py-8 2xl:px-64">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Select Pieces</h1>
          <Link href='/builds'>
            <button className="btn btn-primary text-white py-2 px-4 rounded" onClick={handleNavigateToBuilds}>
              Find Builds
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 justify-items-center">
          {items.map((item) => (
            <PieceCard
              key={item.id}
              id={item.id}
              name={item.name}
              image_url={item.image_url}
              onSelect={handleSelect}
              isSelected={selectedIds.includes(item.id)}
              quantity={selectedIds.filter((selectedId) => selectedId === item.id).length || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

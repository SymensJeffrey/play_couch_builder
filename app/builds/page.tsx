'use client';
import NavBar from '../components/navbar';
import { createClient } from '../../utils/supabase/client';
import { useEffect, useState } from 'react';
import BuildCard from '../components/buildCard';

const BuildsPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data: items, error } = await supabase.from('builds').select('*');

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
    <div className="bg-inherit">
      <NavBar />
      <h1>Builds</h1>
      {items.map((item) => (
        <BuildCard
          key={item.id}
          id={item.id}
          name={item.name}
          image_url={item.image_url} />
      ))}
    </div>
  );
};

export default BuildsPage;

function setItems(items: any[]) {
  throw new Error('Function not implemented.');
}


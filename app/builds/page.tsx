'use client';
import NavBar from '../components/navbar';
import { createClient } from '../../utils/supabase/client';
import { useEffect, useState } from 'react';
import BuildCard from '../components/buildCard';

const BuildsPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchSelectedIds = () => {
      const selectedIds = localStorage.getItem('selectedIds');
      if (selectedIds) {
        setSelectedIds(JSON.parse(selectedIds));
      }
    };
    fetchSelectedIds();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      if (selectedIds.length === 0) return; // No selected IDs, no need to fetch

      try {
        // Assuming you have a `builds` table with a column for IDs
        const { data: items, error } = await supabase
          .from('builds')
          .select('*')
          .filter('pieces_array', 'cs', `{${selectedIds.join(',')}}`);

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
  }, [selectedIds, supabase]);




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


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
        // Construct the query for each selected ID
        const orFilters = selectedIds.map(id => `pieces_array.cs.{${id}}`).join(',');

        // Fetch items from Supabase using the constructed query
        const { data: items, error } = await supabase
          .from('builds')
          .select('*')
          .or(orFilters);

        if (error) {
          console.error('Error loading items:', error);
          return;
        }

        if (items) {
          // Filter out items that contain IDs not in selectedIds
          const filteredItems = items.filter(item =>
            item.pieces_array.every((id: number) => selectedIds.includes(id))
          );
          setItems(filteredItems);
        }
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
      }
    };

    fetchItems();
  }, [selectedIds, supabase]);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <NavBar />
      <div className="container mx-auto px-6 py-8 2xl:px-64">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Builds</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {items.map((item) => (
            <BuildCard
              key={item.id}
              id={item.id}
              name={item.name}
              image_url={item.image_url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuildsPage;

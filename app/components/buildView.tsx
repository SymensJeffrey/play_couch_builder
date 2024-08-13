import SectionTitle from "./Common/SectionTitle";
import { createClient } from '../../utils/supabase/client';
import { useEffect, useState } from 'react';
import BuildCard from "./buildCard";

const BuildView = () => {

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
    <>
      <section
        id="features"
        className="bg-primary/[.03] py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <SectionTitle
            title="Builds"
            paragraph=""
            center
          />
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {items.map((item) => (
              <BuildCard
                key={item.id}
                id={item.id}
                name={item.name}
                image_url={item.image_url} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BuildView;
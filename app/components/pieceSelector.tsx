import { useEffect, useState } from "react";
import SectionTitle from "./Common/SectionTitle";
import { createClient } from '../../utils/supabase/client';
import PieceCard from "./pieceCard";
import Link from "next/link";

const PieceSelector = () => {

  const [items, setItems] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const supabase = createClient();


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

  return (
    <>
      <section
        id="features"
        className="bg-primary/[.03] py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <SectionTitle
            title="Select Pieces"
            paragraph=""
            center
          />
          <div className="flex flex-col items-center justify-center mb-6 -mt-20">
            <Link href='/builds'>
              <button
                onClick={handleNavigateToBuilds}
                className="rounded-md bg-primary py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
              >
                Find Builds
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      </section>
    </>
  );
};

export default PieceSelector;
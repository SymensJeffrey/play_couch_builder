'use client';

import { useState, useEffect } from 'react';
import Hero from '../components/hero';
import { createClient } from '../../utils/supabase/client';
import { useRef } from 'react';
import PieceSelector from '../components/pieceSelector';
const HomePage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const supabase = createClient();
  const selectPiecesRef = useRef<HTMLDivElement>(null); // Create a ref for the "Select Pieces" section

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

  const handleGetStarted = () => {
    if (selectPiecesRef.current) {
      selectPiecesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Hero onGetStarted={handleGetStarted} />
      {/* <div ref={selectPiecesRef} className="container mx-auto px-6 py-8 2xl:px-64">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Select Pieces</h1>
          <Link href='/builds'>
            <button className="btn btn-primary text-white py-2 px-4 rounded" onClick={handleNavigateToBuilds}>
              Find Builds
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
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
        <section
          id="features"
          className="bg-primary/[.03] py-16 md:py-20 lg:py-28"
        >
          <div className="container">
            <SectionTitle
              title="Main Features"
              paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
              center
            />

            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
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
      </div> */}
      <PieceSelector />
    </div>
  );
};

export default HomePage;

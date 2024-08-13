'use client';

import Hero from '../components/hero';
import { useRef } from 'react';
import PieceSelector from '../components/pieceSelector';
const HomePage = () => {
  const selectPiecesRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    if (selectPiecesRef.current) {
      selectPiecesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Hero onGetStarted={handleGetStarted} />
      <div ref={selectPiecesRef}>
        <PieceSelector />
      </div>
    </div>
  );
};

export default HomePage;

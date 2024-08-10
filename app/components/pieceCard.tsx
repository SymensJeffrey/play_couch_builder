import React, { useState, useEffect } from 'react';

interface PieceCardProps {
  id: number;
  name: string;
  image_url: string;
  onSelect: (id: number, quantity: number) => void;
  isSelected: boolean;
  quantity: number;
}

const PieceCard: React.FC<PieceCardProps> = ({ id, name, image_url, onSelect, isSelected, quantity }) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = localQuantity + amount;
    if (newQuantity <= 0) {
      onSelect(id, 0); // Unselect item if quantity goes to 0
    } else {
      onSelect(id, newQuantity); // Update quantity
    }
    setLocalQuantity(newQuantity);
  };

  const handleCardClick = () => {
    if (isSelected) {
      onSelect(id, 0); // Unselect the item if it's already selected
      setLocalQuantity(0);
    } else {
      handleQuantityChange(1); // Select with default quantity of 1
    }
  };

  return (
    <div
      className={`card bg-gray-800 text-white rounded-lg shadow-lg transition-transform transform ${isSelected ? 'border-4 border-blue-500 bg-opacity-80 scale-105' : 'border-none'}`}
      onClick={handleCardClick}
    >
      <figure className="relative pb-9/16">
        <img
          src={image_url}
          alt={name}
          className={`object-cover w-full h-full transition-opacity ${isSelected ? 'opacity-80' : 'opacity-100'}`}
        />
      </figure>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-center">{name}</h2>
        {isSelected && (
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={(e) => { e.stopPropagation(); handleQuantityChange(-1); }}
              className="btn btn-secondary btn-sm text-white py-1 px-3 rounded"
            >
              -
            </button>
            <input
              type="number"
              value={localQuantity}
              min="0"
              readOnly
              className="mx-2 text-center w-12 bg-gray-900 text-white border-none"
            />
            <button
              onClick={(e) => { e.stopPropagation(); handleQuantityChange(1); }}
              className="btn btn-secondary btn-sm text-white h-auto"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieceCard;

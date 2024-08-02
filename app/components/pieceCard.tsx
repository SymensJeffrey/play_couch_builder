import React, { useState } from 'react';

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

  const handleQuantityChange = (amount: number) => {
    const newQuantity = localQuantity + amount;
    if (newQuantity <= 0) {
      onSelect(id, 0); // Unselect item if quantity goes to 0
    } else {
      onSelect(id, newQuantity); // Update quantity
    }
    setLocalQuantity(newQuantity);
  };

  return (
    <div
      className={`card card-compact bg-neutral w-96 shadow-xl cursor-pointer transition-transform transform ${isSelected ? 'border-4 bg-violet-300 bg-opacity-30 scale-105' : 'border-none'
        }`}
      onClick={() => !isSelected && handleQuantityChange(1)} // Select with default quantity of 1
    >
      <figure>
        <img
          src={image_url}
          alt={name}
          className={`object-cover w-full h-48 transition-opacity ${isSelected ? 'opacity-80' : 'opacity-100'
            }`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-center">{name}</h2>
        {isSelected && (
          <div className="flex flex-col items-center mt-4">
            <div className="flex items-center">
              <button
                onClick={(e) => { e.stopPropagation(); handleQuantityChange(-1); }}
                className="btn btn-secondary"
              >
                -
              </button>
              <input
                type="number"
                value={localQuantity}
                min="0"
                readOnly
                className="input input-bordered w-14 justify-items-center"
              />
              <button
                onClick={(e) => { e.stopPropagation(); handleQuantityChange(1); }}
                className="btn btn-secondary"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieceCard;

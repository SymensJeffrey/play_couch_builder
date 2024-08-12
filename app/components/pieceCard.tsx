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
      className={`wow fadeInUp h-auto w-72 relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark ${isSelected ? 'border-4 border-blue-500 bg-opacity-80 scale-105' : 'border-none'}`}
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
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl text-center">
          {name}
        </h3>
        {isSelected && (
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={(e) => { e.stopPropagation(); handleQuantityChange(-1); }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
            >
              -
            </button>
            <input
              type="number"
              value={localQuantity}
              min="0"
              readOnly
              className="w-20 h-10 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
            />
            <button
              onClick={(e) => { e.stopPropagation(); handleQuantityChange(1); }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
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

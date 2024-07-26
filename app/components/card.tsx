import React from 'react';

interface CardProps {
  id: number;
  name: string;
  image_url: string;
  onSelect: (id: number) => void;
  isSelected: boolean;
}

const Card: React.FC<CardProps> = ({ id, name, image_url, onSelect, isSelected }) => {
  return (
    <div
      className={`card card-compact bg-neutral w-96 shadow-xl cursor-pointer transition-transform transform ${isSelected ? 'border-4 bg-violet-300 bg-opacity-30 scale-105' : 'border-none'
        }`}
      onClick={() => onSelect(id)}
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
      </div>
    </div>
  );
};

export default Card;

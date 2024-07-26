import React from 'react';

interface CardProps {
  name: string;
  image_url: string;
}

const Card: React.FC<CardProps> = ({ name, image_url }) => {
  return (
    <div className="card card-compact bg-neutral w-96 shadow-xl">
      <figure><img src={image_url} alt={name} /></figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{name}</h2>
      </div>
    </div>
  );
};

export default Card;

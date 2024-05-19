import React from 'react';

interface CardProps {
  name: string;
  image_url: string;
}

const Card: React.FC<CardProps> = ({ name, image_url }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src={image_url} alt={name} /></figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
      </div>
    </div>
  );
};

export default Card;

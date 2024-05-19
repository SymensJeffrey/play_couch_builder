import React from 'react';

interface CardProps {
  name: string;
  image_url: string;
}

const Card: React.FC<CardProps> = ({ name, image_url }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      {image_url && <img src={image_url} alt={name} />}
    </div>
  );
};

export default Card;

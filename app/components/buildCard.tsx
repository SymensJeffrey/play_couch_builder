import React from 'react';

interface CardProps {
  id: number;
  name: string;
  image_url: string;
}

const BuildCard: React.FC<CardProps> = ({ id, name, image_url }) => {
  return (
    <div
      className={'card bg-neutral w-96 shadow-xl cursor-pointer transition-transform transform'}
    >
      <figure className="relative pb-9/16">
        <img
          src={image_url}
          alt={name}
          className={'object-cover w-full h-full transition-opacity'}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-center justify-center">{name}</h2>
      </div>
    </div>
  );
};

export default BuildCard;

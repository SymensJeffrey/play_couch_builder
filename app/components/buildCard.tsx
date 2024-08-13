import React from 'react';

interface CardProps {
  id: number;
  name: string;
  image_url: string;
}

const BuildCard: React.FC<CardProps> = ({ id, name, image_url }) => {
  return (
    // <div
    //   className={'card bg-neutral w-96 shadow-xl cursor-pointer transition-transform transform'}
    // >
    //   <figure className="relative pb-9/16">
    //     <img
    //       src={image_url}
    //       alt={name}
    //       className={'object-cover w-full h-full transition-opacity'}
    //     />
    //   </figure>
    //   <div className="card-body">
    //     <h2 className="card-title text-center justify-center">{name}</h2>
    //   </div>
    // </div>
    <div
      className={`wow fadeInUp h-auto w-72 relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark `}
    >
      <figure className="relative pb-9/16">
        <img
          src={image_url}
          alt={name}
          className={`object-cover w-full h-full transition-opacity`}
        />
      </figure>
      <div className="p-4">
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl text-center">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default BuildCard;

import React from 'react';
import { data } from '../constants';
import Image from 'next/image';
import Link from 'next/link';

const Gallery = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-3xl font-bold my-10">
        The Seven Wonders of the World
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
        {data.map((item) => (
          <Link key={item.id} href={`/gallery/${item.id}`}>
            <Image
              src={item.src}
              alt={item.name}
              className="w-full object-cover
           aspect-square rounded-md"
              quality={40}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

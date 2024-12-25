import { data } from '../../constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LeafletMap from "../../components/LeafletMap";



const Page = async ({ params }) => {
  const { id } = await params;

  const item = data.find((i) => i.id === id);
  return (
    <div className="container mx-auto my-20 text-3xl">
      <div className="w-3/4 lg:w-1/2 mx-auto">
        <Link className="mb-10 text-lg border p-2 px-4 rounded-md" href="/">
          Back
        </Link>

        <h1 className="text-center text-5xl font-bold my-4 mt-10">
          {item.name}
        </h1>

        <Image
          src={item.src}
          alt={item.name}
          priority={1}
          className="w-full object-cover aspect-square rounded-md "
        />

        <div className="my-10">
          <h3 className="text-2xl text-amber-500">Photographer:</h3>
          <span>{item.photographer}</span>
        </div>

        <div>
          <h3 className="text-2xl text-amber-500">Description:</h3>
          <p className='text-xl text-justify'>{item.description}</p>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl text-amber-500">Location:</h3>
          <span className="">{item.location}</span>
        </div>

        <LeafletMap latitude={item.map.latitude} longitude={item.map.longitude} markerText={item.name} />
      </div>
    </div>
  );
};

export default Page;

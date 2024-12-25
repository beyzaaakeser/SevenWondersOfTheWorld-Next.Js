import React from "react";
import Image from "next/image";
import Link from "next/link";
import {data} from "../../src/app/constants";
import world from "../app/assets/photos/world.png";

const images = {
    world: {
        src: world,
        alt: "World image",
    }
};

export const HomeBackground = ({image}) => (
    <div className="absolute w-full h-screen">
        <Image
            src={image.src}
            fill
            priority
            alt={image.alt}
            className="home-background object-fill"
        />
    </div>
);

export const GalleryLink = ({href, image, className}) => (
    <Link href={href} className={className}>
        <div className="w-28 shadow-2xl drop-shadow-2xl h-[160px] rounded-xl relative">
            <Image
                src={image.m_src}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                alt={image.name}
                className="aspect-square shadow-2xl cursor-pointer object-cover rounded-xl"
            />
        </div>
    </Link>
);

const Home = () => (
    <div>

        <div className="max-lg:hidden home-world w-full h-screen relative">
            <HomeBackground image={images.world}/>
            <h1 className='text-5xl text-amber-600 absolute top-8 right-0 left-0 text-center'>The Seven Wonders of the
                World</h1>
            {data.map((item) => (
                <GalleryLink
                    key={item.id}
                    href={`/gallery/${item.id}`}
                    image={item}
                    className={`absolute ${item.mapLoc}`}
                />
            ))}
        </div>

        <div className="container lg:hidden mx-auto p-5">
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

    </div>

);

export default Home;


'use client';
import { data } from '@/app/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DetailPreview = ({ params }) => {
  const { id } = params;
  const item = data.find((i) => i.id === id);
  const router = useRouter();

  const close = () => {
    router.back();
  };
  const refresh = () => {
    window.location.reload();
  };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur grid place-items-center p-5">
      <div className="pb-5 px-5 bg-white rounded-md text-black text-5xl flex flex-col gap-5 ">
        <div className="text-lg flex justify-between my-5 gap-5">
          <button
            onClick={close}
            className="size-10 border border-black rounded-lg transition hover:bg-black/40"
          >
            X
          </button>
          <button
            onClick={refresh}
            className="size-10 border border-black rounded-lg transition hover:bg-black/40"
          >
            G
          </button>
        </div>

        <Image
          src={item.src}
          alt={item.name}
          className="w-full max-h-[300px] object-cover aspect-square rounded-md"
        />

        <div>
          <h2 className="text-3xl font-bold">{item.name}</h2>
        </div>

        <div className="text-xl flex flex-col ">
          <span>Location:</span>
          <span className="font-semibold">{item.location}</span>
        </div>

        <div className="text-xl flex flex-col ">
          <span>Photographer:</span>
          <span className="font-semibold">{item.photographer}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailPreview;

import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-100 md:h-125 lg:h-180 w-full">
      <Image src="/hero.png" alt="Hero" fill priority className="object-cover object-top" />
      <div className="absolute inset-0 bg-white/20 z-10"></div>
    </div>
  );
}

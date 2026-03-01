import Image from 'next/image';
import Heart from '../../public/flag-heart.svg';
import Link from 'next/link';

function Baner() {
  return (
    <div className="block h-10 w-full bg-banner-bg font-semibold">
      <Link
        href="https://www.unicef.org/ukraine"
        className="flex h-full items-center justify-center cursor-pointer"
      >
        <p className="md:text-md font-heading text-sm tracking-wide text-banner-text antialiased">
          Stand with Ukraine
        </p>
        <Image src={Heart} alt="Heart" width={48} height={48} className="ml-2" />
      </Link>
    </div>
  );
}

export default Baner;

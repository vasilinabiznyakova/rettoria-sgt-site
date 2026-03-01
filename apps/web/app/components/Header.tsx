'use client';

import { MenuIcon, X } from 'lucide-react';
import Image from 'next/image';
import LogoRettoria from '../../public/LogoRettoriaSGT.svg';
import Baner from './Banner';
import Link from 'next/link';
import NavigationMenu from './NavigationMenu';
import { useTranslations } from 'next-intl';
import Switcher from './Switcher';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const currentPath = usePathname();
  const segment = currentPath.split('/') || [];
  const locale = segment[1] || 'it';
  const t = useTranslations('header');
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="fixed z-50 w-full bg-white">
      <Baner />
      <div className="w-screen-2xl mx-auto flex flex-wrap items-center px-4 py-4 lg:px-10 justify-between">
        <div className="flex flex-nowrap items-center gap-2">
          <Link href={`/${locale}/`} className="flex items-center flex-nowrap">
            <Image
              src={LogoRettoria}
              alt="Logo"
              width={56}
              height={56}
              className="mr-2 hidden md:block"
            />
            <h1 className="py-2 text-xl md:text-3xl tracking-wide text-button sm:inline-block font-semibold">
              {t('logo')}
            </h1>
          </Link>
        </div>
        {/* MOBILE: hamburger + switcher */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
          <Switcher />
        </div>

        {/* DESKTOP: menu inline + switcher */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu />
          <Switcher />
        </div>
      </div>

      {/* MENU MOBILE/TABLET */}
      {navOpen && (
        <div className="lg:hidden w-full bg-gray-50">
          <ul className="flex flex-col items-center gap-4 py-4">
            <NavigationMenu />
          </ul>
        </div>
      )}
    </div>
  );
}

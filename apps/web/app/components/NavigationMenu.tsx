'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationMenu() {
  const t = useTranslations('header.navigation');
  const currentPath = usePathname();
  const segment = currentPath.split('/') || [];
  const locale = segment[1] || 'it';
  const currentPage = segment[2] || '';
  const closeMenu = () => {
    const menuToggle = document.getElementById('menu-toggle') as HTMLInputElement;
    if (menuToggle) {
      menuToggle.checked = false;
    }
  };
  return (
    <nav className="flex flex-col gap-2 lg:flex-row lg:space-x-4">
      <Link
        href={`/${locale}/news`}
        onClick={closeMenu}
        className={`${currentPage === 'news' ? 'underline-header' : ''} rounded-none py-2 text-lg font-semibold tracking-wide text-header-text transition-colors duration-300 hover:text-hover-header lg:px-4`}
      >
        {t('about')}
      </Link>
      <Link
        href={`/${locale}/projects`}
        onClick={closeMenu}
        className={`${currentPage === 'projects' ? 'underline-header' : ''} rounded-none py-2 text-lg font-semibold tracking-wide text-header-text transition-colors duration-300 hover:text-hover-header lg:px-4`}
      >
        {t('projects')}
      </Link>
      <Link
        href={`/${locale}/donations`}
        onClick={closeMenu}
        className={`${currentPage === 'donations' ? 'underline-header' : ''} rounded-none py-2 text-lg font-semibold tracking-wide text-header-text transition-colors duration-300 hover:text-hover-header lg:px-4`}
      >
        {t('donate')}
      </Link>
    </nav>
  );
}

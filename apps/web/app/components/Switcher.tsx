'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const LANGUAGES = {
  it: { label: 'Italiano', flag: '/flugs/it.png' },
  en: { label: 'English', flag: '/flugs/en.png' },
  uk: { label: 'Українська', flag: '/flugs/uk.png' },
};
export default function Switcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const segments = pathname.split('/');
  const currentLocale = segments[1] || 'it';
  const current = LANGUAGES[currentLocale as keyof typeof LANGUAGES];

  const changeLocale = (newLocale: string) => {
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md  px-3 py-1 text-sm hover:bg-gray-100"
        aria-label={`Seleziona lingua. Lingua corrente: ${current.label}`}
      >
        <Image key={currentLocale} src={current.flag} alt={current.label} width={20} height={14} />
        <span className="sr-only">{current.label}</span>
        <ChevronDown />
      </button>
      {open && (
        <ul className="absolute right-0 z-50 mt-2 w-40 rounded-md bg-white shadow">
          {Object.entries(LANGUAGES).map(([key, lang]) => (
            <li key={key}>
              <button
                onClick={() => changeLocale(key)}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
              >
                <Image src={lang.flag} alt={lang.label} width={20} height={14} />
                <span>{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

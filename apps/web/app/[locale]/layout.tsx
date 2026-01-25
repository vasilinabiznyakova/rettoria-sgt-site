import { notFound } from 'next/navigation';

const LOCALES = ['uk', 'it', 'en'] as const;
type Locale = (typeof LOCALES)[number];

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

// here later there will be a title/menu/language switch
  return <>{children}</>;
}

import { sanityClient } from '@/lib/sanity/client';

export default async function Home() {
  const settings = await sanityClient.fetch(
    `*[_type == "siteSettings"][0]{ title, defaultLocale }`,
  );

  return (
    <main style={{ padding: 24 }}>
      <h1>{settings?.title ?? 'Rettoria SGT'}</h1>
      <p>defaultLocale: {settings?.defaultLocale ?? 'uk'}</p>
    </main>
  );
}

//import { sanityClient } from '@/lib/sanity/client';
import Hero from 'app/components/Hero';

export default async function Home() {
  /* const settings = await sanityClient.fetch(
    `*[_type == "siteSettings"][0]{ title, defaultLocale }`,
  ); */

  return (
    <main>
      {/* <h1>{settings?.title ?? 'Rettoria SGT'}</h1> */}
      <Hero />
    </main>
  );
}

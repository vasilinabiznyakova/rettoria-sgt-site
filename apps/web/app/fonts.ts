import { Playfair_Display, Nunito } from 'next/font/google';

export const headingFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const bodyFont = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

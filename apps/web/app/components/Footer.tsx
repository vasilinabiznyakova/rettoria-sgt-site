'use client';
import Image from 'next/image';
import LogoRettoria from '../../public/LogoRettoriaSGT.svg';
import { useTranslations } from 'next-intl';
import email from '../../public/footer/email.png';
import phone from '../../public/footer/phone.png';
import facebook from '../../public/footer/facebook.png';
import telegram from '../../public/footer/telegram.png';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <div className="z-50 bg-footer-bg">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:px-32 xl:h-96 xl:grid-cols-3 mx-auto py-4 md:justify-center md:items-center justify-items-start gap-4 px-10">
        <div className="flex">
          <Image src={LogoRettoria} alt="Logo" width={300} height={300} className="object-cover" />
        </div>
        <div className="flex flex-col items-start gap-6">
          <h3 className="text-footer-header text-2xl">{t('contacts')}</h3>
          <ul className="flex flex-col gap-6 items-start text-footer-text">
            <li>
              <Image src={email} alt="Email" width={20} height={20} className="mr-2 inline-block" />
              <a href="mailto:JxUoR@example.com">p.sgtaddeo@gmail.com</a>
            </li>
            <li>
              <Image src={phone} alt="Phone" width={20} height={20} className="mr-2 inline-block" />
              <a href="tel:++39 375 907 7300">+39 375 907 7300</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-6">
          <h3 className="text-footer-header text-2xl">{t('socialMedia')}</h3>
          <ul className="flex flex-col gap-6 items-start text-footer-text">
            <li>
              <Link href="https://www.facebook.com/parochia.forli">
                <Image
                  src={facebook}
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="mr-2 inline-block"
                />
                <span>Facebook</span>
              </Link>
            </li>
            <li>
              <Link href="https://www.facebook.com/parochia.forli">
                <Image
                  src={telegram}
                  alt="Telegram"
                  width={20}
                  height={20}
                  className="mr-2 inline-block"
                />
                <span>Telegram</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

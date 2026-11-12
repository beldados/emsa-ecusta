import localFont from 'next/font/local';

/**
 * Local Benahia display/ceremonial typeface loaded strictly from self-hosted
 * binaries in /public/fonts/ with zero external network requests.
 */
export const benahia = localFont({
  src: '../../public/fonts/Benaiah.otf',
  variable: '--font-benahia',
  display: 'swap',
});

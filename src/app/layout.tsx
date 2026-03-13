import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/store/provider';

export const metadata: Metadata = {
  title: 'NorteWalk — Turismo del Norte Argentino',
  description:
    'Descubrí el Norte Argentino con Free Walking Tours y excursiones de turismo activo. Salta, Jujuy, Quebrada de Humahuaca.',
  keywords: 'turismo norte argentino, free walking tour salta, excursiones jujuy, quebrada humahuaca, parapente salta',
  openGraph: {
    title: 'NorteWalk — Turismo del Norte Argentino',
    description: 'Tours gratuitos y excursiones únicas en el NOA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
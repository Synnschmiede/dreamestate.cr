// ./src/app/(home)/properties/page.tsx
import { CONFIG } from 'src/config-global';
import { ContactView } from './contact-view';

export const metadata = {
  title: `${CONFIG.appName} | Properties`,
  description:
    'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default async function ContactPage({ searchParams }: { searchParams: Record<string, any> }) {
  const queryString = new URLSearchParams(searchParams).toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/property?${queryString}`, {
    cache: 'no-cache',
  });
  const properties = await res.json();

  return <ContactView />;
}

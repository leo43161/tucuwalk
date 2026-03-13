import { ALL_TOURS, getTourById } from '@/lib/mockData';
import TourDetailClient from '@/components/shared/TourDetailClient';
import { notFound } from 'next/navigation';

// Required for Next.js `output: 'export'` with dynamic routes.
// Pre-generates a static HTML page for each tour at build time.
export async function generateStaticParams() {
  return ALL_TOURS.map((tour) => ({
    id: tour.id,
  }));
}


/* export async function generateMetadata({ params }: { params: { id: string } }) {
  const tour = getTourById(params.id);
  console.log(tour);
  if (!tour) return { title: 'Tour no encontrado — NorteWalk' };

  return {
    title: `${tour.title} — NorteWalk`,
    description: tour.shortDescription,
  };
} */

export default async function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tour = getTourById(id);

  if (!tour) {
    notFound();
  }

  return <TourDetailClient tour={tour} />;
}
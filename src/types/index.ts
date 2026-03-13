// ============================================================
//  NorteWalk — Type Definitions
// ============================================================

export interface Guide {
  id: string;
  name: string;
  photo: string;
  rating: number;
  toursCount: number;
  verified: boolean;
  bio: string;
  languages: string[];
  whatsapp: string; // e.g. "+5493874000000"
}

export type TourType = 'free' | 'paid';
export type TourCategory = 'ciudad' | 'aire' | 'agua' | 'tierra';
export type DifficultyLevel = 'facil' | 'moderado' | 'dificil';

export interface ItineraryPoint {
  order: number;
  time: string;       // e.g. "09:00"
  title: string;
  description: string;
}

export interface TourAvailability {
  date: string;       // ISO date string, e.g. "2025-08-15"
  guides: Guide[];
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  type: TourType;
  category: TourCategory;
  tags: string[];

  // Pricing
  price: number | null;        // null = free tour (pay-what-you-want)
  priceMin?: number;           // For FWT: recommended minimum
  priceMax?: number;           // For FWT: recommended maximum
  priceCurrency?: string;      // 'ARS' | 'USD'

  // Duration & Logistics
  duration: number;            // hours
  difficulty?: DifficultyLevel;
  minParticipants: number;
  maxParticipants: number;
  languages: string[];
  location: string;            // city / region
  city: string;
  meetingPoint: string;        // short label
  meetingPointDescription: string; // full address / instructions

  // Content
  shortDescription: string;
  description: string;         // long text with <br> breaks
  images: string[];
  itinerary: ItineraryPoint[];

  // Guides & Reviews
  guides: Guide[];
  rating: number;
  reviewCount: number;

  // Logistics details
  includes: string[];
  excludes: string[];
  accessibility: string;
  petsAllowed: boolean;
  groupsAllowed: boolean;
  additionalExpenses: string;
  paymentMethods: string[];
  freeCancellation: boolean;

  // Availability (mocked)
  availability: TourAvailability[];

  // CTA (WhatsApp para tours pagos)
  whatsappLink: string;
}

// ─── Redux Booking State ──────────────────────────────────────
export interface BookingState {
  selectedTour: Tour | null;
  selectedDate: string | null;
  selectedGuide: Guide | null;
  selectedLanguage: string;
  participants: number;
  isModalOpen: boolean;
  // Guest Checkout
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}
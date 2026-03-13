'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star, Clock, MapPin, Users, Globe, ChevronDown, ChevronUp,
  Shield, CheckCircle, XCircle, Accessibility, PawPrint,
  MessageCircle, Calendar, ChevronLeft, Info, Award, AlertCircle,
} from 'lucide-react';
import { Tour, Guide, TourAvailability } from '@/types';
import { formatPrice, formatDate, formatDateShort } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import BookingModal from './BookingModal';

interface TourDetailClientProps {
  tour: Tour;
}

export default function TourDetailClient({ tour }: TourDetailClientProps) {
  // ─── State ───────────────────────────────────────────────────
  const [descExpanded, setDescExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState(tour.languages[0]);
  const [participants, setParticipants] = useState(1);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // ─── Derived data ────────────────────────────────────────────
  const availabilityMap = useMemo(() => {
    const map = new Map<string, TourAvailability>();
    tour.availability.forEach((a) => map.set(a.date, a));
    return map;
  }, [tour.availability]);

  const availableDates = useMemo(
    () => tour.availability.map((a) => a.date).sort(),
    [tour.availability]
  );

  const guidesForDate = useMemo<Guide[]>(() => {
    if (!selectedDate) return [];
    return availabilityMap.get(selectedDate)?.guides ?? [];
  }, [selectedDate, availabilityMap]);

  const totalPrice = tour.price !== null ? tour.price * participants : null;

  const canBook =
    selectedDate !== '' &&
    selectedGuide !== null &&
    participants >= tour.minParticipants;

  // ─── Helpers ─────────────────────────────────────────────────
  function handleDateChange(date: string) {
    setSelectedDate(date);
    setSelectedGuide(null);
  }

  const difficultyLabel: Record<string, { label: string; color: string }> = {
    facil: { label: 'Fácil', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    moderado: { label: 'Moderado', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    dificil: { label: 'Difícil', color: 'text-red-600 bg-red-50 border-red-200' },
  };

  const categoryLabel: Record<string, string> = {
    ciudad: '🏛️ Ciudad & Cultura',
    aire: '🪂 Turismo Aéreo',
    agua: '🚣 Turismo Acuático',
    tierra: '⛰️ Turismo de Montaña',
  };

  // ─── Render ──────────────────────────────────────────────────
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-16">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100 mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors flex items-center gap-1">
                <ChevronLeft size={14} /> Inicio
              </Link>
              <span>/</span>
              <Link href={`/#${tour.type === 'free' ? 'free-tours' : 'turismo-activo'}`} className="hover:text-gray-900 transition-colors">
                {tour.type === 'free' ? 'Free Tours' : 'Turismo Activo'}
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium line-clamp-1">{tour.title}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-start relative top-0 left-0 translate-2">

            {/* ═══════════════════════════════════════════════
                LEFT COLUMN — 70%
            ═══════════════════════════════════════════════ */}
            <div className="flex-1 min-w-0 space-y-8">

              {/* Image Gallery */}
              <div className="space-y-2">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-gray-200 shadow-md">
                  <Image
                    src={tour.images[activeImage]}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />
                  {tour.freeCancellation && (
                    <div className="absolute top-4 left-4">
                      <span className="nw-badge nw-badge-emerald text-xs">
                        <Shield size={11} /> Cancelación gratuita
                      </span>
                    </div>
                  )}
                </div>
                {tour.images.length > 1 && (
                  <div className="flex gap-2">
                    {tour.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                          i === activeImage ? 'ring-2 ring-orange-500 ring-offset-1' : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" unoptimized />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Badges */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="nw-badge nw-badge-gray">{categoryLabel[tour.category]}</span>
                  {tour.type === 'free' ? (
                    <span className="nw-badge nw-badge-free">GRATIS · Donación libre</span>
                  ) : (
                    tour.difficulty && (
                      <span className={`nw-badge border ${difficultyLabel[tour.difficulty].color}`}>
                        {difficultyLabel[tour.difficulty].label}
                      </span>
                    )
                  )}
                  {tour.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="nw-badge nw-badge-gray">{tag}</span>
                  ))}
                </div>

                <h1
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {tour.title}
                </h1>

                {/* Rating row */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[1,2,3,4,5].map((i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i <= Math.round(tour.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">{tour.rating}</span>
                    <span className="text-gray-500 font-semibold">Excelente</span>
                    <span className="text-gray-400">({tour.reviewCount} opiniones)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin size={14} />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock size={14} />
                    <span>{tour.duration >= 1 ? `${tour.duration} horas` : `${tour.duration * 60} min`}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Globe size={14} />
                    <span>{tour.languages.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Guide Profile */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 section-title" style={{ fontFamily: 'var(--font-display)' }}>
                  {tour.guides.length === 1 ? 'Tu guía' : 'Guías disponibles'}
                </h2>
                <div className="flex flex-col gap-4">
                  {tour.guides.map((guide) => (
                    <div key={guide.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={guide.photo} alt={guide.name} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{guide.name}</h3>
                          {guide.verified && (
                            <span className="nw-badge nw-badge-emerald text-xs">
                              <CheckCircle size={10} /> Verificado
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            {guide.rating}
                          </span>
                          <span>{guide.toursCount} tours realizados</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1.5 line-clamp-2">{guide.bio}</p>
                        <p className="text-xs text-gray-400 mt-1">{guide.languages.join(' · ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 section-title" style={{ fontFamily: 'var(--font-display)' }}>
                  Sobre este tour
                </h2>
                <div className={`text-gray-600 leading-relaxed text-sm overflow-hidden transition-all duration-300 ${!descExpanded ? 'max-h-32' : 'max-h-none'}`}>
                  {tour.description.split('\n').map((para, i) => (
                    para.trim() ? <p key={i} className="mb-3 last:mb-0">{para}</p> : null
                  ))}
                </div>
                <button
                  onClick={() => setDescExpanded(!descExpanded)}
                  className="flex items-center gap-1 mt-3 text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors"
                >
                  {descExpanded ? (
                    <><ChevronUp size={16} /> Ver menos</>
                  ) : (
                    <><ChevronDown size={16} /> Ver más...</>
                  )}
                </button>
              </div>

              {/* FWT Price Box */}
              {tour.type === 'free' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Info size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">¿Cuánto se paga en un Free Tour?</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Los free tours <strong>no tienen un precio fijo</strong>. Al finalizar, cada persona aporta
                        al guía la cantidad que considere justa según su satisfacción con la experiencia.
                      </p>
                      <div className="mt-3 flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-emerald-200 inline-flex">
                        <span className="text-emerald-700 font-semibold text-sm">💚 Recomendamos:</span>
                        <span className="font-bold text-gray-900">
                          {formatPrice(tour.priceMin!)} – {formatPrice(tour.priceMax!)} ARS
                        </span>
                        <span className="text-gray-500 text-xs">por persona</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Itinerary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-5 section-title" style={{ fontFamily: 'var(--font-display)' }}>
                  Itinerario
                </h2>
                <div className="space-y-0">
                  {tour.itinerary.map((point, i) => (
                    <div key={point.order} className="relative flex gap-4 pb-5 last:pb-0">
                      {/* Line */}
                      {i < tour.itinerary.length - 1 && (
                        <div className="absolute left-[18px] top-8 bottom-0 w-0.5 bg-gray-100" />
                      )}
                      {/* Dot */}
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-xs font-bold text-orange-600 z-10">
                        {point.order}
                      </div>
                      {/* Content */}
                      <div className="pt-1 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">{point.time}</span>
                          <h4 className="font-semibold text-gray-900 text-sm">{point.title}</h4>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 section-title" style={{ fontFamily: 'var(--font-display)' }}>
                  Punto de encuentro
                </h2>
                <div className="bg-gray-100 rounded-xl h-56 flex items-center justify-center border border-gray-200 mb-4 overflow-hidden">
                  <div className="text-center text-gray-400">
                    <MapPin size={36} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-sm font-medium">{tour.meetingPoint}</p>
                    <p className="text-xs mt-1 text-gray-400">Mapa interactivo próximamente</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">{tour.meetingPointDescription}</p>
                </div>
              </div>

              {/* Includes / Excludes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-5 section-title" style={{ fontFamily: 'var(--font-display)' }}>
                  ¿Qué incluye?
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Incluye</h3>
                    <ul className="space-y-2">
                      {tour.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">No incluye</h3>
                    <ul className="space-y-2">
                      {tour.excludes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <XCircle size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ / Additional Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-5 section-title" style={{ fontFamily: 'var(--font-display)' }}>
                  Información adicional
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { icon: <Accessibility size={16} />, label: 'Accesibilidad', value: tour.accessibility },
                    { icon: <PawPrint size={16} />, label: 'Mascotas', value: tour.petsAllowed ? 'Se permiten mascotas' : 'No se permiten mascotas' },
                    { icon: <Users size={16} />, label: 'Grupos y familias', value: tour.groupsAllowed ? 'Ideal para grupos y familias' : 'No disponible para grupos grandes' },
                    { icon: <AlertCircle size={16} />, label: 'Gastos adicionales', value: tour.additionalExpenses },
                    { icon: <Info size={16} />, label: 'Mínimo de asistentes', value: `${tour.minParticipants} persona${tour.minParticipants > 1 ? 's' : ''}` },
                    { icon: <Award size={16} />, label: 'Métodos de pago', value: tour.paymentMethods.join(', ') },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0 text-orange-600">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{item.label}</p>
                        <p className="text-sm text-gray-700">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Cancellation badge */}
              {tour.freeCancellation && (
                <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Cancelación gratuita</p>
                    <p className="text-sm text-gray-600">Cancelá sin costo hasta 24 horas antes del tour.</p>
                  </div>
                </div>
              )}

            </div>

            {/* ═══════════════════════════════════════════════
                RIGHT COLUMN — 30% — Booking Widget (Sticky)
            ═══════════════════════════════════════════════ */}
            <aside className="w-full lg:w-80 xl:w-96 top-0 right-0 transform lg:-translate-y-1 h-full">
              <div className="booking-widget p-6 h-full">

                {/* Price header */}
                <div className="mb-5 pb-5 border-b border-gray-100">
                  {tour.type === 'free' ? (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-emerald-600" style={{ fontFamily: 'var(--font-display)' }}>
                          GRATIS
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Donación libre al guía al finalizar</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                          {formatPrice(tour.price!)}
                        </span>
                        <span className="text-gray-500 text-sm">/ persona</span>
                      </div>
                      {participants > 1 && totalPrice && (
                        <p className="text-sm text-gray-500 mt-0.5">
                          Total: <span className="font-semibold text-gray-900">{formatPrice(totalPrice)}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Date picker */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    Fecha *
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      value={selectedDate}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="nw-input pl-9 appearance-none cursor-pointer"
                    >
                      <option value="">Elegí una fecha</option>
                      {availableDates.map((date) => (
                        <option key={date} value={date}>
                          {formatDateShort(date)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Language */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    Idioma
                  </label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="nw-input pl-9 appearance-none cursor-pointer"
                    >
                      {tour.languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Participants */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    Participantes
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setParticipants(Math.max(tour.minParticipants, participants - 1))}
                      className="w-12 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xl font-light border-r border-gray-200"
                    >
                      −
                    </button>
                    <div className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-900 h-10">
                      <Users size={14} className="text-gray-400" />
                      {participants}
                    </div>
                    <button
                      onClick={() => setParticipants(Math.min(tour.maxParticipants, participants + 1))}
                      className="w-12 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xl font-light border-l border-gray-200"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Máx. {tour.maxParticipants} personas</p>
                </div>

                {/* Available Guides (filtered by date) */}
                {selectedDate && (
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                      Guía disponible {formatDateShort(selectedDate)}
                    </label>
                    {guidesForDate.length === 0 ? (
                      <div className="text-sm text-gray-500 bg-gray-50 rounded-xl p-3 text-center">
                        Sin disponibilidad para esta fecha
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {guidesForDate.map((guide) => (
                          <button
                            key={guide.id}
                            onClick={() => setSelectedGuide(guide)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                              selectedGuide?.id === guide.id
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                              <Image src={guide.photo} alt={guide.name} fill className="object-cover" unoptimized />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">{guide.name}</p>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                {guide.rating} · {guide.toursCount} tours
                              </div>
                            </div>
                            {selectedGuide?.id === guide.id && (
                              <CheckCircle size={18} className="text-orange-500 flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => setModalOpen(true)}
                  disabled={!canBook}
                  className={`nw-btn-primary w-full py-4 text-base transition-opacity ${
                    !canBook ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                >
                  {!selectedDate
                    ? 'Elegí una fecha para continuar'
                    : !selectedGuide
                    ? 'Elegí un guía para continuar'
                    : 'Continuar con la reserva →'}
                </button>

                {!canBook && (
                  <p className="text-xs text-center text-gray-400 mt-2">
                    Seleccioná fecha y guía para continuar
                  </p>
                )}

                {/* Trust badges */}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield size={13} className="text-emerald-600" />
                    Cancelación gratuita hasta 24hs antes
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MessageCircle size={13} className="text-emerald-600" />
                    Confirmación inmediata por WhatsApp
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Award size={13} className="text-emerald-600" />
                    Guías certificados y verificados
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        tour={tour}
        selectedDate={selectedDate || null}
        selectedGuide={selectedGuide}
        selectedLanguage={selectedLanguage}
        participants={participants}
      />
    </>
  );
}
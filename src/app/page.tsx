'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search, MapPin, Calendar, Users, Star, ChevronRight,
  Zap, Droplets, Mountain, CheckCircle, MessageCircle,
  Gift, ArrowRight, Shield, Globe, Award
} from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import TourCard from '@/components/shared/TourCard';
import { FREE_TOURS, PAID_TOURS } from '@/lib/mockData';
import { TourCategory } from '@/types';

type ActiveCategory = 'todos' | TourCategory;

const CATEGORY_FILTERS: { key: ActiveCategory; label: string; icon: React.ReactNode }[] = [
  { key: 'todos', label: 'Todos', icon: <span className="text-base">✨</span> },
  { key: 'aire', label: 'Aire', icon: <Zap size={15} /> },
  { key: 'agua', label: 'Agua', icon: <Droplets size={15} /> },
  { key: 'tierra', label: 'Tierra', icon: <Mountain size={15} /> },
];

const DESTINATIONS = [
  {
    name: 'Salta Capital',
    description: 'La ciudad colonial más bella del NOA',
    image: 'https://www.tucumanturismo.gob.ar/public/img/casahistorica_nrxunv4s_16-07-2025.jpg',
    tours: 8,
    href: '/#free-tours',
  },
  {
    name: 'Quebrada de Humahuaca',
    description: 'Patrimonio de la Humanidad UNESCO',
    image: 'https://www.tucumanturismo.gob.ar/public/img/sender_vmhg5vte_16-07-2025.jpg',
    tours: 5,
    href: '/#free-tours',
  },
  {
    name: 'Valles Calchaquíes',
    description: 'Vinos de altura y cañones rojizos',
    image: 'https://www.tucumanturismo.gob.ar/public/img/casade_pmtlzb9l_16-07-2025.jpeg',
    tours: 6,
    href: '/#turismo-activo',
  },
  {
    name: 'Cafayate',
    description: 'Bodeguitas, piedra y mucho sabor',
    image: 'https://www.tucumanturismo.gob.ar/public/img/parapente1_s0ul3h7p_16-07-2025.jpg',
    tours: 4,
    href: '/#turismo-activo',
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('todos');

  const filteredPaidTours = activeCategory === 'todos'
    ? PAID_TOURS
    : PAID_TOURS.filter((t) => t.category === activeCategory);

  return (
    <>
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://www.tucumanturismo.gob.ar/public/img/listas/casahi_skifgon3_10-09-2025.jpg"
            alt="Andes del Norte Argentino"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 sm:px-6 w-5/6 py-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Tours activos hoy en Tucuman
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            El Norte Argentino
            <span className="text-orange-400"> te espera.</span>
          </h1>
          <p className="text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-5">
            Empezá gratis con un Free Walking Tour guiado por locales.
            Luego volá, remá y escalá con nuestras excursiones de turismo activo.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm mb-12">
            {[
              { value: '+1.200', label: 'viajeros felices' },
              { value: '4.9★', label: 'valoración media' },
              { value: '9', label: 'tours disponibles' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Search / CTA card */}
          <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Destino
                </label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select className="nw-input pl-9 text-sm appearance-none cursor-pointer">
                    <option>Todos los destinos</option>
                    <option>Salta Capital</option>
                    <option>Jujuy</option>
                    <option>Cafayate</option>
                    <option>Humahuaca</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Fecha
                </label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="date" className="nw-input pl-9 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Personas
                </label>
                <div className="relative">
                  <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select className="nw-input pl-9 text-sm appearance-none cursor-pointer">
                    {[1,2,3,4,5,6,7,8].map((n) => (
                      <option key={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <Link href="/#free-tours" className="nw-btn-primary w-full py-3.5 text-base gap-2">
              <Search size={18} />
              Buscar tours
            </Link>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 text-xs">
          <span>Explorá</span>
          <div className="w-px h-8 bg-white/30 rounded" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRUST BAR
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            {[
              { icon: <Shield size={16} className="text-emerald-600" />, text: 'Cancelación gratuita' },
              { icon: <CheckCircle size={16} className="text-emerald-600" />, text: 'Guías certificados' },
              { icon: <Gift size={16} className="text-emerald-600" />, text: 'Free Tours sin cargo previo' },
              { icon: <MessageCircle size={16} className="text-emerald-600" />, text: 'Confirmación por WhatsApp' },
              { icon: <Star size={16} className="text-yellow-400 fill-yellow-400" />, text: '4.9 de calificación promedio' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                {item.icon}
                <span className="font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FREE TOURS SECTION
      ═══════════════════════════════════════════════════════ */}
      <section id="free-tours" className="pt-40 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                <Gift size={12} />
                LA PUERTA DE ENTRADA
              </div>
              <h2
                className="text-4xl sm:text-5xl font-bold text-gray-900 section-title"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Free Walking Tours
              </h2>
              <p className="text-gray-500 mt-3 text-lg max-w-xl">
                La mejor forma de conocer el NOA: con un local apasionado y sin pagar de antemano.
                Solo donás lo que sientas que vale.
              </p>
            </div>

            {/* How FWT works - mini card */}
            <div className="shrink-0 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 max-w-xs">
              <p className="text-sm font-semibold text-gray-800 mb-1.5">¿Cómo funciona?</p>
              <ol className="text-xs text-gray-600 space-y-1">
                <li className="flex items-start gap-1.5"><span className="font-bold text-emerald-600">1.</span> Reservás gratis en un click</li>
                <li className="flex items-start gap-1.5"><span className="font-bold text-emerald-600">2.</span> Disfrutás el tour con un guía local</li>
                <li className="flex items-start gap-1.5"><span className="font-bold text-emerald-600">3.</span> Al final, donás lo que te pareció justo</li>
              </ol>
            </div>
          </div>

          {/* Free Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FREE_TOURS.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ACTIVE TOURISM SECTION
      ═══════════════════════════════════════════════════════ */}
      <section id="turismo-activo" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Zap size={12} />
              TURISMO ACTIVO
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Aventura en el NOA
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Parapente, kayak, rafting, trekking y más. Excursiones guiadas
              que te van a dejar sin palabras.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/30'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Paid Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaidTours.map((tour) => (
              <div key={tour.id} className="[&_.nw-card]:bg-gray-800 [&_.nw-card]:border-gray-700">
                <TourCard tour={tour} />
              </div>
            ))}
          </div>

          {filteredPaidTours.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <Mountain size={40} className="mx-auto mb-3 opacity-30" />
              <p>Próximamente tours de esta categoría</p>
            </div>
          )}

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DESTINATIONS
      ═══════════════════════════════════════════════════════ */}
      <section id="destinos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2
              className="text-4xl font-bold text-gray-900 section-title"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Destinos del NOA
            </h2>
            <p className="text-gray-500 mt-3 text-lg">Cada rincón del Norte Argentino tiene algo único para contarte.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DESTINATIONS.map((dest) => (
              <Link href={dest.href} key={dest.name} className="group relative rounded-2xl overflow-hidden aspect-3/4  block">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    {dest.name}
                  </p>
                  <p className="text-white/80 text-xs mt-0.5">{dest.description}</p>
                  <div className="mt-2 flex items-center gap-1 text-orange-400 text-xs font-semibold">
                    {dest.tours} tours <ChevronRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════ */}
      <section id="nosotros" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ¿Cómo funciona NorteWalk?
          </h2>
          <p className="text-gray-500 text-lg mb-14 max-w-xl mx-auto">
            Simple, rápido y sin fricciones. Reservá en minutos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: <Search size={28} className="text-orange-600" />,
                title: 'Encontrá tu tour',
                desc: 'Explorá los free tours y excursiones disponibles. Filtrá por destino, categoría o fecha.',
              },
              {
                step: '02',
                icon: <Calendar size={28} className="text-orange-600" />,
                title: 'Elegí fecha y guía',
                desc: 'Seleccioná la fecha que más te quede. Ves qué guías están disponibles y elegís el tuyo.',
              },
              {
                step: '03',
                icon: <MessageCircle size={28} className="text-orange-600" />,
                title: 'Confirmás por WhatsApp',
                desc: 'Con un click se abre WhatsApp con el guía para confirmar los detalles. Sin registro ni contraseñas.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                  <div className="text-5xl font-bold text-gray-100 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
                {/* Connector line */}
                {item.step !== '03' && (
                  <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                    <ArrowRight size={20} className="text-orange-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14">
            <Link href="/#free-tours" className="nw-btn-primary text-base py-4 px-8 inline-flex gap-2">
              <Gift size={18} />
              Empezar con un Free Tour gratis
            </Link>
            <p className="text-gray-400 text-sm mt-3">Sin registro · Sin tarjeta · Sin costo previo</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRUST SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '+1.200', label: 'Viajeros satisfechos' },
              { value: '9', label: 'Tours disponibles' },
              { value: '4.9★', label: 'Valoración promedio' },
              { value: '100%', label: 'Guías verificados' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {stat.value}
                </div>
                <div className="text-orange-200 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
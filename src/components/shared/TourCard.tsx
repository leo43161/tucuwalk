'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, MapPin, Users, ArrowRight, Shield } from 'lucide-react';
import { Tour } from '@/types';
import { formatPrice } from '@/lib/utils';

interface TourCardProps {
  tour: Tour;
  featured?: boolean;
}

export default function TourCard({ tour, featured = false }: TourCardProps) {
  const categoryIcon: Record<string, string> = {
    ciudad: '🏛️',
    aire: '🪂',
    agua: '🚣',
    tierra: '⛰️',
  };

  const difficultyLabel: Record<string, string> = {
    facil: 'Fácil',
    moderado: 'Moderado',
    dificil: 'Difícil',
  };

  const difficultyColor: Record<string, string> = {
    facil: 'text-emerald-600',
    moderado: 'text-orange-500',
    dificil: 'text-red-500',
  };

  return (
    <Link href={`/tours/${tour.id}`} className="group block">
      <article className="nw-card h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={tour.images[0]}
            alt={tour.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />

          {/* Overlay badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {tour.type === 'free' ? (
              <span className="nw-badge nw-badge-free text-xs px-2.5 py-1">
                🎉 GRATIS
              </span>
            ) : (
              <span className="nw-badge bg-white/90 text-gray-800 text-xs px-2.5 py-1">
                {categoryIcon[tour.category]} {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
              </span>
            )}

            {tour.freeCancellation && (
              <span className="nw-badge nw-badge-emerald text-xs px-2.5 py-1">
                <Shield size={10} /> Cancelación gratis
              </span>
            )}
          </div>

          {/* Price badge */}
          <div className="absolute bottom-3 right-3">
            {tour.type === 'free' ? (
              <div className="bg-emerald-600 text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow-lg">
                Donación libre
              </div>
            ) : (
              <div className="bg-white text-gray-900 text-sm font-bold px-3 py-1.5 rounded-xl shadow-lg">
                {formatPrice(tour.price!)}
                <span className="text-xs text-gray-500 font-normal"> /pers.</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={11} />
            <span>{tour.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
            {tour.title}
          </h3>

          {/* Short description */}
          <p className="text-sm text-gray-500 line-clamp-2 flex-1">
            {tour.shortDescription}
          </p>

          {/* Meta row */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {tour.duration >= 1 ? `${tour.duration}h` : `${tour.duration * 60}min`}
              </span>
              {tour.difficulty && (
                <span className={`font-medium ${difficultyColor[tour.difficulty]}`}>
                  {difficultyLabel[tour.difficulty]}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Users size={12} />
                Máx. {tour.maxParticipants}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star size={13} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-900">{tour.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-400">({tour.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* CTA footer */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-1 text-orange-600 text-sm font-semibold group-hover:gap-2 transition-all">
            <span>Ver detalles</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </article>
    </Link>
  );
}
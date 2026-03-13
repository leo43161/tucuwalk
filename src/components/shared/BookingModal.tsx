'use client';

import { useState } from 'react';
import { X, CheckCircle, MessageCircle, Calendar, Users, Globe, User, Mail, Phone, ArrowRight } from 'lucide-react';
import { Tour, Guide } from '@/types';
import { formatPrice, formatDateShort, buildWhatsAppUrl } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour;
  selectedDate: string | null;
  selectedGuide: Guide | null;
  selectedLanguage: string;
  participants: number;
}

type Step = 'form' | 'success';

export default function BookingModal({
  isOpen,
  onClose,
  tour,
  selectedDate,
  selectedGuide,
  selectedLanguage,
  participants,
}: BookingModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const isFree = tour.type === 'free';
  const totalPrice = isFree ? null : (tour.price ?? 0) * participants;

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Ingresá tu nombre completo';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = 'Email inválido';
    if (!phone.trim() || phone.trim().length < 8) e.phone = 'Teléfono o WhatsApp inválido';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    if (!isFree && selectedGuide) {
      // Build WhatsApp message for paid tours
      const msg = `Hola! Quiero reservar *${tour.title}*\n\n📅 Fecha: ${selectedDate ? formatDateShort(selectedDate) : 'A confirmar'}\n👥 Personas: ${participants}\n🌐 Idioma: ${selectedLanguage}\n\nMis datos:\n👤 ${name}\n📧 ${email}\n📱 ${phone}\n\n¿Confirman disponibilidad?`;
      window.open(buildWhatsAppUrl(selectedGuide.whatsapp, msg), '_blank');
    }

    setStep('success');
  }

  function handleClose() {
    setStep('form');
    setName('');
    setEmail('');
    setPhone('');
    setErrors({});
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal-card">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
            {step === 'success' ? '¡Reserva confirmada!' : 'Completá tu reserva'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {step === 'form' ? (
          <>
            {/* Booking Summary */}
            <div className="px-6 pt-5">
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-5">
                <p className="text-sm font-semibold text-gray-900 mb-3 line-clamp-1">{tour.title}</p>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  {selectedDate && (
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-orange-600 flex-shrink-0" />
                      <span>{formatDateShort(selectedDate)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-orange-600 flex-shrink-0" />
                    <span>{participants} {participants === 1 ? 'persona' : 'personas'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-orange-600 flex-shrink-0" />
                    <span>{selectedLanguage}</span>
                  </div>
                  {selectedGuide && (
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-orange-600 flex-shrink-0" />
                      <span>Guía: {selectedGuide.name.split(' ')[0]}</span>
                    </div>
                  )}
                </div>

                {totalPrice !== null && (
                  <div className="mt-3 pt-3 border-t border-orange-200 flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-medium">Total estimado</span>
                    <span className="text-xl font-bold text-gray-900">{formatPrice(totalPrice)}</span>
                  </div>
                )}
                {isFree && (
                  <div className="mt-3 pt-3 border-t border-orange-200">
                    <p className="text-xs text-gray-500">
                      💚 Este tour es gratuito. Al finalizar, aportás lo que consideres justo al guía.
                    </p>
                  </div>
                )}
              </div>

              {/* Guest Checkout Form */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-sm">Tus datos de contacto</h3>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className={`nw-input pl-9 ${errors.name ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className={`nw-input pl-9 ${errors.email ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    WhatsApp / Teléfono *
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+54 9 387 ..."
                      className={`nw-input pl-9 ${errors.phone ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <p className="text-xs text-gray-400">
                  No necesitás crear una cuenta. Solo necesitamos tus datos para que el guía pueda confirmarte.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-5 space-y-3">
              {!isFree ? (
                <button onClick={handleSubmit} className="nw-btn-primary w-full py-3.5 text-base gap-2">
                  <MessageCircle size={18} />
                  Confirmar vía WhatsApp
                </button>
              ) : (
                <button onClick={handleSubmit} className="nw-btn-primary w-full py-3.5 text-base gap-2">
                  <CheckCircle size={18} />
                  Confirmar reserva gratuita
                </button>
              )}
              <p className="text-center text-xs text-gray-400">
                Cancelación gratuita hasta 24hs antes
              </p>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              ¡Listo, {name.split(' ')[0]}!
            </h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              {isFree
                ? 'Tu lugar está reservado. El guía te contactará por WhatsApp para confirmar el punto de encuentro.'
                : 'El guía recibió tu solicitud y te contactará en las próximas horas para confirmar la excursión.'}
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 text-left mb-6 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><Calendar size={14} className="text-orange-600" /> <span>{selectedDate ? formatDateShort(selectedDate) : 'Fecha por confirmar'}</span></div>
              <div className="flex items-center gap-2"><Users size={14} className="text-orange-600" /> <span>{participants} {participants === 1 ? 'persona' : 'personas'}</span></div>
              {selectedGuide && <div className="flex items-center gap-2"><User size={14} className="text-orange-600" /> <span>Guía: {selectedGuide.name}</span></div>}
            </div>

            <div className="flex flex-col gap-2">
              {selectedGuide && (
                <a
                  href={buildWhatsAppUrl(selectedGuide.whatsapp, `Hola ${selectedGuide.name}! Soy ${name}, reservé el tour ${tour.title}. ¿Podés confirmarme los detalles?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nw-btn-primary w-full py-3 gap-2 text-sm"
                >
                  <MessageCircle size={16} />
                  Escribir al guía por WhatsApp
                </a>
              )}
              <button onClick={handleClose} className="nw-btn-secondary w-full py-3 text-sm">
                Explorar más tours
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
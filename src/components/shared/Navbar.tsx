'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Mountain, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white shadow' : 'bg-transparent border-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
              <Mountain size={18} className="text-white" />
            </div>
            <span
              className={`text-xl font-bold transition-colors ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              NorteWalk
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Free Tours', href: '/#free-tours' },
              { label: 'Turismo Activo', href: '/#turismo-activo' },
              { label: 'Destinos', href: '/#destinos' },
              { label: 'Nosotros', href: '/#nosotros' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-500 transition-colors ${
                  scrolled
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#free-tours"
              className="nw-btn-primary text-sm py-2.5 px-5"
            >
              Reservar ahora
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-1">
            {[
              { label: 'Free Tours', href: '/#free-tours' },
              { label: 'Turismo Activo', href: '/#turismo-activo' },
              { label: 'Destinos', href: '/#destinos' },
              { label: 'Nosotros', href: '/#nosotros' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2">
              <Link
                href="/#free-tours"
                className="nw-btn-primary w-full text-sm py-3"
                onClick={() => setMenuOpen(false)}
              >
                Reservar ahora
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
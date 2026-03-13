import Link from 'next/link';
import { Mountain, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                <Mountain size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                NorteWalk
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              El marketplace de turismo del Norte Argentino. Free Walking Tours y excursiones únicas en el NOA.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Youtube, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explorar */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Explorar</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Free Walking Tours', href: '/#free-tours' },
                { label: 'Turismo Aéreo', href: '/#turismo-activo' },
                { label: 'Turismo Acuático', href: '/#turismo-activo' },
                { label: 'Trekking y Montaña', href: '/#turismo-activo' },
                { label: 'Tours en Salta', href: '/#free-tours' },
                { label: 'Tours en Jujuy', href: '/#free-tours' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-orange-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Para Guías */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Para Guías</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Publicar mi tour', href: '#' },
                { label: 'Cómo funciona', href: '#' },
                { label: 'Beneficios para guías', href: '#' },
                { label: 'Panel de gestión', href: '#' },
                { label: 'Soporte para guías', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-orange-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-orange-500 flex-shrink-0" />
                <span>Salta, NOA, Argentina</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-orange-500 flex-shrink-0" />
                <a href="mailto:hola@nortewalk.com" className="hover:text-orange-400 transition-colors">
                  hola@nortewalk.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-orange-500 flex-shrink-0" />
                <a href="tel:+54387XXXXXXX" className="hover:text-orange-400 transition-colors">
                  +54 387 XXX-XXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} NorteWalk. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Términos y condiciones</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
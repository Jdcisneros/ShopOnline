import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-100 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
        {/* Sección 1: Links rápidos */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navegación</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-pink-600">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-pink-600">
                Colección
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-pink-600">
                Mi cuenta
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-pink-600">
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección 2: Info de contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contacto</h3>
          <p>Email: tienda@example.com</p>
          <p>Teléfono: +54 11 1234 5678</p>
          <p>Horario: Lun a Vie, 9 a 18 hs</p>
        </div>

        {/* Sección 3: Redes sociales o mensaje */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Nosotros</h3>
          <p>Ofrecemos productos de calidad con envío a todo el país.</p>
          {/* Redes sociales si querés */}
          <div className="flex gap-4 mt-4">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaWhatsapp/></a>
          </div>
        </div>
      </div>

      {/* Línea abajo */}
      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} Mi Tienda. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}

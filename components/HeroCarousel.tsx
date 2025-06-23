"use client";

import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image: "/carousel/image1.jpg",
    title: "Nueva colección de invierno",
    description: "Descubrí los productos más abrigados",
    href: "/coleccion/invierno",
  },
  {
    image: "/carousel/image2.avif",
    title: "Ofertas de temporada",
    description: "Aprovechá descuentos por tiempo limitado",
    href: "/ofertas",
  },
  {
    image: "/carousel/image3.jpg",
    title: "Estilo y comodidad",
    description: "Lo mejor para tu día a día",
    href: "/coleccion/diaria",
  },
];

export default function HeroCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      <Slider {...settings}>
        {slides.map(({ image, title, description, href }, idx) => (
          <div key={idx} className="relative h-screen w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-center filter brightness-75"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-20 left-10 max-w-lg text-white select-none">
              <h2 className="text-4xl font-bold drop-shadow-lg">{title}</h2>
              <p className="mt-2 text-lg drop-shadow-md">{description}</p>
              <Link
                href={href}
                className="inline-block mt-4 px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

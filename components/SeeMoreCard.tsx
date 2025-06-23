import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

export function SeeMoreCard({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href}>
      <div className=" border rounded-lg cursor-pointer flex flex-col items-center justify-center p-6 bg-white hover:shadow-lg transition w-full aspect-square hover:bg-gray-50">
        <ArrowRightCircle className="w-12 h-12 mb-4 text-gray-700" />
        <span className="text-lg font-semibold text-gray-800">{text}</span>
        <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
          Descubrí más productos seleccionados para vos.
        </p>
      </div>
    </Link>
  );
}

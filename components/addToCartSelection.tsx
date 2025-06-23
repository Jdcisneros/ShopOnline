import { useState } from "react";
import AddToCartButton from "./buttonCart";

export default function AddToCartSection({
  product,
  selectedVariant,
  disabled = false, // <-- agregamos prop opcional
}: {
  product: any;
  selectedVariant: any;
  disabled?: boolean;
}) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < selectedVariant.stock && !disabled) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1 && !disabled) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Cantidad:</span>

        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={decrease}
            disabled={quantity <= 1 || disabled}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            −
          </button>

          <span className="px-4 py-1 text-base bg-white text-gray-800 border-l border-r border-gray-200">
            {quantity}
          </span>

          <button
            onClick={increase}
            disabled={quantity >= selectedVariant.stock || disabled}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      <AddToCartButton
        product={product}
        quantity={quantity}
        selectedVariant={selectedVariant}
        disabled={disabled || selectedVariant.stock === 0}
      />
    </div>
  );
}

"use client";

import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const finalPrice =
    product.isOnSale && product.salePrice ? product.salePrice : product.price;

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: finalPrice,
        imageUrl: product.imageUrl,
        quantity: 1,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-grow btn-primary flex items-center justify-center gap-3 !py-5 shadow-2xl shadow-lime-600/30 transition-all"
    >
      <ShoppingCart className="w-6 h-6" />
      {added ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  );
}

"use client";

import Image from "next/image";

interface ProductDetailProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  rating: number;
  addToCart: (id: string) => void;
  closeProductDetail: () => void;
  isOpen: boolean;
}

export default function ProductDetail({
  id,
  name,
  price,
  description,
  image,
  category,
  stock,
  rating,
  addToCart,
  closeProductDetail,
  isOpen,
}: ProductDetailProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={closeProductDetail}
          aria-hidden="true"
        ></div>

        {/* Modal */}
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <div className="bg-white p-6">
            {/* Close button */}
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
              onClick={closeProductDetail}
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Product Image */}
              <div className="relative h-64 md:h-80 rounded-md overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22384%22 height%3D%22320%22 viewBox%3D%220 0 384 320%22%3E%3Crect fill%3D%22%23f0f0f0%22 width%3D%22384%22 height%3D%22320%22%2F%3E%3C%2Fsvg%3E";
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col space-y-4">
                <div>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {category}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {name}
                  </h2>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <svg
                        key={star}
                        className={`h-5 w-5 ${
                          star < Math.floor(rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-600">
                    {rating.toFixed(1)} out of 5 stars
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-blue-600">
                    ETB {price.toFixed(2)}
                  </p>
                  <p
                    className={`mt-1 text-sm ${
                      stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock > 0 ? `${stock} in stock` : "Out of stock"}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Description
                  </h3>
                  <p className="mt-2 text-gray-600">{description}</p>
                </div>

                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(id);
                      closeProductDetail();
                    }}
                    disabled={stock <= 0}
                    className={`w-full rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      stock > 0
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

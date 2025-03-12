'use client';

import Image from 'next/image';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  rating: number;
  addToCart: (id: string) => void;
  openProductDetail: (id: string) => void;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  description, 
  image, 
  stock, 
  rating,
  addToCart,
  openProductDetail
}: ProductProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
    >
      <div className="relative h-48 cursor-pointer" onClick={() => openProductDetail(id)}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Fallback image or placeholder if the image fails to load */}
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-400">Product Image</span>
          </div>
        </div>
        <Image 
          src={image} 
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-opacity duration-300"
          onError={(e) => {
            // Handle image load error by making the fallback visible
            e.currentTarget.style.opacity = '0';
          }}
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-blue-600 cursor-pointer" onClick={() => openProductDetail(id)}>
            {name}
          </h3>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="text-xl font-bold text-blue-600 mb-2">ETB {price.toFixed(2)}</p>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className={`text-sm ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </span>
          
          <button
            onClick={() => addToCart(id)}
            disabled={stock <= 0}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              stock > 0 
                ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors duration-200`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 
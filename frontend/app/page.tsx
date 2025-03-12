"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import ShoppingCart from "./components/ShoppingCart";
import ProductDetail from "./components/ProductDetail";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { config } from "./config/config";
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  rating: number;
}

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function Home() {
  // Add products state instead of directly using the imported array
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Define API base URL for reuse
  const API_BASE_URL =config.apiUrl

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);

        setProducts(response.data);
        setFilteredProducts(response.data);

        setLoading(false);
      } catch (err) {
        const apiError = err as ApiError;
        const errorMessage =
          apiError.response?.data?.message ||
          apiError.message ||
          "An unknown error occurred";
        setError(errorMessage);
        setLoading(false);
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<string[]>(
          `${API_BASE_URL}/products/categories`
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        // If categories fetch fails, extract from products as fallback
        const uniqueCategories = [
          ...new Set(products.map((product) => product.category)),
        ] as string[];
        setCategories(uniqueCategories);
      }
    };

    fetchCategories();
  }, [products]);

  // Initialize cart items from local storage after component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items from localStorage:", e);
        localStorage.removeItem("cartItems");
      }
    }
  }, []);

  // Save cart items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleSearch = (query: string, category: string) => {
    const filtered = products.filter((product) => {
      const matchesQuery =
        query === "" ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());

      const matchesCategory = category === "" || product.category === category;

      return matchesQuery && matchesCategory;
    });

    setFilteredProducts(filtered);
  };

  const addToCart = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === productId);

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openProductDetail = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsDetailOpen(true);
    }
  };

  const closeProductDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header
        cartItemsCount={cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        )}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {/* Search and Filter */}
        <SearchBar onSearch={handleSearch} categories={categories} />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500 text-lg">
              Error loading products: {error}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  stock={product.stock}
                  rating={product.rating}
                  addToCart={() => addToCart(product._id)}
                  openProductDetail={() => openProductDetail(product._id)}
                />
              ))
            ) : (
              <div className="col-span-full py-10 text-center">
                <p className="text-gray-500 text-lg">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Shopping Cart Sidebar */}
      <ShoppingCart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          id={selectedProduct._id}
          name={selectedProduct.name}
          price={selectedProduct.price}
          description={selectedProduct.description}
          image={selectedProduct.image}
          category={selectedProduct.category}
          stock={selectedProduct.stock}
          rating={selectedProduct.rating}
          addToCart={() => addToCart(selectedProduct._id)}
          closeProductDetail={closeProductDetail}
          isOpen={isDetailOpen}
        />
      )}
    </div>
  );
}

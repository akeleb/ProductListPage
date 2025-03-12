# Product List Page with Shopping Cart

A responsive product listing application with shopping cart functionality, built with Next.js and React.

## Features

- **Responsive Product Grid**: Displays products with images, names, prices, and descriptions
- **Shopping Cart**: Add, remove, and update quantities of products
- **Product Details**: Click on products to view detailed information
- **Search and Filter**: Search products by name/description and filter by category
- **Accessibility**: Proper ARIA roles and labels for accessibility
- **Responsive Design**: Works well on all screen sizes

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd front-end
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- **Browse Products**: Scroll through the product list on the home page
- **Search**: Use the search bar to find products by name or description
- **Filter by Category**: Select a category from the dropdown menu
- **View Product Details**: Click on a product image or name to see detailed information
- **Add to Cart**: Click the "Add to Cart" button on product cards or detail view
- **Manage Cart**: Click the cart icon in the top right to:
  - View items in your cart
  - Adjust quantities
  - Remove items
  - See the total price
  - Clear the cart
  - Proceed to checkout

## Project Structure

```
front-end/
├── app/
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── SearchBar.tsx
│   │   └── ShoppingCart.tsx
│   ├── data/
│   │   └── product.js
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── images/
│       └── placeholder.jpg
└── ...
```

## Technologies Used

- **Next.js**: React framework for building the application
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling
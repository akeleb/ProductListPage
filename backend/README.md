# Product List API

A RESTful API built with Express.js and MongoDB for managing product data.

## Setup

1. Install dependencies:
```bash
npm run install-deps
```

2. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/productListDB
```

3. Start the development server:
```bash
npm run dev
```

4. Seed the database with initial product data:
```bash
npm run seed
```

## API Endpoints

### System

- `GET /api/health` - Health check endpoint to verify API status

### Products

- `GET /api/products` - Get all products
  - Query parameters:
    - `keyword` - Search products by name (case insensitive)
    - `category` - Filter products by category
- `GET /api/products/categories` - Get all unique categories
- `GET /api/products/:id` - Get a single product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Example Request Body for Creating/Updating a Product

```json
{
  "name": "New Product",
  "price": 19999.00,
  "description": "Product description",
  "image": "/images/product.jpg",
  "category": "Electronics",
  "stock": 25,
  "rating": 4.5
}
``` 
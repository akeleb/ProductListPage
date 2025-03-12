# Product List Application

A full-stack application with a RESTful API and a responsive front-end for displaying product data.

## Backend

Built with Express.js and MongoDB.

### Setup

1. Install dependencies:
   ```bash
   npm run install-deps
   ```

2. Create a `.env` file in the backend directory with:
   ```
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/productListDB
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Seed the database:
   ```bash
   npm run seed
   ```

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/products` - Get all products
- `GET /api/products/categories` - Get all categories
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Frontend

Built with Next.js and React.

### Features

- Responsive product grid
- Shopping cart functionality
- Product details view
- Search and filter products
- Accessibility and responsive design

### Getting Started

1. Clone the repository and navigate to the front-end directory:
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- **Express.js** and **MongoDB** for the backend
- **Next.js**, **React**, **TypeScript**, and **Tailwind CSS** for the frontend 
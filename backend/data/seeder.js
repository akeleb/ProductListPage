import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import products from './products.js';

dotenv.config();

// Connect to MongoDB
connectDB();

// Import data function
const importData = async () => {
  try {
    // Clear existing data if needed
    await Product.deleteMany();

    // Insert products
    await Product.insertMany(products);

    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data function
const destroyData = async () => {
  try {
    // Clear all collections
    await Product.deleteMany();

    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Determine which function to run based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 
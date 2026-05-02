const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/product.model');

dotenv.config({ path: './.env' });

const seedProducts = [
  {
    name: "AeroVance Obsidian v1",
    barcode: "AERO-001",
    brand: "AeroVance",
    category: "Footwear",
    description: "Authenticated through 256-bit unique fiber mapping. Guaranteed original release series.",
    isAuthentic: true,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ9rH2zNrH7w35mZn6tdInzZm1TYRZm18hVw4hJz7-hIwN6VXK4Qg9UB2gBeHmMVOKHHVQI2u4giQ14yrksWbhO-W-b2lQgOpwSAol2TREgPYNa7p-o4RfbxO2Df2PK4LrAiIhMOIFR_Ab3gdFro_fWassKnUnZhzl2a3YNte2ESdyYH9qzwpQerP-g6lkkaZ06jnkADbJEfB2kHRhwOPoFqKEcT0p6aj_1CzyCKUFqOaN73ABoCxOEjPnIEFifimAYAQFSQnzVW8",
    stores: [
      { name: "Avenue Luxe", location: "Tokyo", inStock: true, price: 240 },
      { name: "Sole Central", location: "New York", inStock: false, price: 255 }
    ]
  },
  {
    name: "NeuralWatch Nexus",
    barcode: "WATCH-772",
    brand: "Nexus Tech",
    category: "Electronics",
    description: "Validated manufacturer ledger from assembly to final distribution node.",
    isAuthentic: true,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJNmHc0O3wp6OO2rsgOyTK4KveG49VRUX6TK4aaYFT-K-iFoGDACSfgR4w4-tad-SkrxuK7zgIAxgXKOpsmhzrmFoycwSNGg-Z03d2qIWrULW6qGBMqWJRhRwgpZYLPGmgqsj7Sqf96UfWaic8oHz69Xa_dwSIg4SmANuoZB_H08Zv_V05ySidlSenF-2TNHPVn1n9Z-cZdeHFU0TB3kmyFRrxJda5_yOC1n8BfkVJvk1ThVr_QxdWlAwkGayWhI74J2hoFSwKcRg",
    stores: [
      { name: "Neon Atelier", location: "London", inStock: true, price: 850 }
    ]
  },
  {
    name: "LumiCell Regenerative Serum",
    barcode: "SKIN-992",
    brand: "LumiCell",
    category: "Skincare",
    description: "Molecular batch verification active. Lab-certified organic compounds.",
    isAuthentic: true,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI",
    stores: [
      { name: "Vanguard Lab", location: "Paris", inStock: true, price: 85 }
    ]
  },
  {
    name: "FakeWatch Pro",
    barcode: "FAKE-001",
    brand: "Unknown",
    category: "Electronics",
    description: "Low quality imitation. Mismatched serial numbers detected.",
    isAuthentic: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXAK9iMzKrz0Sct6WvCZWGBdBUKCrHivjAQtZCNsznbcU4fNen6pDWDAV9nGieyYvMSAUQcLZK81T0EWyCNuE1fkRLrD1g_ErGj2NatBiUPIlskmvSO6aw-o6Geist16kSRJHKobBtyRDBMYjBuKoLNh3fj0kPqf_Tu-BH_S2INa49dA8oH3Bg-HR6vfqPfpqxB04S8YUupcgs1DYgkygAw3BerbZNR3AZiLPY6ckCMzhGke5r6HZBlPxNLaCq-Qjug7C83j7fEzs",
    stores: []
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    
    await Product.deleteMany();
    console.log('Cleared existing products.');
    
    await Product.insertMany(seedProducts);
    console.log('Seed products inserted successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();

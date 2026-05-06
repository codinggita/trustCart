import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const ALL_PRODUCTS = [
  {
    id: 1,
    category: "Footwear",
    title: "AeroVance Obsidian v1",
    desc: "Authenticated through 256-bit unique fiber mapping. Guaranteed original release series.",
    score: "99.8%",
    price: 240,
    badge: "L3 Certified",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ9rH2zNrH7w35mZn6tdInzZm1TYRZm18hVw4hJz7-hIwN6VXK4Qg9UB2gBeHmMVOKHHVQI2u4giQ14yrksWbhO-W-b2lQgOpwSAol2TREgPYNa7p-o4RfbxO2Df2PK4LrAiIhMOIFR_Ab3gdFro_fWassKnUnZhzl2a3YNte2ESdyYH9qzwpQerP-g6lkkaZ06jnkADbJEfB2kHRhwOPoFqKEcT0p6aj_1CzyCKUFqOaN73ABoCxOEjPnIEFifimAYAQFSQnzVW8"
  },
  {
    id: 2,
    category: "Electronics",
    title: "NeuralWatch Nexus",
    desc: "Validated manufacturer ledger from assembly to final distribution node.",
    score: "98.4%",
    price: 850,
    badge: "L2 Verified",
    badgeColor: "secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJNmHc0O3wp6OO2rsgOyTK4KveG49VRUX6TK4aaYFT-K-iFoGDACSfgR4w4-tad-SkrxuK7zgIAxgXKOpsmhzrmFoycwSNGg-Z03d2qIWrULW6qGBMqWJRhRwgpZYLPGmgqsj7Sqf96UfWaic8oHz69Xa_dwSIg4SmANuoZB_H08Zv_V05ySidlSenF-2TNHPVn1n9Z-cZdeHFU0TB3kmyFRrxJda5_yOC1n8BfkVJvk1ThVr_QxdWlAwkGayWhI74J2hoFSwKcRg"
  },
  {
    id: 3,
    category: "Cosmetics",
    title: "Aether Essence Rare",
    desc: "Spectral analysis verified against master compound profile. Batch #8210.",
    score: "100%",
    price: 45,
    badge: "L3 Certified",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVhX_sHEV4TvG9TOLRSYo8wFY68vZbqx91sy_m-AcbreiQgC9OQpCmOeOqG7hPcy043K0EGJGfHh8_vIZneZDrKXdfXct23O8LQmdx8m1VxeIBbySntEjqNvLox1sJskTZrjjIyh_Jk3xxmD4AaxFer2QoPBj5P_LA42LjjNrpXlkOx_Xwd_EoVOJi_f6Wal1V76U7n1gASNt3pRjFX5kOwCooc2XzTQxlUPPNTawyD5ny7ROL8Z2y8Yz4-kql2D1SXFTSEkKX5qU"
  },
  {
    id: 4,
    category: "Electronics",
    title: "SonicForge Pro Monitor",
    desc: "Ownership history confirmed via distributed ledger. Serial #SFP-992.",
    score: "94.2%",
    price: 620,
    badge: "L1 Verified",
    badgeColor: "error",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXAK9iMzKrz0Sct6WvCZWGBdBUKCrHivjAQtZCNsznbcU4fNen6pDWDAV9nGieyYvMSAUQcLZK81T0EWyCNuE1fkRLrD1g_ErGj2NatBiUPIlskmvSO6aw-o6Geist16kSRJHKobBtyRDBMYjBuKoLNh3fj0kPqf_Tu-BH_S2INa49dA8oH3Bg-HR6vfqPfpqxB04S8YUupcgs1DYgkygAw3BerbZNR3AZiLPY6ckCMzhGke5r6HZBlPxNLaCq-Qjug7C83j7fEzs"
  },
  {
    id: 5,
    category: "Skincare",
    title: "LumiCell Regenerative Serum",
    desc: "Molecular batch verification active. Lab-certified organic compounds.",
    score: "99.9%",
    price: 85,
    badge: "L3 Certified",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI"
  },
  {
    id: 6,
    category: "Footwear",
    title: "RetroVision Classic S",
    desc: "Physical component inspection and serial sequence matching confirmed.",
    score: "97.1%",
    price: 180,
    badge: "L2 Verified",
    badgeColor: "secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJiuOOWz-zk54fQDED04YUnXVHfxvvREu28NRq3T4prVq3z9r7BVfphTKIFnzkoZM43FPNbyzlheUgxGIMXrNtqcqNMXfldf9WSDvmLLaSPUr5qDNcmJ91Pf6xgHagdkECpKR59Aj9HKzwzRXXL-ShEh1-Qhv-CwYYYuOoPxTeUxle-1UXG7hpq3s8jTi_lLBoYQHdkUOC9_oKyX_kDgnBeBl0417x0QuppySjeht03HnSBfaMErLQ7NWmiIvSs6SOfcERUE0k7NQ"
  },
  {
    id: 7,
    category: "Skincare",
    title: "HydraCore Aqua Cream",
    desc: "Ocean-sourced minerals with verified ethical harvesting certificate.",
    score: "96.5%",
    price: 55,
    badge: "L2 Verified",
    badgeColor: "secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI"
  },
  {
    id: 8,
    category: "Medicine",
    title: "NeuroGenix Advanced",
    desc: "Molecularly verified neuro-recovery compound. Batch #NG-882.",
    score: "99.9%",
    price: 120,
    badge: "L3 Certified",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI"
  },
  {
    id: 9,
    category: "Packed Food",
    title: "OmniFuel Bio-Bar",
    desc: "Sustainably sourced, toxin-free nutritional matrix. Authenticity guaranteed.",
    score: "98.2%",
    price: 12,
    badge: "L2 Verified",
    badgeColor: "secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI"
  },
  {
    id: 10,
    category: "Medicine",
    title: "OptiVision Serum",
    desc: "Retinal repair therapy with authenticated sequence tag. Batch #OV-112.",
    score: "97.5%",
    price: 95,
    badge: "L2 Verified",
    badgeColor: "secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI"
  },
  {
    id: 11,
    category: "Packed Food",
    title: "HydroGel Nutrition Pack",
    desc: "Instant hydration and electrolyte matrix. Pre-release audit passed.",
    score: "98.9%",
    price: 8,
    badge: "L3 Certified",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI"
  },
  { id: 12, category: "Skincare", title: "QuantumSoothe Night Balm", desc: "Nano-encapsulated repair formula with verified batch integrity.", score: "99.1%", price: 75, badge: "L3 Certified", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 13, category: "Cosmetics", title: "VelvetDerm Foundation", desc: "Mineral-based silk finish. Verified against master pigment ledger.", score: "98.7%", price: 38, badge: "L2 Verified", badgeColor: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 14, category: "Footwear", title: "StratoStride Aero", desc: "Ultralight aerodynamic structure with unique serial DNA tag.", score: "99.5%", price: 210, badge: "L3 Certified", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 15, category: "Electronics", title: "IonCharge Ultra", desc: "High-capacity power cell with manufacturer chain authentication.", score: "96.8%", price: 45, badge: "L2 Verified", badgeColor: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 16, category: "Medicine", title: "CardioShield Capsules", desc: "Sustained-release cardiac support. Verified clinical batch #CS-101.", score: "99.4%", price: 150, badge: "L3 Certified", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 17, category: "Packed Food", title: "TerraGrain Clusters", desc: "Toxin-free, non-GMO cereal matrix with origin certificate.", score: "97.9%", price: 15, badge: "L2 Verified", badgeColor: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 18, category: "Skincare", title: "GloRadiance Complex", desc: "Phased Vitamin C delivery system. Authenticated lab sequence.", score: "98.2%", price: 65, badge: "L2 Verified", badgeColor: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcb) mrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 19, category: "Cosmetics", title: "PrismMatte Kit", desc: "Long-wear pigment array. Micro-batch verification enabled.", score: "97.3%", price: 42, badge: "L2 Verified", badgeColor: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 20, category: "Footwear", title: "VelocityRunner Apex", desc: "Engineered kinetic energy return with trace-ready chip.", score: "99.8%", price: 290, badge: "L3 Certified", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 21, category: "Electronics", title: "SynchroLogic Hub", desc: "Centralized device node with encrypted manufacturer key.", score: "95.9%", price: 130, badge: "L1 Verified", badgeColor: "error", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 22, category: "Medicine", title: "HepaPure Detox", desc: "Botanical-clinical hybrid for metabolic support. Verified origin.", score: "98.5%", price: 88, badge: "L2 Verified", badgeColor: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 23, category: "Packed Food", title: "VitaMix Squeeze", desc: "Cold-pressed nutrient matrix. Supply chain traced batch.", score: "99.2%", price: 10, badge: "L3 Certified", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 24, category: "Skincare", title: "DermaSeal Repair", desc: "Barrier support with molecular integrity seal. Lab-audited.", score: "99.7%", price: 92, badge: "L3 Certified", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 25, category: "Cosmetics", title: "StellarLash Mascara", desc: "Holographic fiber distribution. Batch-linked authenticity.", score: "96.4%", price: 28, badge: "L2 Verified", badgeColor: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 26, category: "Footwear", title: "AlpineTrek Rugged", desc: "Sustainable composite build with ruggedized serial tracking.", score: "98.1%", price: 220, badge: "L2 Verified", badgeColor: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 27, category: "Electronics", title: "FluxRouter Node", desc: "Next-gen mesh router with hardware-level security key.", score: "99.3%", price: 180, badge: "L3 Certified", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 28, category: "Medicine", title: "ArthriRelief Gel", desc: "Topical recovery serum with authenticated molecular trace.", score: "97.8%", price: 45, badge: "L2 Verified", badgeColor: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 29, category: "Packed Food", title: "MacroBite Slab", desc: "Ultra-high protein matrix. 100% verified non-synthetic.", score: "96.2%", price: 18, badge: "L2 Verified", badgeColor: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 30, category: "Skincare", title: "SolarShield SPF", desc: "Broad-spectrum protection. Batch integrity verified via GPS log.", score: "100%", price: 35, badge: "L3 Certified", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 31, category: "Cosmetics", title: "OpulentGlow Palette", desc: "Curated pigment set. Authenticated manufacturer seal.", score: "98.9%", price: 68, badge: "L3 Certified", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" },
  { id: 32, category: "Footwear", title: "UrbanGlide Sneakers", desc: "Daily commute optimization with serial verify tech.", score: "97.4%", price: 155, badge: "L2 Verified", badgeColor: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI" }
];

const SearchResults = () => {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Authenticity Score');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [verifyingKey, setVerifyingKey] = useState(null);
  const [apiProducts, setApiProducts] = useState([]);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/api/products', {
          params: { category: searchParams.get('category'), search: searchParams.get('query') }
        });
        if (data.success && data.products.length > 0) {
          // Map API products to frontend format
          const mapped = data.products.map(p => ({
            id: p._id,
            category: p.category,
            title: p.name,
            desc: p.description,
            score: p.trustScore || "99.9%",
            price: p.price || 0,
            badge: p.isAuthentic ? "L3 Certified" : "Flagged",
            badgeColor: p.isAuthentic ? "primary" : "error",
            image: p.imageUrl
          }));
          setApiProducts(mapped);
        } else {
          setApiProducts([]);
        }
      } catch (err) {
        console.error('Failed to fetch from API, using mock data');
        setApiProducts([]);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const activeCategory = searchParams.get('category');
  const searchQuery = searchParams.get('query');

  const filteredProducts = useMemo(() => {
    // If API returned results, use them. Otherwise fallback to mock data for demonstration.
    let result = apiProducts.length > 0 ? [...apiProducts] : [...ALL_PRODUCTS];

    // Re-filter mock data if using it
    if (apiProducts.length === 0) {
      result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.desc.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    // Functional Sorting logic
    result.sort((a, b) => {
      if (sortBy === 'Authenticity Score') {
        const scoreA = parseFloat(a.score.replace('%', ''));
        const scoreB = parseFloat(b.score.replace('%', ''));
        return scoreB - scoreA;
      }
      if (sortBy === 'Recent Listing') {
        return b.id - a.id;
      }
      if (sortBy === 'Value High-Low') {
        return b.price - a.price;
      }
      return 0;
    });

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleCategoryToggle = (category) => {
    if (activeCategory === category) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-8 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 text-left">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-10">
              <FilterGroup title="Filter by Category">
                {['Skincare', 'Cosmetics', 'Footwear', 'Electronics', 'Medicine', 'Packed Food'].map(cat => (
                  <Checkbox
                    key={cat}
                    label={cat}
                    checked={activeCategory === cat}
                    onChange={() => handleCategoryToggle(cat)}
                  />
                ))}
              </FilterGroup>

              <FilterGroup title="Verification Level">
                <Radio label="L1: Identity Verified" name="level" />
                <Radio label="L2: Supply Chain Trace" name="level" checked />
                <Radio label="L3: Lab Certified" name="level" />
              </FilterGroup>

              <div className="pt-6 border-t border-outline-variant/20">
                <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">Price Flux</h3>
                <div className="h-1 bg-surface-container-high rounded-full overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 right-1/4 bg-primary-container/40"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-label text-slate-500">
                  <span>$100</span>
                  <span>$10k+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <section className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <p className="font-label text-xs text-primary tracking-widest uppercase mb-1">Authenticated Results</p>
                <h1 className="text-4xl font-headline font-bold text-on-surface leading-tight">
                  {filteredProducts.length} {activeCategory ? activeCategory : 'Verified'} Items Found
                </h1>
              </div>
              <div className="flex items-center gap-4 relative">
                <span className="text-xs text-slate-500 font-label">SORT BY:</span>
                <div className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 text-sm text-primary font-medium focus:outline-none bg-surface-container-high px-4 py-2 rounded-lg border border-outline-variant/20 hover:bg-surface-variant transition-colors"
                  >
                    {sortBy}
                    <span className={`material-symbols-outlined text-sm transition-transform ${isSortOpen ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>

                  {isSortOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
                      {['Authenticity Score', 'Recent Listing', 'Value High-Low'].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-primary/10 ${sortBy === option ? 'text-primary bg-primary/5 font-bold' : 'text-on-surface-variant'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBuy={() => addToCart(product)}
                  onViewBrand={() => setSelectedBrand(product)}
                  onVerifyKey={() => setVerifyingKey(product)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center glass-panel rounded-xl">
                <p className="text-on-surface-variant font-headline text-lg">No verified items found in this neural sector.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-8">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'text-slate-500 hover:text-primary hover:border-primary'}`}
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="flex gap-4 font-body">
                  {[...Array(totalPages)].map((_, i) => (
                    <span 
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs cursor-pointer transition-all ${currentPage === i + 1 ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high text-on-surface'}`}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'text-slate-500 hover:text-primary hover:border-primary'}`}
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      {/* Brand Profile Modal */}
      {selectedBrand && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[200] flex items-center justify-center p-8">
          <div className="max-w-md w-full glass-panel p-8 rounded-3xl border-primary/20 space-y-6 animate-in zoom-in duration-300 text-left">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-headline font-bold text-on-surface">Brand Dossier</h3>
                <p className="text-primary font-label text-xs tracking-widest uppercase">{selectedBrand.category} Sector</p>
              </div>
              <button onClick={() => setSelectedBrand(null)} className="material-symbols-outlined text-slate-500 hover:text-on-surface">close</button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <p className="text-[10px] font-label text-slate-500 uppercase mb-1">Authenticated Entity</p>
                <p className="font-bold text-lg">{selectedBrand.title.split(' ')[0]} Corp International</p>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Global rating: <span className="text-primary font-bold">AAA+</span>. 
                This brand has maintained a 99.9% verification success rate over the last 15,000 ledger cycles. 
                All distribution nodes are currently active and audited.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                   <p className="text-[9px] text-slate-500 font-bold uppercase">Stores</p>
                   <p className="text-lg font-headline font-bold">242</p>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                   <p className="text-[9px] text-slate-500 font-bold uppercase">Audits</p>
                   <p className="text-lg font-headline font-bold">12k+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manufacturer Key Modal */}
      {verifyingKey && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-2xl z-[200] flex items-center justify-center p-8">
          <div className="max-w-lg w-full glass-panel p-10 rounded-[2rem] border-primary/30 space-y-8 animate-in slide-in-from-bottom-8 duration-500 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
               <span className="material-symbols-outlined text-4xl text-primary animate-pulse">fingerprint</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-black tracking-tight">VERIFY KEY</h3>
              <p className="text-slate-400 text-sm font-body">Cryptographic hardware-level authentication protocol</p>
            </div>
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-outline-variant/30 font-mono text-left space-y-3">
              <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest">
                <span>Hardware ID</span>
                <span className="text-primary">HW-8829-001</span>
              </div>
              <p className="text-primary break-all leading-tight">0x882A...F920-BC22-X901-TRST</p>
              <div className="pt-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                <span className="text-[10px] text-primary uppercase font-bold tracking-tighter">On-Chain validation active</span>
              </div>
            </div>
            <div className="pt-4 flex flex-col gap-3">
              <button onClick={() => setVerifyingKey(null)} className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold uppercase tracking-widest text-xs shadow-[0_10px_20px_rgba(0,229,255,0.2)]">Confirm Integrity</button>
              <button onClick={() => setVerifyingKey(null)} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest py-2">Decline Protocol</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-components
const FilterGroup = ({ title, children }) => (
  <div className="text-left">
    <h3 className="font-label text-xs uppercase tracking-widest text-primary-container mb-6">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group" onClick={onChange}>
    <div className={`w-5 h-5 rounded bg-surface-container-high border ${checked ? 'border-primary' : 'border-outline-variant'} group-hover:border-primary transition-colors flex items-center justify-center`}>
      {checked && <span className="material-symbols-outlined text-[12px] text-primary">check</span>}
    </div>
    <span className={`text-sm ${checked ? 'text-primary' : 'text-on-surface-variant'} group-hover:text-primary transition-colors`}>{label}</span>
  </label>
);

const Radio = ({ label, name, checked }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input className="hidden peer" name={name} type="radio" defaultChecked={checked} />
    <div className="w-5 h-5 rounded-full border-2 border-outline-variant peer-checked:border-primary flex items-center justify-center transition-all">
      <div className="w-2 h-2 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
    </div>
    <span className="text-sm text-on-surface-variant peer-checked:text-primary transition-colors">{label}</span>
  </label>
);

const ProductCard = ({ product, onBuy, onViewBrand, onVerifyKey }) => {
  const { category, title, desc, score, price, badge, badgeColor, image } = product;
  const badgeClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary-container/10 text-secondary-container border-secondary-container/20",
    error: "bg-error-container/20 text-error border-error/30"
  };

  return (
    <div className="group glass-panel rounded-xl p-4 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.06)] hover:-translate-y-1 overflow-hidden relative text-left">
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md uppercase tracking-wider ${badgeClasses[badgeColor || 'primary']}`}>
          {badge}
        </span>
      </div>
      <div className="w-full aspect-square bg-surface-container-highest rounded-lg mb-6 overflow-hidden flex items-center justify-center group">
        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={image} alt={title} />
      </div>
      <div className="px-2">
        <p className="text-[10px] font-label text-primary-container tracking-widest uppercase mb-2">{category}</p>
        <h2 className="font-headline text-lg font-semibold text-on-surface mb-1 group-hover:text-primary transition-colors line-clamp-1">{title}</h2>
        <p className="text-sm text-on-surface-variant mb-3 line-clamp-2">{desc}</p>
        
        {/* Brand Utility Links from image */}
        <div className="flex gap-4 mb-4">
          <button 
            onClick={onViewBrand}
            className="text-[9px] font-bold text-primary tracking-[0.1em] uppercase hover:text-on-surface transition-colors cursor-pointer"
          >
            VIEW BRAND PROFILE
          </button>
          <button 
            onClick={onVerifyKey}
            className="text-[9px] font-bold text-primary tracking-[0.1em] uppercase hover:text-on-surface transition-colors cursor-pointer"
          >
            VERIFY MANUFACTURER KEY
          </button>
        </div>

        <div className="mb-4">
          <span className="text-xl font-headline font-bold text-on-surface">${price.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
          <div>
            <p className="text-[10px] font-label text-slate-500 uppercase">Trust Score</p>
            <p className="text-lg font-headline font-bold text-primary">{score}</p>
          </div>
          <button 
            onClick={onBuy}
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-4 py-2 rounded-lg text-xs font-bold active:scale-95 transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          >
            VERIFY & BUY
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

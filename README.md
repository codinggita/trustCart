# 🚀 TrustCart: The Digital Authenticity Ledger

[![Live Demo](https://img.shields.io/badge/Live-Deployment-00E5FF?style=for-the-badge&logo=vercel&logoColor=black)](https://trust-cart-store.vercel.app/)
[![Figma Design](https://img.shields.io/badge/Figma-Design-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/OeTK6QvvpyBEv8V4GX30Kp/TrustCart?node-id=0-1&t=OaXIQEskQWPLRmXj-0)
[![Postman Docs](https://img.shields.io/badge/Postman-API_Docs-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/50839415/2sBXqKofEU)
[![Backend API](https://img.shields.io/badge/Backend-API_Endpoint-green?style=for-the-badge&logo=node.js&logoColor=white)](https://trustcart-6z1u.onrender.com/)
[![YouTube Channel](https://img.shields.io/badge/YouTube-CodeVerse_Aditya-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@CodeVerseAditya)

---

![TrustCart Banner](./docs/images/banner.png)

## 📌 Problem Statement

In today's global market, consumers face a "Double-Blind" shopping crisis:
- **❌ Stock Uncertainty**: Shoppers frequently visit physical stores only to find products are out of stock, leading to wasted time and fuel.
- **⚠️ Authenticity Risk**: The rise of premium counterfeits makes it impossible for the average consumer to verify if a product is genuine or safely within its expiry date.
- **📉 Information Asymmetry**: Critical batch information and supply chain origins are often hidden from the end user.

---

## 💡 Solution: TrustCart

TrustCart is a high-tech "Integrity Economy" platform that bridges the gap between physical products and digital truth. By combining real-time inventory tracking with cryptographic verification, we provide:
- **🔍 Universal Search**: Instantly find verified products in nearby authorized retailers.
- **✅ Verification Protocol**: A one-tap "L3 Certification" audit for every item, ensuring zero-counterfeit risk.
- **📦 Radical Transparency**: Full access to manufacturing dates, batch numbers, and supply chain nodes.

---

## 🎯 Features

### 🏠 Intelligent Discovery
- **Smart Category Hub**: Filter through Skincare, Electronics, Footwear, and more.
- **Futuristic UI**: A premium Aqua + Black "Neon" theme designed for high visibility and professional appeal.

### 🔍 Search & Proximity
- **Real-time Inventory**: See "In Stock" vs "Low Stock" status across multiple local stores.
- **Distance Filtering**: Sort results based on your current geolocation.
- **Trust Scoring**: Products are ranked by their verification level (L1 to L3).

### 🔬 Product Audit
- **Cryptographic Signatures**: Verify the unique digital DNA of any product.
- **Batch History**: view MFG and Expiry dates directly from the manufacturer's ledger.
- **Manufacturer Dossiers**: High-level insights into brand credibility and audit history.

### 🔐 Enterprise-Grade Security
- **Multi-Auth Support**: Login via Google OAuth, standard credentials, or Organization SSO.
- **Protected Routes**: Secure user dashboards for managing saved products and verification history.

---

## 📸 Screenshots

### Product Verification Interface
![Verification UI](./docs/images/verification_ui.png)

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS (Custom Design System)
- **UI Components**: Material UI (MUI)
- **State Management**: Redux Toolkit & Context API
- **Animations**: Framer Motion
- **Form Handling**: Formik + Yup

### Backend
- **Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) & Google OAuth
- **Security**: Bcrypt.js for password hashing

---

## 📁 Proper Folder Structure

```text
trustCart/
├── backend/
│   ├── src/
│   │   ├── config/        # Database and service configurations
│   │   ├── controllers/   # Business logic for API endpoints
│   │   ├── middleware/    # Auth guards and error handlers
│   │   ├── models/        # Mongoose schemas (User, Product)
│   │   ├── routes/        # Router definitions
│   │   ├── utils/         # Helper functions and seed data
│   │   └── server.js      # Server entry point
│   ├── .env               # Environment variables
│   └── package.json       # Backend dependencies
└── frontend/
    ├── src/
    │   ├── assets/        # Global styles and static media
    │   ├── components/    # Reusable UI components (Navbar, Footer, Cards)
    │   ├── context/       # React Context providers (Cart, Auth)
    │   ├── pages/         # Page-level components
    │   ├── routes/        # App routing and Protected Routes
    │   ├── App.jsx        # Root component
    │   └── main.jsx       # Client bootstrapping
    ├── tailwind.config.js # Custom design tokens
    └── vite.config.js     # Build configuration
```

---

## 👨‍💻 Project Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/trustCart.git
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 👨‍💻 Author

**Aditya Kumar**
*Bridging the gap between code and trust.*

[![YouTube](https://img.shields.io/badge/YouTube-@CodeVerseAditya-FF0000?style=flat-square&logo=youtube)](https://www.youtube.com/@CodeVerseAditya)

---
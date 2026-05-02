import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import SearchResults from '../pages/SearchResults';
import StoreAvailability from '../pages/StoreAvailability';
import ProductVerification from '../pages/ProductVerification';
import UserDashboard from '../pages/UserDashboard';
import CheckoutPage from '../pages/CheckoutPage';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      {/* Default: redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/search" element={<SearchResults />} />

      {/* Semi-Protected / Feature Routes */}
      <Route path="/stores" element={<StoreAvailability />} />
      <Route path="/verify/:barcode?" element={<ProductVerification />} />
      <Route path="/checkout" element={<CheckoutPage />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;

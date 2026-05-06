import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await api.post('/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <section className="relative hidden md:flex w-1/2 flex-col justify-center p-16 overflow-hidden bg-surface-container-lowest">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-secondary/5 rounded-full blur-[80px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
            <div className="grid grid-cols-12 h-full w-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-r border-outline-variant/10 h-full"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-12">
            <span className="material-symbols-outlined text-4xl text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <h1 className="font-headline text-3xl font-bold tracking-tighter text-primary-container">TrustCart</h1>
          </div>
          <h2 className="font-headline text-5xl font-bold text-white leading-tight mb-8">
            Join the secure <br />
            <span className="text-primary-container">network.</span> <br />
          </h2>
          <p className="text-on-surface-variant text-lg max-w-md leading-relaxed mb-12">
            Create an account to verify authenticity and enjoy protected shopping with bioluminescent precision.
          </p>
        </div>
      </section>

      <section className="flex-1 flex items-center justify-center p-6 md:p-12 bg-surface-dim relative overflow-hidden">
        <div className="w-full max-w-md bg-surface-container-high rounded-xl p-8 md:p-10 aqua-glow border border-primary/5 relative z-10">
          <div className="mb-10">
            <h3 className="font-headline text-3xl font-bold text-white mb-2">Create Account</h3>
            <p className="text-on-surface-variant text-sm">Register to access the secure terminal.</p>
          </div>
          {error && <div className="mb-4 p-3 bg-error-container text-error rounded-lg text-sm">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="group">
              <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="name">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary-container transition-colors">person</span>
                <input 
                  className="w-full bg-surface-container-low border-none rounded-lg py-3.5 pl-12 pr-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-primary-container/50 focus:bg-surface-container transition-all outline-none" 
                  id="name" 
                  placeholder="John Doe" 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="group">
              <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary-container transition-colors">alternate_email</span>
                <input 
                  className="w-full bg-surface-container-low border-none rounded-lg py-3.5 pl-12 pr-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-primary-container/50 focus:bg-surface-container transition-all outline-none" 
                  id="email" 
                  placeholder="name@enterprise.com" 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="password">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary-container transition-colors">lock</span>
                <input 
                  className="w-full bg-surface-container-low border-none rounded-lg py-3.5 pl-12 pr-12 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-primary-container/50 focus:bg-surface-container transition-all outline-none" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>

            <button 
              className="w-full primary-gradient text-on-primary-fixed font-bold py-4 rounded-lg active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] disabled:opacity-70 disabled:cursor-not-allowed" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Initialize Access'}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-on-surface-variant">
            Already have an account? <Link to="/login" className="text-primary-container font-semibold hover:underline decoration-primary-container/30 underline-offset-4">Sign in to Terminal</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;

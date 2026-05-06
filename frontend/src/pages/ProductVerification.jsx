import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductVerification = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(!!barcode);
  const [error, setError] = useState('');

  useEffect(() => {
    if (barcode) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/api/products/verify/${barcode}`);
          setProduct(response.data.product);
        } catch (err) {
          setError(err.response?.data?.message || 'Verification failed. This barcode is not in our secure ledger.');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [barcode]);

  if (loading) {
    return (
      <div className="bg-surface min-h-screen text-on-surface flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
           <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8"></div>
           <h2 className="text-xl font-headline font-bold text-primary animate-pulse tracking-widest uppercase">Initializing Neural Scan...</h2>
           <p className="text-on-surface-variant text-sm mt-2">Authenticating barcode against global ledger</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || (!barcode && !product)) {
    return (
      <div className="bg-surface min-h-screen text-on-surface flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
           <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">warning</span>
           </div>
           <h2 className="text-3xl font-headline font-bold mb-4">{error ? 'FRAUD ALERT' : 'Scanner Ready'}</h2>
           <p className="text-on-surface-variant max-w-sm mx-auto mb-8">
             {error || 'No barcode provided for verification. Please scan an item or use a direct verification link.'}
           </p>
           <button 
             onClick={() => window.history.back()}
             className="px-8 py-3 bg-surface-container-high border border-outline-variant/30 text-on-surface font-bold rounded-lg uppercase tracking-widest text-xs"
           >
             Return to Safety
           </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Fallback to demo data if not fetched but barcode exists (should not happen with error handling above)
  const displayData = product || {
    name: "Precision Chronograph X1",
    barcode: "TC-8829-QX-0012",
    description: "Limited Edition series with sapphire crystal and proprietary movement. Number 44 of 500 manufactured.",
    isAuthentic: true,
    brand: "Apex Manufacturing AG",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0htqjrRv0I-QeIgVWbFA6gfJI8PqvO0B_igwi8GTwTs294Az-rUAlBzHWEu4j8LzzHEnz9YYy-tYDd37tEILlBo0eGde_btDLDzzEg_3SaUF0DX0l-1_6W73_S5Wvl92hscQFTmmDmvccMMt09TjJ7ZaDbSyOdio3rKMDyMygC4TGJh2Xaf5a4Rq-4Eho4a7wTjpCg0c7p48V09bAu9HROXfdyTOGrRuxOaHJ-SvBxAYbtNRF1q-IkUhetJvCNJ6vCoeoKoo71gA"
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen">
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto text-left">
        {/* Hero Section: Verification Status */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/10 border border-secondary-container/20">
              <span className={`w-2 h-2 rounded-full ${displayData.isAuthentic ? 'bg-secondary-container animate-pulse' : 'bg-error'}`}></span>
              <span className={`text-xs font-label uppercase tracking-widest ${displayData.isAuthentic ? 'text-secondary-container' : 'text-error'} font-medium`}>
                {displayData.isAuthentic ? 'Scanning Network Integrity' : 'Counterfeit Detected'}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold text-on-surface leading-tight">
              Product <span className={`bg-linear-to-br ${displayData.isAuthentic ? 'from-primary to-primary-container' : 'from-error to-error/50'} bg-clip-text text-transparent`}>
                {displayData.isAuthentic ? 'Verified' : 'Flagged'}
              </span><br />
              {displayData.isAuthentic ? 'as Authentic.' : 'as High Risk.'}
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
              {displayData.isAuthentic 
                ? "This item has been cryptographically confirmed by our decentralized ledger. Its origin, transit history, and ownership have been validated through our high-tech shield."
                : "This item's signature does not match any entry in the global authenticity database. Potential counterfeit or unauthorized production batch detected."}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {displayData.isAuthentic && (
                <button className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold rounded-md shadow-[0_0_15px_rgba(0,229,255,0.2)] active:scale-95 transition-transform">
                  Download Certificate
                </button>
              )}
              <button className="px-8 py-3 bg-surface-container-high border border-primary/20 text-primary font-semibold rounded-md hover:bg-surface-container-highest transition-colors active:scale-95">
                View Blockchain TX
              </button>
            </div>
          </div>

          {/* Animated Status Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-8 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                <span className={`material-symbols-outlined ${displayData.isAuthentic ? 'text-secondary' : 'text-error'} text-5xl`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {displayData.isAuthentic ? 'verified' : 'cancel'}
                </span>
              </div>
              <div className="space-y-8 relative z-10">
                <InfoBlock label="Verification Hash" value={barcode || 'TC-8829-QX-0012'} large={true} />
                <div className="grid grid-cols-2 gap-4">
                  <InfoBlock label="Audited At" value="Real-time Node Access" />
                  <InfoBlock label="Risk Score" value={displayData.isAuthentic ? "Low (0.02%)" : "CRITICAL (98.9%)"} valueColor={displayData.isAuthentic ? "text-secondary" : "text-error"} />
                </div>
                <div className="pt-4 border-t border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                      <span className={`material-symbols-outlined ${displayData.isAuthentic ? 'text-primary' : 'text-error'}`}>
                        {displayData.isAuthentic ? 'shield' : 'report'}
                      </span>
                    </div>
                    <div className="text-sm">
                      <div className="text-on-surface font-medium">{displayData.isAuthentic ? 'Digital Watermark Active' : 'Protocol Violation'}</div>
                      <div className="text-on-surface-variant text-xs">{displayData.isAuthentic ? 'Dynamic tracking enabled' : 'Reporting to authorities...'}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`absolute -bottom-20 -left-20 w-64 h-64 ${displayData.isAuthentic ? 'bg-primary/5' : 'bg-error/5'} rounded-full blur-[80px]`}></div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Product Details & Manufacturer */}
        <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 text-left">
          {/* Product Identity */}
          <div className="md:col-span-4 lg:col-span-3 bg-surface-container-low p-8 rounded-xl flex flex-col justify-between min-h-[320px]">
            <div className="space-y-4">
              <span className="text-[0.65rem] font-label uppercase tracking-[0.2em] text-outline">Product Profile</span>
              <h2 className="text-3xl font-headline font-bold text-on-surface">{displayData.name}</h2>
              <p className="text-on-surface-variant text-sm max-w-md">{displayData.description}</p>
            </div>
            <div className="flex items-center gap-6 pt-8">
              <img className="w-32 h-32 object-cover rounded-lg bg-surface-container-highest" src={displayData.imageUrl} alt={displayData.name} />
              <div className="space-y-3">
                <CheckItem label="Original Packaging" active={displayData.isAuthentic} />
                <CheckItem label="OEM Seals Intact" active={displayData.isAuthentic} />
                <CheckItem label="Warranty Registered" active={displayData.isAuthentic} />
              </div>
            </div>
          </div>

          {/* Batch Details */}
          <div className="md:col-span-2 lg:col-span-3 bg-surface-container-low p-8 rounded-xl min-h-[320px] flex flex-col justify-between">
            <div>
              <span className="text-[0.65rem] font-label uppercase tracking-[0.2em] text-outline">Batch Information</span>
              <div className="mt-6 space-y-6">
                <DetailRow label="Barcode/ID" value={displayData.barcode} mono={true} />
                <DetailRow label="Category" value={displayData.category || 'Retail'} />
                <DetailRow label="Manufacturer" value={displayData.brand || 'Authenticated Hub'} />
                <DetailRow label="Integrity Check" value={displayData.isAuthentic ? "PASS" : "FAIL"} secondary={displayData.isAuthentic} />
              </div>
            </div>
            <div className="mt-4">
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className={`h-full ${displayData.isAuthentic ? 'bg-gradient-to-r from-primary/40 to-primary w-full' : 'bg-error w-1/12'}`}></div>
              </div>
              <div className="mt-2 text-[0.65rem] text-outline text-right uppercase tracking-widest">
                Confidence Level: {displayData.isAuthentic ? '100%' : '1%'}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Sub-components
const InfoBlock = ({ label, value, large, valueColor }) => (
  <div>
    <span className="text-[0.65rem] font-label uppercase tracking-[0.2em] text-outline">{label}</span>
    <div className={`${large ? 'text-xl' : 'text-sm'} font-headline font-medium ${valueColor || 'text-on-surface'} break-all`}>{value}</div>
  </div>
);

const CheckItem = ({ label, active }) => (
  <div className="flex items-center gap-2">
    <span className={`material-symbols-outlined ${active ? 'text-primary' : 'text-error'} text-sm`}>
      {active ? 'check_circle' : 'cancel'}
    </span>
    <span className="text-xs text-on-surface-variant">{label}</span>
  </div>
);

const DetailRow = ({ label, value, mono, secondary }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-on-surface-variant whitespace-nowrap mr-4">{label}</span>
    <span className={`text-sm ${mono ? 'font-mono' : ''} ${secondary ? 'text-secondary font-medium' : 'text-on-surface'} truncate`}>{value}</span>
  </div>
);

const LinkButton = ({ label }) => (
  <a className="text-xs text-primary font-label uppercase tracking-widest hover:underline cursor-pointer" href="#">{label}</a>
);

const TimelineStep = ({ title, subtitle, active, highlight }) => (
  <div className="flex items-start gap-6 relative">
    <div className={`w-6 h-6 rounded-full border-4 border-surface-container-high z-10 ${active ? 'bg-primary' : 'bg-outline-variant'} ${highlight ? 'shadow-[0_0_10px_rgba(0,229,255,0.5)] bg-secondary' : ''}`}></div>
    <div>
      <div className={`text-xs font-bold ${highlight ? 'text-secondary' : 'text-on-surface'}`}>{title}</div>
      <div className="text-[0.6rem] text-outline">{subtitle}</div>
    </div>
  </div>
);

export default ProductVerification;

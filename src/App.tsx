import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Heart, ShieldCheck, Mail, MessageSquare, ExternalLink, Copyright, Globe, Clock, ArrowUpCircle, X, Bell, Sparkles } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Tracker from './components/Tracker';
import QuickGive from './components/QuickGive';
import AminaStory from './components/AminaStory';
import Updates from './components/Updates';
import ContactForm from './components/ContactForm';
import DonationModal from './components/DonationModal';
import ExitIntentModal from './components/ExitIntentModal';
import AlternativePlatforms from './components/AlternativePlatforms';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import CoreFoundation from './components/CoreFoundation';
import TeamSection from './components/TeamSection';
import CEOProfileModal from './components/CEOProfileModal';
import { useAppState } from './context/AppContext';

export default function App() {
  const { charityState, currentUser } = useAppState();

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isCEOModalOpen, setIsCEOModalOpen] = useState(false);
  const [modalPresetAmount, setModalPresetAmount] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [adminToasts, setAdminToasts] = useState<any[]>([]);

  useEffect(() => {
    const handleOpenCEO = () => {
      setIsCEOModalOpen(true);
    };
    window.addEventListener('open-ceo-modal', handleOpenCEO);
    return () => {
      window.removeEventListener('open-ceo-modal', handleOpenCEO);
    };
  }, []);

  useEffect(() => {
    if (currentUser?.role !== 'admin') {
      setAdminToasts([]);
      return;
    }

    const handleNewAlert = (e: Event) => {
      const customEvent = e as CustomEvent;
      const alert = customEvent.detail;
      
      const toastId = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      setAdminToasts(prev => [...prev, { ...alert, toastId }]);
      
      // Auto-dismiss after 8 seconds
      setTimeout(() => {
        setAdminToasts(prev => prev.filter(t => t.toastId !== toastId));
      }, 8000);
    };

    window.addEventListener('admin-alert-toast', handleNewAlert);
    return () => {
      window.removeEventListener('admin-alert-toast', handleNewAlert);
    };
  }, [currentUser]);

  const dismissToast = (toastId: string) => {
    setAdminToasts(prev => prev.filter(t => t.toastId !== toastId));
  };

  useEffect(() => {
    // Dynamic real-time ticking clock for accountability (UTC)
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toUTCString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenDonation = (amount?: number) => {
    if (amount) {
      setModalPresetAmount(amount);
    } else {
      setModalPresetAmount(null);
    }
    setIsDonationModalOpen(true);
  };

  const handleDonationSuccess = (amountAdded: number) => {
    // Dynamic central ledger tracking handles funding updates automatically in state context
  };

  const scrollBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="charity-app-container" className="min-h-screen bg-slate-50 overflow-x-hidden selection:bg-sky-600 selection:text-white flex flex-col justify-between">
      
      {/* Dynamic Header */}
      <Header 
        onDonateClick={() => handleOpenDonation()} 
        onAuthClick={() => setIsAuthModalOpen(true)}
        onAdminPanelClick={() => setIsAdminPanelOpen(true)}
        onCEOProfileClick={() => setIsCEOModalOpen(true)}
      />

      {/* Main Single-View flow Layout */}
      <main id="main-content-flow" className="flex-grow">
        
        {/* Core Screen: Hero */}
        <Hero onDonateClick={handleOpenDonation} />

        {/* Core Screen: Transparency Impact Tracker */}
        <Tracker
          totalRaised={charityState.totalRaised}
          totalGoal={charityState.totalGoal}
          mealsServed={charityState.mealsServed}
          donorsCount={charityState.donorsCount}
        />

        {/* Global Mission, Vision, Motto, & Pillars */}
        <CoreFoundation />

        {/* Core Screen: Quick Giving interactive bundles grid */}
        <QuickGive onDonateClick={handleOpenDonation} />

        {/* Global Crowdfunding & Platform Sponsors Section */}
        <AlternativePlatforms onDonateClick={() => handleOpenDonation(1)} />

        {/* Core Screen: Face split stories, Amina story & gallery pictures */}
        <AminaStory onDonateClick={handleOpenDonation} />

        {/* Dynamic Sorted Volunteer & Caregiver Team Directory */}
        <TeamSection />

        {/* Core Screen: Field update logs */}
        <Updates />

        {/* Core Screen: Contact details and forms */}
        <ContactForm />

      </main>

      {/* Footer Section */}
      <footer id="main-footer" className="bg-sky-50 text-slate-600 border-t border-sky-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-sky-100 pb-12 mb-8 text-left">
            {/* Logo and brief summary column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-500/10 rounded-xl">
                  <Heart className="w-5 h-5 text-sky-600 fill-sky-600" />
                </div>
                <span className="font-display font-extrabold text-lg tracking-tight text-slate-900">
                  Good Samaritan<span className="text-sky-600"> for Children</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Driven by our absolute layout of kindness and response, our core mission is to <strong>&ldquo;GENATERATE&rdquo;</strong> direct relief—transforming tiny gifts directly into critical high-density nourishment, education, clean water, and therapeutic cards keeping transparency at our core.
              </p>
            </div>

            {/* Quick navigational links */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-display">Inside our logbook</h4>
              <ul className="space-y-2.5 text-xs">
                {['overview', 'alternative-impact-channels', 'gallery', 'updates', 'contact'].map((id, idx) => {
                  const titles = ['Transparency board', 'GoFundMe & Platforms', 'Gallery of resilience', 'Caretaker reports', 'Inquire directly'];
                  return (
                    <li key={id}>
                      <button
                        onClick={() => {
                          const el = document.getElementById(id);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="hover:text-sky-600 text-slate-600 transition-colors cursor-pointer text-left leading-none"
                      >
                        {titles[idx]}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Fiduciary / Accountability details */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-display">Direct disclosures</h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified 501(c)(3) Entity</span>
                </li>
                <li>Charity Registration: #12345</li>
                <li>Caretaker Office: Beirut-Bekaa Module</li>
                <li>WhatsApp: +1 (234) 567-890</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-[11px] text-slate-400 font-medium">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
              <span className="flex items-center gap-1">
                <Copyright className="w-3.5 h-3.5" />
                {new Date().getFullYear()} Good Samaritan for Children. All Rights Resilient.
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                Live UTC Audit Sync: <strong className="font-mono text-xs text-slate-600">{currentTime || 'Ticking...'}</strong>
              </span>
            </div>

            <div className="flex items-center gap-5 uppercase tracking-widest font-mono text-[10px]">
              <span className="text-emerald-600 leading-none">Security Guaranteed</span>
              <span>•</span>
              <span className="text-slate-400">SSL v3</span>
            </div>

          </div>

        </div>
      </footer>

      {/* Floating Scroll to Top Arrow */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={scrollBackToTop}
          className="fixed bottom-6 right-6 z-35 p-3.5 bg-white border border-slate-200 text-sky-600 hover:text-white rounded-full shadow-2xl transition-all cursor-pointer hover:bg-sky-600"
        >
          <ArrowUpCircle className="w-5 h-5" />
        </button>
      )}

      {/* Interactive payment drawer trigger */}
      <AnimatePresence>
        {isDonationModalOpen && (
          <DonationModal
            isOpen={isDonationModalOpen}
            onClose={() => setIsDonationModalOpen(false)}
            presetAmount={modalPresetAmount}
            onDonationSuccess={handleDonationSuccess}
          />
        )}
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
        )}
        {isAdminPanelOpen && (
          <AdminPanel
            onClose={() => setIsAdminPanelOpen(false)}
          />
        )}
        {isCEOModalOpen && (
          <CEOProfileModal
            isOpen={isCEOModalOpen}
            onClose={() => setIsCEOModalOpen(false)}
            onOpenDonation={(amt) => handleOpenDonation(amt)}
          />
        )}
      </AnimatePresence>

      {/* Embedded Exit Intent Trigger Overlay */}
      <ExitIntentModal onTriggerDonate={handleOpenDonation} />

      {/* Real-time Admin Notification Toasts stack (Visible only to administrators) */}
      {currentUser?.role === 'admin' && adminToasts.length > 0 && (
        <div id="admin-toasts-portal" className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-[calc(100vw-3rem)] pointer-events-none">
          {adminToasts.map((toast) => (
            <div 
              id={`toast-alert-${toast.id || 'live'}`}
              key={toast.toastId} 
              className="pointer-events-auto bg-slate-950 border border-slate-900 border-l-4 border-l-amber-500 text-white rounded-2xl shadow-2xl p-4 flex items-start gap-4 animate-slide-in hover:shadow-amber-500/5 transition-all w-full"
            >
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl mt-0.5 shrink-0">
                {toast.type === 'donation' ? <Heart className="w-4 h-4 fill-current text-emerald-500" /> : <MessageSquare className="w-4 h-4 text-sky-400" />}
              </div>
              <div className="flex-grow text-left min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase">{toast.type === 'donation' ? 'Large Donation' : 'Contact submission'}</span>
                  <span className="text-[9px] text-slate-500 font-medium shrink-0 font-mono">Just Now</span>
                </div>
                <h4 className="text-xs font-black text-slate-100 mt-1 truncate">{toast.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 font-medium leading-relaxed break-words">{toast.message}</p>
                {toast.type === 'donation' && toast.meta?.amount && (
                  <span className="text-[10px] bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold mt-1.5 inline-block">
                    +${toast.meta.amount}.00 USD
                  </span>
                )}
              </div>
              <button 
                onClick={() => dismissToast(toast.toastId)}
                className="text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded-lg shrink-0 cursor-pointer"
                title="Dismiss Alert"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

import { Heart, Menu, X, ShieldAlert, User, LogOut, Settings2, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppState } from '../context/AppContext';

interface HeaderProps {
  onDonateClick: () => void;
  onAuthClick: () => void;
  onAdminPanelClick: () => void;
  onCEOProfileClick: () => void;
}

export default function Header({ onDonateClick, onAuthClick, onAdminPanelClick, onCEOProfileClick }: HeaderProps) {
  const { currentUser, signOut } = useAppState();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-sky-100'
          : 'bg-sky-50/80 backdrop-blur-md border-b border-sky-100/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo Left */}
          <div
            id="logo-container"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative p-2 bg-sky-550/10 rounded-xl bg-sky-100 group-hover:bg-sky-200 transition-colors">
              <Heart className="w-6 h-6 text-sky-650 fill-sky-650 text-sky-600 fill-sky-600 animate-pulse duration-1000" />
            </div>
            <span className="font-display font-extrabold text-lg sm:text-lg tracking-tight text-slate-900 flex items-center gap-1">
              Good Samaritan<span className="text-sky-600"> for Children</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-[1.2rem] lg:gap-6">
            <button
              id="nav-link-ceo-profile"
              onClick={onCEOProfileClick}
              className="text-amber-600 hover:text-amber-700 font-bold text-sm transition-colors cursor-pointer flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/15 py-1 px-2.5 rounded-lg border border-amber-550/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span>CEO's Faith Call</span>
            </button>
            {['Overview', 'GoFundMe & More', 'Stories', 'Field Reports', 'Get in Touch'].map((tab, i) => {
              const anchors = ['overview', 'alternative-impact-channels', 'gallery', 'updates', 'contact'];
              const id = anchors[i];
              return (
                <button
                  id={`nav-link-${id}`}
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-slate-605 hover:text-sky-600 font-medium text-xs lg:text-sm transition-colors cursor-pointer"
                >
                  {tab}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA Button with Authentication Profile Indicators */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.role === 'admin' ? (
                  <button
                    id="developer-console-btn"
                    onClick={onAdminPanelClick}
                    className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 hover:text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer shadow animate-bounce-subtle"
                    title="Open administrative and developer tools"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    <span>Dev Console</span>
                  </button>
                ) : (
                  <div className="px-3 py-2 bg-sky-50 border border-sky-200 rounded-xl text-xs text-slate-705 flex items-center gap-1.5 font-sans">
                    <Sparkles className="w-3 h-3 text-sky-600 animate-pulse" />
                    <span>Hello, <strong className="text-slate-900">{currentUser.name.split(' ')[0]}</strong></span>
                  </div>
                )}
                <button
                  id="sign-out-btn"
                  onClick={() => signOut()}
                  className="p-2 border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="header-sign-in-btn"
                onClick={onAuthClick}
                className="flex items-center gap-1.5 text-slate-700 hover:text-sky-650 font-bold text-xs tracking-wider border border-slate-200/80 hover:border-sky-305 px-4 py-2 rounded-xl transition-all cursor-pointer bg-white"
              >
                <User className="w-3.5 h-3.5 text-slate-550" />
                <span>SIGN IN / JOIN</span>
              </button>
            )}

            <button
              id="header-donate-btn"
              onClick={onDonateClick}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 cursor-pointer relative overflow-hidden group"
            >
              {/* Pulsing ring outer glow */}
              <div className="absolute inset-0 border border-sky-450 bg-transparent rounded-xl scale-110 opacity-0 group-hover:animate-pulse-ring"></div>
              DONATE NOW
            </button>
          </div>

          {/* Mobile hamburger menu with Quick Actions */}
          <div className="flex md:hidden items-center gap-1.5">
            {currentUser ? (
              <div className="flex items-center gap-1">
                {currentUser.role === 'admin' ? (
                  <button
                    id="mobile-dev-console-btn"
                    onClick={onAdminPanelClick}
                    className="p-1.5 bg-amber-500 text-slate-950 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    title="Console"
                  >
                    <Settings2 className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-1 rounded">
                    Active
                  </span>
                )}
                <button
                  id="mobile-sign-out-btn"
                  onClick={() => signOut()}
                  className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="mobile-auth-trigger-btn"
                onClick={onAuthClick}
                className="p-1.5 border border-slate-205 rounded-lg text-slate-600 hover:text-sky-650 text-xs font-bold cursor-pointer"
              >
                <User className="w-4 h-4" />
              </button>
            )}

            <button
              id="header-mobile-donate-btn"
              onClick={onDonateClick}
              className="px-3 py-1.5 bg-sky-600 text-white font-semibold text-xs rounded-lg shadow-sm cursor-pointer"
            >
              DONATE
            </button>
            <button
              id="mobile-hamburguer-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-605 hover:text-sky-650 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-pane" className="md:hidden bg-white border-b border-sky-100 px-4 py-5 space-y-3 shadow-2xl">
          <div className="py-2 border-b border-sky-50 flex px-2 justify-between">
            <span className="text-xs text-slate-500 font-semibold tracking-wider font-mono">SITE COMPASS</span>
            <span className="text-[10px] text-sky-600 font-mono font-semibold">20 Orphans awaiting support today</span>
          </div>
          <button
            id="mobile-nav-link-ceo-profile"
            onClick={() => {
              setMobileMenuOpen(false);
              onCEOProfileClick();
            }}
            className="w-full text-left py-2 px-3 text-amber-600 hover:text-amber-705 bg-amber-500/5 hover:bg-amber-500/10 rounded-lg text-sm font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>CEO's Spiritual Calling</span>
          </button>
          {['Overview', 'GoFundMe & More', 'Stories', 'Field Reports', 'Inquire'].map((tab, i) => {
            const anchors = ['overview', 'alternative-impact-channels', 'gallery', 'updates', 'contact'];
            const id = anchors[i];
            return (
              <button
                id={`mobile-nav-link-${id}`}
                key={id}
                onClick={() => scrollToSection(id)}
                className="block w-full text-left py-2 px-3 text-slate-705 hover:text-sky-600 hover:bg-sky-50 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
              >
                {tab}
              </button>
            );
          })}
          <div className="pt-3 flex flex-col gap-2.5 px-3">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Secure Transactions</span>
              <span>100% Tax Deductible</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

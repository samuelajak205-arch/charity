import { ArrowRight, Play, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';
import heroPic from '../assets/images/hero_orphans_1779610909411.png';

interface HeroProps {
  onDonateClick: (amount?: number) => void;
}

export default function Hero({ onDonateClick }: HeroProps) {
  const scrollToImpact = () => {
    const target = document.getElementById('overview');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="hero-section" className="relative min-h-[92vh] flex items-center bg-gradient-to-b from-sky-50 via-white to-slate-100/30 pt-20 overflow-hidden">
      {/* Abstract warm overlays and blobs for organic feel */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-sky-205/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Grid subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#bae6fd_1px,transparent_1px),linear-gradient(to_bottom,#bae6fd_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Context Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 border border-amber-200/50 rounded-full text-xs font-semibold text-amber-800 uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Motto: Speak up and judge fairly
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.1]"
            >
              Good Samaritan
              <span className="block text-gradient bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 bg-clip-text text-transparent mt-2">
                for Children
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-sans max-w-2xl"
            >
              With our active mission to <strong>&ldquo;GENATERATE&rdquo;</strong> direct compassion and survival support, we are devoted to helping orphans, comforting the poor, sustaining widows, and rescuing war victims with instant, auditable accountability.
            </motion.p>

            {/* Major CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
            >
              <button
                id="hero-primary-cta"
                onClick={() => onDonateClick(1)}
                className="group px-8 py-4 bg-sky-600 hover:bg-sky-700 active:scale-98 text-white font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-sky-500/30 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <span>Sponsor Today for just $1</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={scrollToImpact}
                className="px-6 py-4 bg-white hover:bg-slate-50 active:scale-98 text-slate-700 hover:text-slate-900 font-semibold text-sm rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <span>Proof of Real Work</span>
                <Play className="w-4 h-4 fill-current text-sky-600 stroke-none" />
              </button>
            </motion.div>

            {/* Social Proof and trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 sm:pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8"
            >
              {/* Stacked Donor Faces */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-slate-300"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                    alt="Donor Avatar"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-slate-300"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                    alt="Donor Avatar"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-slate-300"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                    alt="Donor Avatar"
                    referrerPolicy="no-referrer"
                  />
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-[10px] font-bold font-mono text-sky-700 ring-2 ring-white">
                    +1.2k
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 font-display">Join 1,240+ Monthly Donors</div>
                  <div className="text-xs text-slate-500 font-medium">Making an immediate global impact together</div>
                </div>
              </div>

              {/* Secure Stamp */}
              <div className="flex items-center gap-2 text-slate-500">
                <div className="p-1.5 bg-emerald-100 text-emerald-600 border border-emerald-200 rounded-lg">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Stripe Secure SSL</div>
                  <div className="text-[10px] text-slate-400 font-mono">100% Tax Deductible #12345</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none group">
              {/* Abstract borders behind picture */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-35 transition duration-1000"></div>

              {/* Floating emergency stats drawer */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-sky-100 flex items-center gap-2.5 shadow-xl">
                <div className="w-2.5 h-2.5 bg-sky-500 rounded-full animate-ping"></div>
                <span className="text-xs font-bold text-slate-800 font-display">Only $1 starts emergency meals for an orphan today</span>
              </div>

              {/* Floating trust badge */}
              <div className="absolute bottom-5 -right-3 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-sky-100/80 flex items-center gap-2.5 shadow-2xl">
                <Award className="w-5 h-5 text-emerald-600" />
                <div className="text-left leading-none">
                  <span className="block text-xs font-bold text-emerald-600 font-display">Transparency Verified</span>
                  <span className="text-[8px] text-emerald-700 font-mono font-bold">100% GIVEN DIRECTLY</span>
                </div>
              </div>

              {/* Primary Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] w-full">
                <img
                  src={heroPic}
                  alt="Uplifting children holding hands"
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-slate-900/5"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

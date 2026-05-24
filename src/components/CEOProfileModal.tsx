import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, Quote, BookOpen, Mail, PhoneCall } from 'lucide-react';
import { useAppState } from '../context/AppContext';

interface CEOProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDonation: (amount?: number) => void;
}

export default function CEOProfileModal({ isOpen, onClose, onOpenDonation }: CEOProfileModalProps) {
  const { ceoProfile } = useAppState();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="ceo-modal-backdrop"
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="ceo-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Close button with nice hover */}
          <button 
            id="ceo-modal-close"
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 bg-slate-900/5 hover:bg-slate-900/10 text-slate-700 hover:text-slate-900 transition-colors rounded-full cursor-pointer"
            title="Close Spiritual Profile"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header section (CEO Image, Name, Role) */}
          <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-10 text-white flex flex-col md:flex-row items-center gap-6 sm:gap-8 border-b border-indigo-900/30">
            {/* Background decorative spiritual shines */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-505/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-2 border-white/25 shadow-xl shrink-0">
              <img 
                id="ceo-modal-avatar"
                src={ceoProfile.avatar} 
                alt={ceoProfile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300';
                }}
              />
              <div className="absolute bottom-2 right-2 p-1.5 bg-amber-500 text-slate-950 rounded-xl shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/15 transition-all text-[10px] font-bold text-amber-305 rounded-full uppercase tracking-widest font-mono mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                Spiritual Faith Narrative & Call
              </span>
              <h1 id="ceo-modal-name" className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-1.5">
                {ceoProfile.name}
              </h1>
              <p id="ceo-modal-role" className="text-sm font-semibold text-slate-300 font-mono tracking-wide">
                {ceoProfile.role}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4 text-[11px] text-slate-350">
                <a 
                  id="ceo-contact-link-email"
                  href="mailto:ivan@samaritan.org" 
                  className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:border-amber-300 transition-colors rounded-lg flex items-center gap-1.5 text-white/90"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ivan direct</span>
                </a>
                <span className="text-white/20">|</span>
                <span className="font-mono text-white/70">Verified Integrity & Stewardship Accreditations</span>
              </div>
            </div>
          </div>

          {/* Story Body Scroll Area */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-grow select-text max-w-3xl mx-auto">
            {/* INSPIRATIONAL BIG MESSAGE */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <Quote className="w-10 h-10 text-indigo-200 mx-auto opacity-60" />
              <h2 id="ceo-modal-story-title" className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight leading-tight">
                {ceoProfile.storyTitle}
              </h2>
              <div id="ceo-modal-story-intro" className="text-sm text-slate-650 leading-relaxed font-semibold whitespace-pre-wrap text-left bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-2xs">
                {ceoProfile.storyIntro}
              </div>
            </div>

            {/* BIBLE VERSE 1 BOX */}
            <div id="ceo-verse-1-box" className="p-6 bg-slate-950 text-white rounded-3xl border border-indigo-950 text-center relative overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
              <p className="text-base sm:text-lg font-serif italic text-amber-200">
                "{ceoProfile.verse1Text}"
              </p>
              <p className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold mt-2.5">
                — {ceoProfile.verse1Ref}
              </p>
            </div>

            {/* THE TURNING POINT */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 font-display tracking-tight flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm"></span>
                The Turning Point
              </h3>
              <p id="ceo-modal-turning-point" className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap text-left">
                {ceoProfile.turningPoint}
              </p>
            </div>

            {/* BIBLE VERSE 2 BOX */}
            <div id="ceo-verse-2-box" className="p-6 bg-slate-950 text-white rounded-3xl border border-indigo-950 text-center relative overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 w-2 h-full bg-sky-500"></div>
              <p className="text-base sm:text-lg font-serif italic text-sky-200">
                "{ceoProfile.verse2Text}"
              </p>
              <p className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold mt-2.5">
                — {ceoProfile.verse2Ref}
              </p>
            </div>

            {/* DIRECT EDUCATION BACKGROUND */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 font-display tracking-tight flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm"></span>
                From Mud Floor to Graduation
              </h3>
              <p id="ceo-modal-academic-history" className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap text-left">
                {ceoProfile.academicHistory}
              </p>
            </div>

            {/* BIBLE VERSE 3 BOX */}
            <div id="ceo-verse-3-box" className="p-6 bg-slate-900 text-white rounded-3xl border border-indigo-950 text-center relative overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
              <p className="text-base sm:text-lg font-serif italic text-emerald-200">
                "{ceoProfile.verse3Text}"
              </p>
              <p className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold mt-2.5">
                — {ceoProfile.verse3Ref}
              </p>
            </div>

            {/* ACCOMPLISHMENTS OUTCOME STATS */}
            <div className="bg-amber-50/20 border border-amber-250 rounded-3xl p-6 sm:p-8 space-y-4 shadow-3xs text-left">
              <h3 className="text-base font-black text-amber-955 tracking-tight uppercase font-mono">
                Impact Realized Through God's Providence
              </h3>
              <p id="ceo-modal-accomplishments" className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed font-semibold">
                {ceoProfile.accomplishments}
              </p>
            </div>

            {/* BIBLE VERSE 4 BOX */}
            <div id="ceo-verse-4-box" className="p-6 bg-slate-950 text-white rounded-3xl border border-indigo-950 text-center relative overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
              <p className="text-base sm:text-lg font-serif italic text-amber-250">
                "{ceoProfile.verse4Text}"
              </p>
              <p className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold mt-2.5">
                — {ceoProfile.verse4Ref}
              </p>
            </div>

            {/* NOT A HERO SECTION */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 font-display tracking-tight flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="w-2.5 h-2.5 bg-slate-700 rounded-sm"></span>
                I Am Not a Hero
              </h3>
              <p id="ceo-modal-not-hero" className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap text-left">
                {ceoProfile.notAHero}
              </p>
            </div>

            {/* BIBLE VERSE 5 BOX */}
            <div id="ceo-verse-5-box" className="p-6 bg-slate-950 text-white rounded-3xl border border-indigo-950 text-center relative overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-550"></div>
              <p className="text-base sm:text-lg font-serif italic text-indigo-200">
                "{ceoProfile.verse5Text}"
              </p>
              <p className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold mt-2.5">
                — {ceoProfile.verse5Ref}
              </p>
            </div>

            {/* CANNOT DO IT ALONE */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 font-display tracking-tight flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-sm"></span>
                We Cannot Do This Alone
              </h3>
              <p id="ceo-modal-cannot-lone" className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap text-left font-semibold">
                {ceoProfile.cannotDoAlone}
              </p>
            </div>

            {/* BIBLE VERSE 6 BOX */}
            <div id="ceo-verse-6-box" className="p-6 bg-slate-950 text-white rounded-3xl border border-indigo-950 text-center relative overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 w-2 h-full bg-rose-500"></div>
              <p className="text-base sm:text-lg font-serif italic text-rose-200">
                "{ceoProfile.verse6Text}"
              </p>
              <p className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold mt-2.5">
                — {ceoProfile.verse6Ref}
              </p>
            </div>

            {/* CALL TO ACTION DETAILS */}
            <div className="bg-sky-50 text-slate-900 rounded-3xl p-6 sm:p-8 space-y-4 border border-sky-150 shadow-3xs text-left">
              <h3 className="text-base font-black text-sky-955 tracking-tight uppercase font-mono">
                Will You Help Me Keep My Promise?
              </h3>
              <p id="ceo-modal-call-action" className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed font-semibold">
                {ceoProfile.callToAction}
              </p>
            </div>

            {/* BIBLE VERSE 7 BOX */}
            <div id="ceo-verse-7-box" className="p-6 bg-indigo-950 text-white rounded-3xl border border-indigo-950 text-center relative overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
              <p className="text-base sm:text-lg font-serif italic text-amber-200">
                "{ceoProfile.verse7Text}"
              </p>
              <p className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold mt-2.5">
                — {ceoProfile.verse7Ref}
              </p>
            </div>

            {/* CLOSING PRAYER */}
            {ceoProfile.closingPrayer && (
              <div 
                id="ceo-closing-prayer-box" 
                className="p-6 bg-amber-50/30 text-slate-900 rounded-3xl border border-amber-200/60 leading-relaxed max-w-xl mx-auto text-center"
              >
                <span className="text-[10px] text-amber-800 font-mono font-bold uppercase tracking-wider block mb-2"> Closing Faith Prayer </span>
                <p id="ceo-modal-prayer" className="text-xs sm:text-sm text-slate-700 italic font-semibold leading-relaxed">
                  "{ceoProfile.closingPrayer}"
                </p>
              </div>
            )}
            
          </div>

          {/* Prompting Footer */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-bold text-left">
              Join Ivan Mulindwa in rescuing orphaned and homeless children today.
            </span>
            <div className="flex gap-2.5 w-full sm:w-auto shrink-0 justify-end">
              <button
                id="ceo-footer-close-btn"
                onClick={onClose}
                className="py-2.5 px-4 bg-white hover:bg-slate-100 border border-slate-200 hover:text-slate-900 text-slate-700 transition-colors text-xs font-bold rounded-xl cursor-pointer"
              >
                Go Back to Site
              </button>
              <button
                id="ceo-footer-pledge-btn"
                onClick={() => {
                  onClose();
                  onOpenDonation();
                }}
                className="py-2.5 px-5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:text-black hover:shadow-md transition-all text-xs font-extrabold rounded-xl cursor-pointer flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4 fill-current text-slate-950" />
                Pledge a Life Offering
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

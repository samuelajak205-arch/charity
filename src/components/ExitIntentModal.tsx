import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, Coffee, Sparkles, Heart } from 'lucide-react';

interface ExitIntentModalProps {
  onTriggerDonate: (amount: number) => void;
}

export default function ExitIntentModal({ onTriggerDonate }: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if shown in sessionStorage to avoid spamming the user
    const dismissed = sessionStorage.getItem('exit_intent_dismissed') === 'true';
    if (dismissed) return;

    // Detect exit intent: mouse leaving the top window viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Fallback: trigger after 35 seconds of idling/reading anyway
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 35000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasShown]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('exit_intent_dismissed', 'true');
  };

  const handleDonateAction = () => {
    setIsVisible(false);
    sessionStorage.setItem('exit_intent_dismissed', 'true');
    // Pre-select $1 starting donation
    onTriggerDonate(1);
  };

  if (!isVisible) return null;

  return (
    <div id="exit-intent-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <motion.div
        id="exit-intent-box"
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="bg-white text-slate-900 max-w-sm w-full rounded-2xl shadow-2xl border border-slate-150 p-6 relative overflow-hidden text-left"
      >
        {/* Subtle orange urgency top band */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-orange-500"></div>

        {/* Close Button */}
        <button
          id="exit-modal-close"
          onClick={handleDismiss}
          className="absolute top-4.5 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex gap-4 items-start mt-1">
          <div className="p-2 bg-orange-100 text-orange-650 rounded-xl flex-shrink-0">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-orange-600 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current" />
              WAIT! EVERY SECOND COUNTS
            </span>
            <h3 className="text-lg font-extrabold text-slate-950 font-display leading-tight">
              20 orphans are waiting for dinner.
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans mt-0.5">
              Before you leave, please consider that just <strong className="text-slate-950">$1</strong> can feed a hungry orphan today, or <strong className="text-slate-950">$7</strong> sponsors them for an entire week. Every dollar represents direct rescue.
            </p>
          </div>
        </div>

        {/* Action button triggers */}
        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <button
            id="exit-intent-dismiss-btn"
            onClick={handleDismiss}
            className="py-2.5 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-600 font-semibold text-xs rounded-xl transition-colors cursor-pointer text-center"
          >
            I cannot help today
          </button>
          <button
            id="exit-intent-donate-btn"
            onClick={handleDonateAction}
            className="py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:shadow-orange-500/20 active:scale-98 cursor-pointer text-center"
          >
            Feed for $1 →
          </button>
        </div>

        {/* Safety trust badge line */}
        <p className="text-[10px] text-slate-400 text-center mt-4 pt-3 border-t border-slate-100 leading-none">
          100% Secure Checkout with SSL Encrypted Channels
        </p>

      </motion.div>
    </div>
  );
}

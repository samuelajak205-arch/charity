import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Lock, CheckCircle2, Share2, Sparkles, CreditCard, ArrowRight, ExternalLink } from 'lucide-react';
import { useAppState } from '../context/AppContext';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetAmount: number | null;
  onDonationSuccess: (amount: number) => void;
}

export default function DonationModal({ isOpen, onClose, presetAmount, onDonationSuccess }: DonationModalProps) {
  const { currentUser, submitDonation } = useAppState();
  const [amount, setAmount] = useState<number>(1);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'gpay'>('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvc: '381',
  });
  const [hasCopied, setHasCopied] = useState(false);

  // Sync preset amount when modal opening state changes & Autofill user session data
  useEffect(() => {
    if (presetAmount) {
      setAmount(presetAmount);
      setCustomAmount('');
    } else {
      setAmount(1);
    }
    
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        name: '',
        email: ''
      }));
    }
    
    setPaymentStep('details');
  }, [isOpen, presetAmount, currentUser]);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) {
      setAmount(parseInt(val, 10));
    } else {
      setAmount(0);
    }
  };

  const handlePresetSelect = (amt: number) => {
    setAmount(amt);
    setCustomAmount('');
  };

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    
    setPaymentStep('processing');
    
    // Simulate payment processing with stripe gateway
    setTimeout(() => {
      setPaymentStep('success');
      submitDonation(amount, formData.name || 'Anonymous Supporter', formData.email || 'guest@charity.org');
      onDonationSuccess(amount);
    }, 2100);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const shareText = `I just fed an orphan for a week through HelpOrphansNow! Only $7 feeds one child for 7 days. Join me in being their anchor: ${window.location.origin}`;

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  if (!isOpen) return null;

  // Impact sentence generator based on amount
  const getImpactMessage = (amt: number) => {
    if (amt >= 50) return `provide critical emergency medical packages for ${Math.floor(amt / 50)} high-risk children.`;
    if (amt >= 25) return `sponsor full educational supply kits (uniforms, books, bags) for ${Math.floor(amt / 25)} orphans.`;
    if (amt >= 7) return `guarantee full, warm, nutritious meals for ${Math.floor(amt / 7)} hungry children for a whole week.`;
    if (amt >= 1) return `provide immediate, healthy daily sustenance and fresh bread for a hungry child.`;
    return `provide healthy, warm meals for standard daily rescue.`;
  };

  return (
    <div id="donation-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <motion.div
        id="donation-modal"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg overflow-hidden bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-100"
      >
        {/* Close button */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {paymentStep === 'details' && (
          <form id="donation-form" onSubmit={handlePaySubmit} className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-50 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                SECURE DONATION
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950 font-display">
                Feed an Orphan Today
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Your direct donation transforms vulnerable children's lives. No account needed.
              </p>
            </div>

            {/* Donation Amount Selectors */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">
                Select Gift Size
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[1, 7, 25, 50].map((amt) => (
                  <button
                    id={`preset-${amt}`}
                    key={amt}
                    type="button"
                    onClick={() => handlePresetSelect(amt)}
                    className={`py-3 text-center border-2 rounded-xl font-mono text-base font-semibold transition-all ${
                      amount === amt && !customAmount
                        ? 'border-sky-500 bg-sky-50 text-sky-600 shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-medium">$</span>
                </div>
                <input
                  id="custom-amount-input"
                  type="text"
                  placeholder="Enter custom donation size"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50 text-slate-900 transition-colors"
                />
              </div>

              {amount > 0 && (
                <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-2.5">
                  <div className="p-1 bg-emerald-50 text-emerald-600 rounded-full mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    A gift of <strong className="text-emerald-700">${amount}</strong> will directly {getImpactMessage(amount)}
                  </p>
                </div>
              )}
            </div>

            {/* Donation Details Block */}
            <div className="space-y-4">
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-widest -mb-1">
                Contact & Billing Details
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    id="billing-name"
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
                <div>
                  <input
                    id="billing-email"
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Verified GoFundMe/Patreon Platforms Option */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/70 to-teal-50/20 border border-emerald-100 text-left">
                <div className="flex items-center gap-1.5 mb-1 bg-emerald-100/60 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md w-max">
                  <Sparkles className="w-3 h-3 text-emerald-700 fill-emerald-700 animate-pulse" />
                  Crowdfunding Available
                </div>
                <h4 className="text-xs font-bold text-slate-900 font-display">Rather give via GoFundMe or Patreon?</h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Join our public group fundraisers to trace social badges, tax claims, and public ledger logs:
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    id="modal-alternative-gofundme"
                    href="https://gofundme.com/f/helporphansnow-emergency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-bold text-[11px] bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-805 text-emerald-700 py-1.5 px-2.5 rounded-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-1"
                  >
                    <span>GoFundMe</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    id="modal-alternative-patreon"
                    href="https://patreon.com/helporphansnow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-bold text-[11px] bg-white border border-rose-200 hover:border-rose-400 text-rose-805 text-rose-700 py-1.5 px-2.5 rounded-lg hover:bg-rose-50 transition-all flex items-center justify-center gap-1"
                  >
                    <span>Patreon</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Direct Bank Transfer Option */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
                <div className="flex items-center gap-1.5 mb-1 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md w-max">
                  Direct Bank
                </div>
                <h4 className="text-xs font-bold text-slate-900 font-display">Bank Transfer</h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  You can also support us directly through your bank:
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs font-mono font-bold text-sky-700 bg-sky-50 p-2 rounded-lg border border-sky-100">
                  <span>Account Number:</span>
                  <span className="text-sm bg-sky-100 px-1.5 py-0.5 rounded">2291861379</span>
                </div>
              </div>

              {/* Secure Payment System Tabs */}
              <div className="bg-slate-50/70 p-4 border border-slate-100 rounded-xl">
                <div className="flex bg-slate-200/50 p-1 rounded-lg mb-4">
                  <button
                    id="pay-card-tab"
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Credit Card
                  </button>
                  <button
                    id="pay-gpay-tab"
                    type="button"
                    onClick={() => setPaymentMethod('gpay')}
                    className={`flex-1 flex flex-row items-center justify-center gap-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      paymentMethod === 'gpay'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <span className="font-sans tracking-tight text-sm"> Pay</span>
                    <span className="text-xs">/ Google Pay</span>
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        id="card-number-input"
                        type="text"
                        required
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-lg text-sm bg-white font-mono focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <Lock className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        id="card-expiry-input"
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white font-mono focus:outline-none"
                      />
                      <input
                        id="card-cvc-input"
                        type="password"
                        required
                        placeholder="CVC"
                        value={formData.cvc}
                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-xs text-slate-500 font-medium mb-3">
                      Quick instant express sandbox payment active.
                    </p>
                    <div className="inline-flex items-center gap-1 bg-slate-900 text-white font-semibold text-sm px-6 py-2.5 rounded-xl cursor-not-allowed select-none">
                      Express Wallet Token Active
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submission CTA */}
            <button
              id="submit-donation-btn"
              type="submit"
              disabled={amount <= 0}
              className={`w-full py-3.5 px-4 mt-6 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md ${
                amount > 0
                  ? 'bg-sky-600 hover:bg-sky-700 hover:shadow-lg active:scale-98 cursor-pointer'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <span>Donate ${amount} Securely</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Footer */}
            <div className="flex items-center justify-center gap-5 mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
                SSL 256-Bit Encrypted
              </span>
              <span>100% Tax Deductible</span>
            </div>
          </form>
        )}

        {/* Processing State */}
        {paymentStep === 'processing' && (
          <div id="payment-processing-stage" className="py-20 px-8 text-center flex flex-col items-center justify-center">
            <div className="relative w-16 h-16 mb-6">
              <div className="w-16 h-16 border-4 border-sky-100 border-t-sky-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-6 h-6 text-sky-600 animate-pulse" />
              </div>
            </div>
            <h4 className="text-xl font-bold tracking-tight text-slate-950 font-display">
              Executing Secure Transaction
            </h4>
            <div className="w-full max-w-xs mt-3 space-y-2">
              <p className="text-sm text-slate-500 leading-relaxed animate-pulse">
                Handshaking with Stripe payment vault...
              </p>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="h-full bg-sky-600"
                ></motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {paymentStep === 'success' && (
          <div id="payment-success-stage" className="p-8 text-center bg-emerald-50/50">
            <div className="inline-flex p-4 bg-emerald-100/80 text-emerald-600 rounded-full mb-5 relative">
              <CheckCircle2 className="w-10 h-10 fill-current" />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-0 right-0 p-1 bg-amber-400 text-white rounded-full"
              >
                <Sparkles className="w-4 h-4 fill-current" />
              </motion.div>
            </div>

            <h4 className="text-3xl font-extrabold tracking-tight text-slate-950 font-display">
              Gift Completed!
            </h4>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              Your donation of <strong className="text-slate-950 text-base font-mono font-bold">${amount}</strong> has been successfully processed! You just {getImpactMessage(amount)}
            </p>

            {/* Simulated Receipt Details */}
            <div className="my-6 p-4 rounded-xl border border-emerald-100 bg-white shadow-sm max-w-sm mx-auto text-left">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest border-b border-dashed border-slate-100 pb-1.5 mb-2.5">
                Official Virtual Receipt
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Recipient:</span>
                  <span className="text-slate-800 font-semibold">Help Orphans Now Inc</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Donor Name:</span>
                  <span className="text-slate-800 font-semibold">{formData.name || 'Compassionate Hand'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Email:</span>
                  <span className="text-slate-800 font-semibold">{formData.email || 'donor@email.org'}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-1.5 mt-1.5">
                  <span className="text-slate-600 font-medium">Transaction:</span>
                  <span className="text-slate-800 font-mono font-semibold">tx_stripe_{Math.random().toString(36).substr(2, 9)}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg mt-2">
                  <span className="text-emerald-700 font-semibold text-xs uppercase tracking-wider">Status:</span>
                  <span className="font-mono text-sm leading-none text-emerald-700 font-bold">PAID SECURELY</span>
                </div>
              </div>
            </div>

            {/* Social Sharing triggers */}
            <div className="border-t border-slate-200/50 pt-5 mt-5">
              <h5 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                Multiply your support by sharing
              </h5>
              <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mb-4">
                <button
                  id="share-whatsapp-btn"
                  onClick={handleShareWhatsApp}
                  className="flex items-center justify-center gap-1 px-3 py-2 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 font-semibold text-xs rounded-lg transition-colors text-slate-700 hover:text-emerald-700 cursor-pointer"
                >
                  WhatsApp
                </button>
                <button
                  id="share-twitter-btn"
                  onClick={handleShareTwitter}
                  className="flex items-center justify-center gap-1 px-3 py-2 border border-slate-200 hover:border-sky-500 hover:bg-sky-50 font-semibold text-xs rounded-lg transition-colors text-slate-700 hover:text-sky-700 cursor-pointer"
                >
                  Twitter / X
                </button>
                <button
                  id="copy-link-btn"
                  onClick={handleCopyLink}
                  className={`flex items-center justify-center gap-1 px-3 py-2 border font-semibold text-xs rounded-lg transition-colors cursor-pointer ${
                    hasCopied
                      ? 'border-emerald-500 bg-emerald-100 text-emerald-800'
                      : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {hasCopied ? 'Copied' : 'Copy Link'}
                </button>
              </div>
              <p className="text-[10px] text-slate-400/80 leading-normal mb-2">
                100% of your gift is channeled to food procurement, security shields, blankets, well construction, and educational toolkits locally.
              </p>
            </div>

            <button
              id="close-success-btn"
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-sky-600 text-white font-semibold text-sm rounded-xl hover:bg-sky-700 transition-colors cursor-pointer"
            >
              Done, return to charity page
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Sparkles, ShieldCheck, CheckCircle2, UserCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAppState } from '../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { signIn, signUp, currentUser } = useAppState();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  
  // Forms state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'user' | 'admin'>('user');
  
  // Feedback mechanisms
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('user');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleModeSwitch = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please input all required credentials.');
      return;
    }

    if (mode === 'signup' && !name) {
      setErrorMsg('Full name is required for account enrollment.');
      return;
    }

    setIsLoading(true);

    // Simulate database latency
    setTimeout(() => {
      if (mode === 'signup') {
        const response = signUp(name, email, password, role);
        if (response.success) {
          setSuccessMsg(response.message);
          setTimeout(() => {
            setIsLoading(false);
            if (onSuccess) onSuccess();
            onClose();
            resetForm();
          }, 1500);
        } else {
          setErrorMsg(response.message);
          setIsLoading(false);
        }
      } else {
        const response = signIn(email, password);
        if (response.success) {
          setSuccessMsg(response.message);
          setTimeout(() => {
            setIsLoading(false);
            if (onSuccess) onSuccess();
            onClose();
            resetForm();
          }, 1500);
        } else {
          setErrorMsg(response.message);
          setIsLoading(false);
        }
      }
    }, 800);
  };

  return (
    <AnimatePresence>
      <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          id="auth-modal-container"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white border border-sky-100 rounded-3xl max-w-md w-full relative overflow-hidden shadow-2xl flex flex-col justify-between"
        >
          {/* Header Banner Background Decor */}
          <div className="h-2 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500"></div>

          {/* Close button */}
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-50 transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8">
            {/* Title / Badge logo */}
            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100 mb-3 text-sky-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-950 tracking-tight leading-none">
                {mode === 'signin' ? 'Access your Logbook' : 'Create Guardian Account'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {mode === 'signin' 
                  ? 'Sign in to trace your secure donation impact logs' 
                  : 'Enroll to track collective relief achievements'}
              </p>
            </div>

            {/* Error Message Callout */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2 text-left">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-rose-800">{errorMsg}</span>
              </div>
            )}

            {/* Success Message Callout */}
            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-2.5 text-left">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-emerald-800">{successMsg}</span>
              </div>
            )}

            {/* Core Sign-in/Sign-up Form */}
            <form id="auth-core-form" onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 text-left font-mono">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="auth-input-name"
                      type="text"
                      placeholder="e.g. Samuel Ajak"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all font-sans"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 text-left font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="auth-input-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 text-left font-mono">
                  Secure Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="auth-input-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 text-left font-mono">
                    Select Account Role Scope
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      id="role-btn-user"
                      type="button"
                      onClick={() => setRole('user')}
                      className={`py-2 text-center rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        role === 'user' 
                          ? 'bg-sky-55 text-sky-700 bg-sky-50/50 border-sky-300' 
                          : 'bg-white text-slate-550 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Standard Supporter
                    </button>
                    <button
                      id="role-btn-admin"
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`py-2 text-center rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        role === 'admin' 
                          ? 'bg-amber-55 text-amber-800 bg-amber-50/50 border-amber-300' 
                          : 'bg-white text-slate-550 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Developer (Admin)
                    </button>
                  </div>
                </div>
              )}

              <button
                id="submit-auth-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg active:scale-98"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{mode === 'signin' ? 'Verify and Enter' : 'Complete Account Registration'}</span>
                    <UserCheck className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Switche Mode Actions */}
            <div className="mt-5 text-center text-xs">
              <span className="text-slate-500">
                {mode === 'signin' ? "Don\'t have an account yet?" : 'Already registered a profile?'}
              </span>{' '}
              <button
                id="switch-auth-mode-btn"
                onClick={() => handleModeSwitch(mode === 'signin' ? 'signup' : 'signin')}
                className="font-bold text-sky-600 hover:underline cursor-pointer"
              >
                {mode === 'signin' ? 'Register Now' : 'Sign In'}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import React, { useState } from 'react';
import { Newspaper, Send, ArrowRight, Calendar, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import { UpdateItem } from '../types';

export default function Updates() {
  const { updates } = useAppState();
  const [activeFilter, setActiveFilter] = useState<'all' | 'relief' | 'education' | 'water' | 'milestone'>('all');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');

  const filteredFeed = activeFilter === 'all' ? updates : updates.filter((v) => v.category === activeFilter);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail) return;
    setEmailSubscribed(true);
    setTimeout(() => {
      setEmailSubscribed(false);
      setSubscriberEmail('');
    }, 4000);
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'relief':
        return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'water':
        return 'text-sky-600 bg-sky-50 border-sky-100';
      case 'education':
        return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'milestone':
        return 'text-amber-700 bg-amber-50 border-amber-100';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <section id="updates" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-100 rounded-full mb-3 uppercase tracking-wider font-mono">
            <Newspaper className="w-3.5 h-3.5" />
            FIELD REPORT LOGS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight sm:text-4xl animate-fade-in">
            Recent activities & updates
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            No marketing slogans. Only real cargo reports, well-completion notes, and child placement confirmations directly from caretakers.
          </p>
        </div>

        {/* Categories Pills Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Operations' },
            { id: 'relief', label: 'Emergency Relief' },
            { id: 'water', label: 'Water Wells' },
            { id: 'education', label: 'Education' },
            { id: 'milestone', label: 'Success Milestones' },
          ].map((btn) => (
            <button
              id={`filter-update-${btn.id}`}
              key={btn.id}
              onClick={() => setActiveFilter(btn.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                activeFilter === btn.id
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Timeline updates list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Timeline side */}
          <div className="lg:col-span-7 space-y-4">
            {filteredFeed.map((item, idx) => (
              <div
                id={item.id}
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm flex items-start gap-4 text-left hover:border-sky-205 hover:shadow-md transition-all"
              >
                {/* Visual side timeline indicator dot */}
                <div className="flex flex-col items-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 rounded-full bg-sky-600 ring-4 ring-sky-50"></div>
                  {idx < filteredFeed.length - 1 && (
                    <div className="w-0.5 h-16 bg-slate-100 mt-2"></div>
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-slate-400 font-semibold">{item.timeAgo}</span>
                    <span className={`px-2 py-0.5 border rounded font-mono text-[9px] font-bold uppercase tracking-wider ${getCategoryBadge(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium">
                    {item.message}
                  </p>
                  
                  {item.photoUrl && (
                    <div className="mt-3 max-h-60 rounded-xl overflow-hidden border border-slate-200/65 shadow-xs bg-slate-100">
                      <img
                        src={item.photoUrl}
                        alt="Cargo verification field evidence"
                        className="w-full h-full object-cover max-h-60"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredFeed.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400 text-sm font-medium">No results matched this category filter yet.</p>
              </div>
            )}
          </div>

          {/* Social update link card side */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Instagram Social box */}
            <div className="bg-gradient-to-br from-sky-600 to-indigo-650 text-white p-6 rounded-2xl border border-sky-500/10 shadow-lg text-left">
              <span className="block text-[10px] text-sky-100 font-mono font-bold uppercase tracking-widest mb-1.5">
                Social Verification
              </span>
              <h3 className="text-lg font-bold font-display tracking-tight leading-snug">
                Follow our boots on the ground
              </h3>
              <p className="text-xs text-sky-50/90 mt-2 leading-relaxed">
                We archive and photolog every cargo handoff, blanket delivery, and well drilling live. Follow our stories and verification records instantly.
              </p>

              <div className="flex gap-4 items-center my-4 p-3 rounded-xl bg-white/10 border border-white/20 text-xs text-slate-100">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-450 shrink-0" />
                <span>Join our <strong>3.4k followers</strong> getting weekly micro reports.</span>
              </div>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline leading-none hover:translate-x-0.5 transition-transform"
              >
                <span>Follow us on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Micro email reports field signup */}
            <div className="bg-white p-6 border border-slate-200 rounded-2xl text-left shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 font-display">Get Direct Field Reports</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                We write exactly one raw ledger email per month outlining expenses, child placements, and photo logs. No marketing spam.
              </p>

              {emailSubscribed ? (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-emerald-805 text-xs font-semibold">
                  <span>Report list active! Verified dispatch ready.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                  />
                  <button
                    id="newsletter-subscribe-btn"
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 font-bold text-xs text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>Send</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

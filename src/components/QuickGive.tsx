import { Utensils, BookOpen, Stethoscope, ArrowUpRight, Sparkles } from 'lucide-react';

interface QuickGiveProps {
  onDonateClick: (amount: number) => void;
}

export default function QuickGive({ onDonateClick }: QuickGiveProps) {
  const tiers = [
    {
      id: 'feed_orphan',
      amount: 7,
      badge: 'URGENT RESCUE',
      title: 'Feed 1 Orphan for a Week',
      description: 'Provides seven full days of warm, freshly cooked nutritious meals, sterile milk, and clean drinking water.',
      impact: 'Feeds Yusuf for a week',
      color: 'emerald',
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300',
      tagColor: 'bg-emerald-100 text-emerald-800',
      icon: <Utensils className="w-6 h-6 stroke-[2.2]" />,
      btnColor: 'bg-emerald-600 hover:bg-emerald-705 shadow-emerald-600/10 hover:shadow-emerald-600/20',
    },
    {
      id: 'school_kit',
      amount: 25,
      badge: 'FUTURE BUILDER',
      title: 'Complete School Sponsorship Kit',
      description: 'Covers standard study notebooks, neat uniforms, a premium protective backpack, and vital stationery supplies.',
      impact: 'Back to school bag + kit',
      color: 'sky',
      bgColor: 'bg-sky-50 text-sky-700 border-sky-200 hover:border-sky-300',
      tagColor: 'bg-sky-100 text-sky-800',
      icon: <BookOpen className="w-6 h-6 stroke-[2.2]" />,
      btnColor: 'bg-indigo-650 hover:bg-indigo-700 shadow-indigo-600/10 hover:shadow-indigo-600/20',
    },
    {
      id: 'medical_aid',
      amount: 50,
      badge: 'CRITICAL SHIELD',
      title: 'Emergency Medical Aid Packet',
      description: 'Sponsors basic hygiene kits, critical clinical screenings, child essential immunizations, and general medicines.',
      impact: 'Direct ambulance & clinical rescue',
      color: 'sky',
      bgColor: 'bg-sky-50 text-sky-700 border-sky-200 hover:border-sky-300',
      tagColor: 'bg-sky-100 text-sky-800',
      icon: <Stethoscope className="w-6 h-6 stroke-[2.2]" />,
      btnColor: 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/10 hover:shadow-sky-600/20',
    },
  ];

  return (
    <section id="pricing-grid" className="py-16 bg-white border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-sky-605 bg-sky-50 rounded-full mb-3 uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 fill-current text-sky-600" />
            Empower immediate rescue
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight sm:text-4xl">
            Choose your impact goal
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
            Every bundle has been designed with micro-costing. Transparently see exactly where your direct contribution is deployed.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((t) => (
            <div
              id={`quick-give-${t.id}`}
              key={t.id}
              className={`relative flex flex-col justify-between p-6 sm:p-8 bg-white border-2 rounded-3xl shadow-xs transition-all duration-300 hover:shadow-md group`}
            >
              {/* Left Side Highlight Band */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-2xl ${t.bgColor.split(' ')[0]} ${t.bgColor.split(' ')[1]}`}>
                    {t.icon}
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest rounded-md ${t.tagColor}`}>
                    {t.badge}
                  </span>
                </div>

                <div className="text-left">
                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="text-4xl font-extrabold text-slate-950 font-mono tracking-tight">${t.amount}</span>
                    <span className="text-xs text-slate-500 font-semibold font-sans">Single Gift</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 tracking-tight leading-snug">
                    {t.title}
                  </h3>
                  <p className="text-sm text-slate-650 leading-relaxed mt-2">
                    {t.description}
                  </p>
                </div>
              </div>

              {/* Bottom actionable parts */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Immediate Impact:</span>
                  <span className="font-semibold text-slate-800 underline decoration-sky-300 leading-none">{t.impact}</span>
                </div>
                <button
                  id={`quick-give-btn-${t.id}`}
                  onClick={() => onDonateClick(t.amount)}
                  className={`w-full py-3 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md hover:scale-101 active:scale-99 transition-all cursor-pointer ${t.btnColor}`}
                >
                  <span>Select & Secure Code</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom amount trigger banner below cards */}
        <div className="text-center mt-12 max-w-xl mx-auto p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-xs font-bold text-slate-900 font-sans">Prefer to define your own size?</h4>
            <p className="text-[11px] text-slate-500">Every single dollar feeds, covers, or protects a growing orphan today.</p>
          </div>
          <button
            id="custom-give-banner-btn"
            onClick={() => onDonateClick(1)}
            className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
          >
            Custom Donation Amount
          </button>
        </div>

      </div>
    </section>
  );
}

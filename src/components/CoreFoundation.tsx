import { Target, Eye, Scale, HelpCircle, Heart, ShieldAlert, Sparkles, UserCheck, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export default function CoreFoundation() {
  const objectives = [
    { title: 'Support Orphans', desc: 'Providing stable nourishment, continuous safety modules, and access to basic schooling kits.', icon: Sparkles, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { title: 'Sustain the Poor', desc: 'Direct food baskets, clothing, and primary survival grants directly conveyed with zero waste.', icon: Heart, color: 'text-rose-600 bg-rose-50 border-rose-100' },
    { title: 'Empower Widows', desc: 'Sponsoring localized safety spaces, micro-support cards, and community connection hubs.', icon: UserCheck, color: 'text-sky-600 bg-sky-50 border-sky-100' },
    { title: 'Rescue War Victims', desc: 'Deploying rapid-response blankets, warm shelter materials, and medicine to conflict hotspots.', icon: ShieldAlert, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' }
  ];

  return (
    <section id="core-foundation" className="py-20 bg-gradient-to-b from-slate-100/40 via-white to-sky-50/20 relative overflow-hidden border-t border-slate-200/60">
      {/* Background radial and grid elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[35rem] bg-sky-200/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold text-sky-700 bg-sky-100 rounded-full mb-3 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            Vow & Foundation Rules
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            The Pillars of Good Samaritan <span className="text-sky-600">for Children</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 max-w-2xl mx-auto leading-relaxed">
            Registered and organized to execute the highest layout of empathy. We serve representing a direct bridge of survival.
          </p>
        </div>

        {/* Brand Core Grid (Mission, Vision, Motto) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          
          {/* Box 1: Mission */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-3xl border border-sky-100/80 shadow-sm relative overflow-hidden text-left flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div>
              <div className="p-3 bg-sky-100 text-sky-600 rounded-2xl w-fit mb-6 border border-sky-200/45">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-sky-700 tracking-widest uppercase block mb-1">Our Core Mission</span>
              <h3 className="text-2xl font-black text-slate-900 font-display tracking-tight leading-none mb-3">
                &ldquo;GENATERATE&rdquo;
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                To generate constant, verified streams of immediate relief, clinical supplies, and hope. We bypass massive administrative structures to channel resources straight to ground-level caregivers.
              </p>
            </div>
            <div className="text-xs text-sky-600 font-bold flex items-center gap-1.5 font-mono">
              <span>98% Direct Conveyance Ratio</span>
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-ping"></span>
            </div>
          </motion.div>

          {/* Box 2: Vision */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-indigo-100/80 shadow-sm relative overflow-hidden text-left flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div>
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl w-fit mb-6 border border-indigo-200/45">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-indigo-700 tracking-widest uppercase block mb-1">Our Longterm Vision</span>
              <h3 className="text-xl font-bold text-slate-900 font-display tracking-tight mb-3">
                Restoring Human Dignity
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                To build a globally coordinated network where orphans, widows, and war-torn modular camps are sustained, shielded, and integrated back into secure education opportunities with peace.
              </p>
            </div>
            <div className="text-xs text-indigo-600 font-bold flex items-center gap-1 font-mono">
              <span>Real-time Ledger Accountability</span>
            </div>
          </motion.div>

          {/* Box 3: Motto */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-950 p-8 rounded-3xl border border-slate-900 shadow-xl relative overflow-hidden text-left flex flex-col justify-between hover:scale-[1.01] transition-all group text-slate-200"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div>
              <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl w-fit mb-6 border border-amber-400">
                <Scale className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-400 tracking-widest uppercase block mb-1">Our Guiding Motto</span>
              <h3 className="text-xl font-bold text-white font-display tracking-tight mb-3 italic">
                &ldquo;Speak up and judge fairly&rdquo;
              </h3>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed mb-6">
                We take our absolute standard from Proverbs 31:9. We speak for those without voice, advocate for fair resource distribution, and defend the rights of the poor and needy.
              </p>
            </div>
            <div className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded w-fit border border-white/10">
              Proverbs 31:9 Standard
            </div>
          </motion.div>

        </div>

        {/* Central Objectives Row */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="border-t border-slate-200/80 pt-12 text-center mb-10">
            <h3 className="text-xs font-bold text-slate-450 uppercase tracking-widest font-mono">
              FOUNDATIONAL CORE OBJECTIVES
            </h3>
            <p className="text-lg font-bold text-slate-800 font-display mt-1">
              Who We Are Sworn To Direct Support
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {objectives.map((obj, i) => {
              const Icon = obj.icon;
              return (
                <motion.div
                  id={`objective-card-${obj.title.toLowerCase().replace(/\s+/g, '-')}`}
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs text-left hover:border-sky-200 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`p-2.5 rounded-xl border w-fit mb-4 ${obj.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm font-display">{obj.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-sans">{obj.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

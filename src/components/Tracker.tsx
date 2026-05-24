import { Activity, ShieldCheck, Heart, Users2 } from 'lucide-react';

interface TrackerProps {
  totalRaised: number;
  totalGoal: number;
  mealsServed: number;
  donorsCount: number;
}

export default function Tracker({ totalRaised, totalGoal, mealsServed, donorsCount }: TrackerProps) {
  const percentage = Math.min(Math.round((totalRaised / totalGoal) * 100), 100);

  return (
    <section id="overview" className="py-16 bg-slate-50 border-y border-sky-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-100 rounded-full mb-3 uppercase tracking-wider font-mono">
            <Activity className="w-3.5 h-3.5" />
            LIVE TRANSPARENCY PIPELINE
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight sm:text-4xl">
            Your impact in real-time
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Unlike traditional organizations, we update our books dynamically. Every dollar is logged instantly, ensuring full fiduciary disclosure.
          </p>
        </div>

        {/* Dynamic visual counters container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
          {/* Box 1: Raised */}
          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm flex items-center gap-4 hover:border-sky-200 transition-colors">
            <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
              <Heart className="w-6 h-6 fill-sky-200 stroke-[2]" />
            </div>
            <div>
              <span className="block text-xs text-slate-450 uppercase tracking-widest font-semibold">Total Raised Live</span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
                ${totalRaised.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Box 2: Goal target */}
          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm flex items-center gap-4 hover:border-sky-200 transition-colors">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users2 className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <span className="block text-xs text-slate-450 uppercase tracking-widest font-semibold">Active Partners</span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
                {donorsCount.toLocaleString()} donors
              </span>
            </div>
          </div>

          {/* Box 3: Meals served */}
          <div className="bg-gradient-to-br from-sky-600 to-indigo-650 bg-sky-600 p-6 rounded-2xl border border-sky-550 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-white/20 text-white border border-white/30 rounded-xl">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <span className="block text-xs text-sky-100 font-bold uppercase tracking-widest">Meals Guaranteed</span>
              <span id="live-meals-served" className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {mealsServed.toLocaleString()} served
              </span>
            </div>
          </div>
        </div>

        {/* Large Progress Bar bar */}
        <div id="progress-container" className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-600"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <div>
              <span className="block text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">
                Active Winter coats & Food drive
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-lg font-bold text-slate-900 font-display">6,210 meals served this month</span>
                <span className="inline-block px-2 py-0.5 bg-sky-100 text-sky-700 text-[10px] font-bold rounded">
                  {percentage}% OF GOAL REACHED
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="block text-xs text-slate-400 uppercase tracking-widest font-semibold header font-mono">Goal target</span>
              <span className="text-xl font-bold text-slate-950 font-mono">${totalGoal.toLocaleString()}</span>
            </div>
          </div>

          {/* Visual actual progress bar */}
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-3 relative border border-slate-200/50">
            <div
              id="progress-fill-bar"
              style={{ width: `${percentage}%` }}
              className="h-full bg-gradient-to-r from-sky-500 via-sky-650 to-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-inner"
            ></div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 font-mono mt-1">
            <span>$0 starting drive</span>
            <span className="font-semibold text-slate-700">${totalRaised.toLocaleString()} raised</span>
            <span>${totalGoal.toLocaleString()} target</span>
          </div>

          {/* SSL secure indicator line */}
          <p className="text-[11px] text-slate-400/90 text-center mt-5 leading-normal flex items-center justify-center gap-1.5 border-t border-slate-100 pt-4 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Audit Statement: 100% of the funds go towards field operations, audited by the Registry.
          </p>
        </div>

      </div>
    </section>
  );
}

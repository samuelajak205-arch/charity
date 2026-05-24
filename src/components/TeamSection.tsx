import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { motion } from 'motion/react';
import { Users, Shield, ArrowUpDown, Award, Star, Mail } from 'lucide-react';

export default function TeamSection() {
  const { teamMembers } = useAppState();
  const [ascendingByRank, setAscendingByRank] = useState(false); // false = rank 5 to 1 (smallest post to CEO)

  // Sort team members based on the user's focus
  // Rank 5 is "smallest post", Rank 1 is "CEO"
  // ascendingByRank = true: rank 1 first (CEO to smallest)
  // ascendingByRank = false: rank 5 first (smallest post to CEO)
  const sortedMembers = [...teamMembers].sort((a, b) => {
    return ascendingByRank ? a.rank - b.rank : b.rank - a.rank;
  });

  return (
    <section id="our-humanitarian-team" className="py-20 bg-gradient-to-b from-sky-50/20 via-white to-slate-100/30 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 max-w-6xl mx-auto">
          <div className="text-left max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-sky-700 bg-sky-100 rounded-full mb-3 uppercase tracking-wider font-mono">
              <Users className="w-3.5 h-3.5" />
              Proverbs 31:9 Guardians Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              Meet Our Team of Samaritans
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              From our dedicated field interns directly packing relief containers, to regional caretaker supervisors and directors. All ranks are assigned with absolute parity by the administrative board.
            </p>
          </div>

          {/* Interactive Control to toggle Post Ranking Sort */}
          <button
            id="toggle-team-sort"
            onClick={() => setAscendingByRank(!ascendingByRank)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-sky-300 rounded-xl text-xs font-bold text-slate-700 shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer select-none self-start md:self-auto"
          >
            <ArrowUpDown className="w-4 h-4 text-sky-600" />
            <span>Order: {ascendingByRank ? 'CEO down to Interns' : 'Interns up to CEO (Smallest Post First)'}</span>
          </button>
        </div>

        {/* Dynamic Sorted Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {sortedMembers.map((member, i) => {
            const isCEO = member.rank === 1;
            const isIntern = member.rank >= 5;
            
            return (
              <motion.div
                id={`team-member-card-${member.id}`}
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`bg-white rounded-3xl border p-5 text-left flex flex-col justify-between group transition-all duration-300 relative ${
                  isCEO 
                    ? 'border-indigo-200/80 shadow-md shadow-indigo-50/30' 
                    : isIntern
                    ? 'border-slate-200/90 shadow-2xs hover:border-amber-305'
                    : 'border-slate-200 shadow-2xs hover:border-sky-305'
                }`}
              >
                {/* Visual indicator for Post Hierarchy level */}
                <div className="absolute top-4 right-4 flex items-center gap-1">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isCEO 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : isIntern
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-sky-100 text-sky-700'
                  }`}>
                    Rank {member.rank}
                  </span>
                </div>

                <div>
                  {/* Photo Container */}
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden mb-5 border border-slate-200 group-hover:scale-102 transition-transform">
                    <img
                      src={member.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120';
                      }}
                    />
                    {isCEO && (
                      <div className="absolute bottom-0 right-0 p-0.5 bg-indigo-650 text-white rounded">
                        <Award className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {/* Name and Designation */}
                  <div>
                    <h3 className="font-bold text-slate-905 text-sm sm:text-base font-display flex items-center gap-1">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-sky-600 mt-0.5 leading-snug">{member.role}</p>
                  </div>

                  {/* Profile bio */}
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-4 font-sans line-clamp-4">
                    {member.bio}
                  </p>

                  {isCEO && (
                    <button
                      id="team-ceo-journey-trigger"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-ceo-modal'))}
                      className="mt-4 w-full py-2 px-3 bg-amber-500/10 hover:bg-amber-550 hover:bg-amber-500 text-amber-700 hover:text-slate-950 font-extrabold text-[11px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 border border-amber-500/20"
                    >
                      <Star className="w-3.5 h-3.5 fill-current shrink-0 animate-pulse" />
                      <span>Read Spiritual Calling Story</span>
                    </button>
                  )}
                </div>

                {/* Footer details */}
                <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between">
                  {member.email ? (
                    <a
                      id={`mail-team-${member.id}`}
                      href={`mailto:${member.email}`}
                      className="text-[10px] text-slate-400 hover:text-sky-600 font-mono flex items-center gap-1 select-none"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email direct</span>
                    </a>
                  ) : (
                    <span className="text-[9px] text-slate-350 font-mono">Volunteer Post</span>
                  )}

                  <span className="text-[10px] text-slate-400 font-mono font-medium">
                    {isCEO ? 'Executive' : isIntern ? 'Operational' : 'Field Lead'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

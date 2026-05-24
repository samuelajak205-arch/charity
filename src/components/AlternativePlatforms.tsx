import { ExternalLink, Gift, Heart, Users, Coffee, Sparkles, Video, Play } from 'lucide-react';
import { useAppState } from '../context/AppContext';

interface AlternativePlatformsProps {
  onDonateClick?: () => void;
}

export default function AlternativePlatforms({ onDonateClick }: AlternativePlatformsProps) {
  const { platformVideoLinks } = useAppState();
  const platforms = [
    {
      id: 'gofundme',
      name: 'GoFundMe',
      tagline: 'Direct Community Crowdfunding',
      description: 'Our primary critical-response backup fund. Best for community shares, tax receipts in various regions, and tracking overall campaign progression.',
      platformUrl: 'https://gofundme.com/f/helporphansnow-emergency',
      actionText: 'Support on GoFundMe',
      brandColor: 'emerald',
      bgColor: 'bg-emerald-50/60 hover:bg-emerald-50 border-emerald-100 hover:border-emerald-300',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      textColor: 'text-emerald-900',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10 hover:shadow-emerald-600/20 text-white',
      logoChar: 'G',
      metric: '$12,450 Raised • 188 Backers',
    },
    {
      id: 'justgiving',
      name: 'JustGiving',
      tagline: 'International & Gift Aid Hub',
      description: 'Ideal for European & UK supporters. Integrates standard UK Gift Aid to instantly claim an extra 25% value on your compassionate gifts at zero extra cost to you.',
      platformUrl: 'https://justgiving.com/campaign/helporphansnow',
      actionText: 'Give via JustGiving',
      brandColor: 'fuchsia',
      bgColor: 'bg-fuchsia-50/60 hover:bg-fuchsia-50 border-fuchsia-100 hover:border-fuchsia-300',
      badgeColor: 'bg-fuchsia-100 text-fuchsia-800',
      textColor: 'text-fuchsia-900',
      btnBg: 'bg-fuchsia-600 hover:bg-fuchsia-700 shadow-fuchsia-600/10 hover:shadow-fuchsia-600/20 text-white',
      logoChar: 'J',
      metric: 'Gift Aid Active • UK Tax-Smart',
    },
    {
      id: 'patreon',
      name: 'Patreon Sponsorship Circle',
      tagline: 'Recurring Monthly Co-Sponsorship',
      description: 'Become a sustained guardian. Sponsors a continuous recurring loop of sterile grain, books, and caretaker salaries on a predictable monthly rhythm.',
      platformUrl: 'https://patreon.com/helporphansnow',
      actionText: 'Subscribe on Patreon',
      brandColor: 'rose',
      bgColor: 'bg-rose-50/60 hover:bg-rose-50 border-rose-100 hover:border-rose-305',
      badgeColor: 'bg-rose-100 text-rose-800',
      textColor: 'text-rose-900',
      btnBg: 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/10 hover:shadow-rose-600/20 text-white',
      logoChar: 'P',
      metric: '18 Active Guardians • Sustained Loop',
    },
    {
      id: 'buymeacoffee',
      name: 'Buy Me A Coffee',
      tagline: 'Stationery & Micro-Funding Bags',
      description: 'Quick micro-gifts for immediate study logs, pens, warm beanies, or single warm nutritious loaves. Highly modular, easy payment setups, instantaneous handoff logs.',
      platformUrl: 'https://buymeacoffee.com/helporphansnow',
      actionText: 'Send a Micro-Gift ($5)',
      brandColor: 'amber',
      bgColor: 'bg-amber-50/60 hover:bg-amber-50 border-amber-100 hover:border-amber-300',
      badgeColor: 'bg-amber-100 text-amber-900',
      textColor: 'text-amber-900',
      btnBg: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/10 hover:shadow-amber-500/20 text-slate-950',
      logoChar: '☕',
      metric: '320 Coffee Bundles given to logistics',
    },
  ];

  return (
    <section id="alternative-impact-channels" className="py-16 sm:py-24 bg-gradient-to-b from-white to-sky-50/40 relative overflow-hidden border-t border-sky-100">
      {/* Background glow flares */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-fuchsia-100/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-100 border border-sky-200/50 rounded-full mb-3 uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Crowdfunding Pipelines
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight sm:text-4xl">
            Sponsor via External Platforms
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Prefer to handle your contributions through trusted international networks? Or looking to build a team-driven fundraiser? We operate verified alternative pipelines on other secure platforms.
          </p>
        </div>

        {/* Channels Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {platforms.map((platform) => (
            <div
              id={`platform-card-${platform.id}`}
              key={platform.id}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${platform.bgColor} shadow-sm group`}
            >
              <div className="space-y-5">
                {/* Header Row */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-extrabold text-base border ${
                      platform.id === 'gofundme' ? 'bg-emerald-600 text-white border-emerald-500' :
                      platform.id === 'justgiving' ? 'bg-fuchsia-600 text-white border-fuchsia-500' :
                      platform.id === 'patreon' ? 'bg-rose-600 text-white border-rose-500' :
                      'bg-amber-500 text-slate-950 border-amber-400'
                    }`}>
                      {platform.logoChar}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug font-display">
                        {platform.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {platform.tagline}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded-md font-mono ${platform.badgeColor}`}>
                    VERIFIED CHANNEL
                  </span>
                </div>

                {/* Description Text */}
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed text-left">
                  {platform.description}
                </p>
              </div>

              {/* Bottom actionable tray */}
              <div className="mt-8 pt-4 border-t border-slate-205/50 border-dashed flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left w-full sm:w-auto">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                    CURRENT STATE LOGS
                  </span>
                  <span className="text-xs font-semibold text-slate-700 block mt-0.5">
                    {platform.metric}
                  </span>
                </div>

                <a
                  id={`link-platform-${platform.id}`}
                  href={platform.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto px-4.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${platform.btnBg}`}
                >
                  <span>{platform.actionText}</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Uploaded Videos & Platform Streams */}
        {platformVideoLinks && platformVideoLinks.length > 0 && (
          <div id="uploaded-resources-shelf" className="mt-20 pt-16 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-sky-700 bg-sky-100 rounded-full mb-3 uppercase tracking-wider font-mono">
                <Video className="w-3.5 h-3.5" />
                Uploaded Videos & Platforms
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display sm:text-3xl">
                Uploaded Photo & Video Campaign Links
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Dynamic visual folders, platform integrations, and video logs loaded by the developer coordinator suite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
              {platformVideoLinks.map((link) => (
                <div
                  id={`resource-card-${link.id}`}
                  key={link.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col hover:border-sky-300 hover:shadow-md transition-all group"
                >
                  <div className="relative aspect-video w-full bg-slate-100">
                    <img
                      src={link.thumbnailUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600'}
                      alt={link.title}
                      className="w-full h-full object-cover group-hover:scale-101 transition-all"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600';
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/45 transition-all flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
                        {link.type === 'video' ? (
                          <Play className="w-4 h-4 fill-current ml-0.5 text-sky-600" />
                        ) : (
                          <ExternalLink className="w-4 h-4 stroke-[2.5] text-sky-600" />
                        )}
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-slate-900/85 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      {link.platformName} • {link.type}
                    </span>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm font-display mb-1 group-hover:text-sky-650 transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                        {link.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase font-mono">
                        PLATFORM PIPELINE
                      </span>
                      <a
                        id={`dynamic-platform-link-${link.id}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-100 hover:bg-sky-600 hover:text-white rounded-lg text-[10px] sm:text-[11px] font-bold text-slate-700 flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <span>View Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive team banner below platform cards */}
        <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-r from-sky-600 to-indigo-650 rounded-3xl p-6 sm:p-8 text-white text-left relative overflow-hidden shadow-xl shadow-sky-600/10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none -translate-y-8 translate-x-8"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                Collective Force Group Fundraisers
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight">
                Want to kick off a local team fundraiser?
              </h3>
              <p className="text-xs text-sky-100 max-w-xl leading-relaxed">
                Connect your business, student group, or family effort to our primary GoFundMe campaign tree. We will dispatch customized verified field reports with your group's specific name displayed!
              </p>
            </div>
            
            <a
              id="team-gofundme-btn"
              href="https://gofundme.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white text-sky-700 hover:text-sky-850 font-bold text-xs rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer shrink-0 w-full md:w-auto text-center flex items-center justify-center gap-1.5"
            >
              <span>Launch GoFundMe Team Match</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

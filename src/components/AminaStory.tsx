import { useState } from 'react';
import { Quote, Play, X, ShieldX, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppState } from '../context/AppContext';
import aminaPic from '../assets/images/story_amina_1779610967996.png';

interface AminaStoryProps {
  onDonateClick: (amount?: number) => void;
}

export default function AminaStory({ onDonateClick }: AminaStoryProps) {
  const { galleryPhotos, testimonials } = useAppState();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-gradient-to-b from-sky-50/40 via-white to-slate-100/30 text-slate-900 border-t border-sky-100 relative overflow-hidden">
      {/* Visual glowing backgrounds */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section title */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-100 border border-sky-200/50 rounded-full mb-3 uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            Vivid stories of resilience
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight sm:text-4xl">
            Human lives behind the metrics
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Behind every number in our Tracker is a living, breathing child whose story is being rewritten. Meet those whose lives were altered through your kindness.
          </p>
        </div>

        {/* Story details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Amina story card split */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="bg-white border border-sky-100/80 rounded-3xl p-6 sm:p-8 relative shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                <div className="h-16 w-16 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200">
                  <img
                    src={aminaPic}
                    alt="Amina Smiling Portrait"
                    className="h-full w-full object-cover scale-102"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900 font-display">Amina</span>
                    <span className="px-2 py-0.5 bg-sky-100 text-sky-700 border border-sky-200/50 rounded font-mono text-[9px] font-bold">SPONSORED</span>
                  </div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">8 Years Old • Conflict Survivor</span>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-3 -left-2 w-8 h-8 text-sky-505 text-sky-500/10 fill-current pointer-events-none animate-pulse" />
                <p className="text-slate-700 italic text-base leading-relaxed pl-6">
                  &ldquo;Amina lost her parents to escalating conflict and fled with her remaining aging grandmother. She slept hungry in dark tents, until regular sponsors rescued her family, delivering milk, books, and shelter security. Today, she goes to school every morning.&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-4">
                <blockquote className="text-sky-655 font-display font-medium text-sm flex items-start gap-1 bg-sky-50/60 rounded-xl p-3.5 border border-sky-100/50 w-full">
                  <span>&ldquo;I want to study hard and become a teacher so I can help other children like me.&rdquo;</span>
                </blockquote>
              </div>

              {/* Specific sponsorship CTA */}
              <button
                id="amina-sponsor-btn"
                onClick={() => onDonateClick(25)}
                className="w-full mt-6 py-3.5 bg-sky-600 hover:bg-sky-700 font-bold text-sm text-white rounded-xl shadow-lg hover:shadow-sky-500/20 transition-all active:scale-98 cursor-pointer"
              >
                Restore Amina's Future for $25
              </button>
            </div>

            {/* Testimonial callout info */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/50 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Ethical Media Policy</h4>
                <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                  We strictly respect the protection and dignity of all children. Names have been changed with active local guardian consent, and facial features blurred where high-risk regional security required shield protection.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual impact blocks */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {galleryPhotos.map((photo) => (
                <div
                  id={`gallery-photo-${photo.id}`}
                  key={photo.id}
                  className="group border border-slate-220 rounded-2xl overflow-hidden bg-white shadow-xs text-left hover:border-sky-100 transition-colors"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100 relative">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition duration-550"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4">
                    <span className="block text-[9px] text-sky-600 font-mono font-bold uppercase tracking-wider mb-1">
                      {photo.tag}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-910 font-display">{photo.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                      {photo.desc}
                    </p>
                  </div>
                </div>
              ))}

            </div>

            {/* Testimonial loop triggering play button */}
            <div className="relative border border-sky-100 rounded-3xl p-6 bg-gradient-to-r from-sky-50 via-white to-sky-100/50 text-left flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase tracking-wider rounded mb-2">
                  Volunteer Log
                </span>
                <h4 className="text-base font-bold text-slate-900 font-display">Watch Volunteer Testimonial</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Listen to Sister Sarah, lead caretaker, explain how local kitchen budgets are managed live on site. (2-min documentary)
                </p>
              </div>
              <button
                id="play-testimonial-btn"
                onClick={() => setIsVideoOpen(true)}
                className="p-4 bg-sky-600 hover:bg-sky-700 text-white rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-sky-500/20 shrink-0 self-start sm:self-center cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>

          </div>

        </div>

        {/* Verified Recurring Donors Testimonials Section */}
        <div id="donor-testimonials-grid" className="mt-20 pt-16 border-t border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full mb-3 uppercase tracking-wider font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Verified Recurring Guardians
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Words from Our Continuous Sponsors
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Our monthly guardians co-sign clean water logistics and formula packages. Here is what they say about our transaction ledgers.
            </p>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto">
              <p className="text-xs text-slate-500">No verified testimonials added yet. Log in as Samuel Admin to add testimonials in the suite.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((test) => (
                <div
                  id={`donor-testimonial-${test.id}`}
                  key={test.id}
                  className="bg-white p-6 rounded-3xl border border-slate-150 shadow-xs flex flex-col justify-between hover:border-sky-305 hover:shadow-sm transition-all text-left"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-4 text-amber-500 text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic mb-6">
                      &ldquo;{test.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 flex-shrink-0">
                    <img
                      src={test.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'}
                      alt={test.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120';
                      }}
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-display leading-tight">{test.name}</h4>
                      <div className="flex flex-wrap items-center gap-1 md:gap-1.5 text-[9px] sm:text-[10px] text-slate-500 font-mono mt-0.5">
                        <span>{test.location}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-1 py-0.2 rounded-sm">{test.frequency} ({test.amountDetails})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Testimonial simulated Video overlay Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <div id="video-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              id="video-pane"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative text-left shadow-2xl"
            >
              <button
                id="close-video-modal"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-full mb-3 uppercase tracking-wider font-mono">
                <Volume2 className="w-3.5 h-3.5" />
                Live Witness Transcription
              </span>
              
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 mb-4">
                Testimonial: Ground Truth from Damascus Outskirts
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-650 bg-slate-50 p-4 border border-slate-200/50 rounded-2xl relative">
                <p className="leading-relaxed text-slate-700">
                  <strong className="text-slate-905 text-xs block mb-1">Caretaker Sister Sarah:</strong>
                  &ldquo;Your gifts are received directly by the procurement drivers here. We buy wheat flour, cooking butter, and local child medicine. We do not pay administrative fees or lease high offices. We live right inside the modules with the kids. Your $1 literally turns into bread and soup. Thank you.&rdquo;
                </p>
                <div className="w-full text-center py-5 border-t border-slate-200/50 flex justify-center flex-col items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-sky-600 animate-spin mb-2"></div>
                  <span className="text-[10px] text-slate-550 font-mono">Simulating interactive video timeline feed...</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  id="close-video-btn"
                  onClick={() => setIsVideoOpen(false)}
                  className="flex-1 py-3 text-center border border-slate-200 font-semibold text-xs rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Close Testimonial
                </button>
                <button
                  id="donate-from-video-btn"
                  onClick={() => {
                    setIsVideoOpen(false);
                    onDonateClick(7);
                  }}
                  className="flex-1 py-3 text-center bg-sky-600 text-white font-bold text-xs rounded-xl hover:bg-sky-700 transition-colors cursor-pointer"
                >
                  Feed for $7 Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

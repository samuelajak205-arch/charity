import React, { useState } from 'react';
import { Send, Mail, MessageSquare, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import { useAppState } from '../context/AppContext';

export default function ContactForm() {
  const { submitContactForm } = useAppState();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Call Context to log the contact message and alert administrators
    submitContactForm(formData.name, formData.email, formData.message);
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4500);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          
          {/* Left Block: Charity Contact/Trust Info */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-50 border border-sky-100 rounded-full mb-3 uppercase tracking-wider font-mono">
                Get in touch
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight sm:text-4xl">
                Still have questions? Let&apos;s talk.
              </h2>
              <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
                Whether you want to coordinate wire transfers, request audit ledgers, or volunteer on site, our caretakers are ready to chat.
              </p>
            </div>

            {/* Support Links Grid */}
            <div className="space-y-4">
              {/* Box 1: Email */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-start gap-3.5">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl border border-sky-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-display">Direct Care Department</h4>
                  <p className="text-xs text-slate-500 mt-0.5">We respond to coordinates within 4 hours.</p>
                  <a href="mailto:charity@email.org" className="text-sm font-semibold text-sky-600 hover:underline mt-1.5 inline-block">
                    charity@email.org
                  </a>
                </div>
              </div>

              {/* Box 2: WhatsApp info */}
              <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100 flex items-start gap-3.5">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 font-display">Urgent Hot Desk (WhatsApp)</h4>
                  <p className="text-xs text-emerald-600 mt-0.5">Reach our physical field office directly.</p>
                  <a
                    href="https://wa.me/12345678"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-emerald-705 hover:underline mt-1.5 inline-block"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Audit badge */}
            <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Regulated Entity Trust</span>
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-bold text-slate-700">Registered Charity ID: #12345</span>
              </div>
            </div>
          </div>

          {/* Right Block: Pure simple message form */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm text-left">
            <h3 className="text-xl font-bold text-slate-950 font-display">Write a Message</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Write your inquiry below. No account, telephone, or complex identification is required.
            </p>

            {isSubmitted ? (
              <div id="contact-success-pane" className="py-12 text-center flex flex-col items-center justify-center">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full mb-4">
                  <CheckCircle2 className="w-8 h-8 fill-current" />
                </div>
                <h4 className="text-lg font-bold text-slate-950 font-display">Message Sent!</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Thank you, {formData.name || 'friend'}. One of our primary caretakers will respond to your address ({formData.email}) shortly.
                </p>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Email address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="jane@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    How can we help you?
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="We want to support block logistics..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                  ></textarea>
                </div>

                <button
                  id="submit-contact-btn"
                  type="submit"
                  className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Submit Inquiry Securely</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

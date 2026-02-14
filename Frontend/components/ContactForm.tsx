
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-transparent relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-kaal-accent opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-7xl font-display font-bold leading-tight mb-8">
              Let's Build Something <span className="text-kaal-accent">That Matters</span>.
            </h2>
            <p className="text-xl text-kaal-muted mb-12 max-w-lg leading-relaxed">
              Tell me about your project.<br />
              I personally reply within 24 hours.<br /><br />
              No middlemen. No account managers.<br />
              Just direct collaboration.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-transparent rounded-xl border border-white/10">
                  <svg className="w-5 h-5 text-kaal-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-kaal-muted font-bold">Email</span>
                  <span className="text-lg font-body font-bold">hello@kaal.studio</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-transparent rounded-xl border border-white/10">
                  <svg className="w-5 h-5 text-kaal-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-kaal-muted font-bold">Response Time</span>
                  <span className="text-lg font-body font-bold">Under 24 Hours</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="glass p-8 md:p-12 rounded-[2rem] border-kaal-border relative z-[3]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 bg-kaal-success/20 text-kaal-success flex items-center justify-center rounded-full mb-8">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Message Sent!</h3>
                  <p className="text-kaal-muted font-body">Thank you for reaching out. I'll be in touch very soon.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="mt-8 text-kaal-accent font-body font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-kaal-muted font-bold pl-1">Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Daniel Reed"
                        className="w-full bg-transparent border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-kaal-accent/50 focus:border-kaal-accent transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-kaal-muted font-bold pl-1">Email</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="daniel@saas.com"
                        className="w-full bg-transparent border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-kaal-accent/50 focus:border-kaal-accent transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-kaal-muted font-bold pl-1">Project Details</label>
                    <textarea 
                      required 
                      rows={10}
                      placeholder="Tell me about your project..."
                      className="w-full bg-transparent border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-kaal-accent/50 focus:border-kaal-accent transition-all" 
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={formState === 'loading'}
                    className="w-full py-5 bg-kaal-accent text-white rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(255,77,26,0.4)] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    {formState === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : 'Send Message'}
                  </button>
                  <p className="text-center text-xs text-kaal-muted font-body font-medium pt-4">
                    No obligation. Just clarity.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

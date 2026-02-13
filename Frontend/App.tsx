
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import SignatureWork from './components/SignatureWork';
import ProcessTimeline from './components/ProcessTimeline';
import Services from './components/Services';
import Testimonials3D from './components/Testimonials3D';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import StoryChapter from './components/StoryChapter';
import InkSwirl from './components/InkSwirl';

const App: React.FC = () => {
  // Simple smooth scroll behavior
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen font-body selection:bg-kaal-accent selection:text-white relative bg-[#000000]">
      {/* Site-wide Ink Swirl Background - Cursor Trail Only */}
      <div className="fixed inset-0 w-full h-full z-[1] pointer-events-none">
        <InkSwirl />
      </div>
      
      <ScrollProgress />
      <Navbar />
      
      <main className="relative z-[2]">
        {/* Chapter 0: The Hook */}
        <Hero />
        
        {/* Chapter 1: The Problem */}
        <StoryChapter chapterNumber={1} title="The Problem" showTitle={false}>
          <Problem />
        </StoryChapter>
        
        {/* Chapter 2: The Philosophy */}
        <StoryChapter chapterNumber={2} title="The Philosophy" showTitle={false}>
          <section id="about" className="py-24 px-6 md:px-12 bg-transparent border-y border-kaal-border min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center w-full">
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] mb-8">
                Design Should Feel <span className="text-kaal-accent italic">Intentional</span>.
              </h2>
              <p className="text-kaal-muted text-xl font-body leading-relaxed mb-10">
                Founded by design obsessives, Kaal was built to solve a single problem: the digital landscape is loud but generic. We help ambitious brands break through the noise by building high-performance sites that don&apos;t just look like art—they convert like machines.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: 'Clarity', desc: 'Zero friction journeys.' },
                  { title: 'Emotion', desc: 'Cinematic impact.' },
                  { title: 'ROI', desc: 'Conversion driven.' }
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass p-6 rounded-2xl cursor-pointer z-[3]"
                  >
                    <span className="block font-display font-bold mb-2">{item.title}</span>
                    <p className="text-xs text-kaal-muted font-body">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="w-full md:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-transparent border border-white/10 group z-[3]">
                <img 
                  src="https://picsum.photos/seed/agency/800/1000" 
                  alt="Studio vibe" 
                  className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0 duration-1000"
                />
                <div className="absolute inset-0 bg-kaal-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {/* Floating Badge */}
              <motion.div 
                className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl flex items-center gap-4 z-[4]"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 rounded-full bg-kaal-accent flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div>
                  <span className="block font-bold">Fast Scale</span>
                  <span className="text-[10px] text-kaal-muted uppercase tracking-widest font-bold">Performance DNA</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        </StoryChapter>

        {/* Chapter 3: The Work */}
        <StoryChapter chapterNumber={3} title="The Work" showTitle={false}>
          <SignatureWork />
        </StoryChapter>

        {/* Chapter 4: The Process */}
        <StoryChapter chapterNumber={4} title="The Process" showTitle={false}>
          <ProcessTimeline />
        </StoryChapter>

        {/* Chapter 5: The Services */}
        <StoryChapter chapterNumber={5} title="The Services" showTitle={false}>
          <Services />
        </StoryChapter>

        {/* Chapter 6: The Proof */}
        <StoryChapter chapterNumber={6} title="The Proof" showTitle={false}>
          <Testimonials3D />
        </StoryChapter>

        {/* Chapter 7: The Call */}
        <StoryChapter chapterNumber={7} title="The Call" showTitle={false}>
          <ContactForm />
        </StoryChapter>
      </main>

      <Footer />
    </div>
  );
};

export default App;

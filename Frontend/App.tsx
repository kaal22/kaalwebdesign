import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import IntentionalSystemSection from './components/IntentionalSystemSection';
import BlazingFastSection from './components/BlazingFastSection';
import ProcessTimeline from './components/ProcessTimeline';
import Services from './components/Services';
import Testimonials3D from './components/Testimonials3D';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import StoryChapter from './components/StoryChapter';
import InkSwirl from './components/InkSwirl';
import CustomCursor from './components/CustomCursor';
import { useReducedMotion } from './hooks/useReducedMotion';

const App: React.FC = () => {
  const { shouldReduceMotion } = useReducedMotion();

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
      {/* Custom Cursor - Desktop Only */}
      <CustomCursor />
      
      {/* Site-wide Ink Swirl Background - Cursor Trail Only */}
      <div className="fixed inset-0 w-full h-full z-[1] pointer-events-none">
        <InkSwirl />
      </div>
      
      {/* Scroll progress bar - desktop only to reduce scroll jank on mobile */}
      {!shouldReduceMotion && <ScrollProgress />}
      <Navbar />
      
      <main className="relative z-[2]">
        {/* Chapter 0: The Hook */}
        <Hero />
        
        {/* Chapter 1: The Problem */}
        <StoryChapter chapterNumber={1} title="The Problem" showTitle={false}>
          <Problem />
        </StoryChapter>
        
        {/* Chapter 2: The System */}
        <StoryChapter chapterNumber={2} title="The Work" showTitle={false}>
          <IntentionalSystemSection />
        </StoryChapter>

        {/* Chapter 3: Blazing Fast */}
        <BlazingFastSection />

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

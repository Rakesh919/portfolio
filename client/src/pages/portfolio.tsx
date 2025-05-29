import { useEffect } from 'react';
import Navigation from '@/components/navigation';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Skills from '@/components/sections/skills';
import Experience from '@/components/sections/experience';
import Projects from '@/components/sections/projects';
import Education from '@/components/sections/education';
import Contact from '@/components/sections/contact';
import Footer from '@/components/footer';
import { useScrollAnimation } from '@/lib/animations';

export default function Portfolio() {
  useScrollAnimation();

  useEffect(() => {
    // Set page title and meta description
    document.title = 'Rakesh Sharma - Backend Developer Portfolio';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Backend Developer with 1+ years of experience designing scalable APIs and enhancing system performance. Specialized in Java, Spring Boot, and MongoDB.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Backend Developer with 1+ years of experience designing scalable APIs and enhancing system performance. Specialized in Java, Spring Boot, and MongoDB.';
      document.head.appendChild(meta);
    }

    // Add Open Graph tags
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = 'Rakesh Sharma - Backend Developer Portfolio';
    document.head.appendChild(ogTitle);

    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = 'Passionate Backend Developer with expertise in Java, Spring Boot, and MongoDB. View my projects and experience.';
    document.head.appendChild(ogDescription);

    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = 'website';
    document.head.appendChild(ogType);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

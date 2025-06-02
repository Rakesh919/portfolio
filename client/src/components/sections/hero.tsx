import { Button } from '@/components/ui/button';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import ParticleSystem from '@/components/3d/ParticleSystem';

export default function Hero() {
  const handleDownloadResume = () => {
    // Create a download link for the resume
    const link = document.createElement('a');
    link.href = '/Rakesh_Sharma_Resume.pdf';
    link.download = 'Rakesh_Sharma_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGetInTouch = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-primary/5 pt-20 relative overflow-hidden">
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticleSystem />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in-up">
          {/* Profile Image */}
          <div className="w-40 h-40 mx-auto mb-8 rounded-full gradient-bg flex items-center justify-center text-white text-5xl font-bold shadow-2xl floating-animation pulse-glow border-4 border-primary/30 backdrop-blur-sm">
            RS
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 gradient-text drop-shadow-2xl">
            Rakesh Sharma
          </h1>
          
          <div className="text-3xl md:text-4xl text-foreground/80 mb-8 h-16 font-semibold">
            <span className="typing-animation">Backend Developer</span>
          </div>
          
          <p className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Crafting scalable backend solutions with cutting-edge technology. 
            Specialized in high-performance APIs, microservices architecture, and database optimization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              onClick={handleDownloadResume}
              className="gradient-bg hover:scale-105 text-white px-10 py-5 h-auto font-bold text-lg hover-lift glow-effect border-2 border-primary/30"
            >
              <Download className="mr-3 h-6 w-6" />
              Download Resume
            </Button>
            <Button 
              variant="outline"
              onClick={handleGetInTouch}
              className="glass-effect border-2 border-primary/30 text-foreground hover:gradient-bg hover:text-white px-10 py-5 h-auto font-bold text-lg hover-lift"
            >
              Get In Touch
            </Button>
          </div>
          
          <div className="flex justify-center space-x-8">
            <a 
              href="https://linkedin.com/in/rakesh-sharma" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary text-3xl transition-all duration-300 hover-lift hover:scale-125 glow-effect p-3 rounded-full glass-effect"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://github.com/rakesh-sharma" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary text-3xl transition-all duration-300 hover-lift hover:scale-125 glow-effect p-3 rounded-full glass-effect"
            >
              <FaGithub />
            </a>
            <a 
              href="mailto:rakesh88577@gmail.com"
              className="text-foreground/70 hover:text-primary text-3xl transition-all duration-300 hover-lift hover:scale-125 glow-effect p-3 rounded-full glass-effect"
            >
              <Mail />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-slate-400 text-2xl" />
      </div>
    </section>
  );
}

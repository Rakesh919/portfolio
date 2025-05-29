import { Button } from '@/components/ui/button';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

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
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          {/* Profile Image Placeholder */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-4xl font-bold shadow-xl">
            RS
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
            Rakesh Sharma
          </h1>
          
          <div className="text-2xl md:text-3xl text-slate-600 mb-6 h-12">
            <span className="typing-animation">Backend Developer</span>
          </div>
          
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Passionate Backend Developer with 1+ years of experience designing scalable APIs and enhancing system performance. 
            Specialized in Java, Spring Boot, and MongoDB with a track record of improving database efficiency by 40%.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleDownloadResume}
              className="bg-primary hover:bg-blue-700 text-white px-8 py-4 h-auto font-semibold hover-lift"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
            <Button 
              variant="outline"
              onClick={handleGetInTouch}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 h-auto font-semibold hover-lift"
            >
              Get In Touch
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6 mt-8">
            <a 
              href="https://www.linkedin.com/in/rakesh-sharma-517589231/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary text-2xl transition-colors duration-300 hover-lift"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://github.com/Rakesh919" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary text-2xl transition-colors duration-300 hover-lift"
            >
              <FaGithub />
            </a>
            <a 
              href="mailto:rakesh88577@gmail.com"
              className="text-slate-400 hover:text-primary text-2xl transition-colors duration-300 hover-lift"
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

import { User } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            {/* Professional Photo Placeholder */}
            <div className="w-full max-w-md mx-auto aspect-square rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-500 text-6xl shadow-xl">
              <User />
            </div>
          </div>
          
          <div className="animate-on-scroll">
            <h3 className="text-3xl font-bold mb-6 text-secondary">Backend Developer & Problem Solver</h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              I'm a dedicated Backend Developer with over a year of hands-on experience in building scalable APIs 
              and optimizing system performance. My expertise lies in Java ecosystem technologies, particularly Spring Boot, 
              and NoSQL databases like MongoDB.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Currently working at OneTick Technologies, I've successfully optimized MongoDB queries, 
              reducing execution time by 40% and improving overall application performance. I'm passionate about 
              writing clean, efficient code and building robust backend systems.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-secondary mb-2">Location</h4>
                <p className="text-slate-600">Faridabad, India</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-secondary mb-2">Experience</h4>
                <p className="text-slate-600">1+ Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

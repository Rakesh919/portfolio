import { useEffect } from 'react';
import { Code, Layers, Database } from 'lucide-react';
import { useSkillProgress } from '@/lib/animations';

const skills = {
  programming: [
    { name: 'Java', level: 90 },
    { name: 'JavaScript', level: 70 },
  ],
  frameworks: [
    { name: 'Spring Boot', stars: 5 },
    { name: 'Spring MVC', stars: 4 },
    { name: 'Hibernate/JPA', stars: 4 },
    { name: 'Node.js/Express', stars: 3 },
  ],
  tools: [
    'MongoDB',
    'SQL Databases',
    'Git & GitHub',
    'RESTful APIs',
    'Microservices',
  ],
};

export default function Skills() {
  useSkillProgress();

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Technical Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Specialized in backend technologies with expertise in building scalable applications and optimizing performance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Programming Languages */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover-lift animate-on-scroll">
            <div className="text-primary text-4xl mb-4">
              <Code />
            </div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Programming Languages</h3>
            <div className="space-y-4">
              {skills.programming.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600">{skill.name}</span>
                    <span className="text-slate-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full skill-progress" 
                      data-width={`${skill.level}%`}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Frameworks & Libraries */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover-lift animate-on-scroll">
            <div className="text-primary text-4xl mb-4">
              <Layers />
            </div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Frameworks & Libraries</h3>
            <div className="space-y-3">
              {skills.frameworks.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between">
                  <span className="text-slate-600">{skill.name}</span>
                  <div className="flex text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-sm ${i < skill.stars ? 'text-primary' : 'text-slate-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Databases & Tools */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover-lift animate-on-scroll">
            <div className="text-primary text-4xl mb-4">
              <Database />
            </div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Databases & Tools</h3>
            <div className="space-y-3">
              {skills.tools.map((tool) => (
                <div key={tool} className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-slate-600">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

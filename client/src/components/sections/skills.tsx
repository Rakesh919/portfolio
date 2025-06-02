import { useEffect } from 'react';
import { Code, Layers, Database, Zap, Server, Globe } from 'lucide-react';
import { useSkillProgress } from '@/lib/animations';
import InteractiveSkillSphere from '@/components/3d/InteractiveSkillSphere';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Java', level: 90, color: '#8b5cf6' },
      { name: 'JavaScript', level: 70, color: '#06b6d4' },
    ]
  },
  {
    title: 'Frameworks & Libraries',
    icon: Layers,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'Spring Boot', level: 95, color: '#3b82f6' },
      { name: 'Spring MVC', level: 85, color: '#06b6d4' },
      { name: 'Hibernate/JPA', level: 80, color: '#8b5cf6' },
      { name: 'Node.js/Express', level: 70, color: '#10b981' },
    ]
  },
  {
    title: 'Databases & Tools',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'MongoDB', level: 90, color: '#10b981' },
      { name: 'SQL Databases', level: 85, color: '#06b6d4' },
      { name: 'RESTful APIs', level: 95, color: '#8b5cf6' },
      { name: 'Microservices', level: 80, color: '#3b82f6' },
    ]
  }
];

const sphereSkills = skillCategories.flatMap(category => category.skills);

export default function Skills() {
  useSkillProgress();

  return (
    <section id="skills" className="py-32 bg-muted/30 dark:bg-muted/50 relative overflow-hidden">
      {/* 3D Interactive Skill Sphere */}
      <div className="absolute inset-0 opacity-30">
        <InteractiveSkillSphere skills={sphereSkills} />
      </div>
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-on-scroll">
          <h2 className="text-5xl md:text-7xl font-black mb-6 gradient-text">Technical Arsenal</h2>
          <div className="w-32 h-2 gradient-bg mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Mastering cutting-edge technologies to build robust, scalable, and high-performance backend solutions.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-10">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={category.title} className="skill-card p-8 rounded-2xl card-hover animate-on-scroll" style={{ animationDelay: `${index * 200}ms` }}>
                <div className={`text-5xl mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  <IconComponent className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">{category.title}</h3>
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-foreground/90 font-medium text-lg">{skill.name}</span>
                        <span className="text-foreground/70 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-3 rounded-full skill-progress transition-all duration-1000 ease-out"
                          data-width={`${skill.level}%`}
                          style={{ 
                            width: '0%',
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-on-scroll">
          {[
            { label: 'Years Experience', value: '1+', icon: Zap },
            { label: 'Projects Completed', value: '3+', icon: Server },
            { label: 'API Endpoints', value: '50+', icon: Globe },
            { label: 'Database Optimization', value: '40%', icon: Database }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="text-center p-6 glass-effect rounded-xl hover-lift">
                <IconComponent className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-black text-foreground mb-2">{stat.value}</div>
                <div className="text-foreground/70 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

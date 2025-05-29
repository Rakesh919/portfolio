import { CheckCircle } from 'lucide-react';

const experiences = [
  {
    title: 'Backend Developer (Java & Node.js)',
    company: 'OneTick Technologies',
    duration: 'April 2024 – Present',
    type: 'On-site',
    current: true,
    achievements: [
      'Built RESTful APIs for smooth front-end integration, ensuring seamless data flow between client and server applications.',
      'Optimized MongoDB queries, cutting execution time by 40%, significantly improving application performance and user experience.',
      'Integrated APIs for efficient module-to-module communication, enhancing system architecture and data consistency.',
    ],
    technologies: ['Java', 'Node.js', 'MongoDB', 'REST APIs'],
  },
  {
    title: 'Java Intern',
    company: 'Snapticminds',
    duration: 'June 2023 – August 2023',
    type: 'Remote',
    current: false,
    achievements: [
      'Resolved codebase errors, including logic flaws and null pointer exceptions, enhancing software reliability and stability.',
      'Added comprehensive logging using Log4j for better traceability and debugging capabilities across the application.',
      'Assisted the development team with minor feature implementations and code updates, gaining valuable industry experience.',
    ],
    technologies: ['Java', 'Log4j', 'Debugging', 'Code Review'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Professional Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            My journey in backend development, from internship to full-time roles, with measurable achievements.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className={`relative pl-8 ${index < experiences.length - 1 ? 'pb-12' : ''} animate-on-scroll`}>
              <div className={`absolute left-0 top-0 w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                exp.current ? 'bg-primary' : 'bg-slate-400'
              }`}></div>
              {index < experiences.length - 1 && (
                <div className="absolute left-2 top-4 w-0.5 h-full bg-slate-200"></div>
              )}
              
              <div className="bg-slate-50 p-8 rounded-xl hover-lift">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary">{exp.title}</h3>
                    <p className={`text-lg font-semibold ${exp.current ? 'text-primary' : 'text-accent'}`}>
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-slate-500 font-medium">
                    <span>{exp.duration}</span>
                    <span className="block text-sm">{exp.type}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 text-slate-600">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-emerald-500 mt-1 h-5 w-5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {exp.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exp.current 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-accent/10 text-accent'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

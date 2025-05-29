import { GraduationCap, School } from 'lucide-react';

const education = [
  {
    degree: "Bachelor's Degree in Computer Science",
    institution: 'MVN University',
    duration: '2020 – 2024',
    grade: 'CGPA: 8.2/10',
    gradeColor: 'text-emerald-600',
    icon: GraduationCap,
    iconColor: 'text-primary',
  },
  {
    degree: 'Senior Secondary Education',
    institution: 'Aggarwal Public School, Ballabgarh',
    duration: '2018 – 2020',
    grade: 'Score: 70%',
    gradeColor: 'text-emerald-600',
    icon: School,
    iconColor: 'text-accent',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => {
            const IconComponent = edu.icon;
            return (
              <div key={index} className="bg-slate-50 p-8 rounded-xl hover-lift animate-on-scroll">
                <div className={`${edu.iconColor} text-4xl mb-4`}>
                  <IconComponent />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-2">{edu.degree}</h3>
                <p className={`text-lg font-semibold mb-2 ${
                  index === 0 ? 'text-primary' : 'text-accent'
                }`}>
                  {edu.institution}
                </p>
                <p className="text-slate-600 mb-4">{edu.duration}</p>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">
                    {index === 0 ? 'CGPA:' : 'Score:'}
                  </span>
                  <span className={`font-bold ${edu.gradeColor}`}>
                    {edu.grade.split(': ')[1]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

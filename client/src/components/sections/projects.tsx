import { Button } from '@/components/ui/button';
import { ExternalLink, Truck, MessageSquare, FileText } from 'lucide-react';

const projects = [
  {
    name: 'TMS (Transporter Management System)',
    status: 'In Development',
    description: 'Comprehensive transporter management system designed to optimize logistics and fleet operations with real-time tracking capabilities.',
    features: [
      'Real-time tracking and automated invoicing features',
      'Customer management for enhanced efficiency',
      'Backend developed using Spring Boot & Java',
    ],
    technologies: ['Spring Boot', 'Java', 'REST API'],
    icon: Truck,
    gradient: 'from-blue-500 to-blue-700',
    statusColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Samadhan – Grievance Portal',
    status: 'Completed',
    description: 'Streamlined grievance portal facilitating complaint submission, tracking, and resolution with enhanced member management capabilities.',
    features: [
      'Streamlined complaint submission and assignment',
      'Real-time tracking and resolution system',
      'Enhanced member management features',
    ],
    technologies: ['Java', 'Spring Boot', 'Database'],
    icon: MessageSquare,
    gradient: 'from-emerald-500 to-emerald-700',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Logipod',
    status: 'Completed',
    description: 'E-way bill creation and management system integrated with the GSTIN portal for seamless GST compliance.',
    features: [
      '6 modules for e-way bill creation and management',
      'GST regulations compliance system',
      '30% automation through task schedulers',
    ],
    technologies: ['Java', 'GSTIN API', 'Automation'],
    icon: FileText,
    gradient: 'from-purple-500 to-purple-700',
    statusColor: 'bg-purple-100 text-purple-700',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Showcase of my recent work in backend development, from management systems to automation solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift animate-on-scroll">
                {/* Project Icon */}
                <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white`}>
                  <IconComponent size={64} className="opacity-70" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-secondary">{project.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6 text-slate-600">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1 text-sm">→</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

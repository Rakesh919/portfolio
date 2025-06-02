import { Button } from '@/components/ui/button';
import { ExternalLink, Truck, MessageSquare, FileText, Code, Database, Zap } from 'lucide-react';
import AnimatedProjectCard from '@/components/3d/AnimatedProjectCard';

const projects = [
  {
    name: 'TMS (Transporter Management System)',
    status: 'Completed',
    description: 'Comprehensive transporter management system designed to optimize logistics and fleet operations with real-time tracking capabilities.',
    features: [
      'Real-time tracking and automated invoicing features',
      'Customer management for enhanced efficiency',
      'Backend developed using Spring Boot & Java',
    ],
    technologies: ['Spring Boot', 'Java', 'REST API'],
    icon: Truck,
    color: '#3b82f6',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50',
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
    color: '#10b981',
    statusColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/50',
  },
  {
    name: 'Logipod',
    status: 'In Progress',
    description: 'E-way bill creation and management system integrated with the GSTIN portal for seamless GST compliance.',
    features: [
      '6 modules for e-way bill creation and management',
      'GST regulations compliance system',
      '30% automation through task schedulers',
    ],
    technologies: ['Java', 'GSTIN API', 'Automation'],
    icon: FileText,
    color: '#8b5cf6',
    statusColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/50',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-on-scroll">
          <h2 className="text-5xl md:text-7xl font-black mb-6 gradient-text">Project Showcase</h2>
          <div className="w-32 h-2 gradient-bg mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Innovative backend solutions that drive business growth and optimize performance across various industries.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-10">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div key={index} className="project-card rounded-2xl overflow-hidden card-hover animate-on-scroll" style={{ animationDelay: `${index * 200}ms` }}>
                {/* 3D Background */}
                <div className="h-48 relative overflow-hidden">
                  <AnimatedProjectCard color={project.color} index={index} />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60 flex items-center justify-center">
                    <IconComponent size={80} className="text-white/80" />
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-foreground">{project.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-foreground/80 mb-6 leading-relaxed text-lg">
                    {project.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Zap className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-foreground/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 glass-effect text-foreground/90 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Button className="w-full gradient-bg hover:scale-105 text-white font-bold py-3 border-2 border-primary/20 hover-lift">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Explore Project
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Tech Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-on-scroll">
          {[
            { label: 'API Endpoints Built', value: '50+', icon: Code },
            { label: 'Database Operations', value: '200+', icon: Database },
            { label: 'Performance Boost', value: '40%', icon: Zap },
            { label: 'Automation Level', value: '30%', icon: FileText }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="text-center p-6 glass-effect rounded-xl hover-lift">
                <IconComponent className="w-8 h-8 mx-auto mb-3 text-secondary" />
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

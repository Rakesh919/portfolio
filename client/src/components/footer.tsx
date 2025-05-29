import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-3xl font-bold mb-4 gradient-text">Rakesh Sharma</div>
          <p className="text-slate-300 mb-6">Backend Developer passionate about building scalable solutions</p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href="https://linkedin.com/in/rakesh-sharma" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a 
              href="https://github.com/rakesh-sharma" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a 
              href="mailto:rakesh88577@gmail.com"
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              <Mail className="text-2xl" />
            </a>
          </div>
          
          <div className="border-t border-slate-700 pt-8">
            <p className="text-slate-400">&copy; 2024 Rakesh Sharma. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

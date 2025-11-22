import React from 'react';
import { PROJECT_GUIDELINES, PROJECT_DESCRIPTION } from '../constants';
import { BookOpen, Compass, Lightbulb, GraduationCap, Layout } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Compass,
  Layout,
  Lightbulb,
  GraduationCap
};

const ProjectGuidelines: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Project Overview</h2>
        <p className="text-slate-600 text-lg leading-relaxed font-light">
          {PROJECT_DESCRIPTION}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECT_GUIDELINES.map((section) => {
          const Icon = iconMap[section.icon] || BookOpen;
          return (
            <div key={section.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300 group">
              <div className="h-2 bg-academic-500 w-full"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-academic-50 rounded-lg text-academic-600 group-hover:bg-academic-100 transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{section.title}</h3>
                </div>
                <p className="text-slate-600 mb-4 italic">{section.description}</p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {section.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-academic-500 mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGuidelines;
import React from 'react';
import { EVALUATION_RUBRIC } from '../constants';
import { AlertCircle, CheckCircle2, Star } from 'lucide-react';

const RubricView: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="bg-academic-50 border-l-4 border-academic-500 p-4 rounded-r-lg">
        <p className="text-academic-900 font-medium">
          Total Project Weight: 100%
        </p>
        <p className="text-academic-700 text-sm mt-1">
          Review these criteria carefully before submitting your manual.
        </p>
      </div>

      <div className="space-y-6">
        {EVALUATION_RUBRIC.map((criteria, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{criteria.category}</h3>
                <p className="text-sm text-slate-500">{criteria.description}</p>
              </div>
              <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                {criteria.scoreWeight}%
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Excellent */}
              <div className="p-6 bg-green-50/30">
                <div className="flex items-center gap-2 mb-3 text-green-700">
                  <Star size={18} className="fill-current" />
                  <span className="font-bold text-sm uppercase tracking-wide">Excellent (90-100%)</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{criteria.excellent}</p>
              </div>

              {/* Good */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-blue-600">
                  <CheckCircle2 size={18} />
                  <span className="font-bold text-sm uppercase tracking-wide">Good (75-89%)</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{criteria.good}</p>
              </div>

              {/* Needs Improvement */}
              <div className="p-6 bg-red-50/30">
                <div className="flex items-center gap-2 mb-3 text-red-600">
                  <AlertCircle size={18} />
                  <span className="font-bold text-sm uppercase tracking-wide">Needs Work (0-74%)</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{criteria.needsImprovement}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RubricView;
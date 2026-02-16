import React from 'react';
import { Wand2 } from 'lucide-react';
import { SUGGESTED_PROMPTS } from '../constants';

interface PromptInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ 
  value, 
  onChange, 
  onSubmit, 
  isLoading,
  disabled 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Describe your new background
        </label>
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., A luxury penthouse office with city view..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none h-28"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-slate-600 pointer-events-none">
            {value.length > 0 ? 'Press Enter to generate' : ''}
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Suggestions
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onChange(prompt)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 hover:bg-indigo-900/30 hover:text-indigo-300 hover:border-indigo-500/30 border border-slate-700 transition-all text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99]"
      >
        {isLoading ? (
            'Processing...'
        ) : (
            <>
                <Wand2 className="w-5 h-5" />
                Generate Background
            </>
        )}
      </button>
    </div>
  );
};

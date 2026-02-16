import React from 'react';
import { Download, Sparkles, RefreshCcw } from 'lucide-react';
import { Button } from './Button';
import { downloadImage } from '../services/imageUtils';

interface ResultViewerProps {
  generatedImage: string | null;
  isLoading: boolean;
  onDownload: () => void;
  onRegenerate: () => void;
  hasInput: boolean;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ 
  generatedImage, 
  isLoading, 
  onRegenerate,
  hasInput
}) => {
  if (isLoading) {
    return (
      <div className="w-full aspect-square md:aspect-[4/3] rounded-2xl bg-slate-900/50 border border-indigo-500/30 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 animate-pulse"></div>
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
            <p className="text-lg font-medium text-slate-200 animate-pulse">Generating Magic...</p>
            <p className="text-sm text-slate-500 mt-2">Refining background details</p>
        </div>
      </div>
    );
  }

  if (!generatedImage) {
    return (
      <div className="w-full aspect-square md:aspect-[4/3] rounded-2xl bg-slate-900/30 border border-slate-800 flex flex-col items-center justify-center text-slate-600">
        <Sparkles className="w-12 h-12 mb-4 opacity-20" />
        <p className="text-sm font-medium">Your new background will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-indigo-500/20 group">
        <img 
          src={generatedImage} 
          alt="Generated Background" 
          className="w-full h-full object-contain" 
        />
         <div className="absolute top-4 left-4 px-3 py-1 bg-indigo-500/80 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-lg border border-indigo-400/50 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Edited
          </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <Button 
            variant="primary" 
            className="flex-1"
            onClick={() => downloadImage(generatedImage, `profile-magic-${Date.now()}.png`)}
            icon={<Download className="w-4 h-4" />}
        >
            Download
        </Button>
        <Button 
            variant="outline" 
            onClick={onRegenerate}
            icon={<RefreshCcw className="w-4 h-4" />}
            disabled={!hasInput}
        >
            Try Again
        </Button>
      </div>
    </div>
  );
};

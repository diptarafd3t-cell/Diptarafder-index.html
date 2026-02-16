import React, { useState } from 'react';
import { AppState } from './types';
import { editProfileBackground } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { ResultViewer } from './components/ResultViewer';
import { Sparkles, Layers, Image as ImageIcon } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    originalImage: null,
    generatedImage: null,
    prompt: '',
    isLoading: false,
    error: null,
  });

  const handleImageSelected = (base64: string) => {
    setState(prev => ({ 
      ...prev, 
      originalImage: base64, 
      generatedImage: null, 
      error: null 
    }));
  };

  const handleClearImage = () => {
    setState(prev => ({
      ...prev,
      originalImage: null,
      generatedImage: null,
      prompt: '',
      error: null
    }));
  };

  const handlePromptChange = (val: string) => {
    setState(prev => ({ ...prev, prompt: val }));
  };

  const handleGenerate = async () => {
    if (!state.originalImage || !state.prompt.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const resultImage = await editProfileBackground(state.originalImage, state.prompt);
      setState(prev => ({ 
        ...prev, 
        generatedImage: resultImage, 
        isLoading: false 
      }));
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error.message || "Failed to generate image. Please try again." 
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/30">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              ProfileBG Magic
            </h1>
          </div>
          <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="text-xs font-medium text-slate-500 hover:text-indigo-400 transition-colors">
            Powered by Gemini
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Input */}
          <section className="space-y-8 animate-in slide-in-from-left-4 fade-in duration-500">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-sm border border-slate-700">1</span>
                Upload Image
              </h2>
              <p className="text-slate-400 mb-6 ml-10">Choose your profile picture or selfie.</p>
              <div className="ml-10">
                <ImageUploader 
                  currentImage={state.originalImage}
                  onImageSelected={handleImageSelected}
                  onClear={handleClearImage}
                />
              </div>
            </div>

            <div className={`transition-all duration-300 ${!state.originalImage ? 'opacity-50 pointer-events-none blur-sm' : ''}`}>
               <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-sm border border-slate-700">2</span>
                Describe Background
              </h2>
              <p className="text-slate-400 mb-6 ml-10">Tell the AI where you want to be.</p>
              <div className="ml-10">
                <PromptInput 
                  value={state.prompt} 
                  onChange={handlePromptChange} 
                  onSubmit={handleGenerate}
                  isLoading={state.isLoading}
                  disabled={!state.originalImage}
                />
              </div>
            </div>
          </section>

          {/* Right Column: Output */}
          <section className="space-y-8 lg:sticky lg:top-24 animate-in slide-in-from-right-4 fade-in duration-500 delay-150">
             <div>
               <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-indigo-300">
                <Sparkles className="w-6 h-6 text-indigo-400" />
                Result
              </h2>
              <p className="text-slate-400 mb-6">Your transformed profile picture.</p>
              
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-2xl">
                 {state.error && (
                  <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm">
                    {state.error}
                  </div>
                )}
                
                <ResultViewer 
                  generatedImage={state.generatedImage}
                  isLoading={state.isLoading}
                  onDownload={() => {}} // Handled inside ResultViewer component now for simplicity
                  onRegenerate={handleGenerate}
                  hasInput={!!state.originalImage && !!state.prompt}
                />
              </div>
            </div>
            
            {/* Steps Guide / Info */}
            <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-800/50">
              <h3 className="font-semibold text-slate-200 mb-3">How it works</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  Upload a photo with a clear subject (person or object).
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  Describe the new background in detail (lighting, style, setting).
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  The AI keeps the subject intact while replacing the environment.
                </li>
              </ul>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default App;

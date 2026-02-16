import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { resizeImage } from '../services/imageUtils';

interface ImageUploaderProps {
  currentImage: string | null;
  onImageSelected: (base64: string) => void;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageSelected, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const resized = await resizeImage(file);
        onImageSelected(resized);
      } catch (e) {
        console.error("Error processing image", e);
        alert("Failed to process image.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       try {
        const resized = await resizeImage(file);
        onImageSelected(resized);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {!currentImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative w-full aspect-square md:aspect-[4/3] rounded-2xl border-2 border-dashed 
            flex flex-col items-center justify-center cursor-pointer transition-all duration-300
            ${isDragging 
              ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' 
              : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-500'}
          `}
        >
          <div className="p-4 bg-slate-800 rounded-full mb-4 shadow-xl">
            <Upload className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-lg font-medium text-slate-200">Upload Profile Picture</p>
          <p className="text-sm text-slate-500 mt-2">Click or drag & drop</p>
          <p className="text-xs text-slate-600 mt-4">Supports JPG, PNG (Max 5MB)</p>
        </div>
      ) : (
        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-900 group">
          <img 
            src={currentImage} 
            alt="Original" 
            className="w-full h-full object-contain" 
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
             <button 
                onClick={onClear}
                className="p-3 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-full backdrop-blur-sm transition-all border border-red-500/50"
                title="Remove image"
             >
                <X className="w-6 h-6" />
             </button>
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-white/10 text-white hover:bg-white/20 rounded-full backdrop-blur-sm transition-all border border-white/20"
                title="Change image"
             >
                <Upload className="w-6 h-6" />
             </button>
          </div>
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">
            Original
          </div>
        </div>
      )}
    </div>
  );
};

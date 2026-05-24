import React, { useState } from 'react';
import { UploadCloud, FileImage } from 'lucide-react';

interface ImageFileOrUrlSelectorProps {
  idPrefix: string;
  imgUrl: string;
  onUrlChange: (url: string) => void;
  captionStr?: string;
  onCaptionChange?: (caption: string) => void;
  captionPlaceholder?: string;
  presets?: { title: string; url: string }[];
  label?: string;
  detailsLabel?: string;
}

export function ImageFileOrUrlSelector({
  idPrefix,
  imgUrl,
  onUrlChange,
  captionStr = '',
  onCaptionChange,
  captionPlaceholder = 'e.g., A joyful moment highlighting clean water distribution.',
  presets = [],
  label = 'Select or Upload Photo',
  detailsLabel = 'Photo Details & Caption'
}: ImageFileOrUrlSelectorProps) {
  const [dragActive, setDragActive] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorText('Please upload a valid image file (PNG, JPG, JPEG, or WEBP).');
      setTimeout(() => setErrorText(''), 4000);
      return;
    }
    setErrorText('');
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onUrlChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 bg-slate-50 border border-slate-250 p-4 sm:p-5 rounded-2xl text-left mt-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
          {label}
        </label>
        <span className="text-[10px] text-slate-500 font-medium font-mono">Drag-and-drop or select below</span>
      </div>

      {errorText && (
        <div className="p-2.5 bg-rose-550/10 border border-rose-550/20 text-rose-500 rounded-xl text-[11px] font-semibold">
          {errorText}
        </div>
      )}

      {/* Main Drag and Drop file area with live thumbnail */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div 
          className={`md:col-span-8 border-2 border-dashed rounded-xl p-5 hover:bg-slate-100/40 transition-all relative flex flex-col items-center justify-center text-center group cursor-pointer ${
            dragActive 
              ? 'border-sky-500 bg-sky-50/20' 
              : 'border-slate-300 hover:border-slate-400 bg-white'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`file-picker-${idPrefix}`)?.click()}
        >
          <input 
            type="file" 
            id={`file-picker-${idPrefix}`} 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
          <UploadCloud className={`w-8 h-8 ${dragActive ? 'text-sky-500' : 'text-slate-400 group-hover:text-slate-650'} mb-2 transition-colors`} />
          <p className="text-xs font-bold text-slate-705">
            {dragActive ? "Drop the photo here!" : "Drag & Drop your image file, or click to browse"}
          </p>
          <p className="text-[10px] text-slate-500 font-medium mt-1">Supports PNG, JPG, JPEG, WEBP or GIF (local storage persistent)</p>
        </div>

        {/* Dynamic preview block */}
        <div className="md:col-span-4 flex flex-col items-center justify-center border border-slate-200 bg-slate-100/35 rounded-xl p-3 relative group">
          {imgUrl ? (
            <div className="w-full h-24 relative rounded-lg overflow-hidden border border-slate-200">
              <img 
                src={imgUrl} 
                alt="Upload preview" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] text-white font-mono uppercase tracking-wider bg-black/60 px-2 py-1 rounded">Active Photo</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-24 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-300 rounded-lg">
              <FileImage className="w-6 h-6 mb-1 text-slate-300" />
              <span className="text-[10px] font-mono font-medium text-slate-400">No Image</span>
            </div>
          )}
          <span className="text-[9px] text-slate-500 mt-1 font-mono">Live Preview Panel</span>
        </div>
      </div>

      {/* Manual direct URL entry */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest font-mono">
            Or Use Direct Image URL URL
          </label>
          {imgUrl && (
            <button
              type="button"
              onClick={() => onUrlChange('')}
              className="text-[10px] text-rose-500 hover:text-rose-700 font-bold font-mono transition-colors cursor-pointer"
            >
              Clear Image Selection
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://images.unsplash.com/..."
            value={imgUrl.startsWith('data:') ? 'Local Image File Loaded (Base64 Object)' : imgUrl}
            disabled={imgUrl.startsWith('data:')}
            onChange={(e) => onUrlChange(e.target.value)}
            className="flex-grow px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-950 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder-slate-400 font-mono"
          />
          {imgUrl.startsWith('data:') && (
            <button
              type="button"
              onClick={() => onUrlChange('')}
              className="px-3 py-1 bg-slate-200 hover:bg-slate-300 border border-slate-350 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Reset to URL paste mode
            </button>
          )}
        </div>
      </div>

      {/* Preset assets selector if present */}
      {presets.length > 0 && (
        <div className="space-y-1.5">
          <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest font-mono">
            Or Choose from High-Quality Curated Presets
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {presets.map((pr) => (
              <button
                id={`preset-${idPrefix}-${pr.title.toLowerCase().replace(/\s+/g, '-')}`}
                key={pr.url}
                type="button"
                onClick={() => onUrlChange(pr.url)}
                className={`p-1.5 border rounded-xl text-left transition-all flex items-center gap-1.5 cursor-pointer ${
                  imgUrl === pr.url
                    ? 'border-sky-500 bg-sky-50 text-sky-750 font-bold'
                    : 'border-slate-200 text-slate-650 hover:bg-slate-50 bg-white'
                }`}
              >
                <img src={pr.url} className="w-8 h-8 rounded object-cover" alt="" referrerPolicy="no-referrer" />
                <span className="text-[10px] font-semibold leading-tight truncate">{pr.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Improved details field inside the image component context */}
      {onCaptionChange && (
        <div id={`details-caption-field-${idPrefix}`} className="border-t border-slate-200/60 pt-3 mt-1.5">
          <label className="block text-[10px] font-bold text-slate-650 uppercase tracking-widest mb-1 font-mono">
            {detailsLabel}
          </label>
          <textarea
            rows={2}
            placeholder={captionPlaceholder}
            value={captionStr}
            onChange={(e) => onCaptionChange(e.target.value)}
            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder-slate-400 font-sans"
          ></textarea>
          <p className="text-[10px] text-slate-500 mt-1">
            This information will be associated with the active photo file inside the active layouts (e.g. stories descriptions, report captions, profile highlights).
          </p>
        </div>
      )}
    </div>
  );
}

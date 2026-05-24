import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { Trash2, Image, CheckCircle2 } from 'lucide-react';
import { ImageFileOrUrlSelector } from './ImageFileOrUrlSelector';

export function GalleryManager() {
  const { galleryPhotos, publishGalleryPhoto, updateGalleryPhoto } = useAppState();
  const [galTitle, setGalTitle] = useState('');
  const [galTag, setGalTag] = useState('');
  const [galDesc, setGalDesc] = useState('');
  const [galPresetPhoto, setGalPresetPhoto] = useState('https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600');
  const [galleryFeedback, setGalleryFeedback] = useState('');
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);

  const handlePublishGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle.trim() || !galDesc.trim()) return;

    if (editingGalleryId) {
      updateGalleryPhoto(editingGalleryId, {
        title: galTitle,
        tag: galTag || 'Operations Log',
        desc: galDesc,
        image: galPresetPhoto
      });
      setGalleryFeedback('Gallery item successfully updated!');
      setEditingGalleryId(null);
    } else {
      publishGalleryPhoto(
        galTitle, 
        galTag || 'Operations Log', 
        galDesc, 
        galPresetPhoto
      );
      setGalleryFeedback('Gallery item successfully archived!');
    }

    setGalTitle('');
    setGalTag('');
    setGalDesc('');
    setTimeout(() => setGalleryFeedback(''), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-650 uppercase tracking-widest font-mono">Current Gallery</h4>
        {galleryPhotos.map((photo) => (
          <div key={photo.id} className="flex gap-4 items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
            <img src={photo.image} alt={photo.title} className="w-16 h-12 rounded object-cover" />
            <div className="flex-grow">
              <p className="text-sm font-bold text-slate-900">{photo.title}</p>
              <p className="text-[10px] text-slate-500">{photo.tag}</p>
            </div>
            {editingGalleryId === photo.id ? (
              <span className="text-xs text-slate-400 font-bold">Editing</span>
            ) : (
              <button
                onClick={() => {
                  setEditingGalleryId(photo.id);
                  setGalTitle(photo.title);
                  setGalTag(photo.tag);
                  setGalDesc(photo.desc);
                  setGalPresetPhoto(photo.image);
                }}
                className="text-xs text-sky-600 font-bold hover:underline"
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>

      <hr className="my-4 border-slate-200" />

      {galleryFeedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-850 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{galleryFeedback}</span>
        </div>
      )}

      <form onSubmit={handlePublishGallery} className="space-y-4">
        <ImageFileOrUrlSelector
          idPrefix="gallery-photo"
          imgUrl={galPresetPhoto}
          onUrlChange={setGalPresetPhoto}
          label="Gallery Photo"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={galTitle}
            onChange={(e) => setGalTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
            required
          />
          <input
            type="text"
            placeholder="Tag"
            value={galTag}
            onChange={(e) => setGalTag(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
          />
        </div>
        <textarea
          placeholder="Description"
          value={galDesc}
          onChange={(e) => setGalDesc(e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
          rows={3}
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow"
          >
            <span>{editingGalleryId ? 'Update Gallery Photo' : 'Compile Photo to Gallery'}</span>
            <Image className="w-3.5 h-3.5" />
          </button>
          {editingGalleryId && (
            <button
              type="button"
              onClick={() => {
                setEditingGalleryId(null);
                setGalTitle('');
                setGalTag('');
                setGalDesc('');
              }}
              className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

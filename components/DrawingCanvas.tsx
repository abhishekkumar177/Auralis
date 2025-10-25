'use client';

import { useState, useEffect } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';

interface DrawingCanvasProps {
  initialData?: string;
  onSave: (data: string) => void;
  onClose: () => void;
}

export default function DrawingCanvas({ initialData, onSave, onClose }: DrawingCanvasProps) {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = () => {
    if (excalidrawAPI) {
      try {
        const elements = excalidrawAPI.getSceneElements();
        const appState = excalidrawAPI.getAppState();

        const drawingData = {
          elements,
          appState: {
            viewBackgroundColor: appState.viewBackgroundColor,
            currentItemStrokeColor: appState.currentItemStrokeColor,
            currentItemBackgroundColor: appState.currentItemBackgroundColor,
          }
        };

        onSave(JSON.stringify(drawingData));
      } catch (error) {
        console.error('Error saving drawing:', error);
        alert('Failed to save drawing');
      }
    }
  };

  const parseInitialData = () => {
    if (!initialData) return undefined;

    try {
      return JSON.parse(initialData);
    } catch (error) {
      console.error('Error parsing initial data:', error);
      return undefined;
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">Draw & Sketch</h2>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Save className="w-4 h-4" />
              Save Drawing
            </motion.button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Excalidraw Canvas */}
        <div className="flex-1 relative" style={{ minHeight: '600px' }}>
          <div className="absolute inset-0">
            <Excalidraw
              excalidrawAPI={(api) => setExcalidrawAPI(api)}
              initialData={parseInitialData()}
              UIOptions={{
                canvasActions: {
                  loadScene: false,
                  export: false,
                  saveToActiveFile: false,
                }
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

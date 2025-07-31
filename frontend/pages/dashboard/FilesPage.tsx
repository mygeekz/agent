
import React, { useState, DragEvent } from 'react';
import { UploadedFile } from '../../types';
import { UploadIcon } from '../../components/icons';
import FileIcon from '../../components/FileIcon';

const FilesPage = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).map((file: File) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setFiles(prev => [...prev, ...droppedFiles]);
  };
  
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-white">مدیریت فایل‌ها</h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex justify-center items-center w-full px-6 py-10 border-2 border-dashed rounded-lg transition-colors ${
          isDragging ? 'border-cyan-400 bg-slate-700/50' : 'border-slate-600 hover:border-slate-500'
        }`}
      >
        <div className="text-center">
          <UploadIcon />
          <p className="mb-2 text-sm text-slate-400">
            <span className="font-semibold text-cyan-400">برای آپلود کلیک کنید</span> یا فایل‌ها را بکشید و رها کنید
          </p>
          <p className="text-xs text-slate-500">SVG, PNG, JPG, PDF (حداکثر ۱۰ مگابایت)</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">فایل‌های آپلود شده</h3>
        {files.length > 0 ? (
            <div className="space-y-3">
                {files.map((file, index) => (
                    <div key={index} className="bg-slate-900/50 p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <FileIcon type={file.type} />
                            <div>
                                <p className="text-slate-200 font-medium">{file.name}</p>
                                <p className="text-slate-400 text-sm">{file.type}</p>
                            </div>
                        </div>
                        <span className="text-slate-300 text-sm font-mono">{formatBytes(file.size)}</span>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-8 bg-slate-900/50 rounded-lg">
                <p className="text-slate-400">هنوز فایلی آپلود نشده است.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default FilesPage;

import React, { useState } from 'react';

interface ResumeUploadProps {
  onUploadSuccess?: (data: any) => void;
}

export default function ResumeUpload({ onUploadSuccess }: ResumeUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setSelectedFile(file);
    setIsUploading(true);

    const formData = new FormData();
    // formData.append('resume', file)
    formData.append('file', file);

    try {
      // 🚀 REPLACE WITH YOUR ACTUAL BACKEND ENDPOINT URL
      const response = await fetch('http://127.0.0.1:8000/upload', { // Replace with your actual backend port and route
  method: 'POST',
  body: formData,
});
      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      console.log('Upload success:', data);
      
      // Pass the backend data back up to the parent if needed
      if (onUploadSuccess) onUploadSuccess(data);
      
    } catch (error) {
      console.error('Network upload error:', error);
      alert('Failed to upload resume.');
      setSelectedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {/* File Upload Trigger */}
      <label className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
        <svg className="h-4 w-4" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <span>Upload Resume</span>
        <input 
          type="file" 
          accept=".pdf,.doc,.docx" 
          className="hidden" 
          onChange={handleFileChange} 
        />
      </label>

      {/* Conditional File Preview Status */}
      {selectedFile && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 bg-muted px-2 py-1 rounded">
          <span className="font-medium truncate max-w-[200px]">
            📄 {selectedFile.name}
          </span>
          {isUploading ? (
            <div className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent ml-1" />
          ) : (
            <button 
              onClick={removeFile} 
              className="text-destructive hover:text-destructive/80 font-bold ml-1"
              title="Remove file"
              type="button"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
}

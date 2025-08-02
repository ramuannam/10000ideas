import React, { useState, useRef } from 'react';
import { FaUpload, FaFileAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import authService from '../services/authService';

interface UploadResult {
  success: boolean;
  message: string;
  totalProcessed: number;
  successfulSaves: number;
  savedIdeas?: any[];
}

const BulkUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = ['CSV', 'Excel (.xlsx, .xls)', 'JSON'];
  const maxFileSize = 10; // MB

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    // Validate file type
    const validExtensions = ['csv', 'xlsx', 'xls', 'json'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      alert('Please select a valid file format (CSV, Excel, or JSON)');
      return;
    }

    // Validate file size
    if (file.size > maxFileSize * 1024 * 1024) {
      alert(`File size must be less than ${maxFileSize}MB`);
      return;
    }

    setSelectedFile(file);
    setUploadResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadResult(null);

    try {
      const result = await authService.uploadIdeas(selectedFile);
      setUploadResult(result);
      
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Refresh the page to show new ideas immediately
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error: any) {
      setUploadResult({
        success: false,
        message: error.message || 'Upload failed',
        totalProcessed: 0,
        successfulSaves: 0
      });
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FaUpload className="mr-3" />
            Bulk Upload Ideas
          </h2>
          <p className="text-blue-100 mt-1">Upload multiple ideas at once using CSV, Excel, or JSON files</p>
        </div>

        <div className="p-6">
          {/* Instructions */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Supported File Formats:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              {supportedFormats.map((format, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {format}
                </li>
              ))}
            </ul>
            <p className="text-blue-600 text-sm mt-2">
              Maximum file size: {maxFileSize}MB
            </p>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : selectedFile
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileInput}
              className="hidden"
            />

            {selectedFile ? (
              <div className="space-y-4">
                <FaFileAlt className="mx-auto text-4xl text-green-500" />
                <div>
                  <p className="text-lg font-semibold text-green-700">{selectedFile.name}</p>
                  <p className="text-green-600">{formatFileSize(selectedFile.size)}</p>
                </div>
                <div className="flex space-x-3 justify-center">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {uploading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaUpload className="mr-2" />
                        Upload File
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetUpload}
                    disabled={uploading}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <FaUpload className="mx-auto text-4xl text-gray-400" />
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    Drag and drop your file here
                  </p>
                  <p className="text-gray-500">or</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 mt-2"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Upload Result */}
          {uploadResult && (
            <div className="mt-6">
              <div
                className={`p-4 rounded-lg border ${
                  uploadResult.success
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start">
                  {uploadResult.success ? (
                    <FaCheckCircle className="text-green-500 text-xl mr-3 mt-0.5" />
                  ) : (
                    <FaTimesCircle className="text-red-500 text-xl mr-3 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4
                      className={`font-semibold ${
                        uploadResult.success ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {uploadResult.success ? 'Upload Successful!' : 'Upload Failed'}
                    </h4>
                    <p
                      className={`mt-1 ${
                        uploadResult.success ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      {uploadResult.message}
                    </p>
                    {uploadResult.success && uploadResult.totalProcessed > 0 && (
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">Total Processed:</span>
                          <span className="font-semibold">{uploadResult.totalProcessed}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">Successfully Saved:</span>
                          <span className="font-semibold text-green-700">
                            {uploadResult.successfulSaves}
                          </span>
                        </div>
                        {uploadResult.totalProcessed > uploadResult.successfulSaves && (
                          <div className="flex justify-between text-sm">
                            <span className="text-orange-600">Failed:</span>
                            <span className="font-semibold text-orange-700">
                              {uploadResult.totalProcessed - uploadResult.successfulSaves}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sample Format Information */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Sample File Format:</h4>
            <div className="text-sm text-gray-600">
              <p className="mb-2">Your file should include the following columns:</p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <strong>Required columns:</strong>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>title</li>
                    <li>description</li>
                    <li>category</li>
                    <li>sector</li>
                    <li>investmentNeeded</li>
                  </ul>
                </div>
                <div>
                  <strong>Optional columns:</strong>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>expertiseNeeded</li>
                    <li>difficultyLevel</li>
                    <li>location</li>
                    <li>timeToMarket</li>
                    <li>targetAudience</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload; 
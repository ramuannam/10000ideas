import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaFile, FaExclamationTriangle, FaClock, FaDownload, FaInfoCircle } from 'react-icons/fa';
import adminService, { UploadHistory, DeleteUploadResponse, UploadHistoryStats } from '../services/adminService';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  uploadHistory: UploadHistory | null;
}

const DeleteConfirmModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, uploadHistory }) => {
  if (!isOpen || !uploadHistory) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center text-red-600 mb-4">
          <FaExclamationTriangle className="text-2xl mr-3" />
          <h3 className="text-lg font-bold">⚠️ Dangerous Action</h3>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-3">
            You are about to delete upload batch:
          </p>
          <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
            <p className="font-semibold text-red-800">📁 {uploadHistory.filename}</p>
            <p className="text-red-600 text-sm">
              🗓️ {new Date(uploadHistory.uploadTimestamp).toLocaleString()}
            </p>
            <p className="text-red-600 text-sm">
              📊 Contains {uploadHistory.ideasCount} ideas
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-yellow-800 font-semibold text-sm flex items-center">
              <FaExclamationTriangle className="mr-2" />
              This action is IRREVERSIBLE!
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              All {uploadHistory.ideasCount} ideas from this upload will be permanently deleted from the database.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-semibold"
          >
            🗑️ Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

const UploadHistoryPage: React.FC = () => {
  const [uploadHistory, setUploadHistory] = useState<UploadHistory[]>([]);
  const [stats, setStats] = useState<UploadHistoryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    uploadHistory: UploadHistory | null;
  }>({
    isOpen: false,
    uploadHistory: null
  });
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [historyData, statsData] = await Promise.all([
        adminService.getUploadHistory(),
        adminService.getUploadHistoryStats()
      ]);
      setUploadHistory(historyData);
      setStats(statsData);
      setError(null);
    } catch (err) {
      console.error('Error loading upload history:', err);
      setError('Failed to load upload history');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (upload: UploadHistory) => {
    setDeleteModal({
      isOpen: true,
      uploadHistory: upload
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.uploadHistory) return;

    try {
      setDeleting(deleteModal.uploadHistory.batchId);
      const response: DeleteUploadResponse = await adminService.deleteUploadBatch(deleteModal.uploadHistory.batchId);
      
      if (response.success) {
        // Remove from local state
        setUploadHistory(prev => prev.filter(u => u.batchId !== deleteModal.uploadHistory!.batchId));
        
        // Refresh stats
        const newStats = await adminService.getUploadHistoryStats();
        setStats(newStats);
        
        // Show success message
        alert(`✅ Successfully deleted "${response.filename}" and ${response.deletedIdeasCount} ideas`);
      }
    } catch (err) {
      console.error('Error deleting upload batch:', err);
      alert('❌ Failed to delete upload batch');
    } finally {
      setDeleting(null);
      setDeleteModal({ isOpen: false, uploadHistory: null });
    }
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'Unknown';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading upload history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
        <button 
          onClick={loadData}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">📁 Upload History</h1>
        <p className="text-gray-600">
          Track and manage all uploaded idea files. You can delete entire upload batches if they contain incorrect data.
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <FaDownload className="mr-2 text-blue-600" />
              Total Uploads
            </h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUploads}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <FaFile className="mr-2 text-green-600" />
              Total Ideas Uploaded
            </h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalIdeasUploaded}</p>
          </div>
        </div>
      )}

      {/* Upload History Table */}
      {uploadHistory.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <FaFile className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No upload history found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ideas Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {uploadHistory.map((upload) => (
                  <tr key={upload.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaFile className="text-blue-500 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {upload.filename}
                          </div>
                          <div className="text-sm text-gray-500">
                            {upload.contentType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FaClock className="mr-2 text-gray-400" />
                        {formatDate(upload.uploadTimestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {upload.ideasCount} ideas
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatFileSize(upload.fileSize)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {upload.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteClick(upload)}
                        disabled={deleting === upload.batchId}
                        className="inline-flex items-center px-3 py-1 border border-red-300 text-red-700 bg-red-50 rounded-md hover:bg-red-100 hover:border-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deleting === upload.batchId ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600 mr-2"></div>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <FaTrashAlt className="mr-2" />
                            Delete Batch
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Warning Notice */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <FaInfoCircle className="text-yellow-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-yellow-800 font-semibold">Important Notice</h4>
            <p className="text-yellow-700 text-sm mt-1">
              Deleting an upload batch will permanently remove all ideas from that specific upload. 
              This action cannot be undone. Use this feature only when you're certain the uploaded data was incorrect.
            </p>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, uploadHistory: null })}
        onConfirm={handleDeleteConfirm}
        uploadHistory={deleteModal.uploadHistory}
      />
    </div>
  );
};

export default UploadHistoryPage; 
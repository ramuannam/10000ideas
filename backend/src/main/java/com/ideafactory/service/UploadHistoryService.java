package com.ideafactory.service;

import com.ideafactory.model.UploadHistory;
import com.ideafactory.repository.UploadHistoryRepository;
import com.ideafactory.repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UploadHistoryService {

    @Autowired
    private UploadHistoryRepository uploadHistoryRepository;

    @Autowired
    private IdeaRepository ideaRepository;

    public List<UploadHistory> getAllUploadHistory() {
        return uploadHistoryRepository.findAllOrderByUploadTimestampDesc();
    }

    public UploadHistory createUploadRecord(String filename, int ideasCount, String uploadedBy, 
                                          long fileSize, String contentType) {
        String batchId = UUID.randomUUID().toString();
        UploadHistory uploadHistory = new UploadHistory(filename, batchId, ideasCount, uploadedBy);
        uploadHistory.setFileSize(fileSize);
        uploadHistory.setContentType(contentType);
        return uploadHistoryRepository.save(uploadHistory);
    }

    public UploadHistory updateUploadRecord(UploadHistory uploadHistory) {
        return uploadHistoryRepository.save(uploadHistory);
    }

    @Transactional
    public boolean deleteUploadBatch(String batchId) {
        try {
            // First verify the upload history exists
            UploadHistory uploadHistory = uploadHistoryRepository.findByBatchId(batchId)
                .orElseThrow(() -> new RuntimeException("Upload batch not found: " + batchId));

            // Count ideas before deletion for verification
            long ideasCount = ideaRepository.countByUploadBatchId(batchId);
            System.out.println("Found " + ideasCount + " ideas to delete for batch: " + batchId);
            
            // Delete all ideas associated with this batch
            int deletedIdeas = ideaRepository.deleteByUploadBatchId(batchId);
            System.out.println("Actually deleted " + deletedIdeas + " ideas for batch: " + batchId);
            
            // Delete the upload history record
            uploadHistoryRepository.delete(uploadHistory);
            
            return true;
        } catch (Exception e) {
            System.err.println("Error deleting upload batch: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to delete upload batch: " + e.getMessage(), e);
        }
    }

    public UploadHistory getUploadByBatchId(String batchId) {
        return uploadHistoryRepository.findByBatchId(batchId).orElse(null);
    }

    public long getTotalUploads() {
        return uploadHistoryRepository.countTotalUploads();
    }

    public long getTotalIdeasUploaded() {
        Long total = uploadHistoryRepository.sumTotalIdeasUploaded();
        return total != null ? total : 0;
    }
} 
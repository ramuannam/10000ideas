package com.ideafactory.repository;

import com.ideafactory.model.UploadHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UploadHistoryRepository extends JpaRepository<UploadHistory, Long> {
    
    @Query("SELECT u FROM UploadHistory u ORDER BY u.uploadTimestamp DESC")
    List<UploadHistory> findAllOrderByUploadTimestampDesc();
    
    Optional<UploadHistory> findByBatchId(String batchId);
    
    @Query("SELECT COUNT(u) FROM UploadHistory u")
    long countTotalUploads();
    
    @Query("SELECT SUM(u.ideasCount) FROM UploadHistory u")
    Long sumTotalIdeasUploaded();
} 
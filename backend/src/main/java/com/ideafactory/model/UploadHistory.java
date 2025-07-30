package com.ideafactory.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "upload_history")
public class UploadHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "filename", nullable = false)
    private String filename;

    @NotBlank
    @Column(name = "batch_id", nullable = false, unique = true)
    private String batchId;

    @NotNull
    @Column(name = "upload_timestamp", nullable = false)
    private LocalDateTime uploadTimestamp;

    @NotNull
    @Column(name = "ideas_count", nullable = false)
    private Integer ideasCount;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "content_type")
    private String contentType;

    @Column(name = "uploaded_by")
    private String uploadedBy;

    @Column(name = "status")
    private String status = "COMPLETED";

    // Constructors
    public UploadHistory() {}

    public UploadHistory(String filename, String batchId, Integer ideasCount, String uploadedBy) {
        this.filename = filename;
        this.batchId = batchId;
        this.ideasCount = ideasCount;
        this.uploadedBy = uploadedBy;
        this.uploadTimestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }

    public String getBatchId() { return batchId; }
    public void setBatchId(String batchId) { this.batchId = batchId; }

    public LocalDateTime getUploadTimestamp() { return uploadTimestamp; }
    public void setUploadTimestamp(LocalDateTime uploadTimestamp) { this.uploadTimestamp = uploadTimestamp; }

    public Integer getIdeasCount() { return ideasCount; }
    public void setIdeasCount(Integer ideasCount) { this.ideasCount = ideasCount; }

    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public String getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(String uploadedBy) { this.uploadedBy = uploadedBy; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
} 
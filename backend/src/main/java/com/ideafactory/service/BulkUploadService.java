package com.ideafactory.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.ideafactory.model.Idea;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Service
public class BulkUploadService {
    
    @Autowired
    private IdeaService ideaService;

    @Autowired
    private UploadHistoryService uploadHistoryService;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public List<Idea> processFile(MultipartFile file, String batchId) throws IOException {
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new IllegalArgumentException("File name cannot be null");
        }
        
        String fileExtension = getFileExtension(filename).toLowerCase();
        
        switch (fileExtension) {
            case "csv":
                return processCsvFile(file, batchId);
            case "xlsx":
            case "xls":
                return processExcelFile(file, batchId);
            case "json":
                return processJsonFile(file, batchId);
            default:
                throw new IllegalArgumentException("Unsupported file format: " + fileExtension);
        }
    }
    
    private List<Idea> processCsvFile(MultipartFile file, String batchId) throws IOException {
        List<Idea> ideas = new ArrayList<>();
        
        try (InputStreamReader reader = new InputStreamReader(file.getInputStream());
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {
            
            for (CSVRecord record : csvParser) {
                Idea idea = createIdeaFromRecord(record);
                idea.setUploadBatchId(batchId);
                ideas.add(idea);
            }
        }
        
        return ideas;
    }
    
    private List<Idea> processExcelFile(MultipartFile file, String batchId) throws IOException {
        List<Idea> ideas = new ArrayList<>();
        
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0); // Process first sheet
            
            // Get header row
            Row headerRow = sheet.getRow(0);
            if (headerRow == null) {
                throw new IllegalArgumentException("Excel file must have a header row");
            }
            
            // Create header map for column indexing
            Map<String, Integer> headerMap = new HashMap<>();
            for (Cell cell : headerRow) {
                headerMap.put(cell.getStringCellValue().toLowerCase().trim(), cell.getColumnIndex());
            }
            
            // Process data rows
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null) {
                    Idea idea = createIdeaFromExcelRow(row, headerMap);
                    idea.setUploadBatchId(batchId);
                    ideas.add(idea);
                }
            }
        }
        
        return ideas;
    }
    
    private List<Idea> processJsonFile(MultipartFile file, String batchId) throws IOException {
        List<IdeaJson> ideaJsonList;
        
        try {
            // Parse JSON array
            ideaJsonList = objectMapper.readValue(file.getInputStream(), 
                objectMapper.getTypeFactory().constructCollectionType(List.class, IdeaJson.class));
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Invalid JSON format: " + e.getMessage());
        }
        
        List<Idea> ideas = new ArrayList<>();
        for (IdeaJson ideaJson : ideaJsonList) {
            Idea idea = mapJsonToIdea(ideaJson);
            idea.setUploadBatchId(batchId);
            ideas.add(idea);
        }
        
        return ideas;
    }
    
    private Idea createIdeaFromRecord(CSVRecord record) {
        Idea idea = new Idea();
        
        // Map CSV columns to Idea fields
        idea.setTitle(getStringValue(record, "title"));
        idea.setDescription(getStringValue(record, "description"));
        idea.setCategory(getStringValue(record, "category"));
        idea.setSector(getStringValue(record, "sector"));
        idea.setInvestmentNeeded(getBigDecimalValue(record, "investmentNeeded"));
        idea.setExpertiseNeeded(getStringValue(record, "expertiseNeeded"));
        idea.setTrainingNeeded(getStringValue(record, "trainingNeeded"));
        idea.setResources(getStringValue(record, "resources"));
        idea.setSuccessExamples(getStringValue(record, "successExamples"));
        idea.setVideoUrl(getStringValue(record, "videoUrl"));
        idea.setGovernmentSubsidies(getStringValue(record, "governmentSubsidies"));
        idea.setFundingOptions(getStringValue(record, "fundingOptions"));
        idea.setBankAssistance(getStringValue(record, "bankAssistance"));
        idea.setTargetAudience(getListValue(record, "targetAudience"));
        idea.setSpecialAdvantages(getListValue(record, "specialAdvantages"));
        idea.setDifficultyLevel(getStringValue(record, "difficultyLevel"));
        idea.setTimeToMarket(getStringValue(record, "timeToMarket"));
        idea.setLocation(getStringValue(record, "location"));
        idea.setImageUrl(getStringValue(record, "imageUrl"));
        idea.setActive(true);
        
        return idea;
    }
    
    private Idea createIdeaFromExcelRow(Row row, Map<String, Integer> headerMap) {
        Idea idea = new Idea();
        
        // Create a map-like structure for easier access
        for (Map.Entry<String, Integer> entry : headerMap.entrySet()) {
            String columnName = entry.getKey();
            Integer columnIndex = entry.getValue();
            
            Cell headerCell = null;
            Cell dataCell = null;
            
            if (columnIndex < row.getLastCellNum()) {
                headerCell = row.getCell(columnIndex);
                dataCell = row.getCell(columnIndex);
            }
            
            if (headerCell != null && dataCell != null) {
                String cellValue = getCellValueAsString(dataCell);
                
                switch (columnName) {
                    case "title":
                        idea.setTitle(cellValue);
                        break;
                    case "description":
                        idea.setDescription(cellValue);
                        break;
                    case "category":
                        idea.setCategory(cellValue);
                        break;
                    case "sector":
                        idea.setSector(cellValue);
                        break;
                    case "investmentneeded":
                        try {
                            idea.setInvestmentNeeded(new BigDecimal(cellValue));
                        } catch (NumberFormatException e) {
                            idea.setInvestmentNeeded(BigDecimal.ZERO);
                        }
                        break;
                    case "expertiseneeded":
                        idea.setExpertiseNeeded(cellValue);
                        break;
                    case "trainingneeded":
                        idea.setTrainingNeeded(cellValue);
                        break;
                    case "resources":
                        idea.setResources(cellValue);
                        break;
                    case "successexamples":
                        idea.setSuccessExamples(cellValue);
                        break;
                    case "videourl":
                        idea.setVideoUrl(cellValue);
                        break;
                    case "governmentsubsidies":
                        idea.setGovernmentSubsidies(cellValue);
                        break;
                    case "fundingoptions":
                        idea.setFundingOptions(cellValue);
                        break;
                    case "bankassistance":
                        idea.setBankAssistance(cellValue);
                        break;
                    case "targetaudience":
                        idea.setTargetAudience(parseListString(cellValue));
                        break;
                    case "specialadvantages":
                        idea.setSpecialAdvantages(parseListString(cellValue));
                        break;
                    case "difficultylevel":
                        idea.setDifficultyLevel(cellValue);
                        break;
                    case "timetomarket":
                        idea.setTimeToMarket(cellValue);
                        break;
                    case "location":
                        idea.setLocation(cellValue);
                        break;
                    case "imageurl":
                        idea.setImageUrl(cellValue);
                        break;
                }
            }
        }
        
        idea.setActive(true);
        return idea;
    }
    
    private Idea mapJsonToIdea(IdeaJson ideaJson) {
        Idea idea = new Idea();
        
        idea.setTitle(ideaJson.title);
        idea.setDescription(ideaJson.description);
        idea.setCategory(ideaJson.category);
        idea.setSector(ideaJson.sector);
        idea.setInvestmentNeeded(ideaJson.investmentNeeded != null ? ideaJson.investmentNeeded : BigDecimal.ZERO);
        idea.setExpertiseNeeded(ideaJson.expertiseNeeded);
        idea.setTrainingNeeded(ideaJson.trainingNeeded);
        idea.setResources(ideaJson.resources);
        idea.setSuccessExamples(ideaJson.successExamples);
        idea.setVideoUrl(ideaJson.videoUrl);
        idea.setGovernmentSubsidies(ideaJson.governmentSubsidies);
        idea.setFundingOptions(ideaJson.fundingOptions);
        idea.setBankAssistance(ideaJson.bankAssistance);
        idea.setTargetAudience(ideaJson.targetAudience);
        idea.setSpecialAdvantages(ideaJson.specialAdvantages);
        idea.setDifficultyLevel(ideaJson.difficultyLevel);
        idea.setTimeToMarket(ideaJson.timeToMarket);
        idea.setLocation(ideaJson.location);
        idea.setImageUrl(ideaJson.imageUrl);
        idea.setActive(true);
        
        return idea;
    }
    
    public List<Idea> saveIdeas(List<Idea> ideas) {
        List<Idea> savedIdeas = new ArrayList<>();
        for (Idea idea : ideas) {
            try {
                Idea savedIdea = ideaService.saveIdea(idea);
                savedIdeas.add(savedIdea);
            } catch (Exception e) {
                // Log the error but continue with other ideas
                System.err.println("Failed to save idea: " + idea.getTitle() + " - " + e.getMessage());
            }
        }
        return savedIdeas;
    }
    
    // Helper methods
    private String getStringValue(CSVRecord record, String columnName) {
        try {
            return record.get(columnName);
        } catch (IllegalArgumentException e) {
            return "";
        }
    }
    
    private BigDecimal getBigDecimalValue(CSVRecord record, String columnName) {
        try {
            String value = record.get(columnName);
            return new BigDecimal(value);
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }
    
    private List<String> getListValue(CSVRecord record, String columnName) {
        try {
            String value = record.get(columnName);
            return parseListString(value);
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
    
    private List<String> parseListString(String value) {
        if (value == null || value.trim().isEmpty()) {
            return new ArrayList<>();
        }
        return Arrays.asList(value.split(","));
    }
    
    private String getCellValueAsString(Cell cell) {
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf((long) cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }
    
    private String getFileExtension(String fileName) {
        int lastIndexOf = fileName.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        }
        return fileName.substring(lastIndexOf + 1);
    }
    
    // JSON DTO class for parsing JSON files
    public static class IdeaJson {
        public String title;
        public String description;
        public String category;
        public String sector;
        public BigDecimal investmentNeeded;
        public String expertiseNeeded;
        public String trainingNeeded;
        public String resources;
        public String successExamples;
        public String videoUrl;
        public String governmentSubsidies;
        public String fundingOptions;
        public String bankAssistance;
        public List<String> targetAudience;
        public List<String> specialAdvantages;
        public String difficultyLevel;
        public String timeToMarket;
        public String location;
        public String imageUrl;
    }
} 
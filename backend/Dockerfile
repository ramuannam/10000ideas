# ===========================================
# BACKEND DOCKERFILE
# ===========================================
# This Dockerfile creates a containerized version of the Spring Boot backend application
# It uses a multi-stage approach to build and run the application efficiently



##################################################### ===== Stage 1: Build the app =====
##################################################### 
# ===========================================
# BASE IMAGE
# ===========================================
# Use OpenJDK 17 slim image as the base
# - openjdk:17-jdk-slim: Lightweight Java 17 runtime with JDK
# - slim: Reduces image size by excluding unnecessary packages
FROM openjdk:17-jdk-slim AS build


# ===========================================
# WORKING DIRECTORY
# ===========================================
# Set the working directory inside the container
# All subsequent commands will be executed from this directory
WORKDIR /app

# ===========================================
# COPY DEPENDENCIES
# ===========================================
# Copy Maven project files first (for better layer caching)
# - pom.xml: Maven project configuration and dependencies
# - src/: Source code directory
# Note: Copying pom.xml first helps Docker cache the dependency layer
COPY pom.xml .
COPY src ./src

# ===========================================
# INSTALL MAVEN
# ===========================================
# Install Maven build tool in the container
# - apt-get update: Update package list
# - apt-get install -y maven: Install Maven without interactive prompts
# - &&: Chain commands to reduce layers (Docker best practice)
RUN apt-get update && apt-get install -y maven

# ===========================================
# BUILD APPLICATION
# ===========================================
# Build the Spring Boot application using Maven
# - mvn clean package: Clean previous builds and create JAR file
# - -DskipTests: Skip running tests during build (for faster builds)
# - The JAR file will be created in target/ directory
RUN mvn clean package -DskipTests

##################################################### ===== Stage 2: Runtime container =====
##################################################### 
FROM openjdk:17-jdk-slim

WORKDIR /app

#copy the jar file to the build stage
COPY --from=build /app/target/10000ideas-0.0.1-SNAPSHOT.jar .

# ===========================================
# EXPOSE PORT
# ===========================================
# Expose port 8080 for the application
# - This is the default Spring Boot port
# - Used for HTTP requests to the application
# - Note: This is just documentation, actual port mapping is done at runtime
EXPOSE 8080

# ===========================================
# START APPLICATION
# ===========================================
# Command to run the Spring Boot application
# - java -jar: Execute the JAR file using Java
# - target/10000ideas-0.0.1-SNAPSHOT.jar: The built application JAR
# - This is the entry point when container starts
CMD ["java", "-jar", "10000ideas-0.0.1-SNAPSHOT.jar"]
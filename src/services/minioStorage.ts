// MinIO Object Storage Service
// Handles file uploads and downloads using MinIO REST API
// Note: MinIO Node.js SDK is not compatible with React Native
// We use the REST API directly with fetch instead

// ⚠️ CONFIGURATION: Update these values based on your MinIO server
const MINIO_ENDPOINT = '192.168.1.15'; // Or '127.0.0.1' for localhost
const MINIO_PORT = 9000;
const MINIO_USE_SSL = false;
const MINIO_ACCESS_KEY = 'minioadmin';
const MINIO_SECRET_KEY = 'minioadmin';

// Default bucket name for the app
const DEFAULT_BUCKET = 'cancer-app-files';

/**
 * File upload result
 */
export interface UploadResult {
  success: boolean;
  url?: string;
  fileName?: string;
  error?: string;
}

/**
 * MinIO Storage Service (React Native Compatible)
 * Uses fetch API to interact with MinIO REST API
 */
class MinioStorageService {
  private bucketName: string;
  private baseUrl: string;

  constructor() {
    this.bucketName = DEFAULT_BUCKET;
    const protocol = MINIO_USE_SSL ? 'https' : 'http';
    this.baseUrl = `${protocol}://${MINIO_ENDPOINT}:${MINIO_PORT}`;
  }

  /**
   * Check if MinIO server is accessible
   */
  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/minio/health/live`);
      console.log('✅ MinIO connection successful');
      return response.ok;
    } catch (error) {
      console.error('❌ MinIO connection failed:', error);
      return false;
    }
  }

  /**
   * Upload a file to MinIO using simple PUT request
   * @param fileUri - Local file URI (from image picker or document picker)
   * @param fileName - Name to save the file as
   * @param folder - Optional folder/prefix (e.g., 'images', 'documents')
   */
  async uploadFile(
    fileUri: string,
    fileName: string,
    folder: string = ''
  ): Promise<UploadResult> {
    try {
      console.log('📤 Uploading file to MinIO...', { fileName, folder });

      // Generate full object name with folder prefix
      const objectName = folder ? `${folder}/${fileName}` : fileName;

      // Read file as blob
      const response = await fetch(fileUri);
      const blob = await response.blob();

      // Upload using MinIO REST API with Basic Auth
      const uploadUrl = `${this.baseUrl}/${this.bucketName}/${objectName}`;
      
      // Create Basic Auth header
      const authString = `${MINIO_ACCESS_KEY}:${MINIO_SECRET_KEY}`;
      const authHeader = `Basic ${btoa(authString)}`;
      
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': blob.type || 'application/octet-stream',
          'Authorization': authHeader,
        },
        body: blob,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`);
      }

      // Generate public URL for accessing the file
      const url = `${this.baseUrl}/${this.bucketName}/${objectName}`;

      console.log('✅ File uploaded successfully:', url);

      return {
        success: true,
        url,
        fileName: objectName,
      };
    } catch (error: any) {
      console.error('❌ Error uploading file:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload file',
      };
    }
  }

  /**
   * Delete a file from MinIO
   * @param fileName - Name of the file to delete
   */
  async deleteFile(fileName: string): Promise<boolean> {
    try {
      const deleteUrl = `${this.baseUrl}/${this.bucketName}/${fileName}`;
      const authString = `${MINIO_ACCESS_KEY}:${MINIO_SECRET_KEY}`;
      const authHeader = `Basic ${btoa(authString)}`;
      
      const response = await fetch(deleteUrl, { 
        method: 'DELETE',
        headers: {
          'Authorization': authHeader,
        },
      });
      
      if (response.ok) {
        console.log('✅ File deleted:', fileName);
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ Error deleting file:', error);
      return false;
    }
  }

  /**
   * Get public URL for a file
   * @param fileName - Name of the file
   */
  getPublicUrl(fileName: string): string {
    return `${this.baseUrl}/${this.bucketName}/${fileName}`;
  }
}

// Export singleton instance
export const minioStorage = new MinioStorageService();

// Export helper function for generating unique file names
export const generateFileName = (
  originalName: string,
  userId?: string
): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  const prefix = userId ? `${userId}_` : '';
  return `${prefix}${timestamp}_${randomStr}.${extension}`;
};

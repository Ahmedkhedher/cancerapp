# 🗄️ MinIO Object Storage Setup

Complete guide for integrating MinIO object storage with your Cancer Awareness app.

## 📋 Table of Contents

- [What is MinIO?](#what-is-minio)
- [Running MinIO Server](#running-minio-server)
- [Configuration](#configuration)
- [Using File Upload](#using-file-upload)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

## What is MinIO?

MinIO is a high-performance object storage system compatible with AWS S3 API. It's perfect for storing:
- 📷 User profile images
- 🖼️ Question/answer attachments
- 📄 Medical documents
- 📊 Reports and data files

## Running MinIO Server

### ✅ Your Current Setup

Based on your output, MinIO is already running:

```powershell
PS C:\Users\azer\Desktop\SaveTheDay> .\minio.exe server C:\Users\azer\Desktop\SaveTheDay\DataMinio --console-address ":9001"
```

**Server Details:**
- **API Endpoint**: http://192.168.1.15:9000 or http://127.0.0.1:9000
- **Web Console**: http://192.168.1.15:9001 or http://127.0.0.1:9001
- **Username**: `minioadmin`
- **Password**: `minioadmin`
- **Storage Path**: `C:\Users\azer\Desktop\SaveTheDay\DataMinio`

### Starting MinIO Server

**Option 1: From PowerShell**
```powershell
cd C:\Users\azer\Desktop\SaveTheDay
.\minio.exe server .\DataMinio --console-address ":9001"
```

**Option 2: From Command Prompt**
```cmd
cd C:\Users\azer\Desktop\SaveTheDay
minio.exe server DataMinio --console-address ":9001"
```

**Option 3: As a Windows Service** (Recommended for production)
```powershell
# Create a service that starts MinIO automatically
sc.exe create MinIO binPath= "C:\Users\azer\Desktop\SaveTheDay\minio.exe server C:\Users\azer\Desktop\SaveTheDay\DataMinio --console-address :9001" start= auto
sc.exe start MinIO
```

## Configuration

### 1. Update MinIO Service Configuration

Open `src/services/minioStorage.ts` and verify the configuration:

```typescript
const MINIO_ENDPOINT = '192.168.1.15'; // Your network IP
const MINIO_PORT = 9000;
const MINIO_USE_SSL = false;
const MINIO_ACCESS_KEY = 'minioadmin';
const MINIO_SECRET_KEY = 'minioadmin';
```

**For local testing only**, use `127.0.0.1`:
```typescript
const MINIO_ENDPOINT = '127.0.0.1';
```

**For network access** (other devices on same WiFi), use your network IP:
```typescript
const MINIO_ENDPOINT = '192.168.1.15'; // Your actual IP
```

### 2. Security Configuration (Important!)

⚠️ **Never use default credentials in production!**

Update credentials using environment variables:

```powershell
# Set environment variables (Windows)
$env:MINIO_ROOT_USER = "your-username"
$env:MINIO_ROOT_PASSWORD = "your-secure-password"

# Run MinIO with new credentials
.\minio.exe server .\DataMinio --console-address ":9001"
```

Then update `src/services/minioStorage.ts`:
```typescript
const MINIO_ACCESS_KEY = process.env.MINIO_ROOT_USER || 'minioadmin';
const MINIO_SECRET_KEY = process.env.MINIO_ROOT_PASSWORD || 'minioadmin';
```

### 3. Install Required Packages

```bash
npm install
```

This installs:
- `minio@^8.0.6` - MinIO JavaScript client
- `expo-image-picker@~16.2.0` - Image picker for photos
- `expo-document-picker@~12.3.0` - Document picker for files

## Using File Upload

### 1. Access File Upload Screen

**From the app:**
1. Login to the app
2. Go to **Profile** screen
3. Tap **"📤 Upload Files to MinIO"**

### 2. Upload Files

The screen provides three options:
- **📷 Take Photo** - Capture with camera
- **🖼️ Pick Image** - Choose from gallery
- **📄 Pick Document** - Select PDF, Word, text files

### 3. View Uploaded Files

- Uploaded files appear in the **"✅ Uploaded Files"** list
- Image thumbnails are shown
- Each file shows name and upload time

### 4. Access Files in MinIO Console

1. Open http://192.168.1.15:9001 in your browser
2. Login with `minioadmin` / `minioadmin`
3. Navigate to **Buckets** > **cancer-app-files**
4. View all uploaded files organized by folder:
   - `images/` - Photos and images
   - `documents/` - PDFs and other documents

## MinIO Web Console Guide

### Accessing the Console

Open http://192.168.1.15:9001 in your browser and login.

### Key Features

1. **Buckets** - View and manage storage buckets
2. **Objects** - Browse uploaded files
3. **Users** - Manage access credentials
4. **Policies** - Set access permissions
5. **Settings** - Configure server settings

### Creating Additional Buckets

```javascript
// Buckets are created automatically by the app
// Default bucket: cancer-app-files
```

To create manually:
1. Open MinIO Console
2. Click **Buckets** > **Create Bucket**
3. Enter bucket name: `cancer-app-backups`
4. Click **Create**

## API Usage Examples

### Upload a File

```typescript
import { minioStorage, generateFileName } from '../services/minioStorage';

// Upload image
const result = await minioStorage.uploadFile(
  imageUri,
  generateFileName('photo.jpg', userId),
  'images'
);

if (result.success) {
  console.log('File URL:', result.url);
}
```

### Get File URL

```typescript
// Public URL (if bucket is public)
const url = minioStorage.getPublicUrl('images/photo_123.jpg');

// Presigned URL (temporary, expires)
const downloadUrl = await minioStorage.getDownloadUrl('images/photo_123.jpg');
```

### List Files

```typescript
// List all images
const images = await minioStorage.listFiles('images/');
console.log('Images:', images);
```

### Delete File

```typescript
await minioStorage.deleteFile('images/photo_123.jpg');
```

## Security

### 🔐 Best Practices

1. **Change Default Credentials**
   ```powershell
   $env:MINIO_ROOT_USER = "admin-$(Get-Random)"
   $env:MINIO_ROOT_PASSWORD = "$(New-Guid)"
   ```

2. **Use HTTPS in Production**
   ```typescript
   const MINIO_USE_SSL = true;
   const MINIO_PORT = 9443;
   ```

3. **Restrict Network Access**
   - Use firewall rules
   - Only allow trusted IPs
   - Don't expose MinIO to public internet

4. **Set Bucket Policies**
   ```javascript
   // Make bucket public read-only
   const policy = {
     Version: '2012-10-17',
     Statement: [{
       Effect: 'Allow',
       Principal: { AWS: ['*'] },
       Action: ['s3:GetObject'],
       Resource: ['arn:aws:s3:::cancer-app-files/*']
     }]
   };
   ```

5. **Enable Encryption** (Optional)
   ```powershell
   # Set encryption key
   $env:MINIO_KMS_SECRET_KEY = "your-32-char-encryption-key"
   ```

### File Size Limits

Configure in `src/services/minioStorage.ts`:

```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

if (fileSize > MAX_FILE_SIZE) {
  throw new Error('File too large. Max 10MB.');
}
```

## Troubleshooting

### ❌ Cannot Connect to MinIO

**Symptoms**: "Cannot connect to MinIO server" error

**Solutions**:
1. Check if MinIO is running:
   ```powershell
   # Look for minio.exe process
   Get-Process minio
   ```

2. Verify endpoint in `minioStorage.ts`:
   ```typescript
   const MINIO_ENDPOINT = '192.168.1.15'; // Match your IP
   ```

3. Test connection in browser:
   - API: http://192.168.1.15:9000
   - Console: http://192.168.1.15:9001

4. Check firewall:
   ```powershell
   # Allow MinIO through Windows Firewall
   netsh advfirewall firewall add rule name="MinIO" dir=in action=allow protocol=TCP localport=9000,9001
   ```

### ❌ Upload Fails

**Symptoms**: "Failed to upload file" error

**Solutions**:
1. Check bucket exists:
   - Open MinIO Console
   - Verify `cancer-app-files` bucket exists

2. Verify permissions:
   ```typescript
   // Test in FileUploadScreen
   const canConnect = await minioStorage.checkConnection();
   Alert.alert('Connection', canConnect ? 'OK' : 'Failed');
   ```

3. Check file size:
   - MinIO default max: 5GB
   - App default max: 10MB (configurable)

4. Inspect console logs:
   ```typescript
   console.log('Upload result:', result);
   ```

### ❌ Cannot Access Files

**Symptoms**: 403 Forbidden or 404 Not Found

**Solutions**:
1. Check bucket policy is set:
   ```javascript
   // Bucket should allow public read
   await client.getBucketPolicy('cancer-app-files');
   ```

2. Verify file exists:
   - Open MinIO Console
   - Browse to bucket
   - Check file is there

3. Use presigned URLs for private files:
   ```typescript
   const url = await minioStorage.getDownloadUrl(fileName, 3600); // 1 hour
   ```

### 🔍 Enable Debug Logging

Add to `minioStorage.ts`:

```typescript
// Enable MinIO debug logs
const client = new Minio.Client({
  endPoint: MINIO_ENDPOINT,
  port: MINIO_PORT,
  useSSL: MINIO_USE_SSL,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
  // Enable debug
  enableTrace: true,
});
```

### Network Issues

**Problem**: Works on localhost but not from phone

**Solution**: Use network IP, not localhost
```typescript
// ❌ Don't use
const MINIO_ENDPOINT = '127.0.0.1';

// ✅ Use your network IP
const MINIO_ENDPOINT = '192.168.1.15';
```

**Get your IP**:
```powershell
# Windows
ipconfig | findstr IPv4

# Output: IPv4 Address. . . . . . . . . . . : 192.168.1.15
```

## Advanced Configuration

### Multiple Buckets

```typescript
// Create service for different content types
const imageStorage = new MinioStorageService('user-images');
const documentStorage = new MinioStorageService('user-documents');
const backupStorage = new MinioStorageService('app-backups');
```

### Custom File Naming

```typescript
// Add user ID prefix
export const generateFileName = (
  originalName: string,
  userId?: string
): string => {
  const timestamp = Date.now();
  const ext = originalName.split('.').pop();
  return `${userId}_${timestamp}.${ext}`;
};
```

### Compress Images Before Upload

```typescript
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

// Compress image
const compressed = await manipulateAsync(
  imageUri,
  [{ resize: { width: 1024 } }],
  { compress: 0.7, format: SaveFormat.JPEG }
);

// Upload compressed version
await minioStorage.uploadFile(compressed.uri, fileName, 'images');
```

## MinIO CLI (mc)

### Install mc CLI

```powershell
# Download from https://min.io/download#/windows
# Or use scoop
scoop install minio-client
```

### Configure mc

```bash
mc alias set myminio http://192.168.1.15:9000 minioadmin minioadmin
```

### Common Commands

```bash
# List buckets
mc ls myminio

# List files in bucket
mc ls myminio/cancer-app-files

# Copy file to bucket
mc cp myfile.jpg myminio/cancer-app-files/images/

# Remove file
mc rm myminio/cancer-app-files/images/old-photo.jpg

# Copy bucket to another location (backup)
mc mirror myminio/cancer-app-files C:\Backups\minio
```

## Production Deployment

### Using Docker

```yaml
# docker-compose.yml
version: '3'
services:
  minio:
    image: minio/minio
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: your-username
      MINIO_ROOT_PASSWORD: your-secure-password
    command: server /data --console-address ":9001"
    volumes:
      - ./data:/data
```

```bash
docker-compose up -d
```

### Cloud Deployment

MinIO can be deployed on:
- AWS EC2
- Azure VMs
- Google Cloud
- DigitalOcean
- Kubernetes

See: https://min.io/docs/minio/kubernetes/upstream/

## Resources

- **MinIO Documentation**: https://min.io/docs/minio/
- **JavaScript Client**: https://min.io/docs/minio/linux/developers/javascript/minio-javascript.html
- **API Reference**: https://docs.min.io/docs/javascript-client-api-reference.html
- **Security Guide**: https://min.io/docs/minio/linux/administration/identity-access-management.html

## Support

For issues:
1. Check MinIO logs in console
2. Enable debug logging in the app
3. Test connection with `mc` CLI
4. Verify firewall and network settings

---

**MinIO is now integrated with your Cancer Awareness app! 🎉**

Users can upload photos, documents, and other files securely to your object storage server.

// File Upload Screen
// Allows users to upload images and documents to MinIO

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ButtonPrimary, ButtonSecondary, Card, FooterBar } from '../ui/components';
import { theme } from '../ui/theme';
import { isSmartwatch, scaleFontSize } from '../ui/responsive';
import { minioStorage, generateFileName } from '../services/minioStorage';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'FileUpload'>;

interface UploadedFile {
  name: string;
  url: string;
  type: 'image' | 'document';
  uploadedAt: Date;
}

const FileUploadScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  /**
   * Pick and upload an image
   */
  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant permission to access your photo library.'
        );
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setSelectedImage(asset.uri);
        await uploadFile(asset.uri, 'image', asset.fileName || 'image.jpg');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  /**
   * Take a photo with camera
   */
  const takePhoto = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant permission to access your camera.'
        );
        return;
      }

      // Take photo
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setSelectedImage(asset.uri);
        await uploadFile(asset.uri, 'image', asset.fileName || 'photo.jpg');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  /**
   * Pick and upload a document
   */
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'text/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        await uploadFile(asset.uri, 'document', asset.name);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  /**
   * Upload file to MinIO
   */
  const uploadFile = async (
    fileUri: string,
    type: 'image' | 'document',
    originalName: string
  ) => {
    try {
      setUploading(true);

      // Generate unique file name
      const fileName = generateFileName(originalName, user?.uid);

      // Upload to MinIO
      const folder = type === 'image' ? 'images' : 'documents';
      const result = await minioStorage.uploadFile(fileUri, fileName, folder);

      if (result.success && result.url) {
        // Add to uploaded files list
        const newFile: UploadedFile = {
          name: originalName,
          url: result.url,
          type,
          uploadedAt: new Date(),
        };
        setUploadedFiles((prev) => [newFile, ...prev]);

        Alert.alert('Success', 'File uploaded successfully!');
        console.log('✅ File uploaded:', result.url);
      } else {
        Alert.alert('Error', result.error || 'Failed to upload file');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      Alert.alert('Error', error.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  /**
   * Test MinIO connection
   */
  const testConnection = async () => {
    const isConnected = await minioStorage.checkConnection();
    Alert.alert(
      'Connection Test',
      isConnected
        ? '✅ MinIO server is accessible!'
        : '❌ Cannot connect to MinIO server. Check your configuration.'
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>File Upload</Text>
        <TouchableOpacity onPress={testConnection}>
          <Text style={styles.testBtn}>Test</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upload Buttons */}
        <Card elevated style={styles.card}>
          <Text style={styles.sectionTitle}>📤 Upload Files</Text>
          <Text style={styles.subtitle}>
            Upload images and documents to MinIO object storage
          </Text>

          <View style={styles.buttonContainer}>
            <ButtonPrimary
              title="📷 Take Photo"
              onPress={takePhoto}
              disabled={uploading}
              style={styles.uploadBtn}
            />
            <ButtonSecondary
              title="🖼️ Pick Image"
              onPress={pickImage}
              disabled={uploading}
              style={styles.uploadBtn}
            />
            <ButtonSecondary
              title="📄 Pick Document"
              onPress={pickDocument}
              disabled={uploading}
              style={styles.uploadBtn}
            />
          </View>

          {uploading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.loadingText}>Uploading...</Text>
            </View>
          )}

          {selectedImage && !uploading && (
            <View style={styles.previewContainer}>
              <Text style={styles.previewTitle}>Selected Image:</Text>
              <Image source={{ uri: selectedImage }} style={styles.preview} />
            </View>
          )}
        </Card>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <Card elevated style={styles.card}>
            <Text style={styles.sectionTitle}>✅ Uploaded Files</Text>
            {uploadedFiles.map((file, index) => (
              <View key={index} style={styles.fileItem}>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileIcon}>
                    {file.type === 'image' ? '🖼️' : '📄'}
                  </Text>
                  <View style={styles.fileDetails}>
                    <Text style={styles.fileName} numberOfLines={1}>
                      {file.name}
                    </Text>
                    <Text style={styles.fileDate}>
                      {file.uploadedAt.toLocaleTimeString()}
                    </Text>
                  </View>
                </View>
                {file.type === 'image' && (
                  <Image source={{ uri: file.url }} style={styles.thumbnail} />
                )}
              </View>
            ))}
          </Card>
        )}

        {/* Info Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>ℹ️ MinIO Configuration</Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Endpoint:</Text> 192.168.1.15:9000
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Bucket:</Text> cancer-app-files
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>WebUI:</Text> http://192.168.1.15:9001
          </Text>
          <Text style={[styles.infoText, styles.muted]}>
            Files are stored securely in your MinIO object storage server.
          </Text>
        </Card>
      </ScrollView>

      <FooterBar
        active="profile"
        onHome={() => navigation.navigate('Main')}
        onQA={() => navigation.navigate('Feed')}
        onChat={() => navigation.navigate('Chat')}
        onProfile={() => navigation.navigate('Profile', {})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(2),
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  backButton: {
    padding: theme.spacing(1),
  },
  backText: {
    fontSize: scaleFontSize(16),
    color: theme.colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: scaleFontSize(20),
    fontWeight: '700',
    color: theme.colors.text,
  },
  testBtn: {
    fontSize: scaleFontSize(14),
    color: theme.colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  sectionTitle: {
    fontSize: scaleFontSize(18),
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    fontSize: scaleFontSize(14),
    color: theme.colors.subtext,
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    gap: theme.spacing(1),
  },
  uploadBtn: {
    marginVertical: theme.spacing(0.5),
  },
  loadingContainer: {
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  loadingText: {
    marginTop: theme.spacing(1),
    fontSize: scaleFontSize(14),
    color: theme.colors.subtext,
  },
  previewContainer: {
    marginTop: theme.spacing(2),
  },
  previewTitle: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing(1),
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: theme.radius.md,
    resizeMode: 'cover',
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing(1.5),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIcon: {
    fontSize: scaleFontSize(24),
    marginRight: theme.spacing(1.5),
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: theme.colors.text,
  },
  fileDate: {
    fontSize: scaleFontSize(12),
    color: theme.colors.subtext,
    marginTop: theme.spacing(0.25),
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.sm,
    marginLeft: theme.spacing(1),
  },
  infoText: {
    fontSize: scaleFontSize(14),
    color: theme.colors.text,
    marginBottom: theme.spacing(0.75),
    lineHeight: scaleFontSize(20),
  },
  bold: {
    fontWeight: '700',
  },
  muted: {
    color: theme.colors.subtext,
    fontStyle: 'italic',
    marginTop: theme.spacing(1),
  },
});

export default FileUploadScreen;


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Upload, 
  File, 
  Image, 
  Trash2, 
  Download, 
  RefreshCw,
  Folder,
  FileText,
  Eye
} from 'lucide-react';

interface FileItem {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
    lastModified: string;
    contentLength: number;
    httpStatusCode: number;
  };
}

export const FileManager: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      
      // List files from the lovable-uploads bucket (if it exists)
      const { data, error } = await supabase.storage
        .from('lovable-uploads')
        .list('', {
          limit: 100,
          offset: 0
        });

      if (error && error.message !== 'The resource was not found') {
        console.error('Error loading files:', error);
        toast.error('Failed to load files');
        return;
      }

      setFiles(data || []);
    } catch (error) {
      console.error('Error loading files:', error);
      toast.error('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setUploading(true);
    try {
      const fileName = `${Date.now()}-${selectedFile.name}`;
      
      const { data, error } = await supabase.storage
        .from('lovable-uploads')
        .upload(fileName, selectedFile);

      if (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload file');
        return;
      }

      toast.success('File uploaded successfully');
      setSelectedFile(null);
      await loadFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('lovable-uploads')
        .remove([fileName]);

      if (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete file');
        return;
      }

      toast.success('File deleted successfully');
      await loadFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
    }
  };

  const downloadFile = async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('lovable-uploads')
        .download(fileName);

      if (error) {
        console.error('Download error:', error);
        toast.error('Failed to download file');
        return;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  const getFileIcon = (mimetype: string) => {
    if (mimetype.startsWith('image/')) {
      return <Image className="h-5 w-5 text-blue-500" />;
    } else if (mimetype.includes('pdf')) {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else {
      return <File className="h-5 w-5 text-gray-500" />;
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">File Management</h2>
          <p className="text-muted-foreground">Upload and manage files</p>
        </div>
        <Button onClick={loadFiles} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="file">Select File</Label>
            <Input
              id="file"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
          </div>
          {selectedFile && (
            <div className="p-3 border rounded-lg">
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(selectedFile.size)} • {selectedFile.type}
              </p>
            </div>
          )}
          <Button onClick={uploadFile} disabled={uploading || !selectedFile} className="w-full">
            {uploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5" />
            Files ({files.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-muted-foreground">Loading files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8">
              <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No files uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.metadata?.mimetype || '')}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.metadata?.size || 0)}</span>
                        <span>{new Date(file.created_at).toLocaleDateString()}</span>
                        <Badge variant="outline" className="text-xs">
                          {file.metadata?.mimetype || 'Unknown'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(file.name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteFile(file.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FileManager;

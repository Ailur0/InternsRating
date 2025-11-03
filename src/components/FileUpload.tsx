import { useState } from "react";
import { Upload, X, FileText, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { saveFile, deleteFile, formatFileSize, AttachedFile } from "@/lib/fileStorage";
import { toast } from "sonner";

interface FileUploadProps {
  files: AttachedFile[];
  onFilesChange: (files: AttachedFile[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

export function FileUpload({ files, onFilesChange, maxFiles = 5, maxSizeMB = 10 }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (files.length + selectedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setUploading(true);
    
    try {
      const uploadedFiles: AttachedFile[] = [];
      
      for (const file of selectedFiles) {
        if (file.size > maxSizeMB * 1024 * 1024) {
          toast.error(`${file.name} exceeds ${maxSizeMB}MB limit`);
          continue;
        }
        
        const attachedFile = await saveFile(file);
        uploadedFiles.push(attachedFile);
      }
      
      onFilesChange([...files, ...uploadedFiles]);
      toast.success(`${uploadedFiles.length} file(s) attached`);
    } catch (error) {
      toast.error("Failed to upload files");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    deleteFile(fileId);
    onFilesChange(files.filter(f => f.id !== fileId));
    toast.success("File removed");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading || files.length >= maxFiles}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Uploading..." : "Attach Files"}
        </Button>
        <span className="text-xs text-muted-foreground">
          {files.length}/{maxFiles} files • Max {maxSizeMB}MB each
        </span>
      </div>
      
      <input
        id="file-upload"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
      />

      {files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {files.map((file) => (
            <Card key={file.id} className="p-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-muted rounded">
                  {file.type.startsWith('image/') ? (
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <File className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleRemoveFile(file.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

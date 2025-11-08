import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileText, CheckCircle, XCircle } from "lucide-react";
import { parseCSV, downloadCSVTemplate } from "@/lib/csvImport";
import { Intern } from "@/lib/mockData";
import { toast } from "sonner";
import { addNotification } from "@/lib/notifications";

const ImportInterns = () => {
  const [parsedData, setParsedData] = useState<Partial<Intern>[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      const data = parseCSV(csvText);
      setParsedData(data);
      
      if (data.length > 0) {
        toast.success(`Successfully parsed ${data.length} interns from CSV`);
        addNotification({
          title: 'CSV Import Preview',
          message: `${data.length} interns ready to import`,
          type: 'info',
        });
      } else {
        toast.error('No valid data found in CSV file');
      }
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    // In a real app, this would save to database
    toast.success(`${parsedData.length} interns imported successfully!`);
    addNotification({
      title: 'Import Successful',
      message: `Successfully imported ${parsedData.length} interns`,
      type: 'success',
      actionUrl: '/dashboard/interns',
    });
    setParsedData([]);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isValid = (intern: Partial<Intern>) => {
    return intern.name && intern.email;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Upload className="w-8 h-8" />
          Import Interns
        </h1>
        <p className="text-muted-foreground mt-1">Bulk import interns from CSV file</p>
      </div>

      {/* Upload Section */}
      <Card className="shadow-soft border-border">
        <CardHeader>
          <CardTitle>Upload CSV File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              {fileName || "Click to upload or drag and drop your CSV file"}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              Choose File
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Need a template?</span>
            </div>
            <Button variant="outline" onClick={downloadCSVTemplate}>
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CSV Format Guide */}
      <Card className="shadow-soft border-border">
        <CardHeader>
          <CardTitle>CSV Format Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">Your CSV file should include these columns:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><span className="font-medium text-foreground">name</span> - Full name (required)</li>
              <li><span className="font-medium text-foreground">email</span> - Email address (required)</li>
              <li><span className="font-medium text-foreground">phone</span> - Phone number</li>
              <li><span className="font-medium text-foreground">employeeId</span> - Employee ID</li>
              <li><span className="font-medium text-foreground">department</span> - Department name</li>
              <li><span className="font-medium text-foreground">startDate</span> - Start date (YYYY-MM-DD)</li>
              <li><span className="font-medium text-foreground">endDate</span> - End date (YYYY-MM-DD)</li>
              <li><span className="font-medium text-foreground">university</span> - University name</li>
              <li><span className="font-medium text-foreground">major</span> - Major/Field of study</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      {parsedData.length > 0 && (
        <Card className="shadow-soft border-border">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Preview ({parsedData.length} interns)</CardTitle>
              <Button onClick={handleImport}>
                <Upload className="w-4 h-4 mr-2" />
                Import All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {parsedData.map((intern, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{intern.name || 'Missing Name'}</p>
                    <p className="text-sm text-muted-foreground">
                      {intern.email || 'Missing Email'} • {intern.department || 'No Department'}
                    </p>
                  </div>
                  {isValid(intern) ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImportInterns;

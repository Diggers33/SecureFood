import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Download, Trash2, FileSpreadsheet, File, FileText, Folder, Clock, CheckCircle, Fish, Wheat, Apple, Milk, Activity } from 'lucide-react';
import { motion } from 'motion/react';

type ReportSector = 'fish' | 'aquaculture' | 'grain' | 'fruits' | 'dairy';

interface ReportsPageProps {
  initialSector?: ReportSector;
}

interface FileItem {
  id: string;
  name: string;
  date: string;
  size?: string;
  type?: string;
}

const initialFiles: FileItem[] = [
  {
    id: '1',
    name: 'use-case-values-building.xlsx',
    date: '07/07/2025 05:07:16 PM',
    size: '2.4 MB',
    type: 'Excel',
  },
  {
    id: '2',
    name: 'BIORAD-YAG-WP3 Sample data structure (1).xlsx',
    date: '07/22/2025 03:09:43 PM',
    size: '5.1 MB',
    type: 'Excel',
  },
  {
    id: '3',
    name: 'use-cases-template (2).csv',
    date: '09/19/2025 01:24:08 PM',
    size: '0.8 MB',
    type: 'CSV',
  },
  {
    id: '4',
    name: 'use-cases-template (2)v1.csv',
    date: '09/19/2025 01:26:52 PM',
    size: '0.9 MB',
    type: 'CSV',
  },
  {
    id: '5',
    name: 'use-cases-template (2).csv',
    date: '09/19/2025 01:28:33 PM',
    size: '0.8 MB',
    type: 'CSV',
  },
  {
    id: '6',
    name: 'use-cases-template (3).csv',
    date: '09/24/2025 11:38:18 AM',
    size: '1.2 MB',
    type: 'CSV',
  },
];

export default function ReportsPage({ initialSector = 'fish' }: ReportsPageProps) {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [activeTab, setActiveTab] = useState('files');
  const [selectedSector, setSelectedSector] = useState<ReportSector>(initialSector);

  const sectors = [
    { id: 'fish' as ReportSector, name: 'Fish - Greece', icon: Fish, color: 'blue', gradient: 'from-blue-500 to-cyan-600' },
    { id: 'aquaculture' as ReportSector, name: 'Aquaculture - Belgium', icon: Activity, color: 'teal', gradient: 'from-teal-500 to-emerald-600' },
    { id: 'grain' as ReportSector, name: 'Grain - Ukraine', icon: Wheat, color: 'amber', gradient: 'from-amber-500 to-orange-600' },
    { id: 'fruits' as ReportSector, name: 'Fruits & Vegetables - Portugal', icon: Apple, color: 'green', gradient: 'from-green-500 to-emerald-600' },
    { id: 'dairy' as ReportSector, name: 'Milk & Dairy - Greece/Finland', icon: Milk, color: 'indigo', gradient: 'from-indigo-500 to-purple-600' },
  ];

  const currentSector = sectors.find(s => s.id === selectedSector);
  const CurrentSectorIcon = currentSector?.icon || Activity;

  const handleDownload = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (file) {
      console.log('Downloading:', file.name);
      // Download logic would go here
    }
  };

  const handleDelete = (fileId: string) => {
    setFiles(files.filter((f) => f.id !== fileId));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      const newFiles = Array.from(uploadedFiles).map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        date: new Date().toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.name.endsWith('.csv') ? 'CSV' : 'Excel',
      }));
      setFiles([...newFiles, ...files]);
      setActiveTab('files');
    }
  };

  const handleDownloadTemplate = (templateName: string) => {
    console.log('Downloading template:', templateName);
    // Template download logic would go here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          {/* Current Sector Indicator */}
          <div className="flex items-center gap-4 mb-4">
            <div 
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br ${currentSector?.gradient}`}
            >
              <CurrentSectorIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl mb-1">
                {currentSector?.name.split(' - ')[0]} <span className="text-teal-600">Reports</span>
              </h1>
              <p className="text-sm text-gray-600">{currentSector?.name}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
            <Card className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-teal-700">Total Files</p>
                  <p className="text-2xl text-teal-900">{files.length}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                  <FileSpreadsheet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-blue-700">Excel Files</p>
                  <p className="text-2xl text-blue-900">
                    {files.filter(f => f.type === 'Excel').length}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <File className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-purple-700">CSV Files</p>
                  <p className="text-2xl text-purple-900">
                    {files.filter(f => f.type === 'CSV').length}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-green-700">Status</p>
                  <p className="text-base text-green-900">All synced</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <Card className="overflow-hidden shadow-xl border-2 border-gray-100">
          {/* Tabs Header */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 p-1">
              <TabsList className="bg-transparent border-b-0 h-auto p-0 w-full justify-start">
                <TabsTrigger
                  value="files"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 border-b-4 border-transparent data-[state=active]:border-white rounded-none px-8 py-4 transition-all duration-300 backdrop-blur-sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Files
                </TabsTrigger>
                <TabsTrigger
                  value="download-template"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 border-b-4 border-transparent data-[state=active]:border-white rounded-none px-8 py-4 backdrop-blur-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download template
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Files Tab */}
            <TabsContent value="files" className="p-0 m-0">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-br from-white to-gray-50/50"
              >
                {files.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileSpreadsheet className="w-10 h-10 text-teal-600" />
                    </div>
                    <p className="text-gray-600 mb-2">No files uploaded yet</p>
                    <p className="text-sm text-gray-500">Upload your first file to get started</p>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="space-y-3">
                      {files.map((file, index) => (
                        <motion.div
                          key={file.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 3 }}
                        >
                          <Card className="p-5 bg-white border-2 border-gray-100 hover:border-teal-300 hover:shadow-lg transition-all">
                            <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-6 items-center">
                              {/* File Icon */}
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                                file.type === 'Excel' 
                                  ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                                  : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                              }`}>
                                {file.type === 'Excel' ? (
                                  <FileSpreadsheet className="w-6 h-6 text-white" />
                                ) : (
                                  <File className="w-6 h-6 text-white" />
                                )}
                              </div>

                              {/* File Details */}
                              <div className="flex-1">
                                <div className="text-sm text-gray-900 mb-1">{file.name}</div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {file.date}
                                  </div>
                                  {file.size && (
                                    <Badge variant="outline" className="text-xs">
                                      {file.size}
                                    </Badge>
                                  )}
                                  {file.type && (
                                    <Badge className={`text-xs ${
                                      file.type === 'Excel' 
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    }`}>
                                      {file.type}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Status Badge */}
                              <Badge className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Synced
                              </Badge>

                              {/* Download Button */}
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDownload(file.id)}
                                  className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl"
                                >
                                  <Download className="w-5 h-5" />
                                </Button>
                              </motion.div>

                              {/* Delete Button */}
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(file.id)}
                                  className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </Button>
                              </motion.div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Download Template Tab */}
            <TabsContent value="download-template" className="p-0 m-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-white to-blue-50/30 p-8"
              >
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-800">Download Templates</h3>
                      <p className="text-xs text-gray-500">Get started with pre-configured templates</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-6 px-1">
                    Download pre-configured templates to ensure your data is formatted correctly for analysis.
                  </p>

                  <div className="space-y-4">
                    {/* Template 1 */}
                    <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      <Card className="p-6 border-2 border-gray-200 hover:border-teal-300 hover:shadow-xl transition-all bg-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                              <FileSpreadsheet className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-900 mb-1">Use Case Values Template</div>
                              <div className="flex items-center gap-2">
                                <Badge className="text-xs bg-green-100 text-green-700">
                                  Excel format
                                </Badge>
                                <span className="text-xs text-gray-500">.xlsx</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleDownloadTemplate('use-case-values-template.xlsx')}
                            className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-md rounded-xl"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    </motion.div>

                    {/* Template 2 */}
                    <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      <Card className="p-6 border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all bg-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                              <File className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-900 mb-1">Data Structure Template</div>
                              <div className="flex items-center gap-2">
                                <Badge className="text-xs bg-blue-100 text-blue-700">
                                  CSV format
                                </Badge>
                                <span className="text-xs text-gray-500">.csv</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleDownloadTemplate('data-structure-template.csv')}
                            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-md rounded-xl"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    </motion.div>

                    {/* Template 3 */}
                    <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      <Card className="p-6 border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all bg-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                              <FileSpreadsheet className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-900 mb-1">Supply Chain Analysis Template</div>
                              <div className="flex items-center gap-2">
                                <Badge className="text-xs bg-purple-100 text-purple-700">
                                  Excel format
                                </Badge>
                                <span className="text-xs text-gray-500">.xlsx</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleDownloadTemplate('supply-chain-template.xlsx')}
                            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-md rounded-xl"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Help Card */}
                  <Card className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm text-teal-900 mb-2">Need help with templates?</h4>
                        <p className="text-xs text-teal-700">
                          Templates include pre-filled examples and instructions. Simply download, fill in your data following the format, and upload back to the platform for analysis.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
import React, { useState, useRef } from 'react';

const BovineClassifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    alert('404');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 font-serif">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* logo */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Bovine Breed Classifier
                </h1>
                <p className="text-gray-600">AI-powered cattle breed identification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Identify Cattle Breeds with
            <span className="bg-black from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload an image of cattle and discover the breed instantly. 
            Built with cutting-edge machine learning for accurate identification.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={openFileDialog}
              className={`relative border-2 rounded-2xl p-12 cursor-pointer transition-all duration-300 ${
                isDragOver 
                  ? 'border-blue-500 bg-blue-50 scale-105' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {isDragOver ? 'Drop your image here' : 'Upload cattle image'}
                </h3>
                
                <div className="space-y-3">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-medium text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Choose File
                  </button>
                </div>
              </div>
              
              {isDragOver && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-2xl flex items-center justify-center">
                  <div className="text-blue-600 font-semibold text-xl">
                    Release to upload
                  </div>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          {imagePreview && (
            <div className="border-t border-gray-100 p-8 bg-gray-50">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-64 h-64 object-cover rounded-xl shadow-lg border-4 border-white"
                  />
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready for Analysis!
                  </h3>
                  
                  <button
                    onClick={handleAnalyze}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Analyze Image
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-16 flex justify-center">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">High Accuracy</h3>
            <p className="text-gray-600">Advanced AI models trained on thousands of cattle images for precise breed identification.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BovineClassifier;
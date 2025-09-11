import { Camera, Upload, AlertCircle, CheckCircle, AlertTriangle, Mic, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DiseaseDetectionProps {
  language: string;
}

interface DetectionResult {
  status: 'healthy' | 'warning' | 'high-risk';
  confidence: number;
  condition: string;
  advice: string;
  audioAdvice?: string;
}

export function DiseaseDetection({ language }: DiseaseDetectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const translations = {
    en: {
      title: "AI Disease Detection",
      subtitle: "Capture or upload poultry images for health analysis",
      camera: "Take Photo",
      upload: "Upload Image",
      analyzing: "Analyzing...",
      result: "Analysis Result",
      confidence: "Confidence",
      advice: "Recommended Action",
      voiceAdvice: "Listen to Advice",
      newScan: "New Scan"
    },
    hi: {
      title: "AI रोग पहचान",
      subtitle: "स्वास्थ्य विश्लेषण के लिए पोल्ट्री की तस्वीर लें या अपलोड करें",
      camera: "फोटो लें",
      upload: "तस्वीर अपलोड करें",
      analyzing: "विश्लेषण कर रहे हैं...",
      result: "विश्लेषण परिणाम",
      confidence: "विश्वास",
      advice: "सुझावित कार्रवाई",
      voiceAdvice: "सलाह सुनें",
      newScan: "नया स्कैन"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  // Mock detection results for demo
  const mockResults: DetectionResult[] = [
    {
      status: 'healthy',
      confidence: 92,
      condition: 'Healthy Birds',
      advice: 'Continue regular feeding and monitoring. Birds appear healthy with good feather condition.',
      audioAdvice: 'Your birds look healthy! Keep up the good work with regular care.'
    },
    {
      status: 'warning',
      confidence: 78,
      condition: 'Possible Stress Signs',
      advice: 'Monitor closely for next 24 hours. Ensure adequate water supply and reduce noise around birds.',
      audioAdvice: 'Some birds show stress signs. Check water supply and reduce disturbances.'
    },
    {
      status: 'high-risk',
      confidence: 85,
      condition: 'Respiratory Issues Detected',
      advice: 'Isolate affected birds immediately. Contact veterinarian within 2 hours. Clean and disinfect coop.',
      audioAdvice: 'Alert! Separate sick birds now. Call vet immediately. Clean the coop thoroughly.'
    }
  ];

  const handleImageCapture = () => {
    setSelectedImage("https://images.unsplash.com/photo-1623877111207-980f1a0e5110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwY2hpY2tlbnN8ZW58MXx8fHwxNzU3NTE2ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080");
    analyzeImage();
  };

  const handleImageUpload = () => {
    setSelectedImage("https://images.unsplash.com/photo-1658086130176-9e771ed4c9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VsdHJ5JTIwY2hpY2tlbiUyMGZhcm18ZW58MXx8fHwxNzU3NTE2ODg5fDA&ixlib=rb-4.1.0&q=80&w=1080");
    analyzeImage();
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'high-risk': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'high-risk': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const speakAdvice = () => {
    if (result?.audioAdvice && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(result.audioAdvice);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 p-4 pb-20">
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
        <h1 className="text-3xl mb-3 font-bold text-blue-800">{t.title}</h1>
        <p className="text-blue-600 text-lg font-medium">{t.subtitle}</p>
        <div className="mt-4">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1616528286896-785bb03bd45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwY29vcCUyMGZhcm0lMjBiaXJkc3xlbnwxfHx8fDE3NTc1MjI1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Healthy chickens in farm"
            className="w-32 h-24 object-cover rounded-xl mx-auto border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {!selectedImage && !isAnalyzing && !result && (
        <div className="space-y-6">
          <Card className="border-dashed border-3 border-green-300 bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="relative">
                <Camera className="w-20 h-20 text-green-600 mx-auto mb-6 drop-shadow-sm" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-lg">📸</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">AI Disease Detection</h3>
              <p className="text-green-600 mb-6">Upload or capture images of your poultry for instant health analysis</p>
              <div className="space-y-3">
                <Button onClick={handleImageCapture} size="lg" className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-semibold text-lg py-3">
                  <Camera className="w-6 h-6 mr-3" />
                  {t.camera}
                </Button>
                <Button onClick={handleImageUpload} variant="outline" size="lg" className="w-full border-2 border-green-300 text-green-700 hover:bg-green-50 font-semibold text-lg py-3">
                  <Upload className="w-6 h-6 mr-3" />
                  {t.upload}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-800 font-medium">
              💡 <strong>Pro Tip:</strong> Take clear photos of your birds in good lighting for best results. Focus on birds showing symptoms.
            </AlertDescription>
          </Alert>

          {/* Features showcase */}
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-white/80 backdrop-blur-sm border border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800">Disease Detection</h4>
                    <p className="text-sm text-purple-600">Identify common poultry diseases</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Heart className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-800">Health Assessment</h4>
                    <p className="text-sm text-orange-600">Get instant health recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedImage && (
        <Card>
          <CardContent className="p-4">
            <ImageWithFallback 
              src={selectedImage} 
              alt="Captured poultry"
              className="w-full h-64 object-cover rounded-lg"
            />
          </CardContent>
        </Card>
      )}

      {isAnalyzing && (
        <Card className="border-blue-200">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg mb-2">{t.analyzing}</h3>
            <p className="text-gray-600 text-sm">AI is analyzing your poultry health...</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="space-y-4">
          <Card className={`border-2 ${getStatusColor(result.status)}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const IconComponent = getStatusIcon(result.status);
                  return <IconComponent className="w-5 h-5" />;
                })()}
                {t.result}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {result.condition}
                </Badge>
                <span className="text-sm text-gray-600">
                  {t.confidence}: {result.confidence}%
                </span>
              </div>
              
              <Alert className={getStatusColor(result.status)}>
                <AlertDescription>
                  <strong>{t.advice}:</strong><br />
                  {result.advice}
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button onClick={speakAdvice} variant="outline" className="flex-1">
                  <Mic className="w-4 h-4 mr-2" />
                  {t.voiceAdvice}
                </Button>
                <Button 
                  onClick={() => {
                    setSelectedImage(null);
                    setResult(null);
                  }} 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {t.newScan}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
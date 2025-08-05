import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import CameraCapture from '@/components/CameraCapture';
import ProcessingScreen from '@/components/ProcessingScreen';
import PlaylistResult from '@/components/PlaylistResult';

type AppState = 'landing' | 'camera' | 'processing' | 'result';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [detectedEmotion, setDetectedEmotion] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);

  const handleStartScan = () => {
    setCurrentState('camera');
  };

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setCurrentState('processing');
    
    // Simulate AI processing with mock results
    setTimeout(() => {
      const emotions = ['happy', 'sad', 'angry', 'surprised', 'neutral'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      const randomConfidence = 0.75 + Math.random() * 0.2; // 75-95% confidence
      
      setDetectedEmotion(randomEmotion);
      setConfidence(randomConfidence);
      setCurrentState('result');
    }, 3000);
  };

  const handleBack = () => {
    setCurrentState('landing');
  };

  const handleScanAgain = () => {
    setCurrentState('camera');
    setCapturedImage('');
    setDetectedEmotion('');
    setConfidence(0);
  };

  const handleExploreMore = () => {
    // This could navigate to a browse page or show more playlists
    console.log('Explore more clicked');
  };

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'landing':
        return <LandingPage onStartScan={handleStartScan} />;
      case 'camera':
        return <CameraCapture onCapture={handleCapture} onBack={handleBack} />;
      case 'processing':
        return <ProcessingScreen />;
      case 'result':
        return (
          <PlaylistResult
            detectedEmotion={detectedEmotion}
            confidence={confidence}
            onScanAgain={handleScanAgain}
            onExploreMore={handleExploreMore}
          />
        );
      default:
        return <LandingPage onStartScan={handleStartScan} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentScreen()}
    </div>
  );
};

export default Index;

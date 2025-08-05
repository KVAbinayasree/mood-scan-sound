import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Camera, ArrowLeft, RotateCcw } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onBack: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onBack }) => {
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: facingMode
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  const flipCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Position Your Face
        </h2>
        <p className="text-lg text-muted-foreground max-w-md">
          Look directly at the camera for the best emotion detection results
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative mb-8"
      >
        {/* Camera frame with gradient border */}
        <div className="relative p-1 bg-gradient-primary rounded-3xl shadow-glow">
          <div className="relative overflow-hidden rounded-3xl bg-black">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full max-w-lg"
              mirrored={facingMode === 'user'}
            />
            
            {/* Overlay scanning animation */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-4 border-2 border-primary/50 rounded-2xl">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating dots animation */}
        <div className="absolute -inset-4 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-accent/60 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
              }}
              style={{
                left: `${(i * 45) % 360}px`,
                top: `${Math.sin((i * 45 * Math.PI) / 180) * 50 + 50}%`,
                transform: `rotate(${i * 45}deg) translateX(150px)`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex gap-6 items-center"
      >
        <Button
          variant="capture"
          size="default"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back
        </Button>

        <Button
          variant="scan"
          size="capture"
          onClick={capture}
          className="relative group"
        >
          <Camera size={32} className="group-hover:scale-110 transition-transform" />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white/30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Button>

        <Button
          variant="capture"
          size="default"
          onClick={flipCamera}
          className="flex items-center gap-2"
        >
          <RotateCcw size={20} />
          Flip
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-muted-foreground/60">
          Make sure you're in good lighting for better detection
        </p>
      </motion.div>
    </div>
  );
};

export default CameraCapture;
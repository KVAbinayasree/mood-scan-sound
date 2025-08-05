import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Music, Camera, Heart, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStartScan: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartScan }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 text-primary/20"
        >
          <Music size={40} />
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-32 text-secondary/20"
        >
          <Heart size={50} />
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-40 text-accent/20"
        >
          <Sparkles size={35} />
        </motion.div>
      </div>

      <div className="text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            MoodTune
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
              Music That Matches Your Mood
            </p>
            
            <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Let our AI detect your emotions through your camera and discover the perfect playlist that resonates with how you're feeling right now.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="flex flex-col items-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-card">
              <Camera className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">AI Emotion Detection</h3>
              <p className="text-muted-foreground text-center">Advanced facial recognition technology</p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-card">
              <Music className="w-12 h-12 text-secondary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Curated Playlists</h3>
              <p className="text-muted-foreground text-center">Handpicked songs for every emotion</p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-card">
              <Heart className="w-12 h-12 text-accent mb-4" />
              <h3 className="font-semibold text-lg mb-2">Personal Experience</h3>
              <p className="text-muted-foreground text-center">Music tailored just for you</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={onStartScan}
              className="group"
            >
              <Camera className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Scan My Mood
              <Sparkles className="w-5 h-5 ml-3 group-hover:rotate-12 transition-transform" />
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-sm text-muted-foreground/60 mt-6"
          >
            Your privacy is protected. We never store your photos.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
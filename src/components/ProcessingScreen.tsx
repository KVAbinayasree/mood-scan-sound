import React from 'react';
import { motion } from 'framer-motion';
import MoodIcon from './MoodIcon';

const ProcessingScreen: React.FC = () => {
  const emotions = ['happy', 'sad', 'angry', 'surprised', 'neutral'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background animated gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10"
        animate={{
          background: [
            "linear-gradient(45deg, hsl(var(--primary)/0.1), hsl(var(--accent)/0.1))",
            "linear-gradient(135deg, hsl(var(--accent)/0.1), hsl(var(--secondary)/0.1))",
            "linear-gradient(225deg, hsl(var(--secondary)/0.1), hsl(var(--primary)/0.1))",
            "linear-gradient(315deg, hsl(var(--primary)/0.1), hsl(var(--accent)/0.1))"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Analyzing Your Mood
        </h2>

        {/* Emotion carousel */}
        <div className="relative h-32 mb-8 flex items-center justify-center">
          {emotions.map((emotion, index) => (
            <motion.div
              key={emotion}
              className="absolute"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5],
                rotateY: [0, 0, 0, 180],
              }}
              transition={{
                duration: 2.5,
                delay: index * 0.5,
                repeat: Infinity,
                repeatDelay: (emotions.length - 1) * 0.5,
              }}
            >
              <MoodIcon emotion={emotion} size="xl" animated />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xl text-muted-foreground mb-8"
        >
          Detecting your mood... please wait
        </motion.p>

        {/* Animated loading spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            className="absolute inset-0 border-4 border-primary/20 rounded-full"
          />
          <motion.div
            className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 border-4 border-accent/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/40 rounded-full"
              animate={{
                x: [0, Math.cos(i * 30 * Math.PI / 180) * 100],
                y: [0, Math.sin(i * 30 * Math.PI / 180) * 100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.25,
              }}
              style={{
                left: '50%',
                top: '50%',
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-sm text-muted-foreground/60"
        >
          Our AI is processing your facial expressions...
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProcessingScreen;
import React from 'react';

interface MoodIconProps {
  emotion: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const MoodIcon: React.FC<MoodIconProps> = ({ emotion, size = 'md', animated = false }) => {
  const getEmoji = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'happy':
      case 'joy':
        return '😊';
      case 'sad':
      case 'sadness':
        return '😢';
      case 'angry':
      case 'anger':
        return '😡';
      case 'surprised':
      case 'surprise':
        return '😲';
      case 'fear':
      case 'scared':
        return '😨';
      case 'disgusted':
      case 'disgust':
        return '🤢';
      case 'excited':
      case 'energetic':
        return '🤩';
      case 'calm':
      case 'peaceful':
        return '😌';
      case 'neutral':
      default:
        return '😐';
    }
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'sm':
        return 'text-2xl';
      case 'md':
        return 'text-4xl';
      case 'lg':
        return 'text-6xl';
      case 'xl':
        return 'text-8xl';
      default:
        return 'text-4xl';
    }
  };

  return (
    <div
      className={`${getSizeClass(size)} ${
        animated ? 'animate-emotion-bounce' : ''
      } transition-all duration-300`}
    >
      {getEmoji(emotion)}
    </div>
  );
};

export default MoodIcon;
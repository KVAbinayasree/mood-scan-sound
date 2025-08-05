import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MoodIcon from './MoodIcon';
import { Play, RotateCcw, Search, Heart, Share2 } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl?: string;
}

interface PlaylistResultProps {
  detectedEmotion: string;
  confidence: number;
  onScanAgain: () => void;
  onExploreMore: () => void;
}

const PlaylistResult: React.FC<PlaylistResultProps> = ({
  detectedEmotion,
  confidence,
  onScanAgain,
  onExploreMore,
}) => {
  // Mock playlist data based on emotion
  const getPlaylistForEmotion = (emotion: string): Song[] => {
    const playlists = {
      happy: [
        { id: '1', title: 'Happy', artist: 'Pharrell Williams', album: 'G I R L', duration: '3:53' },
        { id: '2', title: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', album: 'Trolls Soundtrack', duration: '3:56' },
        { id: '3', title: 'Good as Hell', artist: 'Lizzo', album: 'Cuz I Love You', duration: '2:39' },
        { id: '4', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', duration: '4:30' },
      ],
      sad: [
        { id: '5', title: 'Someone Like You', artist: 'Adele', album: '21', duration: '4:45' },
        { id: '6', title: 'Hurt', artist: 'Johnny Cash', album: 'American IV', duration: '3:38' },
        { id: '7', title: 'Mad World', artist: 'Gary Jules', album: 'Donnie Darko Soundtrack', duration: '3:07' },
        { id: '8', title: 'The Night We Met', artist: 'Lord Huron', album: 'Strange Trails', duration: '3:28' },
      ],
      angry: [
        { id: '9', title: 'Break Stuff', artist: 'Limp Bizkit', album: 'Significant Other', duration: '2:47' },
        { id: '10', title: 'Killing in the Name', artist: 'Rage Against the Machine', album: 'Rage Against the Machine', duration: '5:14' },
        { id: '11', title: 'Bodies', artist: 'Drowning Pool', album: 'Sinner', duration: '3:23' },
        { id: '12', title: 'Chop Suey!', artist: 'System of a Down', album: 'Toxicity', duration: '3:30' },
      ],
      surprised: [
        { id: '13', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55' },
        { id: '14', title: 'Thunderstruck', artist: 'AC/DC', album: 'The Razors Edge', duration: '4:52' },
        { id: '15', title: 'Mr. Blue Sky', artist: 'Electric Light Orchestra', album: 'Out of the Blue', duration: '5:03' },
        { id: '16', title: 'September', artist: 'Earth, Wind & Fire', album: 'The Best of Earth Wind & Fire Vol. 1', duration: '3:35' },
      ],
      neutral: [
        { id: '17', title: 'Weightless', artist: 'Marconi Union', album: 'Distance', duration: '8:08' },
        { id: '18', title: 'Clair de Lune', artist: 'Claude Debussy', album: 'Suite Bergamasque', duration: '5:20' },
        { id: '19', title: 'Aqueous Transmission', artist: 'Incubus', album: 'Morning View', duration: '7:49' },
        { id: '20', title: 'Svefn-g-englar', artist: 'Sigur Rós', album: 'Ágætis byrjun', duration: '10:04' },
      ],
    };

    return playlists[emotion.toLowerCase() as keyof typeof playlists] || playlists.neutral;
  };

  const playlist = getPlaylistForEmotion(detectedEmotion);
  
  const getEmotionColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'happy': return 'emotion-happy';
      case 'sad': return 'emotion-sad';
      case 'angry': return 'emotion-angry';
      case 'surprised': return 'emotion-surprised';
      default: return 'emotion-neutral';
    }
  };

  const getEmotionGradient = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'happy': return 'from-success to-warning';
      case 'sad': return 'from-primary to-muted';
      case 'angry': return 'from-secondary to-destructive';
      case 'surprised': return 'from-warning to-accent';
      default: return 'from-accent to-muted';
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header with detected emotion */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className={`inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r ${getEmotionGradient(detectedEmotion)} shadow-glow`}>
              <MoodIcon emotion={detectedEmotion} size="lg" animated />
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white capitalize">
                  You look {detectedEmotion}!
                </h2>
                <p className="text-white/80">
                  {Math.round(confidence * 100)}% confidence
                </p>
              </div>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Your Personalized Playlist
          </motion.h3>
          <p className="text-muted-foreground">
            Curated songs that match your current mood
          </p>
        </div>

        {/* Playlist */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4 mb-8"
        >
          {playlist.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <Card className="group hover:shadow-glow transition-all duration-300 hover:scale-[1.02] border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <div className="text-2xl">🎵</div>
                      </div>
                      <Button
                        variant="default"
                        size="icon"
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/90 hover:bg-primary"
                      >
                        <Play size={20} />
                      </Button>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {song.title}
                      </h4>
                      <p className="text-muted-foreground">{song.artist}</p>
                      <p className="text-sm text-muted-foreground/60">{song.album}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{song.duration}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            variant="hero"
            size="lg"
            onClick={onScanAgain}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Scan Again
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={onExploreMore}
            className="w-full sm:w-auto"
          >
            <Search className="w-5 h-5 mr-2" />
            Explore More
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Playlist
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground/60">
            Enjoying your mood-based playlist? Try scanning again for different recommendations!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlaylistResult;
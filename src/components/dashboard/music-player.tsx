
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const audioRef = useRef<HTMLIFrameElement>(null);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    // In a real implementation, we would control the YouTube iframe API
    // For now, this is just a UI demonstration
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleYoutubeLink = () => {
    if (!youtubeUrl) return;
    
    try {
      // Extract video ID from YouTube URL
      const videoId = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
      
      if (videoId) {
        setEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=0`);
      }
    } catch (error) {
      console.error("Invalid YouTube URL", error);
    }
  };
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Music Player</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input 
              type="text" 
              placeholder="Paste YouTube URL here" 
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleYoutubeLink} size="sm">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          
          {embedUrl && (
            <div className="aspect-video w-full rounded-md overflow-hidden bg-black/10">
              <iframe
                ref={audioRef}
                width="100%"
                height="100%"
                src={embedUrl}
                title="YouTube music player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          
          {!embedUrl && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                No track playing
              </div>
              <div className="flex items-center space-x-2">
                <button className="music-player-button">
                  <SkipBack className="h-4 w-4" />
                </button>
                <button 
                  className="music-player-button h-10 w-10"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button className="music-player-button">
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>
              <button className="music-player-button">
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          )}
          
          {!embedUrl && (
            <div className="space-y-2">
              <div className="music-player-progress">
                <div className="music-player-progress-bar" style={{ width: '0%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0:00</span>
                <span>0:00</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

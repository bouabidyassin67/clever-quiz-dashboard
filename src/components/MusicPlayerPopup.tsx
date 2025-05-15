
import React, { useRef } from 'react';
import { Music, X, Play, Pause, SkipBack, SkipForward, Volume2, ExternalLink, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from 'sonner';
import { useMusic } from '@/contexts/MusicContext';

const MusicPlayerPopup: React.FC = () => {
  const { 
    isOpen, 
    setIsOpen, 
    isPlaying, 
    setIsPlaying,
    youtubeUrl,
    setYoutubeUrl,
    embedUrl,
    setEmbedUrl,
    history,
    setHistory
  } = useMusic();
  
  const audioRef = useRef<HTMLIFrameElement>(null);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, we would use the YouTube iframe API to control playback
  };
  
  const handleYoutubeLink = () => {
    if (!youtubeUrl) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    
    try {
      // Extract video ID from YouTube URL
      const videoId = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
      
      if (videoId) {
        const newEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        setEmbedUrl(newEmbedUrl);
        setIsPlaying(true);
        
        // Add to history if not already there
        if (!history.includes(youtubeUrl)) {
          setHistory([youtubeUrl, ...history.slice(0, 4)]);
        }
        
        toast.success("Now playing from YouTube");
      } else {
        toast.error("Invalid YouTube URL. Please enter a valid YouTube video link.");
      }
    } catch (error) {
      console.error("Invalid YouTube URL", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  // Handle pressing Enter in the input field
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleYoutubeLink();
    }
  };
  
  const playFromHistory = (url: string) => {
    setYoutubeUrl(url);
    setTimeout(() => {
      handleYoutubeLink();
    }, 100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-72 h-96 bg-card border border-border rounded-lg shadow-xl flex flex-col overflow-hidden animate-in fade-in duration-300 slide-in-from-bottom-right">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card text-card-foreground">
            <h3 className="text-md font-semibold flex items-center gap-2">
              <Youtube className="h-4 w-4 text-red-500" />
              Music Player
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="hover:bg-accent hover:text-accent-foreground">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            <div className="flex items-center space-x-2">
              <Input 
                type="text" 
                placeholder="Paste YouTube URL here" 
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={handleYoutubeLink} size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            
            {embedUrl && (
              <div className="w-full rounded-md overflow-hidden bg-black/10">
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    ref={audioRef}
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title="YouTube music player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-0"
                  ></iframe>
                </AspectRatio>
              </div>
            )}
            
            {!embedUrl && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  No track playing
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" disabled>
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={togglePlayPause}
                    disabled={!embedUrl}
                    className="h-10 w-10 rounded-full"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button variant="ghost" size="icon" disabled>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" disabled={!embedUrl}>
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Recently played tracks */}
            {history.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Recently played</h4>
                <div className="space-y-2">
                  {history.map((url, index) => (
                    <div 
                      key={index} 
                      className="text-xs truncate cursor-pointer hover:text-primary flex items-center gap-1"
                      onClick={() => playFromHistory(url)}
                    >
                      <Youtube className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{url}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Button
        className="rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Music className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MusicPlayerPopup;

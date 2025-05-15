
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { useSidebar } from "@/components/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music as MusicIcon, Youtube } from "lucide-react";

const Music = () => {
  const { collapsed, toggleSidebar } = useSidebar();
  
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <Navbar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto">
            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">DFI Blockchain Music</h1>
                <p className="text-muted-foreground mt-1">
                  Listen to your favorite tracks while exploring DFI Blockchain
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-red-500" />
                      How to use the Music Player
                    </CardTitle>
                    <CardDescription>Instructions for using the global music player</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="font-bold">1</span>
                        </div>
                        <div>
                          <p>Click on the music icon in the bottom-right corner</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="font-bold">2</span>
                        </div>
                        <div>
                          <p>Paste a YouTube video link into the input field</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="font-bold">3</span>
                        </div>
                        <div>
                          <p>Press the button or Enter key to play the music</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="font-bold">4</span>
                        </div>
                        <div>
                          <p>Your music will continue playing as you navigate through the app!</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center p-6">
                        <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                          <MusicIcon className="h-12 w-12 text-primary" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Music;

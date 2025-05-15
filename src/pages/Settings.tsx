
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { useSidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <Navbar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your account settings and preferences
                </p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SettingsIcon className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>Update your account profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>

                    <Button className="mt-4">Update Profile</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <Label htmlFor="current">Current Password</Label>
                      <Input id="current" type="password" placeholder="Enter current password" />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="new">New Password</Label>
                      <Input id="new" type="password" placeholder="Enter new password" />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="confirm">Confirm Password</Label>
                      <Input id="confirm" type="password" placeholder="Confirm new password" />
                    </div>

                    <Button className="mt-4">Change Password</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive push notifications on this device</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-muted-foreground">Receive emails about new products and features</p>
                        </div>
                        <Switch />
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

export default Settings;

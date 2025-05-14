
import { Link } from "react-router-dom";
import { Book, Calendar, BrainCircuit, Music, GraduationCap, TestTube, Home, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: Book,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "IQ Tests",
    href: "/iq-tests",
    icon: BrainCircuit,
  },
  {
    title: "Quizzes",
    href: "/quizzes",
    icon: TestTube,
  },
  {
    title: "Music",
    href: "/music",
    icon: Music,
  },
];

export function Sidebar() {
  return (
    <div className="h-screen sticky top-0 w-16 md:w-64 bg-sidebar border-r border-border shrink-0 overflow-y-auto">
      <div className="flex flex-col h-full py-4">
        <div className="flex justify-center md:justify-start md:px-6 mb-8">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="hidden md:block ml-2 text-xl font-semibold">DFI Blockchain</span>
          </Link>
        </div>
        
        <div className="flex-1 px-2 md:px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center py-2 px-2 md:px-4 rounded-md transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "focus:bg-sidebar-accent focus:text-sidebar-accent-foreground",
                window.location.pathname === item.href 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="hidden md:block ml-3">{item.title}</span>
            </Link>
          ))}
        </div>
        
        <div className="px-2 md:px-4 mt-auto pt-2 border-t border-border">
          <Link
            to="/settings"
            className="flex items-center py-2 px-2 md:px-4 rounded-md transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Home className="h-5 w-5" />
            <span className="hidden md:block ml-3">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

// Sample courses data (in a real app this would come from a database)
const courses = [
  {
    id: "1",
    title: "Introduction to Blockchain",
    description: "Learn the basics of blockchain technology and its applications.",
    category: "Blockchain",
    image: "https://via.placeholder.com/300x200",
    lessons: 12,
    duration: "6 hours",
  },
  {
    id: "2",
    title: "DeFi Fundamentals",
    description: "Understand decentralized finance and its ecosystem.",
    category: "DeFi",
    image: "https://via.placeholder.com/300x200",
    lessons: 8,
    duration: "4 hours",
  },
  {
    id: "3",
    title: "Smart Contract Development",
    description: "Learn how to write and deploy smart contracts on the blockchain.",
    category: "Development",
    image: "https://via.placeholder.com/300x200",
    lessons: 15,
    duration: "8 hours",
  },
];

const Courses = () => {
  const { isAdmin } = useAuth();
  const { collapsed, toggleSidebar } = useSidebar();
  
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <Navbar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                <p className="text-muted-foreground mt-1">
                  Browse all available courses
                </p>
              </div>
              
              {isAdmin && (
                <Button onClick={() => window.location.href = '/admin'}>
                  Manage Courses
                </Button>
              )}
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="mt-1">{course.category}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                    <div className="flex justify-between mt-4 text-sm">
                      <div className="flex items-center">
                        <span className="text-muted-foreground">Lessons: </span>
                        <span className="ml-1 font-medium">{course.lessons}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground">Duration: </span>
                        <span className="ml-1 font-medium">{course.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Enroll Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;

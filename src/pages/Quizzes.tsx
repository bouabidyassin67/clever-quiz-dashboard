
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { useSidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const quizzes = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Test your knowledge of HTML, CSS, and basic JavaScript concepts",
    category: "Programming",
    questions: 15,
    timeLimit: "10 minutes",
  },
  {
    id: 2,
    title: "Data Science Essentials",
    description: "Quiz on statistical methods, data visualization, and machine learning basics",
    category: "Data Science",
    questions: 20,
    timeLimit: "15 minutes",
  },
  {
    id: 3,
    title: "Digital Marketing Concepts",
    description: "Test your understanding of SEO, social media marketing, and analytics",
    category: "Marketing",
    questions: 18,
    timeLimit: "12 minutes",
  },
  {
    id: 4,
    title: "UX/UI Design Principles",
    description: "Quiz on user experience fundamentals and interface design best practices",
    category: "Design",
    questions: 22,
    timeLimit: "18 minutes",
  },
];

const Quizzes = () => {
  const { collapsed, toggleSidebar } = useSidebar();
  
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <Navbar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto">
            <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
            <p className="text-muted-foreground mt-1">
              Test your knowledge with our interactive quizzes
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="dashboard-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{quiz.title}</CardTitle>
                      <Badge variant="outline" className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                        {quiz.category}
                      </Badge>
                    </div>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Questions:</span>
                        <span className="text-sm font-medium">{quiz.questions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Time limit:</span>
                        <span className="text-sm font-medium">{quiz.timeLimit}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Take Quiz</Button>
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

export default Quizzes;

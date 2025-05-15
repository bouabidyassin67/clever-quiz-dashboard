
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const iqTests = [
  {
    id: 1,
    title: "Spatial Reasoning IQ Test",
    description: "Measure your spatial intelligence and problem-solving abilities",
    questions: 30,
    timeLimit: "25 minutes",
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Logical Reasoning Test",
    description: "Test your logical thinking capabilities with pattern recognition challenges",
    questions: 25,
    timeLimit: "20 minutes",
    difficulty: "Hard",
  },
  {
    id: 3,
    title: "Verbal Intelligence Test",
    description: "Evaluate your verbal comprehension and language processing skills",
    questions: 35,
    timeLimit: "30 minutes",
    difficulty: "Easy",
  },
];

const IQTests = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto">
            <h1 className="text-3xl font-bold tracking-tight">IQ Tests</h1>
            <p className="text-muted-foreground mt-1">
              Take an IQ test to measure your cognitive abilities
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {iqTests.map((test) => (
                <Card key={test.id} className="dashboard-card">
                  <CardHeader>
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Questions:</span>
                        <span className="text-sm font-medium">{test.questions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Time limit:</span>
                        <span className="text-sm font-medium">{test.timeLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Difficulty:</span>
                        <span className="text-sm font-medium">{test.difficulty}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Test</Button>
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

export default IQTests;

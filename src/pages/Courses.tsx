
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";

const Courses = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto">
            <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
            <p className="text-muted-foreground mt-1">
              Browse all available courses
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Course cards will go here */}
              <div className="bg-card border border-border rounded-xl h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Courses coming soon</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;

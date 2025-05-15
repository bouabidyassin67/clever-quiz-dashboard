
import { useState } from "react";
import { Sidebar, useSidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Pencil, Trash } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the course type to ensure consistent structure
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

// Example course data
const initialCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Blockchain",
    description: "Learn the basics of blockchain technology and its applications.",
    category: "Blockchain",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: "2",
    title: "DeFi Fundamentals",
    description: "Understand decentralized finance and its ecosystem.",
    category: "DeFi",
    image: "https://via.placeholder.com/300x200",
  },
];

const courseSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  category: z.string().min(2, { message: "Category must be at least 2 characters long" }),
  image: z.string().url({ message: "Please enter a valid URL" }).optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const { collapsed, toggleSidebar } = useSidebar();
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: "https://via.placeholder.com/300x200",
    },
  });

  const onSubmit = (values: CourseFormValues) => {
    if (isEditing) {
      // Update existing course - ensure we maintain the required structure
      setCourses(
        courses.map((course) =>
          course.id === isEditing 
            ? { 
                ...course, 
                title: values.title,
                description: values.description,
                category: values.category,
                image: values.image || course.image 
              } 
            : course
        )
      );
      toast.success("Course updated successfully!");
      setIsEditing(null);
    } else {
      // Add new course with required structure
      const newCourse: Course = {
        id: Math.random().toString(36).substring(2),
        title: values.title,
        description: values.description,
        category: values.category,
        image: values.image || "https://via.placeholder.com/300x200",
      };
      setCourses([...courses, newCourse]);
      toast.success("Course added successfully!");
    }
    form.reset();
  };

  const handleEdit = (id: string) => {
    const courseToEdit = courses.find((course) => course.id === id);
    if (courseToEdit) {
      form.reset(courseToEdit);
      setIsEditing(id);
    }
  };

  const handleDelete = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
    toast.success("Course deleted successfully!");
    if (isEditing === id) {
      setIsEditing(null);
      form.reset();
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    form.reset();
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar collapsed={collapsed} />
      <div className="flex flex-col flex-1">
        <Navbar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage courses and content
            </p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Course Form */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>
                    {isEditing ? "Edit Course" : "Add New Course"}
                  </CardTitle>
                  <CardDescription>
                    {isEditing
                      ? "Update the course details below"
                      : "Fill in the details to add a new course"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter course title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter category" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter course description"
                                className="min-h-24"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter image URL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex space-x-2 pt-2">
                        <Button type="submit">
                          {isEditing ? "Update Course" : "Add Course"}
                        </Button>
                        {isEditing && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Course List */}
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Courses</CardTitle>
                  <CardDescription>
                    Manage existing courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">
                            {course.title}
                          </TableCell>
                          <TableCell>{course.category}</TableCell>
                          <TableCell className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(course.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(course.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

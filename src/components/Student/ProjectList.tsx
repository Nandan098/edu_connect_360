import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  status: string;
}

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent>
        {projects.length > 0 ? (
          <ul className="space-y-2">
            {projects.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between border-b pb-1 text-sm"
              >
                <span>{p.title}</span>
                <span
                  className={`px-2 py-0.5 rounded text-white text-xs ${
                    p.status === "completed"
                      ? "bg-green-600"
                      : p.status === "in_progress"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                >
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects found.</p>
        )}
      </CardContent>
    </Card>
  );
}

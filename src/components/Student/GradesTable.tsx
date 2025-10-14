import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Grade {
  id: string;
  subject: string;
  score: number;
}

interface GradesTableProps {
  grades: Grade[];
}

export default function GradesTable({ grades }: GradesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Results / Grades</CardTitle>
      </CardHeader>
      <CardContent>
        {grades.length > 0 ? (
          <table className="min-w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Subject</th>
                <th className="p-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g.id}>
                  <td className="p-2 border">{g.subject}</td>
                  <td className="p-2 border">{g.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results available.</p>
        )}
      </CardContent>
    </Card>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface AnnouncementsProps {
  announcements: Announcement[];
}

export default function Announcements({ announcements }: AnnouncementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        {announcements.length > 0 ? (
          <ul className="space-y-3">
            {announcements.map((a) => (
              <li key={a.id}>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-gray-600">{a.content}</p>
                <p className="text-xs text-gray-400">
                  {new Date(a.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No announcements available.</p>
        )}
      </CardContent>
    </Card>
  );
}

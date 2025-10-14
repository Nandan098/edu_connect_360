import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ProfileCardProps {
  fullName: string;
  email: string;
  role: string;
}

export default function ProfileCard({ fullName, email, role }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Name:</strong> {fullName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Role:</strong> {role}</p>
      </CardContent>
    </Card>
  );
}

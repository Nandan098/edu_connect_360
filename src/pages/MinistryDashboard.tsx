import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MinistryDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🏛️ Ministry Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Institutions Registered</CardTitle>
          </CardHeader>
          <CardContent>
            <p>132 total institutions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Students Enrolled</CardTitle>
          </CardHeader>
          <CardContent>
            <p>24,560 students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Index</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Overall: 82%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MinistryDashboard;

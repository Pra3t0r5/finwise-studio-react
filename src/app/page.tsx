
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>FinWise</CardTitle>
          <CardDescription>Your AI-powered financial advisor.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Welcome to FinWise! Get started by configuring your settings and uploading your financial documents.</p>
        </CardContent>
      </Card>
    </div>
  );
}

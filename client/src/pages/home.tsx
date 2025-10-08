import { Link } from "wouter";
import { FileText, Calendar, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const quickActions = [
  {
    title: "Report Issue",
    description: "Submit a civic issue in your community",
    icon: FileText,
    path: "/report",
    color: "bg-primary text-primary-foreground",
  },
  {
    title: "View Events",
    description: "Discover upcoming community events",
    icon: Calendar,
    path: "/events",
    color: "bg-chart-2 text-primary-foreground",
  },
  {
    title: "Join Discussion",
    description: "Participate in community conversations",
    icon: MessageSquare,
    path: "/discussions",
    color: "bg-chart-3 text-primary-foreground",
  },
];

const recentUpdates = [
  {
    id: "1",
    title: "Road Maintenance Schedule",
    category: "Infrastructure",
    date: "2 days ago",
    snippet: "Scheduled maintenance on Main Street between 5th and 8th Avenue...",
  },
  {
    id: "2",
    title: "Community Clean-up Drive",
    category: "Environment",
    date: "3 days ago",
    snippet: "Join us this Saturday for our monthly community clean-up initiative...",
  },
  {
    id: "3",
    title: "New Recycling Guidelines",
    category: "Environment",
    date: "5 days ago",
    snippet: "Updated recycling guidelines now in effect. Please review the new sorting...",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[hsl(210,80%,35%)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl" data-testid="text-hero-title">
              Report Civic Issues
            </h1>
            <p className="text-lg text-primary-foreground/90 md:text-xl" data-testid="text-hero-subtitle">
              Your voice matters. Report issues, stay informed, and engage with your community.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-foreground" data-testid="text-quick-actions-title">
            Quick Actions
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.path} href={action.path}>
                  <Card className="group transition-all duration-150 hover:shadow-md cursor-pointer h-full" data-testid={`card-${action.title.toLowerCase().replace(" ", "-")}`}>
                    <CardHeader>
                      <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-md ${action.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{action.title}</CardTitle>
                      <CardDescription className="text-base">{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="group-hover:gap-2 transition-all">
                        Get Started
                        <ArrowRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent Updates */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground" data-testid="text-recent-updates-title">
              Recent Updates
            </h2>
            <Link href="/announcements">
              <Button variant="outline" data-testid="button-view-all-announcements">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentUpdates.map((update) => (
              <Card key={update.id} className="transition-all duration-150 hover:shadow-md" data-testid={`card-update-${update.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary" data-testid={`badge-category-${update.id}`}>
                          {update.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground" data-testid={`text-date-${update.id}`}>
                          {update.date}
                        </span>
                      </div>
                      <CardTitle className="text-lg" data-testid={`text-title-${update.id}`}>
                        {update.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground" data-testid={`text-snippet-${update.id}`}>
                    {update.snippet}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

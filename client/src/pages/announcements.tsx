import { useQuery } from "@tanstack/react-query";
import { type Announcement } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Megaphone } from "lucide-react";

export default function AnnouncementsPage() {
  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background py-8 px-4 md:py-12">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96 mb-8" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-24 mb-3" />
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isEmpty = !announcements || announcements.length === 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-8 px-4 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-page-title">
            Announcements
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-description">
            Stay informed with the latest community updates and notices.
          </p>
        </div>

        {isEmpty ? (
          <Card className="text-center py-12">
            <CardContent>
              <Megaphone className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Announcements Yet</h3>
              <p className="text-muted-foreground">
                Check back later for community updates and important notices.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement) => (
              <Card
                key={announcement.id}
                className="transition-all duration-150 hover:shadow-md"
                data-testid={`card-announcement-${announcement.id}`}
              >
                <CardHeader>
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary" data-testid={`badge-category-${announcement.id}`}>
                      {announcement.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground" data-testid={`text-date-${announcement.id}`}>
                      {format(new Date(announcement.date), "MMM d, yyyy")}
                    </span>
                  </div>
                  <CardTitle className="text-xl" data-testid={`text-title-${announcement.id}`}>
                    {announcement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed" data-testid={`text-description-${announcement.id}`}>
                    {announcement.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

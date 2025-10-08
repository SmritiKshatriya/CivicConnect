import { useQuery } from "@tanstack/react-query";
import { type Event } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

export default function EventsPage() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background py-8 px-4 md:py-12">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isEmpty = !events || events.length === 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-8 px-4 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-page-title">
            Community Events
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-description">
            Discover and participate in upcoming events in your community.
          </p>
        </div>

        {isEmpty ? (
          <Card className="text-center py-12">
            <CardContent>
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Events Scheduled</h3>
              <p className="text-muted-foreground">
                Check back later for upcoming community events and activities.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className="border-l-4 border-l-primary transition-all duration-150 hover:shadow-md"
                data-testid={`card-event-${event.id}`}
              >
                <CardHeader>
                  <CardTitle className="text-xl flex items-start gap-3" data-testid={`text-title-${event.id}`}>
                    <CalendarIcon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>{event.title}</span>
                  </CardTitle>
                  <CardDescription className="ml-8 flex flex-wrap gap-4 text-base">
                    <span className="flex items-center gap-1" data-testid={`text-date-${event.id}`}>
                      <CalendarIcon className="h-4 w-4" />
                      {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                    </span>
                    <span className="flex items-center gap-1" data-testid={`text-time-${event.id}`}>
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1" data-testid={`text-location-${event.id}`}>
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="ml-8">
                  <p className="text-foreground leading-relaxed" data-testid={`text-description-${event.id}`}>
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

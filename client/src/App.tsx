import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import ReportIssuePage from "@/pages/report-issue";
import AnnouncementsPage from "@/pages/announcements";
import EventsPage from "@/pages/events";
import DiscussionsPage from "@/pages/discussions";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/report" component={ReportIssuePage} />
      <Route path="/announcements" component={AnnouncementsPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/discussions" component={DiscussionsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main>
              <Router />
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

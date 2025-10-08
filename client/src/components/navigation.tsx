import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, FileText, Megaphone, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/report", label: "Report Issue", icon: FileText },
  { path: "/announcements", label: "Announcements", icon: Megaphone },
  { path: "/events", label: "Events", icon: Calendar },
  { path: "/discussions", label: "Discussions", icon: MessageSquare },
];

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.path;
        
        return (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => mobile && setIsOpen(false)}
          >
            <Button
              variant={isActive ? "default" : "ghost"}
              className={mobile ? "w-full justify-start gap-3" : "relative"}
              data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
              {!mobile && isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary-foreground rounded-t-full" />
              )}
            </Button>
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <h1 className="text-xl font-bold tracking-tight" data-testid="text-site-title">
              Civic Portal
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <NavLinks />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-menu-toggle"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-2">
                <NavLinks mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

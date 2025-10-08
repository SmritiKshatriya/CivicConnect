import { 
  type Issue, 
  type InsertIssue,
  type Announcement,
  type InsertAnnouncement,
  type Event,
  type InsertEvent,
  type Discussion,
  type InsertDiscussion
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Issues
  getIssues(): Promise<Issue[]>;
  getIssue(id: string): Promise<Issue | undefined>;
  createIssue(issue: InsertIssue): Promise<Issue>;

  // Announcements
  getAnnouncements(): Promise<Announcement[]>;
  getAnnouncement(id: string): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;

  // Events
  getEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Discussions
  getDiscussions(): Promise<Discussion[]>;
  getDiscussion(id: string): Promise<Discussion | undefined>;
  createDiscussion(discussion: InsertDiscussion): Promise<Discussion>;
}

export class MemStorage implements IStorage {
  private issues: Map<string, Issue>;
  private announcements: Map<string, Announcement>;
  private events: Map<string, Event>;
  private discussions: Map<string, Discussion>;

  constructor() {
    this.issues = new Map();
    this.announcements = new Map();
    this.events = new Map();
    this.discussions = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed some announcements
    const announcement1: Announcement = {
      id: randomUUID(),
      title: "Road Maintenance Schedule",
      category: "Infrastructure",
      description: "Scheduled maintenance on Main Street between 5th and 8th Avenue will begin next Monday. Please expect delays and use alternative routes during peak hours.",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    };
    const announcement2: Announcement = {
      id: randomUUID(),
      title: "Community Clean-up Drive",
      category: "Environment",
      description: "Join us this Saturday for our monthly community clean-up initiative. Meet at Central Park at 9 AM. Gloves and bags will be provided.",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    };
    const announcement3: Announcement = {
      id: randomUUID(),
      title: "New Recycling Guidelines",
      category: "Environment",
      description: "Updated recycling guidelines are now in effect. Please review the new sorting procedures to help us reduce contamination and improve recycling rates.",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    };
    const announcement4: Announcement = {
      id: randomUUID(),
      title: "Town Hall Meeting Announcement",
      category: "Community",
      description: "Mayor will host a town hall meeting next Thursday at 7 PM at the Community Center. Topics include budget planning and upcoming projects.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    };

    this.announcements.set(announcement1.id, announcement1);
    this.announcements.set(announcement2.id, announcement2);
    this.announcements.set(announcement3.id, announcement3);
    this.announcements.set(announcement4.id, announcement4);

    // Seed some events
    const event1: Event = {
      id: randomUUID(),
      title: "Farmers Market",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      time: "8:00 AM - 2:00 PM",
      location: "City Square",
      description: "Weekly farmers market featuring fresh local produce, artisan goods, and live music. Support local farmers and enjoy the community atmosphere.",
    };
    const event2: Event = {
      id: randomUUID(),
      title: "Youth Sports Registration",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      time: "10:00 AM - 4:00 PM",
      location: "Recreation Center",
      description: "Register your children for spring sports programs including soccer, basketball, and baseball. Ages 5-14 welcome.",
    };
    const event3: Event = {
      id: randomUUID(),
      title: "Public Safety Workshop",
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      time: "6:30 PM - 8:30 PM",
      location: "Fire Station #2",
      description: "Learn essential safety skills including fire safety, first aid basics, and emergency preparedness. Free to all residents.",
    };

    this.events.set(event1.id, event1);
    this.events.set(event2.id, event2);
    this.events.set(event3.id, event3);

    // Seed some discussions
    const discussion1: Discussion = {
      id: randomUUID(),
      author: "Sarah Johnson",
      content: "Has anyone noticed the new bike lanes on Oak Street? They're a great addition to our community infrastructure!",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      parentId: null,
    };
    const discussion2: Discussion = {
      id: randomUUID(),
      author: "Mike Chen",
      content: "Absolutely! I've been using them for my morning commute. Much safer than before.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      parentId: discussion1.id,
    };
    const discussion3: Discussion = {
      id: randomUUID(),
      author: "Emily Rodriguez",
      content: "What are everyone's thoughts on the proposed community garden project?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      parentId: null,
    };

    this.discussions.set(discussion1.id, discussion1);
    this.discussions.set(discussion2.id, discussion2);
    this.discussions.set(discussion3.id, discussion3);
  }

  // Issues
  async getIssues(): Promise<Issue[]> {
    return Array.from(this.issues.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getIssue(id: string): Promise<Issue | undefined> {
    return this.issues.get(id);
  }

  async createIssue(insertIssue: InsertIssue): Promise<Issue> {
    const id = randomUUID();
    const issue: Issue = { 
      ...insertIssue,
      photoUrl: insertIssue.photoUrl || null,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.issues.set(id, issue);
    return issue;
  }

  // Announcements
  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getAnnouncement(id: string): Promise<Announcement | undefined> {
    return this.announcements.get(id);
  }

  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = randomUUID();
    const announcement: Announcement = { 
      ...insertAnnouncement, 
      id,
      date: new Date(),
    };
    this.announcements.set(id, announcement);
    return announcement;
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  // Discussions
  async getDiscussions(): Promise<Discussion[]> {
    return Array.from(this.discussions.values()).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async getDiscussion(id: string): Promise<Discussion | undefined> {
    return this.discussions.get(id);
  }

  async createDiscussion(insertDiscussion: InsertDiscussion): Promise<Discussion> {
    const id = randomUUID();
    const discussion: Discussion = { 
      ...insertDiscussion,
      parentId: insertDiscussion.parentId || null,
      id,
      timestamp: new Date(),
    };
    this.discussions.set(id, discussion);
    return discussion;
  }
}

export const storage = new MemStorage();

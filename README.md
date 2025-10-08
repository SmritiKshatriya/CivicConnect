# CivicConnect
Mobile-friendly civic issue reporting platform built with React and Material UI. Allows users to report civic issues (with photos and location), browse community announcements, explore local events, and participate in public discussions. Responsive layout and modular, component-based architecture with all features using mock data .

# Civic Issue Reporting Platform

## Overview

This is a full-stack civic engagement platform built with React, Express, and TypeScript. The application enables citizens to report community issues, view announcements, discover events, and participate in discussions. It follows a modern web architecture with a type-safe API layer, comprehensive UI component library, and responsive design optimized for mobile-first usage.

The platform is designed with accessibility and trust as core principles, implementing Material Design standards to provide a professional, utility-focused experience for civic interactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- React Query (@tanstack/react-query) for server state management and data fetching

**UI Component System**
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Material Design principles per design_guidelines.md
- Comprehensive component set including forms, dialogs, navigation, and data display
- Dark mode support via theme provider
- Responsive design with mobile-first breakpoints

**Form Handling & Validation**
- React Hook Form for form state management
- Zod schemas for runtime validation
- @hookform/resolvers for integration between the two
- Drizzle-Zod for automatic schema generation from database models

**Design System**
- Custom color palette defined in CSS variables (light/dark modes)
- Roboto font family from Google Fonts
- Accessibility-first approach (WCAG 2.1 AA compliance target)
- Hover and active state elevation system using CSS custom properties

### Backend Architecture

**Server Framework**
- Express.js for HTTP server
- TypeScript for type safety across the stack
- Custom middleware for request logging and error handling

**API Design**
- RESTful endpoints following resource-based patterns
- Centralized route registration in server/routes.ts
- Consistent error handling with appropriate HTTP status codes
- Request/response logging with truncation for readability

**Data Layer**
- Drizzle ORM for type-safe database queries
- Schema definitions in shared/schema.ts for client/server consistency
- In-memory storage implementation (MemStorage) for development
- Prepared for PostgreSQL via Neon serverless driver

**Data Models**
- Issues: Community problem reports with categories, descriptions, locations, photos, and status tracking
- Announcements: Official notices with titles, categories, and descriptions
- Events: Community gatherings with date/time and location details
- Discussions: Threaded conversations with parent/child relationships

### Database Strategy

**ORM & Migrations**
- Drizzle Kit for schema migrations
- PostgreSQL dialect configured
- Database schema versioning through migrations directory
- Environment-based configuration via DATABASE_URL

**Schema Design**
- UUID primary keys (gen_random_uuid())
- Timestamp tracking for created/updated dates
- Text fields for flexible content storage
- Foreign key relationships for threaded discussions

### State Management & Data Flow

**Client-Side State**
- React Query for server state (caching, background updates, optimistic updates)
- Local component state via React hooks
- Theme state persisted to localStorage
- Form state isolated to form components

**API Communication**
- Centralized API request utility (apiRequest) in lib/queryClient.ts
- Automatic error handling and response validation
- Credential inclusion for session management
- Type-safe query keys for cache management

### Development & Build Pipeline

**Development Environment**
- Vite dev server with HMR
- Replit-specific plugins for runtime error overlays and development banners
- Express middleware mode for API proxying
- TypeScript compilation checking without emit

**Production Build**
- Vite builds client to dist/public
- esbuild bundles server to dist/index.js
- ESM module format throughout
- Separate client/server build outputs

**Code Organization**
- Shared types and schemas in /shared directory
- Path aliases for clean imports (@/, @shared/, @assets/)
- Modular component structure with UI primitives separated
- Consistent file naming conventions

## External Dependencies

### Core Frameworks & Libraries
- **React 18**: UI framework
- **Express**: Backend server framework
- **TypeScript**: Type safety across full stack
- **Vite**: Build tool and dev server
- **Wouter**: Lightweight routing (alternative to React Router)

### Database & ORM
- **Drizzle ORM**: Type-safe database toolkit
- **@neondatabase/serverless**: PostgreSQL connection for Neon serverless
- **drizzle-kit**: Schema migrations and management
- **connect-pg-simple**: PostgreSQL session store (prepared for session management)

### UI Component Libraries
- **shadcn/ui**: Component collection (configured via components.json)
- **Radix UI**: Unstyled accessible component primitives (20+ packages)
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **Lucide React**: Icon library

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Bridge between React Hook Form and Zod
- **drizzle-zod**: Generate Zod schemas from Drizzle schemas

### State & Data Fetching
- **@tanstack/react-query**: Server state management
- **date-fns**: Date formatting and manipulation

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-dev-banner**: Development environment indicator
- **@replit/vite-plugin-cartographer**: Replit-specific tooling
- **esbuild**: JavaScript bundler for server build
- **tsx**: TypeScript execution for development

### Additional UI Utilities
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider component
- **vaul**: Drawer component (used in mobile UI)
- **input-otp**: OTP input component
- **react-day-picker**: Calendar/date picker
- **react-resizable-panels**: Resizable panel layouts
- **recharts**: Charting library (prepared for data visualization)
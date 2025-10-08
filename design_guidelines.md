# Civic Issue Reporting Platform - Design Guidelines

## Design Approach

**Selected Framework:** Material Design System  
**Rationale:** This civic platform is utility-focused with information-dense content (forms, announcements, events, discussions). Material Design provides excellent accessibility standards and familiar patterns essential for government/civic applications where trust, usability, and inclusivity are paramount.

## Core Design Principles

1. **Accessibility First:** WCAG 2.1 AA compliance, high contrast ratios, keyboard navigation
2. **Trust & Credibility:** Professional aesthetic that conveys civic responsibility
3. **Mobile-First:** Optimized for on-the-go issue reporting
4. **Clarity Over Flair:** Function drives form; every element serves a purpose

---

## Color Palette

### Light Mode
- **Primary:** 210 85% 45% (Civic blue - trustworthy, professional)
- **Secondary:** 165 70% 40% (Complementary teal for accents)
- **Success:** 140 65% 42% (For successful submissions)
- **Error:** 0 70% 50% (Form validation)
- **Background:** 0 0% 98% (Soft white)
- **Surface:** 0 0% 100% (Cards, elevated components)
- **Text Primary:** 220 15% 20% (Near black for readability)
- **Text Secondary:** 220 10% 50% (Supporting text)

### Dark Mode
- **Primary:** 210 80% 60% (Lighter blue for contrast)
- **Secondary:** 165 60% 55%
- **Background:** 220 15% 12% (Deep blue-gray)
- **Surface:** 220 12% 16% (Elevated components)
- **Text Primary:** 0 0% 95%
- **Text Secondary:** 0 0% 70%

---

## Typography

**Font Family:** Roboto (Material Design standard via Google Fonts)

**Scale:**
- H1: 2.5rem / 700 weight (Page titles)
- H2: 2rem / 600 weight (Section headers)
- H3: 1.5rem / 600 weight (Card titles)
- Body: 1rem / 400 weight (16px base)
- Caption: 0.875rem / 400 weight (Metadata, hints)
- Button: 0.875rem / 500 weight / uppercase

**Line Height:** 1.6 for body text, 1.2 for headings

---

## Layout System

**Container:** Max-width 1200px with 16px/24px horizontal padding (mobile/desktop)

**Spacing Scale:** Use Material Design 8px grid - primarily units of 2, 3, 4, 6, and 8 (e.g., p-2, mt-4, gap-6, py-8)

**Grid System:**
- Mobile: Single column, full-width cards
- Tablet (768px+): 2-column for announcements/events
- Desktop (1024px+): 3-column where appropriate

---

## Component Library

### Navigation
- **AppBar:** Fixed top, 64px height, primary color with elevation
- **Mobile:** Hamburger menu (Drawer component)
- **Desktop:** Horizontal nav links with hover states
- **Active State:** Underline indicator (3px) beneath active link

### Home Page
- **Hero Section:** Simple banner (240px height) with page title "Report Civic Issues" and tagline, primary gradient background (210 85% 45% to 210 80% 35%)
- **Quick Actions:** 3-column grid (mobile: stack) with prominent action cards for Report Issue, View Events, Join Discussion
- **Recent Updates:** List of 3 most recent announcements with "View All" link

### Report Issue Form
- **Layout:** Single column, max-width 600px, centered
- **Components:** Material Select (dropdown), TextField (outlined variant), file upload button with preview
- **Submit Button:** Contained, primary color, full-width on mobile
- **Validation:** Inline error messages below fields

### Announcements Page
- **Layout:** Card grid (1/2/3 columns responsive)
- **Card Design:** Elevation 2, 16px padding, title + date + description snippet, "Read More" link
- **Badge:** Category badge (chip component) in secondary color

### Events Page
- **Layout:** List view with dividers
- **Event Card:** Left border (4px primary color), date icon + title + time + location + description

### Discussions Page
- **Thread List:** Cards with comment count badge
- **Comment Thread:** Nested comments with 24px left indentation, avatar + username + timestamp
- **Input:** Outlined TextField with "Post Comment" button (contained)

### Buttons & Actions
- **Primary Actions:** Contained buttons, primary color
- **Secondary Actions:** Outlined buttons
- **Icon Buttons:** For auxiliary actions (share, bookmark)

### Cards
- **Standard Elevation:** 2 (subtle shadow)
- **Hover State:** Elevation 4 (on interactive cards)
- **Border Radius:** 8px (Material Design rounded)

---

## Imagery

**Photo Upload Preview:** 200px × 200px thumbnail with remove icon overlay

**Illustrations:** Use simple, line-art civic icons (government building, megaphone, calendar) from Material Icons library for empty states and quick action cards

**No large hero images** - this is a utility platform where function takes priority

---

## Accessibility

- Minimum contrast ratio: 4.5:1 for text, 3:1 for UI components
- Focus indicators: 2px outline in primary color
- Skip to main content link
- Aria labels for all interactive elements
- Form labels always visible (no placeholder-only inputs)
- Dark mode toggle in AppBar

---

## Responsive Breakpoints

- **Mobile:** < 600px (single column, stacked)
- **Tablet:** 600px - 1023px (2 columns where appropriate)
- **Desktop:** ≥ 1024px (full layout, 3 columns)

Navigation collapses to drawer below 768px

---

## Animations

**Minimal and purposeful:**
- Page transitions: 200ms fade
- Card hover: 150ms elevation change
- Drawer open/close: 225ms slide (Material standard)
- Form submission: Loading spinner on button

**No decorative animations** - prioritize performance and accessibility
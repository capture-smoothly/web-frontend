# Component Guide

Quick reference for all components in the Snapshot landing page.

## 🎨 UI Components

### Button
```tsx
import { Button } from "@/components/ui/Button";

<Button variant="primary" size="lg">Install Now</Button>
<Button variant="secondary">Learn More</Button>
<Button variant="outline">Contact Sales</Button>
```

**Props:**
- `variant`: "primary" | "secondary" | "outline"
- `size`: "sm" | "md" | "lg"
- `className`: Additional CSS classes
- Standard button HTML attributes

---

### Badge
```tsx
import { Badge } from "@/components/ui/Badge";

<Badge variant="default">New Feature</Badge>
<Badge variant="success">Most Popular</Badge>
<Badge variant="warning">Limited Time</Badge>
```

**Props:**
- `variant`: "default" | "success" | "warning" | "info"
- `className`: Additional CSS classes

---

### FeatureCard
```tsx
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Sparkles } from "lucide-react";

<FeatureCard
  icon={Sparkles}
  title="Amazing Feature"
  description="Description here"
  badge="Popular"
  bullets={["Point 1", "Point 2"]}
  visual={<YourVisualComponent />}
  delay={0.1}
/>
```

**Props:**
- `icon`: LucideIcon component
- `title`: Feature title
- `description`: Feature description
- `badge?`: Optional badge text
- `bullets?`: Optional array of bullet points
- `visual?`: Optional React node for visual content
- `delay?`: Animation delay in seconds

---

### PricingCard
```tsx
import { PricingCard } from "@/components/ui/PricingCard";

<PricingCard
  name="Pro"
  price={7}
  subtitle="For power users"
  yearlyPrice="$75/year (Save $9)"
  badge="Early Bird Offer"
  features={["Feature 1", "Feature 2"]}
  comingSoon={["Future 1", "Future 2"]}
  cta="Start Pro Trial"
  ctaVariant="primary"
  popular={true}
  onCtaClick={() => console.log("CTA clicked")}
/>
```

**Props:**
- `name`: Plan name
- `price`: Price (number or string)
- `subtitle`: Plan description
- `yearlyPrice?`: Optional yearly pricing
- `badge?`: Optional promotional badge
- `features`: Array of included features
- `comingSoon?`: Array of upcoming features
- `cta`: CTA button text
- `ctaVariant`: Button variant
- `popular?`: Highlight as popular
- `onCtaClick?`: CTA click handler

---

### TestimonialCard
```tsx
import { TestimonialCard } from "@/components/ui/TestimonialCard";

<TestimonialCard
  rating={5}
  quote="This is amazing!"
  author="John Doe"
  role="Software Engineer"
  avatar="JD"
  delay={0.1}
/>
```

**Props:**
- `rating`: Number of stars (1-5)
- `quote`: Testimonial text
- `author`: Author name
- `role`: Author role/title
- `avatar`: Initials for avatar
- `delay?`: Animation delay

---

### Accordion
```tsx
import { Accordion } from "@/components/ui/Accordion";

<Accordion
  items={[
    { question: "Question 1?", answer: "Answer 1" },
    { question: "Question 2?", answer: "Answer 2" }
  ]}
/>
```

**Props:**
- `items`: Array of `{ question, answer }` objects
- `className?`: Additional CSS classes

---

### Tabs
```tsx
import { Tabs } from "@/components/ui/Tabs";

<Tabs
  tabs={[
    { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
    { id: "tab2", label: "Tab 2", content: <div>Content 2</div> }
  ]}
/>
```

**Props:**
- `tabs`: Array of `{ id, label, content }` objects
- `className?`: Additional CSS classes

---

### FloatingInstallButton
```tsx
import { FloatingInstallButton } from "@/components/ui/FloatingInstallButton";

<FloatingInstallButton />
```

**Props:** None - Automatically shows/hides based on scroll position

---

## 📄 Section Components

All section components are self-contained and don't require props. Simply import and use:

```tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
// ... etc

<HeroSection />
<ProblemSection />
```

### Available Sections:
1. `SnapshotNavbar` - Navigation bar
2. `HeroSection` - Hero/landing section
3. `ProblemSection` - Pain points
4. `SolutionSection` - Feature highlights
5. `HowItWorksSection` - 3-step process
6. `FeatureShowcaseSection` - Detailed features with tabs
7. `ComparisonSection` - Competitor comparison
8. `UseCasesSection` - User personas
9. `PricingSection` - Pricing tiers
10. `TestimonialsSection` - User reviews
11. `RoadmapSection` - Future features
12. `FAQSection` - Common questions
13. `FinalCTASection` - Final conversion
14. `SnapshotFooter` - Footer

---

## 🎨 Tailwind Classes Reference

### Custom Colors
- `bg-gradient-primary` - Primary gradient background
- `bg-gradient-hero` - Hero section gradient
- `bg-gradient-cta` - CTA section gradient
- `text-primary` - Primary color text
- `text-secondary` - Secondary color text
- `text-accent` - Accent color text
- `text-dark` - Dark text (#1f2937)
- `text-dark-lighter` - Lighter dark text
- `bg-light` - Light background (#f9fafb)
- `bg-light-gray` - Light gray background

### Custom Shadows
- `shadow-glass` - Glass-morphism shadow
- `shadow-card` - Standard card shadow
- `shadow-card-hover` - Card hover shadow

### Animations
- `animate-fade-in` - Fade in animation
- `animate-slide-up` - Slide up animation
- `animate-scale-in` - Scale in animation
- `animate-bounce-slow` - Slow bounce

---

## 🔧 Customization Tips

### Changing Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  primary: {
    DEFAULT: "#YOUR_COLOR",
    light: "#YOUR_LIGHT",
    dark: "#YOUR_DARK",
  }
}
```

### Modifying Section Content
Each section component contains its data as constants at the top of the file. Edit these to change content:

```tsx
// In HeroSection.tsx
const stats = [
  { label: "Your Label", value: "Your Value" },
  // ... modify as needed
];
```

### Adding New Animations
Add to `tailwind.config.ts`:
```ts
animation: {
  "your-animation": "yourKeyframe 1s ease-out",
},
keyframes: {
  yourKeyframe: {
    "0%": { /* start */ },
    "100%": { /* end */ },
  },
}
```

---

## 📱 Responsive Utilities

### Breakpoints
- `sm:` - 640px and up
- `md:` - 768px and up (tablets)
- `lg:` - 1024px and up (desktops)
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

### Common Patterns
```tsx
// Stack on mobile, grid on desktop
<div className="flex flex-col md:flex-row gap-8">

// Hide on mobile, show on desktop
<div className="hidden md:block">

// Different sizing
<h1 className="text-4xl md:text-5xl lg:text-6xl">
```

---

## 🚀 Performance Tips

1. **Lazy Load Images**: Use Next.js `Image` component
2. **Viewport Animations**: All animations use `whileInView` with `once: true`
3. **Code Splitting**: Components are automatically split by Next.js
4. **Optimize Fonts**: Inter font is configured with `display: swap`

---

## 🎯 Best Practices

1. **Keep sections modular** - Each section is self-contained
2. **Use TypeScript** - All components are fully typed
3. **Maintain consistency** - Use existing UI components
4. **Test responsiveness** - Check all breakpoints
5. **Optimize images** - Use WebP format when possible
6. **Add alt text** - For accessibility
7. **Use semantic HTML** - Proper heading hierarchy

---

Need help? Check the main README or component source files for more details.

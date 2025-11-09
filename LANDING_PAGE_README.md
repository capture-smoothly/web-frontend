# Snapshot Landing Page

A modern, high-converting landing page for the Snapshot Chrome extension - a professional screenshot and content capture tool.

## 🚀 Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Motion (Framer Motion)** for animations
- **Lucide React** for icons
- **Responsive Design** (mobile-first approach)

## 🎨 Design System

### Colors
- **Primary**: Indigo gradient (#6366f1 to #8b5cf6)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Emerald (#10b981)
- **Background**: White with subtle gray sections (#f9fafb, #f3f4f6)
- **Dark Text**: #1f2937

### Typography
- **Font Family**: Inter (Google Fonts)
- **Smooth animations** and transitions throughout
- **Glass-morphism effects** for cards
- **Subtle shadows** and hover effects

## 📄 Page Structure

The landing page consists of 14 main sections:

1. **Navigation Bar** - Sticky navbar with smooth scroll behavior
2. **Hero Section** - Full viewport with headline, CTAs, and stats
3. **Problem Section** - 3-column grid of pain points
4. **Solution/Features Section** - 4 detailed feature cards
5. **How It Works** - 3-step process timeline
6. **Feature Showcase** - Tab-based detailed feature breakdown
7. **Comparison Table** - Competitive analysis
8. **Use Cases** - 3 persona cards (Students, Professionals, Creators)
9. **Pricing** - 3-tier pricing cards (Free, Pro, Team)
10. **Testimonials** - Social proof with user reviews
11. **Roadmap** - Future features timeline (Q1-Q3 2025)
12. **FAQ** - Accordion with 8 common questions
13. **Final CTA** - Conversion-focused call-to-action
14. **Footer** - Links, social media, legal

## 🧩 Components Created

### UI Components (`/src/components/ui/`)
- `Button.tsx` - Primary, secondary, outline variants
- `Badge.tsx` - Info badges with variants
- `FeatureCard.tsx` - Animated feature display cards
- `PricingCard.tsx` - Pricing tier cards with hover effects
- `TestimonialCard.tsx` - User review cards
- `Accordion.tsx` - Expandable FAQ items
- `Tabs.tsx` - Tab navigation component
- `FloatingInstallButton.tsx` - Sticky CTA button

### Section Components (`/src/components/sections/`)
- `SnapshotNavbar.tsx` - Navigation with scroll detection
- `HeroSection.tsx` - Main hero with animations
- `ProblemSection.tsx` - Pain points display
- `SolutionSection.tsx` - Feature cards grid
- `HowItWorksSection.tsx` - Process timeline
- `FeatureShowcaseSection.tsx` - Detailed features with tabs
- `ComparisonSection.tsx` - Competitor comparison table
- `UseCasesSection.tsx` - Persona-based use cases
- `PricingSection.tsx` - Pricing tiers
- `TestimonialsSection.tsx` - User reviews
- `RoadmapSection.tsx` - Future features timeline
- `FAQSection.tsx` - Frequently asked questions
- `FinalCTASection.tsx` - Final conversion section
- `SnapshotFooter.tsx` - Footer with links

## ✨ Key Features

### Animations
- Fade-in on scroll for all sections
- Staggered children animations
- Hero elements animate from bottom with scale
- Feature cards hover effects (lift + shadow)
- Smooth scroll behavior for navigation
- Number counters animate when in viewport

### Responsive Design
- **Mobile**: < 640px (stacked layouts)
- **Tablet**: 640px - 1024px (2-column grids)
- **Desktop**: > 1024px (full layouts)

### Performance Optimizations
- Lazy loading for below-fold content
- Next.js Image component for optimization
- Viewport-based animations (only trigger when visible)
- Smooth scroll behavior with CSS

### Accessibility
- Proper heading hierarchy (h1 → h6)
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus states for all interactive elements
- Semantic HTML structure

## 🎯 Conversion Optimization

- **Multiple CTAs** throughout the page
- **Social proof** (testimonials, stats, ratings)
- **Clear value proposition** in hero
- **Feature comparison** table
- **Money-back guarantee** messaging
- **Floating install button** after scroll
- **Trust badges** (Chrome Web Store, ratings, users)

## 🚦 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Start production server:
   ```bash
   npm start
   ```

## 📱 Smooth Scroll Navigation

All navigation links use smooth scroll to sections with IDs:
- `#hero` - Hero section
- `#features` - Features section
- `#pricing` - Pricing section
- `#docs` - Documentation (placeholder)
- `#about` - About (placeholder)

## 🎨 Customization

### Colors
Edit `/tailwind.config.ts` to change the color scheme:
- Primary colors (indigo/purple gradient)
- Secondary colors
- Accent colors

### Content
All content is in the respective section components. Simply edit the text, images, or data arrays in each component.

### Fonts
The Inter font is configured in `/src/app/layout.tsx`. You can change it to any Google Font.

## 📋 TODO for Production

- [ ] Replace placeholder images with actual screenshots
- [ ] Add actual Chrome Web Store link
- [ ] Set up analytics tracking on CTAs
- [ ] Add video demo modal functionality
- [ ] Create actual documentation pages
- [ ] Add cookie consent functionality
- [ ] Set up contact form backend
- [ ] Add actual social media links

## 🔗 SEO Ready

The page includes:
- Proper meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- Semantic HTML structure
- Fast loading times
- Mobile-first responsive design

## 📝 Notes

- All animations are viewport-triggered for performance
- The page is fully TypeScript typed
- Components are modular and reusable
- Ready for production deployment
- Optimized for conversion and user experience

Built with focus on modern web standards and best practices.

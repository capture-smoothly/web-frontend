# Quick Start Guide - Snapshot Landing Page

Get your landing page running in 3 simple steps!

## 🚀 Run Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 What You'll See

Your landing page includes these sections (in order):

1. **Navbar** - Sticky navigation with Install Now button
2. **Hero** - "Create Stunning Screenshots & Text Snapshots in Seconds"
3. **Problem** - 3 pain points (Lost Selections, Ugly Screenshots, Cluttered Workflow)
4. **Solution** - 4 main features with detailed cards
5. **How It Works** - 3-step process (Capture → Edit → Share)
6. **Feature Showcase** - Tabs with detailed feature breakdown
7. **Comparison** - Table comparing Snapshot vs competitors
8. **Use Cases** - For Students, Professionals, Content Creators
9. **Pricing** - Free, Pro ($7), Team ($25) plans
10. **Testimonials** - User reviews with 5-star ratings
11. **Roadmap** - Q1-Q3 2025 features
12. **FAQ** - 8 common questions
13. **Final CTA** - Big conversion section
14. **Footer** - Links and legal

Plus a **floating Install button** that appears after scrolling!

---

## 🎨 Quick Customization

### Change Colors
Edit [tailwind.config.ts](tailwind.config.ts):
```ts
colors: {
  primary: {
    DEFAULT: "#6366f1",  // Change this
    // ...
  }
}
```

### Edit Hero Headline
Open [src/components/sections/HeroSection.tsx](src/components/sections/HeroSection.tsx):
```tsx
<h1>
  Create Stunning Screenshots...  // Edit this text
</h1>
```

### Update Pricing
Open [src/components/sections/PricingSection.tsx](src/components/sections/PricingSection.tsx):
```tsx
const pricingPlans = [
  {
    name: "Free Forever",
    price: 0,  // Change prices here
    // ...
  }
]
```

### Modify FAQs
Open [src/components/sections/FAQSection.tsx](src/components/sections/FAQSection.tsx):
```tsx
const faqItems = [
  {
    question: "Your question?",
    answer: "Your answer"
  }
]
```

---

## 🖼️ Replace Placeholder Images

Current placeholders are in:
- Hero section (demo preview)
- Feature cards (visual examples)
- Theme thumbnails

To replace:
1. Add images to `/public/images/`
2. Import in component: `import Image from "next/image"`
3. Use: `<Image src="/images/your-image.png" alt="..." />`

---

## 🔗 Update Links

### Chrome Web Store Link
Search for `Install Now` and `Install Free Now` buttons across components and add your actual Chrome Web Store URL.

### Social Media Links
Edit [src/components/sections/SnapshotFooter.tsx](src/components/sections/SnapshotFooter.tsx):
```tsx
const socialLinks = [
  { icon: Twitter, href: "YOUR_TWITTER_URL" },
  { icon: Github, href: "YOUR_GITHUB_URL" },
  { icon: MessageCircle, href: "YOUR_DISCORD_URL" },
];
```

---

## 📊 Add Analytics

Add tracking to button clicks:
```tsx
<Button onClick={() => {
  // Your analytics code
  console.log("Install clicked");
}}>
  Install Now
</Button>
```

---

## 🎯 Navigation

The navbar links scroll to sections with these IDs:
- `#hero` - Hero section
- `#features` - Features section
- `#pricing` - Pricing section
- `#docs` - Docs (you need to create this)
- `#about` - About (you need to create this)

To add a new section with smooth scroll:
1. Add `id="your-section"` to a section
2. Add link in navbar: `{ label: "Label", href: "#your-section" }`

---

## 🏗️ Build for Production

```bash
npm run build
npm start
```

Your site will be optimized and ready for deployment!

---

## 📱 Test Responsive Design

The page is optimized for:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Test by resizing your browser or using Chrome DevTools (F12 → Toggle Device Toolbar).

---

## ⚡ Performance Tips

✅ Already implemented:
- Viewport-based animations (only animate when visible)
- Static page generation
- Optimized fonts (Inter with swap)
- Proper semantic HTML
- Lazy loading ready

To further optimize:
- Use WebP images
- Add image optimization
- Enable compression on server
- Use CDN for assets

---

## 🐛 Common Issues

**Issue**: Components not found
- **Fix**: Check imports use `@/components/...` path

**Issue**: Styles not applying
- **Fix**: Restart dev server after Tailwind config changes

**Issue**: Animations not working
- **Fix**: Ensure Motion is installed: `npm install motion`

**Issue**: TypeScript errors
- **Fix**: Run `npm run build` to see all type errors

---

## 📚 More Help

- **Component Guide**: [COMPONENT_GUIDE.md](COMPONENT_GUIDE.md)
- **Full README**: [LANDING_PAGE_README.md](LANDING_PAGE_README.md)
- **Build Summary**: [BUILD_SUMMARY.md](BUILD_SUMMARY.md)

---

## 🎉 You're Ready!

Run `npm run dev` and start customizing your landing page!

The page is fully functional and conversion-optimized out of the box.

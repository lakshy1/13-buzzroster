# Buzzroster Project Reference

Living reference for future tasks. Use this as the source of truth for visual language, responsive behavior, component patterns, motion, and implementation style.

## Stack
- Next.js 16 app router
- React 19
- Tailwind CSS v4
- TypeScript
- Fonts loaded in [`app/layout.tsx`](../app/layout.tsx): Inter, Bodoni Moda, Pacifico

## Core Brand System
- Primary foreground: `#17162b`
- Primary purple accent: `#6d44ec`
- Secondary purple: `#5b3dd7`
- Softer lavender accents appear throughout for borders, highlights, and fades.
- Warm background palette is a signature part of the experience:
  - cream
  - soft peach
  - pale pink
  - lavender mist
  - faint mint/green accents in selected areas
- Visual tone: premium, soft, airy, slightly editorial, but still playful.
- Avoid hard-edged, generic SaaS styling unless it already matches the section pattern.

## Typography
- Display serif headline style uses Bodoni Moda via `--font-bodoni`.
- Logo/wordmark uses Pacifico via `--font-pacifico`.
- Supporting body text uses Inter.
- Headline style:
  - large serif display
  - tight tracking
  - very restrained line-height
  - often split into 2 lines for balance
- Section titles:
  - bold, compact
  - usually dark foreground
  - sometimes with a purple accent span
- Mobile typography should be slightly smaller and more compact, but still elegant.

## Global Styling
See [`app/globals.css`](../app/globals.css).
- Root background and foreground are set in CSS variables.
- Global smooth scrolling is enabled.
- Scrollbars:
  - custom thin scrollbar theme is present globally
  - `.no-scrollbar` utility is used for horizontal carousels and hidden overflow regions
- Shared animations:
  - `brand-marquee` for the trusted brand strip
  - `fade-slide-in` for section toggles/carousels

## Project Shape
The site is primarily a single landing page in [`app/page.tsx`](../app/page.tsx).

### Data-driven content blocks
- `navItems`
- `toolsMenuItems`
- `trustedBrands`
- `howItWorksSteps`
- `brandWorksSteps`
- `testimonials`
- `brandTestimonials`
- `pricingPlans`
- `faqItems`

### Tool pages
- [`app/tools/creator-worth-calculator/page.tsx`](../app/tools/creator-worth-calculator/page.tsx)
- [`app/tools/creator-worth-calculator/CreatorWorthCalculatorPage.tsx`](../app/tools/creator-worth-calculator/CreatorWorthCalculatorPage.tsx)
- Current calculator scope is intentionally limited to:
  - Instagram creator profile URLs
  - YouTube channel / profile URLs
- Keep future calculator/tool pages aligned with the same warm theme, compact cards, and premium glass treatment.
- Calculator behavior is state-driven:
  - `idle`, `validating`, `fetching`, `analyzing`, `loaded`, `error`, `unsupported`, `insufficient_data`
  - report values must come from a single `CreatorWorthResult` object
  - loaded state reveals a compact top bar, dashboard cards, floating worth button, and right-side drawer
- Tool API routes:
  - [`app/api/tools/creator-worth/analyze/route.ts`](../app/api/tools/creator-worth/analyze/route.ts)
  - [`app/api/tools/creator-worth/interest/route.ts`](../app/api/tools/creator-worth/interest/route.ts)
  - analysis payloads are generated for the supported Instagram / YouTube scope only

### Helper components
- `BrandIcon`
- `SparkIcon`
- `ChevronIcon`
- `ToolsDropdown`
- `StepIcon`
- `Avatar`
- `StarRow`
- `FooterColumn`
- `SocialIcon`
- `HeartMark`

## Page Flow
The homepage sections are arranged in this order:
1. Fixed header / navbar
2. Hero section
3. Trusted brands strip
4. How BuzzRoster works
5. Testimonials
6. Pricing
7. FAQ
8. CTA banner
9. Footer

## Header / Navbar
- Sticky fixed header with:
  - soft white translucent background
  - blurred glass effect
  - rounded pill-shaped container
- Desktop:
  - logo on the left
  - nav links in the center
  - login and primary CTA on the right
  - `Tools` is a dropdown with arrow
- Mobile:
  - hamburger button
  - expanded drawer below the header
  - drawer is scrollable internally to prevent clipping
  - Tools becomes an inline accordion inside the mobile nav
  - close-on-scroll behavior is enabled
- Mobile nav should always preserve:
  - theme colors
  - soft borders
  - gentle shadows
  - no clipped footer/buttons inside the drawer

## Mobile Nav Behavior
- `mobileNavOpen` controls the drawer.
- `mobileToolsOpen` controls the nested Tools accordion.
- Closing behavior:
  - scroll closes the drawer
  - selecting any nav/action closes both nav and tools accordion
- Drawer content should remain visible and not be clipped:
  - use internal vertical scrolling if content grows
  - keep padding at the bottom for the final buttons
- Tools in mobile should feel like a proper dropdown/accordion:
  - row with arrow
  - smooth height easing
  - subtle rotation on the arrow

## Hero Section
- Centered, editorial style layout.
- Huge serif headline with controlled line breaks.
- Supporting paragraph is narrower and muted.
- The hero illustration is large and centered, with a soft glow behind it.
- Hero text and imagery should remain balanced:
  - wide on desktop
  - stacked and readable on mobile
- The site should avoid a cramped top-heavy first fold.

## Trusted Brands Strip
- This section is intentionally lighter and more transparent.
- It should feel like a floating band rather than a hard card.
- Use simple brand logos and names without pill-shaped containers.
- The band should not overpower the page.
- It should still feel connected to the main theme through:
  - low-opacity white backdrop
  - gentle border
  - soft blur

## How It Works Section
- Uses tabs for:
  - For Creators
  - For Brands
- On mobile:
  - cards become a horizontal carousel
  - arrows are minimal and text-only
  - no dot/pill indicators
  - arrows disable at first/last item
- On desktop:
  - grid layout across all steps
  - the active audience swaps the set of steps
- Visual language:
  - large circular icon background
  - small numbered chip
  - compact explanation text

## Testimonials
- Two audience sets:
  - creator testimonials
  - brand testimonials
- Desktop:
  - horizontal carousel with 3 cards visible depending on width
  - side arrows
  - arrow controls should be minimal and disabled at edges
  - dots are shown only for desktop
- Mobile:
  - one card per viewport
  - very minimal plain arrows
  - no dot/pill indicator row
  - arrows disabled at first/last item
- Cards use soft tinted backgrounds and accent-colored role chips.
- Keep the section centered and balanced, not overly dense.

## Pricing Section
- Three pricing plans:
  - Creator
  - Brand Starter
  - Agency
- Mobile:
  - horizontal carousel
  - plain minimal arrows
  - no indicator pills
  - disabled edge states
- Desktop:
  - card grid at larger breakpoints
- Featured plan:
  - `Brand Starter`
  - badge text is `Recommended`
  - badge should be subtle, integrated into the card header
  - the card itself carries a very light gradient wash
  - do not use heavy ribbons or oversized icons
- CTA button gradients:
  - standard purple gradient for most plans
  - Agency has a purple-plus-soft-green gradient accent

## FAQ Section
- Uses accordion rows with smooth open/close transitions.
- Each item:
  - rounded container
  - light border
  - white translucent background
  - plus icon rotates on open
- The whole section should remain compact and easy to scan.

## CTA Banner
- CTA should feel strong on desktop and more stacked on mobile.
- Mobile:
  - image first
  - copy below
  - buttons full width / stacked
- Desktop:
  - image with left-aligned text overlay
  - two primary actions
- Keep CTA visually connected to the theme:
  - gradient wash
  - soft border
  - warm/purple tones

## Footer
- Footer is intentionally full width.
- Background should blend into the page theme, not become a separate white slab.
- Keep a subtle top border and shadow as separation from the CTA.
- Footer content is left aligned.
- Structure:
  - logo + description + social icons
  - four link columns
  - copyright / decorative mark
- Footer should feel integrated and airy, not boxed into a corner.

## Shared Visual Language
Use these patterns whenever possible:
- Rounded corners: `1.5rem` to `2rem` for major cards
- Borders:
  - soft lavender or white borders
  - low-opacity lines
- Shadows:
  - gentle purple-tinted shadows
  - avoid harsh black shadows
- Backgrounds:
  - translucent white overlays
  - soft gradients
  - subtle radial glows
- Cards:
  - often translucent
  - lightly tinted by section or audience
  - plenty of padding on desktop, slightly tighter on mobile

## Motion and Interaction
- `fade-slide-in` is used on toggled sections/carousels.
- `brand-marquee` runs continuously for the trusted brands strip.
- Carousel controls:
  - should be minimal
  - should show disabled state at edges
  - should not use bulky button chrome on mobile
- Dropdowns:
  - subtle transitions only
  - keep easing soft and quick

## Responsive Rules
### Mobile
- Prefer stacked content.
- Keep carousels to one card per view.
- Make controls tiny and non-intrusive.
- Avoid clipping:
  - ensure enough bottom padding in drawers and carousels
  - use internal scroll when content is longer than the viewport

### Tablet
- Some sections transition to 2-up layouts:
  - testimonials
  - footer columns
- Keep spacing balanced and never too dense.

### Desktop
- Use the full width more generously.
- Sections should breathe:
  - wide grids
  - larger cards
  - cleaner alignment
- The desktop look should remain polished, editorial, and premium.

## Accessibility / Interaction Notes
- Buttons should have clear hover and disabled states.
- Menu and carousel arrows should be obvious enough to understand, but not visually heavy.
- Dropdowns and accordions should expose open/closed state.
- Text contrast should remain readable over translucent backgrounds.

## Development Notes
- The project currently centers around one landing page, so future pages should reuse:
  - the same gradient family
  - the same typography stack
  - the same shadow/border vocabulary
  - the same minimal control style for carousels and dropdowns
- If adding new sections:
  - keep the sequence calm and progressive
  - use a limited number of accent colors
  - prefer subtle transitions over flashy motion

## Files to Watch
- [`app/page.tsx`](../app/page.tsx)
- [`app/globals.css`](../app/globals.css)
- [`app/layout.tsx`](../app/layout.tsx)
- [`package.json`](../package.json)

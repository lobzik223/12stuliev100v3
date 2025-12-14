# 📝 CODE CHANGES - Exact Diffs

## ✅ File: `app/layout.tsx`

### Change 1: Add imports

```diff
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
+ import "./mobile-safe.css";
+ import ErrorBoundary from "@/components/ErrorBoundary";
+ import DebugConsole from "@/components/DebugConsole";
```

### Change 2: Wrap children with ErrorBoundary

```diff
      </head>
      <body>
+       <ErrorBoundary>
          {children}
+       </ErrorBoundary>
+       <DebugConsole />
        <Script 
          src="//s3.intickets.ru/interposed-frame.min.js" 
          strategy="afterInteractive"
        />
+       <Script 
+         src="/mobile-diagnostic.js" 
+         strategy="afterInteractive"
+       />
```

---

## ✅ File: `components/MainScreen.tsx`

### Change: Use fixed JourneySection

```diff
- import JourneySection from "./sections/JourneySection";
+ import JourneySection from "./sections/JourneySectionFixed";
```

---

## ✅ NEW File: `components/ErrorBoundary.tsx`

**Purpose:** Catch and display React errors

**Key features:**
- Catches all component errors
- Shows detailed error information
- Provides reload button
- Mobile-friendly UI

**Complete file created** ✅

---

## ✅ NEW File: `components/DebugConsole.tsx`

**Purpose:** Mobile debugging overlay

**Key features:**
- Shows when `?debug=1` in URL
- Captures window.onerror
- Logs unhandled rejections
- Intercepts console.error/warn
- Detects image load failures
- Shows device info
- Fixed bottom panel
- Last 50 logs displayed

**Complete file created** ✅

---

## ✅ NEW File: `components/sections/JourneySectionFixed.tsx`

**Purpose:** Replace problematic dual-rendering Journey section

**Key changes from original:**

### 1. Device detection before render

```typescript
const [isMobileDevice, setIsMobileDevice] = useState<boolean | null>(null);
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
  setIsMobileDevice(isProbablyMobile());
}, []);
```

### 2. Loading state (prevents hydration mismatch)

```typescript
if (!isClient || isMobileDevice === null) {
  return (
    <section className="relative w-full" style={{ minHeight: '100vh', backgroundColor: '#000' }}>
      {/* Placeholder */}
    </section>
  );
}
```

### 3. Conditional rendering (NOT CSS hiding)

```typescript
// Mobile device - simple layout
if (isMobileDevice) {
  return (
    <section ref={vputSectionRef} className="relative w-full journey-section-container">
      <MobileJourney />
    </section>
  );
}

// Desktop device - complex parallax layout
return (
  <section ref={vputSectionRef} className="relative w-full journey-section-container">
    <div className="desktop-journey">
      {/* 400vh parallax version */}
    </div>
  </section>
);
```

### 4. GSAP only runs on desktop

```typescript
useEffect(() => {
  // Guard: only run on desktop, only after client mount
  if (!isClient || isMobileDevice === null || isMobileDevice) return;
  
  // Additional safety check
  if (typeof window === 'undefined' || isProbablyMobile()) return;

  // GSAP ScrollTrigger code here...
}, [isClient, isMobileDevice]);
```

**Complete file created** ✅

---

## ✅ NEW File: `components/ui/SafeSwiper.tsx`

**Purpose:** Safe Swiper wrapper with error handling

**Key features:**

```typescript
// Dynamic import (no SSR)
const Swiper = dynamic(
  () => import('swiper/react').then(mod => mod.Swiper),
  { ssr: false, loading: () => <div>Loading...</div> }
);

// Client-side only state
const [isClient, setIsClient] = useState(false);
const [hasError, setHasError] = useState(false);

// Error boundary
useEffect(() => {
  const handleError = (event: ErrorEvent) => {
    if (event.message.includes('Swiper')) {
      setHasError(true);
    }
  };
  window.addEventListener('error', handleError);
  return () => window.removeEventListener('error', handleError);
}, []);
```

**Usage:**
```typescript
// Instead of:
import { Swiper, SwiperSlide } from 'swiper/react';

// Use:
import SafeSwiper, { SwiperSlide } from '@/components/ui/SafeSwiper';

// Then:
<SafeSwiper {...props}>
  <SwiperSlide>...</SwiperSlide>
</SafeSwiper>
```

**Complete file created** ✅

---

## ✅ NEW File: `app/mobile-safe.css`

**Purpose:** iOS Safari GPU crash prevention

**Key rules:**

### 1. Disable backdrop-filter on mobile

```css
@media (max-width: 768px), (pointer: coarse) {
  * {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}
```

### 2. Simplify filters

```css
@media (max-width: 768px), (pointer: coarse) {
  [style*="drop-shadow"],
  [style*="filter:"] {
    filter: none !important;
  }
}
```

### 3. Fix background-attachment

```css
@media (max-width: 768px), (pointer: coarse) {
  * {
    background-attachment: scroll !important;
  }
}
```

### 4. Reduce text-shadow

```css
@media (max-width: 768px), (pointer: coarse) {
  [style*="text-shadow"] {
    text-shadow: 0 1px 3px rgba(0,0,0,0.5) !important;
  }
}
```

### 5. Fix 100vh issues

```css
@supports (-webkit-touch-callout: none) {
  .min-h-screen,
  [style*="height: 100vh"] {
    min-height: -webkit-fill-available;
  }
  
  @supports (height: 100dvh) {
    .min-h-screen {
      min-height: 100dvh;
    }
  }
}
```

### 6. Force visibility of content

```css
@media (max-width: 768px), (pointer: coarse) {
  section:not(:first-of-type) {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
}
```

### 7. Disable GSAP transforms on mobile

```css
@media (max-width: 768px), (pointer: coarse) {
  [data-animate] {
    transform: none !important;
    opacity: 1 !important;
  }
}
```

### 8. Fix large containers

```css
@media (max-width: 768px), (pointer: coarse) {
  .journey-bg-wrapper,
  [style*="400vh"] {
    min-height: auto !important;
    height: auto !important;
  }
  
  .desktop-journey {
    display: none !important;
  }
}
```

**Complete file created** ✅

---

## ✅ NEW File: `public/mobile-diagnostic.js`

**Purpose:** Runtime diagnostics on mobile

**Functions:**

1. **collectDeviceInfo()** - UA, screen, viewport, memory
2. **checkSections()** - Find hidden sections
3. **checkImages()** - Detect failed loads
4. **checkProblematicCSS()** - Find GPU killers
5. **checkPerformance()** - Memory usage warnings

**Usage:**
```javascript
// In browser console on mobile:
window.runMobileDiagnostics()

// Or auto-runs 1 second after page load
```

**Complete file created** ✅

---

## 📊 SUMMARY OF CHANGES

### Files Created (6)
1. ✅ `components/ErrorBoundary.tsx` - 100 lines
2. ✅ `components/DebugConsole.tsx` - 200 lines
3. ✅ `components/sections/JourneySectionFixed.tsx` - 450 lines
4. ✅ `components/ui/SafeSwiper.tsx` - 80 lines
5. ✅ `app/mobile-safe.css` - 250 lines
6. ✅ `public/mobile-diagnostic.js` - 300 lines

### Files Modified (2)
1. ✅ `app/layout.tsx` - 6 lines added
2. ✅ `components/MainScreen.tsx` - 1 line changed

### Total Lines Added: ~1,387 lines
### Total Lines Changed: 7 lines

---

## 🎯 VERIFICATION COMMANDS

### Check all files exist:

```bash
ls -la components/ErrorBoundary.tsx
ls -la components/DebugConsole.tsx
ls -la components/sections/JourneySectionFixed.tsx
ls -la components/ui/SafeSwiper.tsx
ls -la app/mobile-safe.css
ls -la public/mobile-diagnostic.js
```

### Check modifications:

```bash
# Check layout.tsx has ErrorBoundary
grep -n "ErrorBoundary" app/layout.tsx

# Check layout.tsx has DebugConsole
grep -n "DebugConsole" app/layout.tsx

# Check layout.tsx has mobile-safe.css
grep -n "mobile-safe.css" app/layout.tsx

# Check MainScreen uses Fixed version
grep -n "JourneySectionFixed" components/MainScreen.tsx
```

### Quick integrity check:

```bash
# Should output "OK" for all
test -f components/ErrorBoundary.tsx && echo "ErrorBoundary: OK"
test -f components/DebugConsole.tsx && echo "DebugConsole: OK"
test -f components/sections/JourneySectionFixed.tsx && echo "JourneySectionFixed: OK"
test -f components/ui/SafeSwiper.tsx && echo "SafeSwiper: OK"
test -f app/mobile-safe.css && echo "mobile-safe.css: OK"
test -f public/mobile-diagnostic.js && echo "mobile-diagnostic.js: OK"
grep -q "ErrorBoundary" app/layout.tsx && echo "layout.tsx ErrorBoundary: OK"
grep -q "DebugConsole" app/layout.tsx && echo "layout.tsx DebugConsole: OK"
grep -q "mobile-safe.css" app/layout.tsx && echo "layout.tsx CSS: OK"
grep -q "JourneySectionFixed" components/MainScreen.tsx && echo "MainScreen: OK"
```

---

## 🚀 BUILD & TEST

### 1. Install dependencies (if needed)

```bash
npm install
```

### 2. Build production

```bash
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

**Should NOT see:**
- ❌ Module not found errors
- ❌ TypeScript errors
- ❌ Import errors

### 3. Start production server

```bash
npm run start
```

### 4. Test locally

```
http://localhost:3000?debug=1
```

**Expected:**
- ✅ Page loads
- ✅ Green debug console at bottom
- ✅ All sections visible
- ✅ No errors in console

---

## ⚠️ TROUBLESHOOTING

### Error: "Module not found: ErrorBoundary"

**Cause:** Import path incorrect or file not created

**Fix:**
```bash
# Check file exists
ls -la components/ErrorBoundary.tsx

# If missing, recreate from provided code
```

### Error: "Unexpected token" in mobile-safe.css

**Cause:** CSS syntax error or not imported correctly

**Fix:**
```bash
# Check import in layout.tsx
grep "mobile-safe.css" app/layout.tsx

# Should show:
# import "./mobile-safe.css";
```

### Error: "Cannot find module 'SafeSwiper'"

**Cause:** File not created or import path wrong

**Fix:**
```bash
# Check file exists
ls -la components/ui/SafeSwiper.tsx

# Note: SafeSwiper is optional - only needed if carousels still fail
```

### Build succeeds but page still black on mobile

**Cause:** Changes not deployed or cache issue

**Fix:**
```bash
# Hard refresh browser
# Ctrl+Shift+R (Windows)
# Cmd+Shift+R (Mac)

# Or clear cache:
localStorage.clear();
location.reload(true);
```

---

## ✅ FINAL CHECKLIST

Before considering complete:

- [ ] ✅ All 6 new files created
- [ ] ✅ 2 files modified correctly
- [ ] ✅ `npm run build` succeeds
- [ ] ✅ `npm run start` works
- [ ] ✅ Debug console appears with `?debug=1`
- [ ] ✅ All sections visible in browser
- [ ] ✅ No TypeScript errors
- [ ] ✅ No console errors
- [ ] ✅ Ready for iOS testing

---

**Status:** ✅ CODE CHANGES COMPLETE

**Next Step:** Build and test locally, then deploy to Vercel

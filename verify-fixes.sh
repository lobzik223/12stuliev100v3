#!/bin/bash

# iOS Safari Black Screen Fix - Verification Script
# Run this to verify all fixes are properly installed

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 VERIFYING iOS SAFARI FIXES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASS=0
FAIL=0
WARN=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ PASS${NC}: $1 exists"
        ((PASS++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}: $1 missing"
        ((FAIL++))
        return 1
    fi
}

# Function to check content in file
check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✅ PASS${NC}: $3"
        ((PASS++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}: $3"
        ((FAIL++))
        return 1
    fi
}

echo "📂 Checking new files..."
echo "─────────────────────────────────────────────────────"

check_file "components/ErrorBoundary.tsx"
check_file "components/DebugConsole.tsx"
check_file "components/sections/JourneySectionFixed.tsx"
check_file "components/ui/SafeSwiper.tsx"
check_file "app/mobile-safe.css"
check_file "public/mobile-diagnostic.js"

echo ""
echo "📝 Checking file modifications..."
echo "─────────────────────────────────────────────────────"

check_content "app/layout.tsx" "ErrorBoundary" "layout.tsx imports ErrorBoundary"
check_content "app/layout.tsx" "DebugConsole" "layout.tsx imports DebugConsole"
check_content "app/layout.tsx" "mobile-safe.css" "layout.tsx imports mobile-safe.css"
check_content "app/layout.tsx" "<ErrorBoundary>" "layout.tsx wraps children with ErrorBoundary"
check_content "app/layout.tsx" "<DebugConsole />" "layout.tsx includes DebugConsole"
check_content "app/layout.tsx" "mobile-diagnostic.js" "layout.tsx includes diagnostic script"
check_content "components/MainScreen.tsx" "JourneySectionFixed" "MainScreen uses JourneySectionFixed"

echo ""
echo "🔧 Checking TypeScript compilation..."
echo "─────────────────────────────────────────────────────"

# Check if we can at least parse the TypeScript files
if command -v tsc &> /dev/null; then
    if tsc --noEmit --skipLibCheck 2>&1 | grep -q "error TS"; then
        echo -e "${RED}❌ FAIL${NC}: TypeScript errors found"
        ((FAIL++))
    else
        echo -e "${GREEN}✅ PASS${NC}: No TypeScript errors"
        ((PASS++))
    fi
else
    echo -e "${YELLOW}⚠️  WARN${NC}: TypeScript not available for checking"
    ((WARN++))
fi

echo ""
echo "📦 Checking dependencies..."
echo "─────────────────────────────────────────────────────"

if [ -f "package.json" ]; then
    if grep -q "next" package.json; then
        echo -e "${GREEN}✅ PASS${NC}: Next.js dependency found"
        ((PASS++))
    else
        echo -e "${RED}❌ FAIL${NC}: Next.js dependency missing"
        ((FAIL++))
    fi
    
    if grep -q "react" package.json; then
        echo -e "${GREEN}✅ PASS${NC}: React dependency found"
        ((PASS++))
    else
        echo -e "${RED}❌ FAIL${NC}: React dependency missing"
        ((FAIL++))
    fi
    
    if grep -q "gsap" package.json; then
        echo -e "${GREEN}✅ PASS${NC}: GSAP dependency found"
        ((PASS++))
    else
        echo -e "${YELLOW}⚠️  WARN${NC}: GSAP dependency not found (may affect desktop parallax)"
        ((WARN++))
    fi
    
    if grep -q "swiper" package.json; then
        echo -e "${GREEN}✅ PASS${NC}: Swiper dependency found"
        ((PASS++))
    else
        echo -e "${YELLOW}⚠️  WARN${NC}: Swiper dependency not found (may affect carousels)"
        ((WARN++))
    fi
else
    echo -e "${RED}❌ FAIL${NC}: package.json not found"
    ((FAIL++))
fi

echo ""
echo "🎨 Checking CSS rules..."
echo "─────────────────────────────────────────────────────"

if [ -f "app/mobile-safe.css" ]; then
    check_content "app/mobile-safe.css" "backdrop-filter: none" "Backdrop-filter disabled on mobile"
    check_content "app/mobile-safe.css" "filter: none" "Heavy filters disabled on mobile"
    check_content "app/mobile-safe.css" "background-attachment: scroll" "Fixed backgrounds converted to scroll"
    check_content "app/mobile-safe.css" "@media.*max-width.*768px" "Mobile media queries present"
fi

echo ""
echo "🔬 Checking critical code patterns..."
echo "─────────────────────────────────────────────────────"

if [ -f "components/sections/JourneySectionFixed.tsx" ]; then
    check_content "components/sections/JourneySectionFixed.tsx" "isMobileDevice" "Mobile device detection present"
    check_content "components/sections/JourneySectionFixed.tsx" "isProbablyMobile" "Mobile detection function used"
    check_content "components/sections/JourneySectionFixed.tsx" "if (isMobileDevice)" "Conditional rendering present"
    
    if grep -q "md:hidden.*hidden md:block" "components/sections/JourneySectionFixed.tsx" 2>/dev/null; then
        echo -e "${RED}❌ FAIL${NC}: Still using CSS-only hiding (should use conditional rendering)"
        ((FAIL++))
    else
        echo -e "${GREEN}✅ PASS${NC}: Not using CSS-only hiding (proper conditional rendering)"
        ((PASS++))
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 VERIFICATION RESULTS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✅ PASSED:${NC} $PASS"
echo -e "${RED}❌ FAILED:${NC} $FAIL"
echo -e "${YELLOW}⚠️  WARNINGS:${NC} $WARN"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 ALL CHECKS PASSED!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "✅ Fixes are properly installed"
    echo ""
    echo "📋 NEXT STEPS:"
    echo "  1. Run: npm run build"
    echo "  2. Run: npm run start"
    echo "  3. Open: http://localhost:3000?debug=1"
    echo "  4. Verify debug console appears"
    echo "  5. Check all sections are visible"
    echo "  6. Test on iPhone: http://YOUR_IP:3000?debug=1"
    echo ""
    exit 0
else
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}⚠️  VERIFICATION FAILED${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "❌ Some checks failed. Please review errors above."
    echo ""
    echo "📖 TROUBLESHOOTING:"
    echo "  1. Check CODE_CHANGES.md for exact file locations"
    echo "  2. Ensure all new files are created"
    echo "  3. Verify imports in layout.tsx"
    echo "  4. Check MainScreen.tsx uses JourneySectionFixed"
    echo ""
    echo "🆘 For help, see: MOBILE_FIX_GUIDE.md"
    echo ""
    exit 1
fi

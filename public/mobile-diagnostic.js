/**
 * MOBILE DIAGNOSTIC SCRIPT
 * 
 * Add this to layout.tsx with: <Script src="/mobile-diagnostic.js" strategy="afterInteractive" />
 * Or load it when ?debug=1 is in URL
 * 
 * This will help identify what's causing black screens on mobile
 */

(function() {
  'use strict';
  
  if (typeof window === 'undefined') return;

  const diagnostics = {
    deviceInfo: {},
    sections: [],
    images: [],
    errors: [],
    performance: {},
    timestamp: Date.now()
  };

  // Collect device info
  function collectDeviceInfo() {
    diagnostics.deviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      touchPoints: navigator.maxTouchPoints,
      visualViewport: window.visualViewport ? {
        width: window.visualViewport.width,
        height: window.visualViewport.height,
        scale: window.visualViewport.scale
      } : null,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink
      } : null,
      memory: performance.memory ? {
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        usedJSHeapSize: performance.memory.usedJSHeapSize
      } : null
    };

    console.log('📱 Device Info:', diagnostics.deviceInfo);
  }

  // Check if sections are visible
  function checkSections() {
    const sections = document.querySelectorAll('section, main');
    diagnostics.sections = [];

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const computed = window.getComputedStyle(section);
      const info = {
        index,
        tagName: section.tagName,
        className: section.className,
        isVisible: rect.height > 0 && computed.display !== 'none' && computed.visibility !== 'hidden',
        rect: {
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
          width: rect.width
        },
        styles: {
          display: computed.display,
          visibility: computed.visibility,
          opacity: computed.opacity,
          transform: computed.transform,
          position: computed.position,
          zIndex: computed.zIndex,
          overflow: computed.overflow,
          backgroundColor: computed.backgroundColor,
          backgroundImage: computed.backgroundImage
        }
      };

      diagnostics.sections.push(info);

      // Log sections that should be visible but aren't
      if (index > 0 && !info.isVisible) {
        console.warn(`⚠️ Section ${index} is hidden!`, info);
      }
    });

    console.log('📊 Sections Analysis:', diagnostics.sections);
  }

  // Check image loading
  function checkImages() {
    const images = document.querySelectorAll('img');
    const backgroundImages = document.querySelectorAll('[style*="background-image"]');

    diagnostics.images = [];

    images.forEach((img, index) => {
      const info = {
        index,
        src: img.src,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        loading: img.loading,
        error: !img.complete && img.naturalWidth === 0
      };

      diagnostics.images.push(info);

      if (info.error) {
        console.error(`❌ Image failed to load: ${info.src}`);
      }
    });

    backgroundImages.forEach((el, index) => {
      const computed = window.getComputedStyle(el);
      const bgImage = computed.backgroundImage;
      
      if (bgImage && bgImage !== 'none') {
        diagnostics.images.push({
          index: `bg-${index}`,
          src: bgImage,
          type: 'background',
          element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : '')
        });
      }
    });

    console.log('🖼️ Images Analysis:', diagnostics.images);
  }

  // Check for problematic CSS
  function checkProblematicCSS() {
    const problematic = {
      backdropFilter: [],
      heavyFilters: [],
      fixed: [],
      transforms: [],
      largeHeights: []
    };

    document.querySelectorAll('*').forEach(el => {
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      // Check backdrop-filter
      if (computed.backdropFilter && computed.backdropFilter !== 'none') {
        problematic.backdropFilter.push({
          element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
          value: computed.backdropFilter
        });
      }

      // Check heavy filters
      if (computed.filter && computed.filter !== 'none' && computed.filter.includes('blur')) {
        problematic.heavyFilters.push({
          element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
          value: computed.filter
        });
      }

      // Check fixed positioning
      if (computed.position === 'fixed' && rect.height > window.innerHeight) {
        problematic.fixed.push({
          element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
          height: rect.height
        });
      }

      // Check large heights
      if (rect.height > window.innerHeight * 3) {
        problematic.largeHeights.push({
          element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
          height: rect.height
        });
      }
    });

    console.log('⚠️ Problematic CSS:', problematic);
    return problematic;
  }

  // Monitor performance
  function checkPerformance() {
    if (performance.memory) {
      const memory = performance.memory;
      diagnostics.performance.memory = {
        usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
        totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
        jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB',
        percentUsed: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100) + '%'
      };

      console.log('💾 Memory Usage:', diagnostics.performance.memory);

      // Warn if memory usage is high
      if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
        console.error('🚨 HIGH MEMORY USAGE! This might cause black screens on mobile!');
      }
    }

    // Check paint timings
    const paintEntries = performance.getEntriesByType('paint');
    diagnostics.performance.paint = paintEntries.map(entry => ({
      name: entry.name,
      startTime: Math.round(entry.startTime) + 'ms'
    }));

    console.log('🎨 Paint Timings:', diagnostics.performance.paint);
  }

  // Run diagnostics
  function runDiagnostics() {
    console.log('🔍 Starting Mobile Diagnostics...');
    console.log('═══════════════════════════════════════');
    
    collectDeviceInfo();
    checkSections();
    checkImages();
    checkProblematicCSS();
    checkPerformance();

    console.log('═══════════════════════════════════════');
    console.log('✅ Diagnostics Complete');
    console.log('Full Report:', diagnostics);

    // Save to sessionStorage for persistence
    try {
      sessionStorage.setItem('mobileDiagnostics', JSON.stringify(diagnostics));
    } catch (e) {
      console.warn('Could not save diagnostics to sessionStorage:', e);
    }

    return diagnostics;
  }

  // Auto-run on load
  if (document.readyState === 'complete') {
    setTimeout(runDiagnostics, 1000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(runDiagnostics, 1000);
    });
  }

  // Re-run on scroll to check if sections become visible
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      console.log('🔄 Re-checking after scroll...');
      checkSections();
    }, 500);
  }, { passive: true });

  // Expose function globally for manual testing
  window.runMobileDiagnostics = runDiagnostics;

  console.log('💡 Mobile Diagnostics loaded. Call window.runMobileDiagnostics() to run manually.');
})();

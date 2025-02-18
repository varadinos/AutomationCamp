import { test, expect } from '../setup/fixtures';

test('Measure Largest Contentful Paint (LCP)', async ({ advancedTopicsPage, page }) => {

  // Step 1: Measure Largest Contentful Paint (LCP)
  const largestContentfulPaint = await test.step('Measure Largest Contentful Paint', async () => {
    return await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        // Check if LCP has already been recorded before observer starts
        const existingEntries = performance.getEntriesByType('largest-contentful-paint');
        if (existingEntries.length > 0) {
          const lastEntry = existingEntries.at(-1);
          return resolve(lastEntry ? lastEntry.startTime : -1);
        }

        // Create PerformanceObserver to capture future LCP events
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries.at(-1);
          if (lastEntry) {
            observer.disconnect(); // Stop observing once we get LCP
            resolve(lastEntry.startTime);
          }
        });

        observer.observe({ type: 'largest-contentful-paint', buffered: true });

        // Timeout fallback if LCP is not recorded
        setTimeout(() => {
          observer.disconnect();
          resolve(-1); // Return -1 if no LCP found
        }, 5000);
      });
    });
  });

  // Step 2: Log & Validate LCP
  console.log(`Largest Contentful Paint: ${largestContentfulPaint} ms`);

  expect(largestContentfulPaint).toBeGreaterThan(0); // Ensure LCP is measured
  expect(largestContentfulPaint).toBeLessThan(2000); // Ensure LCP is within threshold
});
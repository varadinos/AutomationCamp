/* Helper function that extracts and returns a set of unique, valid links from a Playwright page, filtering out 
invalid or unwanted URLs. */

import { Page } from "@playwright/test";

export class LinksChecker {
 static async getAllLinksFromPage(page: Page): Promise<Set<string>> {
  console.log("Finding all links on the page.");

  const links = page.getByRole("link");
  const allLinks = await links.all();
  console.log(`Found ${allLinks.length} link elements.`);

  console.log("Extracting href attributes.");
  const allLinkHrefs = await Promise.all(
    allLinks.map(async (link, index) => {
      const href = await link.getAttribute("href");
      console.log(`Link ${index + 1}: ${href || "[No href found]"}`);
      return href;
    })
  );

  console.log("Validating and filtering links.");
  const validHrefs = allLinkHrefs.reduce((links, link, index) => {
    if (!link) {
      console.warn(`Link ${index + 1} has no href!`);
      return links;
    }

    if (link.startsWith("mailto:") || link.startsWith("#")) {
      console.log(`Skipping unwanted link: ${link}`);
      return links;
    }

    const absoluteURL = new URL(link, page.url()).href;
    console.log(`Valid link added: ${absoluteURL}`);
    links.add(absoluteURL);

    return links;
  }, new Set<string>());

  console.log(`Total valid links found: ${validHrefs.size}`);
  return validHrefs;
}
}
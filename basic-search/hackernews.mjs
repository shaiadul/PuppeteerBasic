import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";

export default async function getLink() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://hn.algolia.com/");

  await page.waitForSelector(".SearchInput");
  await page.type(".SearchInput", "javascript", { delay: 100 });
  await page.keyboard.press("Enter");
  await page.screenshot({ path: "data/show-hn.png" });

  const links = await page.evaluate(() => {
    return [...document.querySelectorAll(".Story_title a:first-child")].map(
      (el) => el.href
    );
  });
  // console.log(links);
  await browser.close();
  return links;
}

import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";

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

for (const link of links) {
  const newPage = await browser.newPage();
  await newPage.goto(link);
  await newPage.waitForSelector(".comment");
  const comments = await newPage.evaluate(() => {
    return [...document.querySelectorAll(".comment")].map((el) => el.innerText);
  });
  console.log(link, comments);
  await newPage.close();

  await setTimeout(1000);
}

await browser.close();

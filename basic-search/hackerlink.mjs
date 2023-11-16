import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";
import Sentiment from "sentiment"; // npm i sentiment

const browser = await puppeteer.launch({
  headless: false,
});

async function getSentiment(text) {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);
  return result;
}

export default async function HNComment(link) {
  const newPage = await browser.newPage();
  await newPage.goto(link);
  await newPage.waitForSelector(".comment");
  const comments = await newPage.evaluate(() => {
    return [...document.querySelectorAll(".comment")].map((el) => el.innerText);
  });

  await newPage.close();
  return comments;
}

const links = [
  "https://news.ycombinator.com/item?id=3742902",
  "https://news.ycombinator.com/item?id=3742803",
  "https://news.ycombinator.com/item?id=3742874",
];

for (let link of links) {
  await setTimeout(2000);
  const comments = await HNComment(link);
  const sentiment = await getSentiment(comments.join(" "));
  console.log(sentiment);
}

await browser.close();

import getLink from "./hackernews.mjs";
import PQueue from "p-queue"; //npm i p-queue
import { setTimeout } from "timers/promises";
import HNComment, { getSentiment } from "./hackerlink.mjs";

const LinkQueue = new PQueue({ concurrency: 2 });
const links = await getLink();

for (const link of links) {
  LinkQueue.add(async () => {
    await setTimeout(4000);
    const comments = await HNComment(link);
    const sentiment = await getSentiment(comments.join(" "));
    console.log(sentiment);
  });
}

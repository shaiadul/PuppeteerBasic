import PQueue from "p-queue"; //npm i p-queue
import { setTimeout } from "timers/promises";

const queue = new PQueue({ concurrency: 2 });

queue.add(async () => {
  await setTimeout(2000);
  console.log(Date.now());
});

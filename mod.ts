import PQueue from "p_queue/mod.ts";
import { readLines } from "std/io/mod.ts";

const queue = new PQueue({ concurrency: 20 });

const downloader = async (videoId: string) => {
  const process = Deno.run({
    cmd: ["yt-dlp", `https://www.nicovideo.jp/watch/${videoId}`, "-q", "-o", `./downloads/${videoId}.%(ext)s`],
  });
  await process.status();
};

for await (const line of readLines(Deno.stdin)) {
  console.log(line);
  queue.add(() => downloader(line));
}

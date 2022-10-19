import PQueue from "p_queue/mod.ts";

const allIds: string[] = await fetch("https://all-nicovideos-in-scrapbox.deno.dev/sno2wman").then((v) => v.json());

const downloader = async (videoId: string) => {
  const process = Deno.run({
    cmd: ["yt-dlp", `https://www.nicovideo.jp/watch/${videoId}`, "-o", `./downloads/${videoId}.%(ext)s`],
  });
  await process.status();
};

const queue = new PQueue({ concurrency: 20 });
queue.addEventListener("next", () => {
  console.log(`Task is added.  Size: ${queue.size}  Pending: ${queue.pending}`);
});
for (const id of allIds) {
  queue.add(() => downloader(id));
}

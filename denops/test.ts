import { getItem } from "./@ddu-sources/rss/convertRssToItem.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("get rss and convert to itemList", async () => {
    const urls: string[] = [
        "https://www.feedforall.com/files/sample.xml",
        "https://www.feedforall.com/files/sample-feed.xml",
    ];
    const param = { urls };
    const act = await getItem(param);
    
    const rssItem1Title = "RSS Solutions for Restaurants";
    const rssItem1Url = "http://www.feedforall.com/restaurant.htm";
    assertEquals(act[0].word, rssItem1Title);
    assertEquals(act[0].action?.url, rssItem1Url);
    
    const rssFinalTitle = "Recommended Web Based Feed Reader Software";
    const rssFinalUrl = "http://www.feedforall.com/feedforall-partners.htm";
    assertEquals(act[act.length-1].word, rssFinalTitle);
    assertEquals(act[act.length-1].action?.url, rssFinalUrl);
});

Deno.test("[kind test] create shell command", () => {});
Deno.test("[kind test] create vimscript snnipet", () => {});
Deno.test("[kind test] convert and display markdown", () => {});

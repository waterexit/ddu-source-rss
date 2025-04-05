import { type Item } from "jsr:@shougo/ddu-vim@~6.1.0/types";
import {
    Feed,
    FeedEntry,
    parseFeed,
} from "https://deno.land/x/rss@1.1.2/mod.ts";
import { type ActionData } from "../../@ddu-kinds/page.ts";
import { type Params } from "../rss.ts";

const getFeed = (urls: string[]): Promise<Feed[]> => {
    const promiseList = urls.map(async (url) => {
        const response = await fetch(url);
        const xml = await response.text();

        return await parseFeed(xml);
    });
    return Promise.all(promiseList);
};

const convertFeedToItems = (
    feed: Feed,
    cmd?: string,
): Item<ActionData>[] => {
    const convertEntryToItem = (entry: FeedEntry): Item<ActionData> => {
        return {
            isTree: false,
            word: entry.title?.value || "",
            action: {
                url: entry.links[0].href,
                description: entry.description?.value,
                cmd: cmd,
            },
        };
    };
    return feed.entries.map((e) => convertEntryToItem(e));
};

export const getItem = async (
    sourceParams: Params,
): Promise<Item<ActionData>[]> => {
    const feedList = await getFeed(sourceParams.urls);
    return feedList.flatMap((feed) =>
        convertFeedToItems(feed, sourceParams.cmd)
    );
};

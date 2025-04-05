import {
    type DduOptions,
    type Item,
    type SourceOptions,
} from "jsr:@shougo/ddu-vim@~6.1.0/types";
import { BaseSource } from "jsr:@shougo/ddu-vim@~6.1.0/source";
import { type ActionData } from "jsr:@water1120/ddu-kind-page";
import { getItem } from "./rss/convertRssToItem.ts"
import type { Denops } from "jsr:@denops/core@~7.0.0";

export type Params = {
    urls: string[];
    cmd: string;
};

export class Source extends BaseSource<Params> {
    override kind = "page";

    override gather(args: {
        denops: Denops;
        options: DduOptions;
        sourceOptions: SourceOptions;
        sourceParams: Params;
        input: string;
    }): ReadableStream<Item<ActionData>[]> {
        return new ReadableStream({
            async start(controller) {
                controller.enqueue(
                    await getItem(args.sourceParams)
                );
                controller.close();
            },
        });
    }

    override params(): Params {
        return { 
            urls: ["https://zenn.dev/feed"] ,
            cmd: "ddu#kind#page#open_default",
        };
    }
}

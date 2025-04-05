import {
    type ActionArguments,
    ActionFlags,
    type DduItem,
    type PreviewContext,
    Previewer,
} from "jsr:@shougo/ddu-vim@~6.1.0/types";
import { BaseKind } from "jsr:@shougo/ddu-vim@~6.1.0/kind";

import type { Denops } from "jsr:@denops/core@~7.0.0";

export type ActionData = {
    url?: string;
    description?: string;
    cmd?: string;
};
export class Kind extends BaseKind<ActionData> {
    override actions: Record<
        string,
        (args: ActionArguments<ActionData>) => Promise<ActionFlags>
    > = {
        open: async (args: { denops: Denops; items: DduItem[] }) => {
            for (const item of args.items) {
                args.denops.call(item.action?.cmd, item.action?.url);
            }
            return Promise.resolve(ActionFlags.None);
        },
    };

    override async getPreviewer(args: {
        denops: Denops;
        item: DduItem;
        actionParams: ActionData;
        previewContext: PreviewContext;
    }): Promise<Previewer | undefined> {
        const action = args.item.action as ActionData;
        if (!action) {
            return undefined;
        }

        return {
            kind: "terminal",
            cmds: `curl -s ${action.url} | html2text -utf8`,
        };
    }

    override params(): ActionData {
        return {
        };
    }
}

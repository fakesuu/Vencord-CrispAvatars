/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

export default definePlugin({
    name: "CrispAvatars",
    description: "Doubles the resolution of profile pictures globally for better sharpness.",
    authors: [{ name: "fakesuu", id: "824096447439437836" }],

    patches: [
        {
            // 1. Covers Chat and generic locations
            find: "getUserAvatarURL",
            replacement: {
                match: /getUserAvatarURL\s*[:=]?\s*(?:function)?\s*\(\s*([a-zA-Z0-9_]+)\s*,\s*([a-zA-Z0-9_]+)\s*\)\s*(?:=>)?\s*\{/g,
                replace: "$& if($2 && $2.size) { $2.size = Math.min($2.size * 2, 4096); } "
            }
        },
        {
            // 2. Covers specific Server avatars (Guild Members)
            find: "getGuildMemberAvatarURL",
            replacement: {
                match: /getGuildMemberAvatarURL\s*[:=]?\s*(?:function)?\s*\(\s*([a-zA-Z0-9_]+)\s*,\s*([a-zA-Z0-9_]+)\s*\)\s*(?:=>)?\s*\{/g,
                replace: "$& if($2 && $2.size) { $2.size = Math.min($2.size * 2, 4096); } "
            }
        },
        {
            // 3. Covers Member List, DMs, and Pop-up Profiles (User Class)
            find: "getAvatarURL",
            replacement: {
                match: /(getAvatarURL\s*\(\s*[a-zA-Z0-9_]+\s*,\s*)([a-zA-Z0-9_]+)(.*?\{)/g,
                replace: "$1$2$3 if(typeof $2 === 'number') { $2 = Math.min($2 * 2, 4096); } else if($2 && typeof $2.size === 'number') { $2.size = Math.min($2.size * 2, 4096); } "
            }
        }
    ]
});
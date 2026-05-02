/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

let observer: MutationObserver | null = null;
// Tracks processed elements in memory, completely invisible to Discord's React
let processedTracker = new WeakMap<Element, string>();

export default definePlugin({
    name: "CrispAvatars",
    description: "Safely increases the resolution of Avatars, Banners, and Icons by snapping to Discord's official supported sizes.",
    authors: [{ name: "fakesuu", id: "824096447439437836" }],
    
    patches: [],

    start() {
        // Discord's CDN only accepts these specific sizes. 
        // Sending unsupported sizes (like 960) results in broken images.
        const validSizes = [16, 32, 64, 128, 256, 300, 480, 512, 600, 1024, 2048, 4096];

        const getSafeSize = (current: number) => {
            // Specific rule to fix the 480px banner breaking at 960px
            if (current === 480) return 600;
            
            const target = current * 2;
            
            // Finds the first allowed size that is >= our doubled target
            for (const size of validSizes) {
                if (size >= target) return size;
            }
            return 4096; // Max fallback
        };

        const replaceSize = (str: string) => {
            return str.replace(/size=(\d+)/, (match, sizeStr) => {
                const currentSize = parseInt(sizeStr, 10);
                return `size=${getSafeSize(currentSize)}`;
            });
        };

        // Extracts the raw URL from the style string to avoid browser formatting issues
        const getUrlFromStyle = (styleStr: string) => {
            const match = styleStr.match(/url\(['"]?(https:\/\/cdn\.discordapp\.com[^'"]+)['"]?\)/);
            return match ? match[1] : null;
        };

        const fixImage = (el: Element) => {
            // 1. Fixes standard images (IMG) and SVGs (image)
            const src = el.getAttribute("src") || el.getAttribute("href");
            if (src && src.includes("cdn.discordapp.com") && src.includes("size=")) {
                // Prevents infinite loop by checking memory
                if (processedTracker.get(el) === src) return;

                const newSrc = replaceSize(src);
                if (src !== newSrc) {
                    processedTracker.set(el, newSrc);
                    if (el.tagName === "IMG") {
                        el.setAttribute("src", newSrc);
                    } else if (el.tagName === "image") {
                        el.setAttribute("href", newSrc);
                    }
                }
            }

            // 2. Fixes background images (Banners and Icons)
            const style = el.getAttribute("style");
            if (style && style.includes("cdn.discordapp.com") && style.includes("size=")) {
                const currentUrl = getUrlFromStyle(style);
                
                // If the raw URL matches what we generated, stop the loop!
                if (currentUrl && processedTracker.get(el) === currentUrl) return;

                const newStyle = replaceSize(style);
                if (style !== newStyle) {
                    const newUrl = getUrlFromStyle(newStyle);
                    if (newUrl) {
                        // We save only the raw URL, not the whole formatted style string
                        processedTracker.set(el, newUrl);
                    }
                    el.setAttribute("style", newStyle);
                }
            }
        };

        observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === "attributes") {
                    fixImage(mutation.target as Element);
                } 
                else if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const el = node as HTMLElement;
                            fixImage(el);
                            
                            const children = el.querySelectorAll("img, image, [style*='cdn.discordapp.com']");
                            children.forEach(fixImage);
                        }
                    });
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["src", "href", "style"]
        });

        document.querySelectorAll("img, image, [style*='cdn.discordapp.com']").forEach(fixImage);
    },

    stop() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        // Clears the memory tracker when the plugin is disabled
        processedTracker = new WeakMap();
    }
});

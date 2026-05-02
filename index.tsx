/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

let observer: MutationObserver | null = null;

export default definePlugin({
    name: "CrispAvatars",
    description: "Forces maximum resolution (4096px) for Avatars, Banners, and Icons by intercepting HTML directly.",
    authors: [{ name: "fakesuu", id: "824096447439437836" }],
    
    patches: [],

    start() {
        // Function that fixes the image link (now covers Banners and Backgrounds)
        const fixImage = (el: Element) => {
            // 1. Fixes standard images (IMG) and SVGs (image)
            const src = el.getAttribute("src") || el.getAttribute("href");
            if (src && src.includes("cdn.discordapp.com") && src.includes("size=")) {
                const newSrc = src.replace(/size=\d+/, "size=4096");
                if (src !== newSrc) {
                    if (el.tagName === "IMG") {
                        el.setAttribute("src", newSrc);
                    } else if (el.tagName === "image") {
                        el.setAttribute("href", newSrc);
                    }
                }
            }

            // 2. Fixes background images, heavily used in Banners and Icons
            const style = el.getAttribute("style");
            if (style && style.includes("cdn.discordapp.com") && style.includes("size=")) {
                const newStyle = style.replace(/size=\d+/, "size=4096");
                if (style !== newStyle) {
                    el.setAttribute("style", newStyle);
                }
            }
        };

        // The Observer watches the application's HTML in real-time
        observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                // If an attribute changes (src, href, or style)
                if (mutation.type === "attributes") {
                    fixImage(mutation.target as Element);
                } 
                // If a new element appears on the screen
                else if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const el = node as HTMLElement;
                            
                            // Attempts to fix the element itself
                            fixImage(el);
                            
                            // Searches for images or styled elements within the new block
                            const children = el.querySelectorAll("img, image, [style*='cdn.discordapp.com']");
                            children.forEach(fixImage);
                        }
                    });
                }
            }
        });

        // Starts the observer and tells it to pay attention to the 'style' tag as well
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["src", "href", "style"]
        });

        // Immediately fixes everything already on the screen when the plugin is activated
        document.querySelectorAll("img, image, [style*='cdn.discordapp.com']").forEach(fixImage);
    },

    stop() {
        // Disconnects the observer when disabling the plugin
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    }
});

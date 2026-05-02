# CrispAvatars for Vencord

A Vencord UserPlugin that safely increases the resolution of Avatars, Banners, and Server Icons by snapping to Discord's officially supported sizes. This results in an ultra-sharp appearance on high-resolution displays (supersampling effect) while keeping your client fast and avoiding the performance hits of loading raw 4K images everywhere.

## Features

* **Smart Scaling:** Intercepts Discord's image requests and doubles the requested size (e.g., 64px becomes 128px). It intelligently snaps to Discord's strict CDN size list (e.g., smoothly bumping 480px banners to 600px) to prevent broken images or rejected requests.
* **Global Enhancement:** Improves image quality across the board, including Avatars in chat/member lists, Profile Banners, and Background Icons.
* **Highly Optimized:** Uses an invisible memory tracker (`WeakMap`) instead of HTML attributes to prevent infinite rendering loops. This keeps the DOM clean and ensures the plugin remains entirely unnoticeable regarding performance.

## Installation

Since this is a custom UserPlugin, you need to be building Vencord from its source code. 

1. Open your terminal and navigate to your Vencord's `src` folder:

        cd path/to/Vencord/src

2. The `userplugins` folder isn't included by default. Create it if you haven't already, and navigate into it:

        mkdir userplugins
        cd userplugins

3. Clone this repository into a folder named `crispAvatars` (Note: Make sure the folder is named exactly `crispAvatars` to avoid build errors):

        git clone https://github.com/fakesuu/Vencord-CrispAvatars.git crispAvatars

4. Navigate back to the Vencord root folder:

        cd ../..

5. Open PowerShell in this root directory and run the build command (and inject if necessary):

        pnpm build
        pnpm inject

6. After the PowerShell commands finish successfully, open your Discord client and press `Ctrl + R` to reload it.

7. Go to **User Settings > Plugins**, search for **CrispAvatars**, and toggle it on!

## Disclaimer

This is an unofficial, community-made UserPlugin. It is not affiliated with, maintained, or endorsed by the official Vencord development team.

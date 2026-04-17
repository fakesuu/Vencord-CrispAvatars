# CrispAvatars for Vencord

A Vencord UserPlugin that forces Discord to load profile pictures at four times their default resolution. This results in an ultra-sharp appearance on high-resolution displays (supersampling effect) while maintaining a balance to avoid the extreme performance hits of loading raw 4K images everywhere.

## Features

* **Smart Supersampling:** Intercepts Discord's image requests and mathematically quadruples the requested size (e.g., 16px becomes 64px), up to the API limit of 4096px.
* **Global Enhancement:** Improves avatar quality in the chat, member list, DMs, and user pop-out profiles.
* **Optimized Performance:** Avoids the common mistake of forcing maximum resolution for every tiny icon, keeping your client fast and responsive.

## Known Limitations

Some specific UI elements (like the "Recent Avatars" or "Remove Avatar" confirmation modals) fetch raw, pre-formatted image URLs directly from Discord's servers, bypassing standard rendering functions. 

CrispAvatars intentionally ignores these specific elements. Attempting to force higher resolutions on these menus would require aggressive network interception or constant DOM observation, which would cause significant lag and break the plugin's performance-first approach.

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

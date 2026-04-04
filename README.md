# CrispAvatars for Vencord

A Vencord UserPlugin that forces Discord to load profile pictures at double their default resolution. This results in a much sharper and crisper appearance on high-resolution displays (like a Retina display effect) without causing the severe performance issues associated with loading raw 4K images globally.

## ✨ Features

* **Smart Supersampling:** Intercepts Discord's image requests and mathematically doubles the requested size (up to the API limit of 4096px).
* **Global Enhancement:** Improves avatar quality in the chat, member list, DMs, and user pop-out profiles.
* **Zero Lag:** Avoids the common mistake of loading massive original images everywhere, keeping your client fast, responsive, and light on RAM.

## 📦 Installation

Since this is a custom UserPlugin, you need to be building Vencord from its source code. 

1. Open your terminal and navigate to your Vencord's `src` folder:
   ```bash
   cd path/to/Vencord/src
   ```

2. The `userplugins` folder isn't included by default. Create it if you haven't already, and navigate into it:
   ```bash
   mkdir userplugins
   cd userplugins
   ```

3. Clone this repository into a folder named `crispAvatars`:
   ```bash
   git clone https://github.com/SeuUsuario/vencord-crisp-avatars.git crispAvatars
   ```
   *(Note: Make sure the folder is named exactly `crispAvatars` or matches the plugin name to avoid build errors).*

4. Navigate back to the Vencord root folder and build the client:
   ```bash
   cd ../..
   pnpm build
   ```

5. Reload Discord (`Ctrl + R`) or run `pnpm inject` if Vencord isn't injected yet.

6. Go to **User Settings > Plugins**, search for **CrispAvatars**, and toggle it on!

## ⚠️ Disclaimer

This is an unofficial, community-made UserPlugin. It is not affiliated with, maintained, or endorsed by the official Vencord development team.

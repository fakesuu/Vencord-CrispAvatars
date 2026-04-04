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

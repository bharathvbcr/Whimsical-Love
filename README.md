<div align="center">

<img src="public/logo.svg" alt="Whimsical Proposal Logo" width="200" />
</div>

**A beautiful, animated proposal website to ask your special someone the most important question.**

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Preview-ff6b9d?style=for-the-badge)](https://your-demo-link.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://github.com/yourusername)

</div>

---

## ✨ Features

- 🎬 **Cinematic Experience** - Auto-scroll, background music, and smooth transitions
- 📖 **Interactive Storybook** - Tell your love story page by page
- 💍 **Ring Box Animation** - A stunning 3D ring reveal before the big question
- 🖼️ **Photo Gallery** - Showcase your memories together
- 🎮 **Interactive Elements** - Quiz, scratch card, date night spinner
- 🚫 **Playful "No" Button** - It runs away when hovered!
- 🎊 **Celebration Mode** - Confetti explosion when she says YES!
- 🔧 **Fully Customizable** - Just edit one file to personalize everything

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/whimsical-proposal.git
cd whimsical-proposal

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see your proposal!

---

## 🎨 Personalization

The magic is in `content.ts` - **one file to customize everything!**

### 1. Add Your Names

```typescript
export const personalization = {
    partnerName: "Her Name",  // Appears throughout
    yourName: "Your Name",    // Signs the final message
    relationshipStartDate: "2022-06-15",
    specialMessage: "Your heartfelt message here..."
};
```

### 2. Add Your Photos

Place photos in `/public/photos/` and update:

```typescript
export const photoMemories = [
    { src: "/photos/first-date.jpg", caption: "Our first date", date: "June 2022" },
    { src: "/photos/vacation.jpg", caption: "That amazing trip", date: "Summer 2023" },
];
```

### 3. Customize Your Story

Edit the `storyPages`, `timelineEvents`, `promises`, `stickyNotes`, and more in `content.ts`.

### 4. Add Your Song

Replace the music URL with your special song:

```typescript
export const musicConfig = {
    url: "/music/our-song.mp3",  // Place in /public/music/
    label: "Our Song"
};
```

See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for the complete guide.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/whimsical-proposal)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/whimsical-proposal)

### Manual Build

```bash
npm run build
# Output is in /dist - upload to any static hosting
```

---

## 📁 Project Structure

```
whimsical-proposal/
├── public/
│   └── photos/          # Your photos go here
├── components/
│   ├── Hero.tsx         # Opening section
│   ├── StoryBook.tsx    # Interactive fairy tale
│   ├── PhotoGallery.tsx # Your memories
│   ├── RingBox.tsx      # Ring reveal animation
│   └── ProposalFooter.tsx # The big question!
├── content.ts           # ⭐ YOUR CONTENT HERE
├── App.tsx              # Main application
└── index.html           # Entry point
```

---

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Framer Motion** - Animations
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind-style CSS** - Styling

---

## 💝 Tips for the Perfect Proposal

1. **Personalize everything** - Replace all placeholder content with your real memories
2. **Test on her device** - Make sure it works on her phone/laptop beforehand
3. **Set the mood** - Choose a quiet moment when she can experience it fully
4. **Have the ring ready** - The ring box animation is even better with the real thing!

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

---

## 📄 License

MIT License - feel free to use this for your own proposal! See [LICENSE](./LICENSE) for details.

---

<div align="center">

**Made with 💕 for love stories everywhere**

*"The best thing to hold onto in life is each other."* — Audrey Hepburn

</div>

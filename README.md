<div align="center">

<img src="public/logo.svg" alt="Whimsical Proposal Logo" width="200" />
</div>

**A beautiful, animated proposal website to ask your special someone the most important question.**

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Preview-ff6b9d?style=for-the-badge)](https://whimsical-love.web.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://github.com/bharathvbcr)
[![Animations](https://img.shields.io/badge/Animations-60FPS%20Smooth-8b5cf6?style=for-the-badge)](https://www.framer.com/motion/)

</div>

---

## ✨ Features

- 🎬 **Cinematic Experience** - Autoplay Magic with cinematic auto-scroll powered by **Lenis** for buttery-smooth inertia scrolling.
- 📱 **Installable App (PWA)** - Works offline! Install it to your home screen for the perfect proposal anywhere.
- 📖 **Interactive Storybook** - Tell your love story page by page with smooth animations
- 🗺️ **Journey Map** - Visualize the winding path of your relationship with custom milestones
- 🎮 **Mini-Games & Interactivity** - Love Quiz, Date Night Spinner, and Scratch Card
- 🌿 **Digital Garden** - A growing section of your shared qualities and memories
- 💍 **Ring Box Animation** - A stunning 3D ring reveal before the big question
- 🖼️ **Photo Gallery** - Showcase your memories in a beautiful, responsive grid
- 🚫 **Playful "No" Button** - It struggles and runs away when hovered!
- ⌨️ **Konami Code Surprise** - Try `↑ ↑ ↓ ↓ ← → ← → b a` for a special treat!
- 🎊 **Celebration Mode** - Confetti explosion and special message when she says YES!
- 🎨 **Dynamic Themes** - Easily switch between color themes (rose, midnight, sunset, forest)
- 🧙 **Setup Wizard** - Create your proposal in minutes with `npm run setup`
- 🔧 **Fully Customizable** - Edit one single file to personalize the entire experience

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/bharathvbcr/Whimsical-Love.git
    cd Whimsical-Love
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the Setup Wizard:**
    This interactive tool will help you customize names, dates, and themes quickly.

    ```bash
    npm run setup
    ```

4. **Start the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:5173](http://localhost:5173) in your browser to verify the setup.

---

## 🎨 Customization

You have two main ways to personalize the experience:

### Option A: The Setup Wizard (Recommended)

Run `npm run setup` in your terminal. This wizard guides you through setting:

- Partner's Name & Your Name
- Key Dates (Start of relationship, Proposal date)
- Color Theme
- Song Selection

It generates a `proposal.config.json` file in the `public/` directory.

### Option B: Advanced Customization (`content.ts`)

For deeper customization (adding photos, specific milestones, quiz questions), edit `content.ts`. This file serves as the central configuration for the app content.

**Key areas to customize:**

1. **Personal Details**: Update `personalization` object.
2. **Theme**: Change `themeConfig`.
3. **Photos**: Add images to `public/photos/` and update `photoMemories`.
4. **Story**: Edit `journeyMilestones`, `storyPages`, `stickyNotes`, etc.
5. **Music**: Place your song in `public/music/` and update `musicConfig`.

Refer to [CUSTOMIZATION.md](./CUSTOMIZATION.md) for a comprehensive guide.

---

## 🔥 Firebase Setup (Optional)

To enable features like shareable links and usage analytics, configure Firebase:

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Register a Web App and copy the configuration.
3. Update `lib/firebase.ts` with your config keys.

    > **Security Note:** Ideally, use environment variables (`.env`) for these keys in a production environment to keep them secure.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bharathvbcr/Whimsical-Love)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/bharathvbcr/Whimsical-Love)

### Manual Build

To build the project for static hosting:

```bash
npm run build
```

The output will be in the `dist/` directory, ready to be uploaded to any static hosting service.

---

## 📁 Project Structure

```
whimsical-proposal/
├── public/              # Static assets (photos, music, logo)
├── components/          # Reusable UI components
│   ├── Hero.tsx         # Opening cinematic section
│   ├── StoryBook.tsx    # Interactive fairy tale book
│   ├── JourneyMap.tsx   # Interactive relationship path
│   ├── LoveQuiz.tsx     # Playful relationship quiz
│   ├── RingBox.tsx      # 3D Ring reveal animation
│   └── ProposalFooter.tsx # The big question & celebration
├── content.ts           # ⭐ YOUR CONTENT CONFIGURATION
├── App.tsx              # Main application logic
├── index.tsx            # React entry point
└── tailwind.config.js   # Style configuration
```

---

## 🛠️ Tech Stack

- **React 19** - Modern UI Library
- **Framer Motion** - Production-ready animation library for React
- **Lenis** - High-performance smooth scrolling for that "cinematic" feel
- **Lucide React** - Beautiful, consistent iconography
- **Firebase** - Optional backend for sharing/analytics
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Modern styling utility

---

## 💝 Tips for the Perfect Proposal

1. **Personalize everything** - Replace all placeholder content with your real memories
2. **Test on her device** - Make sure it works on her phone/laptop beforehand
3. **Set the mood** - Choose a quiet moment when she can experience it fully
4. **Have the ring ready** - The ring box animation is even better with the real thing!

---

## 🤝 Contributing

We welcome contributions! If you have ideas for new animations, features, or themes:

1. **Fork** the repository.
2. **Clone** your fork locally.
3. **Create a new branch** (`git checkout -b feature/AmazingFeature`).
4. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
5. **Push** to the branch (`git push origin feature/AmazingFeature`).
6. **Open a Pull Request**.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more detailed guidelines.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

---

<div align="center">

**Made with 💕 for love stories everywhere**

*"The best thing to hold onto in life is each other."* — Audrey Hepburn

</div>

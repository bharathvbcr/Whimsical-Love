# 📝 Customization Guide

This guide walks you through personalizing every aspect of your proposal website.

---

## 🏁 Getting Started

All customization happens in **one file**: `content.ts`

```bash
# Open the file in your editor
code content.ts  # or open with any text editor
```

---

## 💕 Step 1: Add Your Names

At the top of `content.ts`, find the `personalization` object:

```typescript
export const personalization = {
    // Her name - appears in the proposal and celebration
    partnerName: "Sarah",
    
    // Your name - signs the final message
    yourName: "James",
    
    // When you started dating (YYYY-MM-DD format)
    relationshipStartDate: "2022-06-15",
    
    // Leave empty to hide countdown, or set your proposal date
    proposalDate: "",
    
    // Your closing message after she says YES
    specialMessage: "I promise to never leave you...",
    
    // Hero subtitle phrases that rotate
    heroSubtitles: [
        "time stood still.",
        "I saw my future.",
        "I knew you were the one.",
        "my heart beat for you."
    ],
};
```

---

## 📸 Step 2: Add Your Photos

### 1. Create the photos folder

```bash
mkdir -p public/photos
```

### 2. Add your photos

Copy your photos to `/public/photos/`. Recommended:

- 4-8 photos work best
- Square or portrait orientation
- Good quality but optimize for web (under 500KB each)

### 3. Update content.ts

```typescript
export const photoMemories = [
    { 
        src: "/photos/first-date.jpg", 
        caption: "Our first coffee date", 
        date: "June 15, 2022" 
    },
    { 
        src: "/photos/vacation.jpg", 
        caption: "That magical weekend getaway", 
        date: "Summer 2023" 
    },
    { 
        src: "/photos/concert.jpg", 
        caption: "Dancing at our favorite band's show" 
    },
    { 
        src: "/photos/proposal-day.jpg", 
        caption: "Today - the most important question" 
    },
];
```

---

## 📖 Step 3: Write Your Story

### Storybook Pages

The fairy tale introduction - make it personal!

```typescript
export const storyPages: StoryPage[] = [
    { id: 0, text: "", isCover: true },
    { id: 1, text: "\"It was a Tuesday when everything changed...\"" },
    { id: 2, text: "\"I saw you laughing at the coffee shop, and my heart skipped.\"" },
    { id: 3, text: "\"From that moment, I knew my life would never be the same.\"" },
    { id: 4, text: "\"And every day since, I've fallen more in love with you.\"" },
    { id: 5, text: "You are my forever.", isEnding: true },
];
```

### Memory Timeline

Key moments in your relationship:

```typescript
export const timelineEvents: TimelineEvent[] = [
    {
        icon: Eye,
        date: "June 15, 2022",
        title: "First Meeting",
        desc: "At the coffee shop downtown. You were reading that book I love.",
        align: 'left',
    },
    {
        icon: Heart,
        date: "July 4, 2022",
        title: "Our First Kiss",
        desc: "Under the fireworks. I'll never forget that moment.",
        align: 'right',
    },
    // Add more...
];
```

---

## 🎵 Step 4: Add Your Song

### Option A: Local file

1. Add your song to `/public/music/`
2. Update content.ts:

```typescript
export const musicConfig = {
    url: "/music/our-song.mp3",
    label: "Our Song - Artist Name",
};
```

### Option B: External URL

Use a direct link to an MP3 file (ensure it's legally available):

```typescript
export const musicConfig = {
    url: "https://example.com/song.mp3",
    label: "Our Song",
};
```

---

## 🎨 Step 5: Change Theme (Optional)

```typescript
export const themeConfig = {
    primaryColor: "rose",    // rose, purple, blue, amber, emerald
    accentColor: "rose",
};
```

---

## ✍️ Step 6: Customize Details

### Sticky Notes

Little things you love about them:

```typescript
export const stickyNotes: StickyNote[] = [
    { text: "The way you laugh at my bad jokes", color: "bg-yellow-100", rotate: -6 },
    { text: "Your amazing cooking", color: "bg-rose-100", rotate: 4 },
    // Add more...
];
```

### Promises/Vows

Your commitments to her:

```typescript
export const promises: Promise[] = [
    {
        icon: Shield,
        title: "To Protect You",
        text: "I promise to always be your safe space..."
    },
    // Add more...
];
```

### Journey Milestones

Points on your relationship map:

```typescript
export const journeyMilestones: JourneyMilestone[] = [
    { icon: Zap, label: "First Date", x: 20, y: 10, color: "bg-amber-100 text-amber-600" },
    // Adjust x (0-100) and y (0-100) to position on the map
];
```

---

## ✅ Checklist Before Sharing

- [ ] All placeholder names replaced with real names
- [ ] Photos added and displaying correctly
- [ ] Story reflects your actual journey
- [ ] Music plays correctly
- [ ] Tested on mobile
- [ ] Tested on her preferred browser
- [ ] Link works when shared

---

## 💡 Pro Tips

1. **Test everything** before sharing the link
2. **Use her favorite colors** in the theme
3. **Include inside jokes** in sticky notes
4. **Time your music** - find a song that matches the scroll duration
5. **Keep the ring box moment** for maximum impact

---

**Good luck! 💍❤️**

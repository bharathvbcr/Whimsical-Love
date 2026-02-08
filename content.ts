/**
 * ========================================
 * WHIMSICAL PROPOSAL - CONTENT CONFIGURATION
 * ========================================
 * 
 * Edit this file to customize YOUR proposal story.
 * All content visible in the app is sourced from here.
 */

import { LucideIcon, Zap, Heart, Compass, Music, Infinity, Eye, Shield, Anchor } from 'lucide-react';

// ==========================================
// PERSONALIZATION - START HERE! ✨
// ==========================================

/**
 * 💕 YOUR NAMES - The most important part!
 */
export const personalization = {
    /** Your partner's name (appears throughout the experience) */
    partnerName: "Sarah",

    /** Your name (for signing messages) */
    yourName: "James",

    /** When did you meet/start dating? (used in TimeSection) */
    relationshipStartDate: "2022-06-15",

    /** The big day! Leave empty to hide countdown */
    proposalDate: "",

    /** Your special closing message after "She Said Yes" */
    specialMessage: "I promise to never leave you. To love you through the seasons, to grow old by your side, and to cherish every single moment. You are my forever.",

    /** Customize the hero subtitle phrases */
    heroSubtitles: [
        "time stood still.",
        "I saw my future.",
        "I knew you were the one.",
        "my heart beat for you."
    ],
};

/**
 * 🎨 THEME - Customize your colors
 * Primary options: 'rose' | 'purple' | 'blue' | 'amber' | 'emerald'
 */
export const themeConfig = {
    primaryColor: "rose",  // Main color throughout
    accentColor: "rose",   // Button and highlight color
};

/**
 * 📸 YOUR PHOTOS - Add your memories!
 * Place photos in /public/photos/ folder
 * 
 * Example:
 * { src: "/photos/first-date.jpg", caption: "Our first date", date: "June 2022" }
 */
export const photoMemories: { src: string; caption: string; date?: string }[] = [
    { src: "/photos/placeholder-1.jpg", caption: "Replace with your first photo!", date: "Your date" },
    { src: "/photos/placeholder-2.jpg", caption: "Add a caption for each memory", date: "" },
    { src: "/photos/placeholder-3.jpg", caption: "She'll love seeing your journey", date: "" },
    { src: "/photos/placeholder-4.jpg", caption: "Every photo tells a story", date: "" },
];

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface JourneyMilestone {
    icon: LucideIcon;
    label: string;
    x: number; // Percentage position (0-100)
    y: number; // Percentage position (0-100)
    color: string; // Tailwind bg + text color classes
}

export interface StoryPage {
    id: number;
    text: string;
    isCover?: boolean;
    isEnding?: boolean;
}

export interface TimelineEvent {
    icon: LucideIcon;
    date: string;
    title: string;
    desc: string;
    align: 'left' | 'right';
}

export interface Promise {
    icon: LucideIcon;
    title: string;
    text: string;
}

export interface StickyNote {
    text: string;
    color: string; // Tailwind bg color class
    rotate: number; // Rotation in degrees
    x?: string; // CSS position for desktop
    y?: string; // CSS position for desktop
}

export interface Quality {
    title: string;
    text: string;
    iconName: 'HeartHandshake' | 'Smile' | 'Star' | 'Sun';
    rotation: number;
    isHighlight?: boolean;
}

export interface MusicConfig {
    url: string;
    label: string;
}

// ==========================================
// YOUR CONTENT - CUSTOMIZE BELOW
// ==========================================

/**
 * JOURNEY MAP - The winding path of your relationship
 * Adjust x/y (0-100) to position milestones on the map.
 */
export const journeyMilestones: JourneyMilestone[] = [
    { icon: Zap, label: "The Spark", x: 20, y: 10, color: "bg-amber-100 text-amber-600" },
    { icon: Infinity, label: "Inseparable", x: 80, y: 30, color: "bg-blue-100 text-blue-600" },
    { icon: Heart, label: "The Confession", x: 30, y: 55, color: "bg-rose-100 text-rose-600" },
    { icon: Compass, label: "First Adventure", x: 70, y: 75, color: "bg-green-100 text-green-600" },
    { icon: Music, label: "Found Our Rhythm", x: 50, y: 95, color: "bg-purple-100 text-purple-600" },
];

/**
 * STORYBOOK - The fairy tale introduction
 * The first page is the cover, last page is the ending.
 */
export const storyPages: StoryPage[] = [
    { id: 0, text: "", isCover: true },
    { id: 1, text: "\"Once upon a time, in a world that felt a little too grey...\"" },
    { id: 2, text: "\"...a boy saw a girl across the room, and his heart whispered, 'There she is.'\"" },
    { id: 3, text: "\"Suddenly, all the love songs made sense.\"" },
    { id: 4, text: "\"And he realized that his favorite place in the world...\"" },
    { id: 5, text: "...was right beside her.", isEnding: true },
];

/**
 * MEMORY TIMELINE - Key moments in your history
 */
export const timelineEvents: TimelineEvent[] = [
    {
        icon: Eye,
        date: "The First Sight",
        title: "Time Stopped",
        desc: "I remember exactly where you were standing. The noise of the world faded, and all I could see was you.",
        align: 'left',
    },
    {
        icon: Zap,
        date: "The First Hello",
        title: "Instant Connection",
        desc: "You smiled, and I was a goner. It felt like I had known you for a thousand lifetimes in a single second.",
        align: 'right',
    },
    {
        icon: Heart,
        date: "The First Date",
        title: "Falling Fast",
        desc: "There was no hesitation, no doubt. Just the overwhelming certainty that I had found my soulmate.",
        align: 'left',
    },
    {
        icon: Infinity,
        date: "Today",
        title: "Forever",
        desc: "That instant spark turned into an eternal flame. I love you more with every passing second.",
        align: 'right',
    },
];

/**
 * PROMISES / VOWS - Your commitments
 */
export const promises: Promise[] = [
    {
        icon: Shield,
        title: "To Protect You",
        text: "I promise to be your safe space, your shelter from the storm, and the hand you can always hold."
    },
    {
        icon: Anchor,
        title: "To Stay",
        text: "I'm not just here for the good times. I promise to stand by you when life gets hard. I'm never leaving."
    },
    {
        icon: Infinity,
        title: "Forever",
        text: "From that first glance to our last breath. My love for you isn't just for now; it's for always."
    }
];

/**
 * STICKY NOTES - Little things you love about them
 */
export const stickyNotes: StickyNote[] = [
    { text: "The way you scrunch your nose when you laugh", color: "bg-yellow-100", rotate: -6, x: "10%", y: "5%" },
    { text: "Your obsession with finding the perfect coffee spot", color: "bg-rose-100", rotate: 4, x: "40%", y: "15%" },
    { text: "How you always know exactly what to say", color: "bg-blue-100", rotate: -3, x: "70%", y: "10%" },
    { text: "Our late-night conversations about absolutely nothing", color: "bg-purple-100", rotate: 8, x: "20%", y: "45%" },
    { text: "That time we got caught in the rain and just danced", color: "bg-green-100", rotate: -5, x: "55%", y: "40%" },
    { text: "Your delightfully chaotic playlist (just like you)", color: "bg-orange-100", rotate: 3, x: "80%", y: "55%" },
    { text: "How you make long car rides feel like adventures", color: "bg-pink-100", rotate: -8, x: "15%", y: "75%" },
    { text: "The way you appreciate the simple things", color: "bg-emerald-100", rotate: 6, x: "50%", y: "70%" },
];

/**
 * QUALITIES - What makes them special
 */
export const qualities: Quality[] = [
    {
        title: "Saint-like Understanding",
        text: "In a world that rushes to judge, you pause to understand. It's a rare superpower these days, honestly.",
        iconName: 'HeartHandshake',
        rotation: -2,
    },
    {
        title: "Unwavering Positivity",
        text: "Your light doesn't just shine; it warms everyone around you. You turn grey skies into rose gold sunsets.",
        iconName: 'Smile',
        rotation: 1,
    },
    {
        title: "Pure Dedication",
        text: "Whatever you touch, you pour your whole heart into. It's inspiring to watch you be you.",
        iconName: 'Star',
        rotation: -1,
    },
    {
        title: "Radiant Soul",
        text: "You carry a sunshine that brightens even the darkest corners. Your energy is simply infectious.",
        iconName: 'Sun',
        rotation: 0,
        isHighlight: true,
    },
];

/**
 * MUSIC CONFIGURATION
 * Replace with YOUR song (local file in /public or a stable URL).
 */
export const musicConfig: MusicConfig = {
    url: "https://cdn.pixabay.com/download/audio/2022/02/10/audio_fc8c83a77b.mp3?filename=piano-moment-11634.mp3",
    label: "Our Song",
};

#!/usr/bin/env node

import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    { key: 'partnerName', question: "What is your partner's name? ", default: "Sarah" },
    { key: 'yourName', question: "What is your name? ", default: "James" },
    { key: 'relationshipStartDate', question: "When did you first meet? (YYYY-MM-DD): ", default: "2022-06-15" },
    { key: 'primaryColor', question: "Pick a theme (rose, midnight, sunset, forest): ", default: "rose" },
    { key: 'specialMessage', question: "Enter your closing 'She Said Yes' message: ", default: "You are my forever." },
];

const config = {
    personalization: {},
    themeConfig: {},
    musicConfig: {
        url: "https://cdn.pixabay.com/download/audio/2022/02/10/audio_fc8c83a77b.mp3?filename=piano-moment-11634.mp3",
        label: "Our Song"
    }
};

async function askQuestions() {
    console.log("\n✨ WHIMSICAL PROPOSAL SETUP WIZARD ✨\n");

    for (const q of questions) {
        const answer = await new Promise(resolve => {
            rl.question(`${q.question} [${q.default}]: `, resolve);
        });

        const finalValue = answer || q.default;

        if (q.key === 'primaryColor') {
            config.themeConfig.primaryColor = finalValue;
            config.themeConfig.accentColor = finalValue;
        } else {
            config.personalization[q.key] = finalValue;
        }
    }

    config.personalization.heroSubtitles = [
        "time stood still.",
        "I saw my future.",
        "I knew you were the one.",
        "my heart beat for you."
    ];

    try {
        fs.writeFileSync('proposal.config.json', JSON.stringify(config, null, 4));
        console.log("\n✅ Success! proposal.config.json has been created.");
        console.log("Next: I'm updating content.ts to use this config if you import it.\n");
    } catch (err) {
        console.error("Error writing config file:", err);
    }

    rl.close();
}

askQuestions();

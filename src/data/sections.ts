export interface SectionOption {
    name: string;
    emoji: string;
}

export interface SectionConfig {
    key: string;
    title: string;
    subtitle: string;
    isSecret?: boolean;
    options?: SectionOption[];
}

export const SECTIONS: SectionConfig[] = [
    {
        key: "photobox",
        title: "📸 Photobox Time!",
        subtitle: "Pick your favorite photobox spot!",
        options: [
            { name: "Photoplace (Tentrem)", emoji: "📷" },
            { name: "Snapobox (APK Unika)", emoji: "📷" },
            { name: "Photoplace (Serambi)", emoji: "📷" },
        ],
    },
    {
        key: "secret",
        title: "🤫 Secret Activity",
        subtitle: "Guess where are we going?",
        isSecret: true,
    },
    {
        key: "dinner",
        title: "🍽️ Dinner Date",
        subtitle: "Time to refuel with something delicious!",
        options: [
            { name: "At First Date", emoji: "💕" },
            { name: "Flevor", emoji: "👌🏻" },
            { name: "One Day Atelier", emoji: "💯" },
        ],
    },
    {
        key: "dessert",
        title: "🍰 Sweet Ending",
        subtitle: "End the night on a sweet note!",
        options: [
            { name: "Desserts Here!", emoji: "🍫" },
            { name: "Go Out Searching Sweets Outside", emoji: "�" },
            { name: "I'M FULL ALREADY", emoji: "😴" },
        ],
    },
];

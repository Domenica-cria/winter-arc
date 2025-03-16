export interface IGuild {
    id: "band_of_the_hawk" | "apostles" | "midland_legions" | "berserkers";
    name: string;
    description: string;
    bonuses: any;
    members: string[];
}

export interface IEvent {
    id: string;
    name: string;
    description: string;
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    reward: any;
}

export interface IUser {
    _id: string;
    name: string;
    password: string;
    guildId?: string;
    level: number;
    xp: number;
    streak: number;
    inventory: any[];
    completedChallenges: any[];
}

export interface IHabit {
    _id: string;
    title: string;
    userId: string;
    category: HabitCategory;
    streak: number;
    recurrence: "daily" | "weekly" | "monthly" | "yearly";
}

export type HabitCategory = 'mind' | 'body' | 'social' | 'financial'


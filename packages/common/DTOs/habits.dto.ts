interface HabitDTO {
    title: string;
    category: string;
    difficulty: number;
    frequency: "daily" | "weekly";
    consequenceEnabled: boolean;
}

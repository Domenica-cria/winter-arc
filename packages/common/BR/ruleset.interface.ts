export interface RuleSetConfig {
    version: string;
    guild: GuildRules;
    habit: HabitRules;
    user: UserRules;
    events: EventRules;
}

export interface GuildRules {
    max_members: number;
    xp_per_member: number;
    level_threshold: number;
}

export interface HabitRules {
    max_daily_tasks: number;
    streak_consequences: {
        failure_penalty: number;
        grace_period: number;
    };
}

export interface UserRules {
    initial_xp: number;
    max_guilds: number;
}

export interface EventRules {
    eclipse: {
        duration: number;
        reward_multiplier: number;
    };
}

export enum AI_type {
    Random, StepAhead, Perfect
}

export class NimGame {
    total: number;
    taken: number;
    ai_type: AI_type;
    last_player_loses: boolean;
    game_over: boolean;
    player_starts: boolean;
    player_wins: boolean;

    constructor(count: number, ai_type: AI_type, player_starts: boolean, last_player_loses: boolean) {
        this.total = count;
        this.taken = 0;
        this.ai_type = ai_type;
        this.last_player_loses = last_player_loses;
        this.game_over = false;
        this.player_wins = true;
        this.player_starts = player_starts;
    }

    player_move(count: number) {
        this.taken += count;
        if (this.taken >= this.total) {
            this.player_wins = !this.last_player_loses;
            this.game_over = true;
        }
    }

    ai_move() {
        var taken;
        switch (this.ai_type) {
            case AI_type.Perfect:
                taken = (this.total - this.taken - (this.last_player_loses as unknown as number)) % 4;
                if (taken) break;
            case AI_type.Random:
                taken = Math.floor(Math.random() * 3) + 1; 
                break;
            default:
                let p = this.total - this.taken - (this.last_player_loses as unknown as number);
                taken = p < 4 ? p : Math.floor(Math.random() * 3) + 1;
                break;
        }
        this.taken += taken;
        if (this.taken >= this.total) {
            this.player_wins = this.last_player_loses;
            this.game_over = true;
        }
    }
}
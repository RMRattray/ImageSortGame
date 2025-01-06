export enum AI_type {
    Random, StepAhead, Perfect
}

function best_choice(points: Array<number>) : Array<number> {
    let l = points.length;
    let best_choices = points.map(() => 0);
    let best_results = points.map(() => 0);
    best_choices[l-1] = 1;
    best_results[l-1] = points[-1];
    if (points[l-1] > 0) {
        best_choices[l-2] = 2;
        best_results[l-2] = points[l-1] + points[l-2]
    } else {
        best_choices[l-2] = 1;
        best_results[l-2] = points[l-2];
    }
    let i = l-3;
    while (i >= 0) {
        let bk = 1;
        let bv = 0;
        let v = 0;
        for (let k = 1; k <= 3; ++k) {
            v += points[i] + best_results[i + k - 1]
            v -= best_results[i + k]
            if (v >= bv) {
                bv = v;
                bk = k;
            }
        }
        best_choices[i] = bk;
        best_results[i] = bv;
        --i;
    }
    return best_choices
}

export class NiminGame {
    total: number;
    taken: number;
    ai_type: AI_type;
    game_over: boolean;
    player_starts: boolean;
    player_wins: boolean;
    player_score: number;
    ai_score: number;
    point_values: Array<number>
    best_choices: Array<number>
    ai_taken: Array<boolean>

    constructor(count: number, ai_type: AI_type, player_starts: boolean) {
        this.total = count;
        this.taken = 0;
        this.ai_type = ai_type;
        this.game_over = false;
        this.player_wins = true;
        this.player_starts = player_starts;
        this.player_score = 0;
        this.ai_score = 0;
        this.point_values = Array.from({length: count}, () => Math.floor(Math.random() * 19 - 9));
        this.best_choices = best_choice(this.point_values);
        this.ai_taken = Array(count).fill(false);
    }

    player_move(count: number) {
        this.player_score += this.point_values.slice(this.taken, this.taken + count).reduce( (p, c) => p + c);
        this.taken += count;
        if (this.taken >= this.total) {
            this.player_wins = this.player_score > this.ai_score;
            this.game_over = true;
        }
    }

    ai_move() {
        var taken;
        switch (this.ai_type) {
            case AI_type.Perfect:
                taken = this.best_choices[this.taken];
                break;
            case AI_type.Random:
                taken = Math.floor(Math.random() * 3) + 1; 
                break;
            default:
                taken = 1;
                if (this.total - this.taken > 1) {
                    let best_score = this.point_values[this.taken];
                    let score = best_score + this.point_values[this.taken + 1];
                    if (score > best_score) {
                        taken = 2;
                        best_score = score;
                    }
                    if (this.total - this.taken > 2) {
                        score += this.point_values[this.taken + 2];
                        if (score > best_score) {
                            taken = 3;
                        }
                    }
                }
                break;
        }
        this.ai_score += this.point_values.slice(this.taken, this.taken + taken).reduce( (p, c) => p + c);
        this.ai_taken.fill(true, this.taken, this.taken + taken);
        this.taken += taken;
        if (this.taken >= this.total) {
            this.player_wins = this.player_score > this.ai_score;
            this.game_over = true;
        }
    }
}
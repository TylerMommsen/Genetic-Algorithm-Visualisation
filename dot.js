class Dot {

    constructor() {
        this.brain = new Brain(1000);
        this.brain.randomize();

        this.pos = createVector(width/2, height - 100);
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);

        this.dead = false;

        this.isBest = false;

        this.move = function() {
            if (this.brain.directions.length > this.brain.step) {
                this.acc = this.brain.directions[this.brain.step];
                this.brain.step++;
            } else {
                this.dead = true;
            }

            this.vel.add(this.acc);
            this.vel.limit(10);
            this.pos.add(this.vel);
        }

        this.fitness = 0;
        this.goal = createVector(width/2, 100);
        this.reachedGoal = false;
    }

    show() {
        if (this.isBest === true) {
            fill(0, 255, 0);
            noStroke();
            ellipse(this.pos.x, this.pos.y, 5, 5);
        } else {
            fill(255);
            noStroke();
            ellipse(this.pos.x, this.pos.y, 5, 5);
        }
    }

    update() {
        if (this.dead === false && this.reachedGoal === false) {
            this.move();
            if (this.pos.x < 4 || this.pos.y < 4 || this.pos.x > width - 4 || this.pos.y > height - 4) {
                this.dead = true;
            } else if (dist(this.pos.x, this.pos.y, this.goal.x, this.goal.y) < 5) {
                this.reachedGoal = true;
            } else if (this.pos.x < 1500 && this.pos.y < height/2 + 10 && this.pos.x > 300 && this.pos.y > height/2) {
                this.dead = true;
            }
        } 
    }

    calculateFitness() {
        if (this.reachedGoal) {
            this.fitness = 1.0/16.0 + 10000.0/(this.brain.step * this.brain.step);
        } else {
            let distanceToGoal = dist(this.pos.x, this.pos.y, this.goal.x, this.goal.y);
            this.fitness = 1.0/(distanceToGoal * distanceToGoal);
        }
    }

    getBaby() {
        let baby = new Dot();
        baby.brain = this.brain.clone();
        return baby;
    }
}
class Population {
    
    constructor(size) {
        this.dots = [];
        for (let i = 0; i < size; i++) {
            this.dots.push(new Dot());
        }

        this.fitnessSum;
        this.gen = 1;
        this.bestDot = 0;
        this.minSteps = 1000;

        this.calculateFitnessSum = function() {
            this.fitnessSum = 0;
            for (let i = 0; i < this.dots.length; i++) {
                this.fitnessSum += this.dots[i].fitness;
            }
        }
        
        this.selectParent = function() {
            let rand = random(this.fitnessSum);
            let runningSum = 0;
    
            for (let i = 0; i < this.dots.length; i++) {
                runningSum += this.dots[i].fitness;
                if (runningSum > rand) {
                    return this.dots[i];
                }
            }
    
            return null;
        }

        this.setBestDot = function() {
            let max = 0;
            let maxIndex = 0;
            for (let i = 0; i < this.dots.length; i++) {
                if (this.dots[i].fitness > max) {
                    max = this.dots[i].fitness;
                    maxIndex = i;
                }
            }
    
            this.bestDot = maxIndex;

            if (this.dots[this.bestDot].reachedGoal) {
                this.minSteps = this.dots[this.bestDot].brain.step;
            }
        }
    }

    show() {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].show();
        }

        this.dots[0].show();
    }

    update() {
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].brain.step > this.minSteps) {
                this.dots[i].dead = true;
            } else {
                this.dots[i].update();
            }
        }
    }

    calculateFitness() {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].calculateFitness();
        }
    }

    allDotsAreDead() {
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].dead === false && this.dots[i].reachedGoal === false) {
                return false;
            }
        }

        return true;
    }

    naturalSelection() {
        let newDots = [];
        for (let i = 0; i < this.dots.length; i++) {
            newDots.push(new Dot());
        }
        this.setBestDot();
        this.calculateFitnessSum();

        newDots[0] = this.dots[this.bestDot].getBaby();
        newDots[0].isBest = true;

        for (let i = 1; i < newDots.length; i++) {
            let parent = this.selectParent();

            newDots[i] = parent.getBaby();
        }

        for (let i = 0; i < newDots.length; i++) {
            this.dots[i] = newDots[i];
        }
        // this.dots = newDots.clone();
        this.gen++;
    }

    mutateBabies() {
        for (let i = 1; i < this.dots.length; i++) {
            this.dots[i].brain.mutate();
        }
    }
}
let population;
let goal;

function setup() {
    createCanvas(1800, 900);
    population = new Population(1000);
    goal = createVector(width/2, 100);
}

function draw() {
    background(100);
    fill(255, 0, 0);
    stroke(2);
    circle(goal.x, goal.y, 10);

    fill(255, 255, 0);
    rect(width/6, height/2, 1230, 10);

    if (population.allDotsAreDead()) {
        population.calculateFitness();
        population.naturalSelection();
        population.mutateBabies();
    }

    population.show();
    population.update();
}
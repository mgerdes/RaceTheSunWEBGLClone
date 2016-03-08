var app = app || {};

app.Obstacle0 = function(position) {
    /* 
     * |   |   |   |
     * |   9   8   |
     * 7   |   |   6
     * |   --3--   |
     * |           |
     * --5--   --4--
     *     |   |
     *     |   |
     *     1   2
     *     |   |
     *     |   |
     */

    var WALL_HEIGHT = 1.0;
    var WALL_DEPTH = 0.04;

    var PASSAGE_WIDTH = 5.0;
    var TURN_WIDTH = 10.0;
    var WALL_1_AND_2_LENGTH = 50.0;
    var WALL_6_AND_7_LENGTH = 50.0;
    var WALL_8_AND_9_LENGTH = 40.0;

    var box1Position = new app.math.Vector3(position.x - PASSAGE_WIDTH / 2,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH / 2 + 50);
    var box1Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_1_AND_2_LENGTH / 2);

    var box2Position = new app.math.Vector3(position.x + PASSAGE_WIDTH / 2,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH / 2 + 50);
    var box2Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_1_AND_2_LENGTH / 2);

    var box3Position = new app.math.Vector3(position.x,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH + TURN_WIDTH + 50);
    var box3Scale = new app.math.Vector3(PASSAGE_WIDTH / 2,
                                         WALL_HEIGHT,
                                         WALL_DEPTH);

    var box4Position = new app.math.Vector3(position.x - PASSAGE_WIDTH / 2 - PASSAGE_WIDTH / 2,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH + 50);
    var box4Scale = new app.math.Vector3(PASSAGE_WIDTH / 2,
                                         WALL_HEIGHT,
                                         WALL_DEPTH);

    var box5Position = new app.math.Vector3(position.x + PASSAGE_WIDTH / 2 + PASSAGE_WIDTH / 2, 
                                            position.y, 
                                            position.z + WALL_1_AND_2_LENGTH + 50);
    var box5Scale = new app.math.Vector3(PASSAGE_WIDTH / 2,
                                         WALL_HEIGHT,
                                         WALL_DEPTH);

    var box6Position = new app.math.Vector3(position.x -  PASSAGE_WIDTH / 2 - PASSAGE_WIDTH, 
                                            position.y, 
                                            position.z + WALL_1_AND_2_LENGTH + WALL_6_AND_7_LENGTH / 2 + 50);
    var box6Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_6_AND_7_LENGTH / 2);

    var box7Position = new app.math.Vector3(position.x + PASSAGE_WIDTH / 2 + PASSAGE_WIDTH,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH + WALL_6_AND_7_LENGTH / 2 + 50);
    var box7Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_6_AND_7_LENGTH / 2);

    var box8Position = new app.math.Vector3(position.x - PASSAGE_WIDTH / 2,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH + TURN_WIDTH + WALL_8_AND_9_LENGTH / 2 + 50);
    var box8Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_8_AND_9_LENGTH / 2);

    var box9Position = new app.math.Vector3(position.x + PASSAGE_WIDTH / 2,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH + TURN_WIDTH + WALL_8_AND_9_LENGTH / 2 + 50);
    var box9Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_8_AND_9_LENGTH / 2);

    var box10Position = new app.math.Vector3(position.x, 
                                             position.y + WALL_HEIGHT,
                                             position.z + WALL_1_AND_2_LENGTH / 2 + 50);
    var box10Scale = new app.math.Vector3(PASSAGE_WIDTH / 2,
                                          WALL_DEPTH,
                                          WALL_1_AND_2_LENGTH / 2);

    var box11Position = new app.math.Vector3(position.x - PASSAGE_WIDTH, 
                                             position.y + WALL_HEIGHT,
                                             position.z + WALL_1_AND_2_LENGTH + WALL_6_AND_7_LENGTH / 2 + 50);
    var box11Scale = new app.math.Vector3(PASSAGE_WIDTH / 2,
                                          WALL_DEPTH,
                                          WALL_6_AND_7_LENGTH / 2);

    var box12Position = new app.math.Vector3(position.x + PASSAGE_WIDTH, 
                                             position.y + WALL_HEIGHT,
                                             position.z + WALL_1_AND_2_LENGTH + WALL_6_AND_7_LENGTH / 2 + 50);
    var box12Scale = new app.math.Vector3(PASSAGE_WIDTH / 2,
                                          WALL_DEPTH,
                                          WALL_6_AND_7_LENGTH / 2);
    
    var color = new app.math.Vector3(0.1, 0.1, 0.1);

    this.objects = [];
    this.objects.push(new app.objects.Box(box1Position, box1Scale, color));
    this.objects.push(new app.objects.Box(box2Position, box2Scale, color));
    this.objects.push(new app.objects.Box(box3Position, box3Scale, color));
    this.objects.push(new app.objects.Box(box4Position, box4Scale, color));
    this.objects.push(new app.objects.Box(box5Position, box5Scale, color));
    this.objects.push(new app.objects.Box(box6Position, box6Scale, color));
    this.objects.push(new app.objects.Box(box7Position, box7Scale, color));
    this.objects.push(new app.objects.Box(box8Position, box8Scale, color));
    this.objects.push(new app.objects.Box(box9Position, box9Scale, color));
    this.objects.push(new app.objects.Box(box10Position, box10Scale, color));
    this.objects.push(new app.objects.Box(box11Position, box11Scale, color));
    this.objects.push(new app.objects.Box(box12Position, box12Scale, color));

    for (var i = 0; i < 50; i++) {
        var xOffset = Math.random() * 200 - 100; 
        var zOffset = Math.random() * 200;

        if (xOffset >= -30 && xOffset <= 30 && zOffset <= 150 && zOffset >= 50) {
            if (xOffset >= -30 && xOffset <= 0) {
                xOffset -= 30;
            }
            if (xOffset <= 30 && xOffset >= 0) {
                xOffset += 30;
            }
        }

        var boxPosition = new app.math.Vector3(position.x + xOffset, position.y + 1.0, position.z + zOffset);
        var boxScale = new app.math.Vector3(2.0, 2.0, 2.0);

        this.objects.push(new app.objects.Box(boxPosition, boxScale));
    }

    var rampPosition = new app.math.Vector3(position.x, position.y, position.z - 20);
    this.objects.push(new app.objects.Ramp(rampPosition, 0.4));
};

app.Obstacle0.prototype.shiftZUnits = function(unitsToShift) {
    for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].position.z += unitsToShift;
        this.objects[i].updateModelMat();
    }
};

app.Obstacle0.prototype.draw = function(shader) {
    for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(shader);
    }
};

app.Obstacle0.prototype.update = function(timeDelta) {
};

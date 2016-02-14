var app = app || {};
app.objects = app.objects || {};

app.objects.Obstacle0 = function(position) {
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
    var WALL_1_AND_2_LENGTH = 30.0;
    var WALL_6_AND_7_LENGTH = 30.0;
    var WALL_8_AND_9_LENGTH = 20.0;

    var box1Position = new app.math.Vector3(position.x - PASSAGE_WIDTH / 2,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH / 2);
    var box1Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_1_AND_2_LENGTH / 2);

    var box2Position = new app.math.Vector3(position.x + PASSAGE_WIDTH / 2,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH / 2);
    var box2Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_1_AND_2_LENGTH / 2);

    var box3Position = new app.math.Vector3(position.x,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH + TURN_WIDTH);
    var box3Scale = new app.math.Vector3(PASSAGE_WIDTH / 2,
                                         WALL_HEIGHT,
                                         WALL_DEPTH);

    var box4Position = new app.math.Vector3(position.x - PASSAGE_WIDTH / 2 - PASSAGE_WIDTH / 2,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH);
    var box4Scale = new app.math.Vector3(PASSAGE_WIDTH / 2,
                                         WALL_HEIGHT,
                                         WALL_DEPTH);

    var box5Position = new app.math.Vector3(position.x + PASSAGE_WIDTH / 2 + PASSAGE_WIDTH / 2, 
                                            position.y, 
                                            position.z + WALL_1_AND_2_LENGTH);
    var box5Scale = new app.math.Vector3(PASSAGE_WIDTH / 2,
                                         WALL_HEIGHT,
                                         WALL_DEPTH);

    var box6Position = new app.math.Vector3(position.x -  PASSAGE_WIDTH / 2 - PASSAGE_WIDTH, 
                                            position.y, 
                                            position.z + WALL_1_AND_2_LENGTH + WALL_6_AND_7_LENGTH / 2);
    var box6Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_6_AND_7_LENGTH / 2);

    var box7Position = new app.math.Vector3(position.x + PASSAGE_WIDTH / 2 + PASSAGE_WIDTH,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH + WALL_6_AND_7_LENGTH / 2);
    var box7Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_6_AND_7_LENGTH / 2);

    var box8Position = new app.math.Vector3(position.x - PASSAGE_WIDTH / 2,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH + TURN_WIDTH + WALL_8_AND_9_LENGTH / 2);
    var box8Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_8_AND_9_LENGTH / 2);

    var box9Position = new app.math.Vector3(position.x + PASSAGE_WIDTH / 2,
                                            position.y,
                                            position.z + WALL_1_AND_2_LENGTH + TURN_WIDTH + WALL_8_AND_9_LENGTH / 2);
    var box9Scale = new app.math.Vector3(WALL_DEPTH,
                                         WALL_HEIGHT,
                                         WALL_8_AND_9_LENGTH / 2);

    this.obstacleObjects = [];
    this.obstacleObjects.push(new app.objects.Box(box1Position, box1Scale));
    this.obstacleObjects.push(new app.objects.Box(box2Position, box2Scale));
    this.obstacleObjects.push(new app.objects.Box(box3Position, box3Scale));
    this.obstacleObjects.push(new app.objects.Box(box4Position, box4Scale));
    this.obstacleObjects.push(new app.objects.Box(box5Position, box5Scale));
    this.obstacleObjects.push(new app.objects.Box(box6Position, box6Scale));
    this.obstacleObjects.push(new app.objects.Box(box7Position, box7Scale));
    this.obstacleObjects.push(new app.objects.Box(box8Position, box8Scale));
    this.obstacleObjects.push(new app.objects.Box(box9Position, box9Scale));
};

app.objects.Obstacle0.prototype.draw = function(shader) {
    for (var i = 0; i < this.obstacleObjects.length; i++) {
        this.obstacleObjects[i].draw(shader);
    }
};

app.objects.Obstacle1 = function(position) {
    /* 
     * |-----     |
     * |          |
     * |          |
     * |          |
     * |          |
     * |     -----|
     * |          |
     * |          |
     * |          |
     * |          |
     * |-----     |
     * |          |
     * |          |
     * |          |
     * |          |
     * |          |
     * |     -----|
     * |          |
     * |          |
     * |          |
     * |          |
     * |-----     |
     * |          |
     * |          |
     * |          |
     * |          |
     * |     -----|
     */

    var WALL_HEIGHT = 0.7;
    var WALL_DEPTH = 0.04;

    var SIDE_WALL_LENGTH = 120;
    var INNER_WALL_LENGTH = 5;
    var SPACE_BETWEEN_INNER_WALLS = 20;

    var box1Position = new app.math.Vector3(position.x + INNER_WALL_LENGTH,
                                           position.y,
                                           position.z + SIDE_WALL_LENGTH / 2);
    var box1Scale = new app.math.Vector3(WALL_DEPTH,
                                        WALL_HEIGHT,
                                        SIDE_WALL_LENGTH / 2);

    var box2Position = new app.math.Vector3(position.x - INNER_WALL_LENGTH,
                                           position.y,
                                           position.z + SIDE_WALL_LENGTH / 2);
    var box2Scale = new app.math.Vector3(WALL_DEPTH,
                                        WALL_HEIGHT,
                                        SIDE_WALL_LENGTH / 2);

    var box3Position = new app.math.Vector3(position.x - INNER_WALL_LENGTH / 2,
                                           position.y,
                                           position.z + 0 * SPACE_BETWEEN_INNER_WALLS);;
    var box3Scale = new app.math.Vector3(INNER_WALL_LENGTH / 2,
                                        WALL_HEIGHT,
                                        WALL_DEPTH);

    var box4Position = new app.math.Vector3(position.x + INNER_WALL_LENGTH / 2,
                                           position.y,
                                           position.z + 1 * SPACE_BETWEEN_INNER_WALLS);;
    var box4Scale = new app.math.Vector3(INNER_WALL_LENGTH / 2,
                                        WALL_HEIGHT,
                                        WALL_DEPTH);

    var box5Position = new app.math.Vector3(position.x - INNER_WALL_LENGTH / 2,
                                           position.y,
                                           position.z + 2 * SPACE_BETWEEN_INNER_WALLS);;
    var box5Scale = new app.math.Vector3(INNER_WALL_LENGTH / 2,
                                        WALL_HEIGHT,
                                        WALL_DEPTH);

    var box6Position = new app.math.Vector3(position.x + INNER_WALL_LENGTH / 2,
                                           position.y,
                                           position.z + 3 * SPACE_BETWEEN_INNER_WALLS);;
    var box6Scale = new app.math.Vector3(INNER_WALL_LENGTH / 2,
                                        WALL_HEIGHT,
                                        WALL_DEPTH);

    var box7Position = new app.math.Vector3(position.x - INNER_WALL_LENGTH / 2,
                                           position.y,
                                           position.z + 4 * SPACE_BETWEEN_INNER_WALLS);;
    var box7Scale = new app.math.Vector3(INNER_WALL_LENGTH / 2,
                                        WALL_HEIGHT,
                                        WALL_DEPTH);

    var box8Position = new app.math.Vector3(position.x + INNER_WALL_LENGTH / 2,
                                           position.y,
                                           position.z + 5 * SPACE_BETWEEN_INNER_WALLS);;
    var box8Scale = new app.math.Vector3(INNER_WALL_LENGTH / 2,
                                        WALL_HEIGHT,
                                        WALL_DEPTH);

    var box9Position = new app.math.Vector3(position.x - INNER_WALL_LENGTH / 2,
                                           position.y,
                                           position.z + 6 * SPACE_BETWEEN_INNER_WALLS);;
    var box9Scale = new app.math.Vector3(INNER_WALL_LENGTH / 2,
                                        WALL_HEIGHT,
                                        WALL_DEPTH);

    this.obstacleObjects = [];
    this.obstacleObjects.push(new app.objects.Box(box1Position, box1Scale));
    this.obstacleObjects.push(new app.objects.Box(box2Position, box2Scale));
    this.obstacleObjects.push(new app.objects.Box(box3Position, box3Scale));
    this.obstacleObjects.push(new app.objects.Box(box4Position, box4Scale));
    this.obstacleObjects.push(new app.objects.Box(box5Position, box5Scale));
    this.obstacleObjects.push(new app.objects.Box(box6Position, box6Scale));
    this.obstacleObjects.push(new app.objects.Box(box7Position, box7Scale));
    this.obstacleObjects.push(new app.objects.Box(box8Position, box8Scale));
    this.obstacleObjects.push(new app.objects.Box(box9Position, box9Scale));
};

app.objects.Obstacle1.prototype.draw = function(shader) {
    for (var i = 0; i < this.obstacleObjects.length; i++) {
        this.obstacleObjects[i].draw(shader);
    }
};

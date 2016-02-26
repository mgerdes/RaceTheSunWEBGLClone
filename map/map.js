var app = app || {};

app.ObstacleMap = function() {
    this.map = new Array(4);  
    for (var i = 0; i < 4; i++) {
        this.map[i] = new Array(7);
    }
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 7; col++) {
            var x = (col - 3) * 200;
            var z = row * 200;
            this.map[row][col] = this.randomObstacle(new app.math.Vector3(x, 0, z));
        }
    }
    this.nextRow = 4;
};

app.ObstacleMap.prototype.randomObstacle = function(position) {
    var rand = Math.floor(Math.random() * 3);
    if (rand == 0) {
        return new app.Obstacle0(position);
    } else if (rand == 1) {
        return new app.Obstacle1(position);
    } else {
        return new app.Obstacle3(position);
    }
};


app.ObstacleMap.prototype.drawObstacles = function(shader) {
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 6; col++) {
            this.map[row][col].draw(shader);
        }
    }
};

app.ObstacleMap.prototype.shiftLeft = function() {
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 6; col++) {
            this.map[row][col] = this.map[row][col + 1];
        }
    }
    for (row = 0; row < 4; row++) {
        this.map[row][6] = this.randomObstacle();
    }
};

app.ObstacleMap.prototype.shiftRight = function() {
    for (var row = 0; row < 4; row++) {
        for (var col = 6; col > 0; col--) {
            this.map[row][col] = this.map[row][col - 1];
        }
    }
    for (row = 0; row < 4; row++) {
        this.map[row][0] = this.randomObstacle();
    }
};

app.ObstacleMap.prototype.shiftDown = function() {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            this.map[row][col] = this.map[row + 1][col];
        }
    }
    for (var col = 0; col < 7; col++) {
        var x = (col - 3) * 200;
        var z = this.nextRow * 200;
        this.map[3][col] = this.randomObstacle(new app.math.Vector3(x, 0, z));
    }
    this.nextRow++;
};

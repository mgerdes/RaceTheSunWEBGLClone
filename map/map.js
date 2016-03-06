var app = app || {};

app.ObstacleMap = function() {
    this.map = new Array(this.numberRows);  
    for (var row = 0; row < this.numberRows; row++) {
        this.map[row] = new Array(this.numberCols);
    }
    for (var row = 0; row < this.numberRows; row++) {
        for (var col = 0; col < this.numberCols; col++) {
            var x = (col - Math.floor(this.numberCols / 2)) * 200;
            var z = row * 200;
            this.map[row][col] = this.randomObstacle(new app.math.Vector3(x, 0, z));
        }
    }
    this.nextRow = this.numberRows;
};

app.ObstacleMap.prototype.numberRows = 3;
app.ObstacleMap.prototype.numberCols = 3;

app.ObstacleMap.prototype.currentObstacle = function() {
    return this.map[0][Math.floor(this.numberCols / 2)];
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
    for (var row = 0; row < this.numberRows; row++) {
        for (var col = 0; col < this.numberCols; col++) {
            this.map[row][col].draw(shader);
        }
    }
};

app.ObstacleMap.prototype.updateObstacles = function(timeDelta) {
    for (var row = 0; row < this.numberRows; row++) {
        for (var col = 0; col < this.numberCols; col++) {
            //this.map[row][col].update(timeDelta);
        }
    }
};

app.ObstacleMap.prototype.shiftLeft = function() {
    for (var row = 0; row < this.numberRows; row++) {
        for (var col = 0; col < this.numberCols - 1; col++) {
            this.map[row][col] = this.map[row][col + 1];
        }
    }
    for (row = 0; row < this.numberRows; row++) {
        this.map[row][this.numberCols - 1] = this.randomObstacle();
    }
};

app.ObstacleMap.prototype.shiftRight = function() {
    for (var row = 0; row < this.numberRows; row++) {
        for (var col = this.numberCols - 1; col > 0; col--) {
            this.map[row][col] = this.map[row][col - 1];
        }
    }
    for (row = 0; row < this.numberRows; row++) {
        this.map[row][0] = this.randomObstacle();
    }
};

app.ObstacleMap.prototype.shiftDown = function() {
    for (var col = 0; col < this.numberCols; col++) {
        for (var row = 0; row < this.numberRows - 1; row++) {
            this.map[row][col] = this.map[row + 1][col];
        }
    }
    for (var col = 0; col < this.numberCols; col++) {
        var x = (col - Math.floor(this.numberCols / 2)) * 200;
        var z = this.nextRow * 200;
        this.map[this.numberRows - 1][col] = this.randomObstacle(new app.math.Vector3(x, 0, z));
    }
    this.nextRow++;
};

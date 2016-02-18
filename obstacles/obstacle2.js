var app = app || {};

app.Obstacle2 = function(position) {
    var rampPosition = new app.math.Vector3(position.x, position.y, position.z);
    this.obstacleObjects = [];
    this.obstacleObjects.push(new app.objects.Ramp(rampPosition, 0.4));
};

app.Obstacle2.prototype.draw = function(shader) {
    for (var i = 0; i < this.obstacleObjects.length; i++) {
        this.obstacleObjects[i].draw(shader);
    }
};

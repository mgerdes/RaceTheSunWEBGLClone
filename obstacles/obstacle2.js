var app = app || {};

app.Obstacle2 = function(position) {
    var rampPosition = new app.math.Vector3(position.x, position.y, position.z);
    this.objects = [];
    this.objects.push(new app.objects.Ramp(rampPosition, 0.4));
};

app.Obstacle2.prototype.shiftZUnits = function(unitsToShift) {
    for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].position.z += unitsToShift;
    }
};

app.Obstacle2.prototype.draw = function(shader) {
    for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(shader);
    }
};

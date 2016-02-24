var app = app || {};

app.Obstacle3 = function(position) {
    /*
     * |-------|  |-------| |-------| |-------| |-------|
     * |       |  |       | |       | |       | |       |
     * |       |  |       | |       | |       | |       |
     * |       |  |       | |       | |       | |       |
     * |-------|  |-------| |-------| |-------| |-------|
     */

    var box1Position = new app.math.Vector3(position.x,
                                            position.y + 9,
                                            position.z + 50);
    var box1Scale = new app.math.Vector3(15.0,
                                         10.0,
                                         20.0);

    var box2Position = new app.math.Vector3(position.x + 32,
                                            position.y + 9,
                                            position.z + 50);
    var box2Scale = new app.math.Vector3(15.0,
                                         10.0,
                                         20.0);

    var box3Position = new app.math.Vector3(position.x - 32,
                                            position.y + 9,
                                            position.z + 50);
    var box3Scale = new app.math.Vector3(15.0,
                                         10.0,
                                         20.0);

    var box4Position = new app.math.Vector3(position.x - 64,
                                            position.y + 9,
                                            position.z + 50);
    var box4Scale = new app.math.Vector3(15.0,
                                         10.0,
                                         20.0);

    var box5Position = new app.math.Vector3(position.x + 64,
                                            position.y + 9,
                                            position.z + 50);
    var box5Scale = new app.math.Vector3(15.0,
                                         10.0,
                                         20.0);

    var color = new app.math.Vector3(0.1, 0, 0);

    this.objects = [];
    this.objects.push(new app.objects.Box(box1Position, box1Scale, color));
    this.objects.push(new app.objects.Box(box2Position, box2Scale, color));
    this.objects.push(new app.objects.Box(box3Position, box3Scale, color));
    this.objects.push(new app.objects.Box(box4Position, box4Scale, color));
    this.objects.push(new app.objects.Box(box5Position, box5Scale, color));
};

app.Obstacle3.prototype.shiftZUnits = function(unitsToShift) {
    for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].position.z += unitsToShift;
        this.objects[i].updateModelMat();
    }
};

app.Obstacle3.prototype.draw = function(shader) {
    for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(shader);
    }
};

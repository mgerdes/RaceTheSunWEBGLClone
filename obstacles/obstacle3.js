var app = app || {};

app.Obstacle3 = function(position) {
    /*
     * |-------|  |-------| |-------| |-------| |-------|
     * |       |  |       | |       | |       | |       |
     * |       |  |       | |       | |       | |       |
     * |       |  |       | |       | |       | |       |
     * |-------|  |-------| |-------| |-------| |-------|
     */

    var depthSideBoxScale = new app.math.Vector3(0.01, 10.0, 20.0);
    var widthSideBoxScale = new app.math.Vector3(15.0, 10.0, 0.01);

    var box1Side1Position = new app.math.Vector3(position.x + 15,
                                                 position.y + 9,
                                                 position.z + 50);
    var box1Side2Position = new app.math.Vector3(position.x,
                                                 position.y + 9,
                                                 position.z + 30);
    var box1Side3Position = new app.math.Vector3(position.x - 15,
                                                 position.y + 9,
                                                 position.z + 50);

    var box2Side1Position = new app.math.Vector3(position.x + 47,
                                                 position.y + 9,
                                                 position.z + 50);
    var box2Side2Position = new app.math.Vector3(position.x + 32,
                                                 position.y + 9,
                                                 position.z + 30);
    var box2Side3Position = new app.math.Vector3(position.x + 17,
                                                 position.y + 9,
                                                 position.z + 50);

    var box3Side1Position = new app.math.Vector3(position.x + 79,
                                                 position.y + 9,
                                                 position.z + 50);
    var box3Side2Position = new app.math.Vector3(position.x + 64,
                                                 position.y + 9,
                                                 position.z + 30);
    var box3Side3Position = new app.math.Vector3(position.x + 49,
                                                 position.y + 9,
                                                 position.z + 50);

    var box4Side1Position = new app.math.Vector3(position.x - 47,
                                                 position.y + 9,
                                                 position.z + 50);
    var box4Side2Position = new app.math.Vector3(position.x - 32,
                                                 position.y + 9,
                                                 position.z + 30);
    var box4Side3Position = new app.math.Vector3(position.x - 17,
                                                 position.y + 9,
                                                 position.z + 50);

    var box5Side1Position = new app.math.Vector3(position.x - 79,
                                                 position.y + 9,
                                                 position.z + 50);
    var box5Side2Position = new app.math.Vector3(position.x - 64,
                                                 position.y + 9,
                                                 position.z + 30);
    var box5Side3Position = new app.math.Vector3(position.x - 49,
                                                 position.y + 9,
                                                 position.z + 50);

    var color = new app.math.Vector3(0.1, 0, 0);

    this.objects = [];
    this.objects.push(new app.objects.Box(box1Side1Position, depthSideBoxScale, color));
    this.objects.push(new app.objects.Box(box1Side2Position, widthSideBoxScale, color));
    this.objects.push(new app.objects.Box(box1Side3Position, depthSideBoxScale, color));

    this.objects.push(new app.objects.Box(box2Side1Position, depthSideBoxScale, color));
    this.objects.push(new app.objects.Box(box2Side2Position, widthSideBoxScale, color));
    this.objects.push(new app.objects.Box(box2Side3Position, depthSideBoxScale, color));

    this.objects.push(new app.objects.Box(box3Side1Position, depthSideBoxScale, color));
    this.objects.push(new app.objects.Box(box3Side2Position, widthSideBoxScale, color));
    this.objects.push(new app.objects.Box(box3Side3Position, depthSideBoxScale, color));

    this.objects.push(new app.objects.Box(box4Side1Position, depthSideBoxScale, color));
    this.objects.push(new app.objects.Box(box4Side2Position, widthSideBoxScale, color));
    this.objects.push(new app.objects.Box(box4Side3Position, depthSideBoxScale, color));

    this.objects.push(new app.objects.Box(box5Side1Position, depthSideBoxScale, color));
    this.objects.push(new app.objects.Box(box5Side2Position, widthSideBoxScale, color));
    this.objects.push(new app.objects.Box(box5Side3Position, depthSideBoxScale, color));
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


app.Obstacle3.prototype.update = function(timeDelta) {
};

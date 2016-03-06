var app = app || {};

app.Obstacle4 = function(position) {
    var boxScale = new app.math.Vector3(0.5, 5, 0.5);
    var boxRotationAxis = new app.math.Vector3(0, 0, 1);
    var boxColor = new app.math.Vector3(0.2, 0, 0);

    var box1Translate = new app.math.Vector3(0.5, 4.0, 0);
    var box1Position = new app.math.Vector3(position.x - 10, position.y, position.z);

    var box2Translate = new app.math.Vector3(-0.5, 4.0, 0);
    var box2Position = new app.math.Vector3(position.x + 10, position.y, position.z);

    this.timePassed = 0;

    this.objects = [];
    this.objects.push(new app.objects.RotatedBox(box1Position, boxScale, boxRotationAxis, 0.0, box1Translate, boxColor));
    this.objects.push(new app.objects.RotatedBox(box2Position, boxScale, boxRotationAxis, 0.0, box2Translate, boxColor));
};

app.Obstacle4.prototype.shiftZUnits = function(unitsToShift) {
    for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].position.z += unitsToShift;
        this.objects[i].updateModelMat();
    }
};

app.Obstacle4.prototype.draw = function(shader) {
    for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(shader);
    }
};

app.Obstacle4.prototype.update = function(timeDelta) {
    var distance = app.ship.position.minus(this.objects[0].position).length();
    if (distance < 70) {
        if (this.objects[0].rotationAngle < Math.PI / 2) {
            this.objects[0].rotationAngle += 0.5 * (this.timePassed * this.timePassed) * timeDelta; 
            this.timePassed += timeDelta;
            this.objects[0].updateModelMat();
        } else {
            this.objects[0].rotationAngle = Math.PI / 2; 
            this.objects[0].updateModelMat();
        }
        if (this.objects[1].rotationAngle > -Math.PI / 2) {
            this.objects[1].rotationAngle -= 0.5 * (this.timePassed * this.timePassed) * timeDelta; 
            this.timePassed += timeDelta;
            this.objects[1].updateModelMat();
        } else {
            this.objects[1].rotationAngle = -Math.PI / 2; 
            this.objects[1].updateModelMat();
        }
    }
};

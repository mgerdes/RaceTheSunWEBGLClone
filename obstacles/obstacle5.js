var app = app || {};

app.Obstacle5 = function(position) {
    var boxScale = new app.math.Vector3(5, 5, 5);
    var boxRotationAxis = new app.math.Vector3(0, 0, -1);
    var boxColor = new app.math.Vector3(0.2, 0, 0);

    var box1Position = new app.math.Vector3(position.x + 40, position.y - 1.0, position.z + 20); 
    var box2Position = new app.math.Vector3(position.x + 20, position.y - 1.0, position.z + 20); 
    var box3Position = new app.math.Vector3(position.x, position.y - 1.0, position.z + 20); 
    var box4Position = new app.math.Vector3(position.x - 20, position.y - 1.0, position.z + 20); 
    var box5Position = new app.math.Vector3(position.x - 40, position.y - 1.0, position.z + 20); 

    var box6Position = new app.math.Vector3(position.x + 40, position.y - 1.0, position.z + 50); 
    var box7Position = new app.math.Vector3(position.x + 20, position.y - 1.0, position.z + 50); 
    var box8Position = new app.math.Vector3(position.x, position.y - 1.0, position.z + 50); 
    var box10Position = new app.math.Vector3(position.x - 20, position.y - 1.0, position.z + 50); 
    var box9Position = new app.math.Vector3(position.x - 40, position.y - 1.0, position.z + 50); 

    var box11Position = new app.math.Vector3(position.x + 50, position.y - 1.0, position.z + 80); 
    var box12Position = new app.math.Vector3(position.x + 30, position.y - 1.0, position.z + 80); 
    var box13Position = new app.math.Vector3(position.x + 10, position.y - 1.0, position.z + 80); 
    var box14Position = new app.math.Vector3(position.x - 10, position.y - 1.0, position.z + 80); 
    var box15Position = new app.math.Vector3(position.x - 30, position.y - 1.0, position.z + 80); 

    var boxTranslate1 = new app.math.Vector3(-5, 5, 0);
    var boxTranslate2 = new app.math.Vector3(-5, 5, 0);
    var boxTranslate3 = new app.math.Vector3(5, 5, 0);

    this.timePassed1 = 0;
    this.timePassed2 = 0;

    this.objects = [];
    this.objects.push(new app.objects.RotatedBox(box1Position, boxScale, boxRotationAxis, 0.0, boxTranslate1, boxColor));
    this.objects.push(new app.objects.RotatedBox(box2Position, boxScale, boxRotationAxis, 0.0, boxTranslate1, boxColor));
    this.objects.push(new app.objects.RotatedBox(box3Position, boxScale, boxRotationAxis, 0.0, boxTranslate1, boxColor));
    this.objects.push(new app.objects.RotatedBox(box4Position, boxScale, boxRotationAxis, 0.0, boxTranslate1, boxColor));
    this.objects.push(new app.objects.RotatedBox(box5Position, boxScale, boxRotationAxis, 0.0, boxTranslate1, boxColor));

    this.objects.push(new app.objects.RotatedBox(box6Position, boxScale, boxRotationAxis, 0.0, boxTranslate2, boxColor));
    this.objects.push(new app.objects.RotatedBox(box7Position, boxScale, boxRotationAxis, 0.0, boxTranslate2, boxColor));
    this.objects.push(new app.objects.RotatedBox(box8Position, boxScale, boxRotationAxis, 0.0, boxTranslate2, boxColor));
    this.objects.push(new app.objects.RotatedBox(box9Position, boxScale, boxRotationAxis, 0.0, boxTranslate2, boxColor));
    this.objects.push(new app.objects.RotatedBox(box10Position, boxScale, boxRotationAxis, 0.0, boxTranslate2, boxColor));

    //this.objects.push(new app.objects.RotatedBox(box11Position, boxScale, boxRotationAxis, 0.0, boxTranslate3, boxColor));
    this.objects.push(new app.objects.RotatedBox(box12Position, boxScale, boxRotationAxis, 0.0, boxTranslate3, boxColor));
    this.objects.push(new app.objects.RotatedBox(box13Position, boxScale, boxRotationAxis, 0.0, boxTranslate3, boxColor));
    this.objects.push(new app.objects.RotatedBox(box14Position, boxScale, boxRotationAxis, 0.0, boxTranslate3, boxColor));
    this.objects.push(new app.objects.RotatedBox(box15Position, boxScale, boxRotationAxis, 0.0, boxTranslate3, boxColor));
};

app.Obstacle5.prototype.draw = function(shader) {
    for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(shader);
    }
};

app.Obstacle5.prototype.update = function(timeDelta) {
    var distance = app.ship.position.minus(this.objects[2].position).length();

    if (distance < 120) {
        for (var i = 0; i < 5; i++) {
            if (i == 0) {
                this.timePassed1 += timeDelta;
            }
            if (this.objects[i].rotationAngle > -Math.PI / 2) {
                this.objects[i].rotationAngle -= 0.5 * (this.timePassed1 * this.timePassed1) * timeDelta; 
                this.objects[i].updateModelMat();
            } else {
                this.objects[i].rotationAngle = -Math.PI / 2; 
                this.objects[i].updateModelMat();
            }
        }
    }

    if (distance < 60) {
        for (var i = 10; i < this.objects.length; i++) {
            if (i == 10) {
                this.timePassed2 += timeDelta;
            }
            if (this.objects[i].rotationAngle < Math.PI / 2) {
                this.objects[i].rotationAngle += 0.5 * (this.timePassed2 * this.timePassed2) * timeDelta; 
                this.objects[i].updateModelMat();
            } else {
                this.objects[i].rotationAngle = Math.PI / 2; 
                this.objects[i].updateModelMat();
            }
        }
    }
};

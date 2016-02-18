var app = app || {};
app.objects = app.objects || {};

app.objects.Plane = function(position) {
    this.position = position;
    this.updateModelMatrix();
    this.mesh = new app.objects.Mesh(app.objects.Plane.vertices, app.objects.Plane.normals);
};

app.objects.Plane.prototype.updateModelMatrix = function() {
    var translationMat = app.math.Matrix4.translation(this.position.x, this.position.y, this.position.z);
    var scaleMat = app.math.Matrix4.scale(500, 1, 500);

    this.modelMat = translationMat.times(scaleMat);
};

app.objects.Plane.prototype.draw = function(shader) {
    this.mesh.draw(shader, this.modelMat);
};

app.objects.Plane.prototype.update = function(timeDelta) {
    app.plane.position.x = app.ship.position.x;
    app.plane.position.z = app.ship.position.z;
    this.updateModelMatrix();
};

app.objects.Plane.vertices = [
    1.0, 0.0, 1.0,
    1.0, 0.0, -1.0,
    -1.0, 0.0, -1.0,
    -1.0, 0.0, -1.0,
    -1.0, 0.0, 1.0,
    1.0, 0.0, 1.0
    ];

app.objects.Plane.normals = [
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    ];

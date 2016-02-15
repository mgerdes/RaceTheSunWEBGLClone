var app = app || {};
app.objects = app.objects || {};

app.objects.Box = function(position, scale) {
    var translationMat = app.math.Matrix4.translation(position.x, position.y, position.z);
    var scaleMat = app.math.Matrix4.scale(scale.x, scale.y, scale.z);

    this.modelMat = translationMat.times(scaleMat);
    this.mesh = new app.objects.Mesh(app.objects.Box.vertices, app.objects.Box.normals);
};

app.objects.Box.prototype.draw = function(shader) {
    shader.setMat4Property("modelMat", this.modelMat);
    shader.setMat4Property("normalMat", this.modelMat.inverse().transpose());
    this.mesh.draw(shader);
};

app.objects.Box.vertices = [
    1.0, -1.0, 1.0,
    -1.0,-1.0,-1.0,
    1.0, -1.0,-1.0,
    1.0, -1.0, 1.0,
    -1.0,-1.0, 1.0,
    -1.0,-1.0,-1.0,

    1.0,  1.0,-1.0,
    -1.0,-1.0,-1.0,
    1.0, -1.0,-1.0,
    1.0,  1.0,-1.0,
    -1.0, 1.0,-1.0,
    -1.0,-1.0,-1.0,

    -1.0, 1.0, 1.0,
    -1.0,-1.0,-1.0,
    -1.0, 1.0,-1.0,
    -1.0, 1.0, 1.0,
    -1.0,-1.0, 1.0,
    -1.0,-1.0,-1.0,

    1.0, 1.0, 1.0,
    1.0,-1.0,-1.0,
    1.0, 1.0,-1.0,
    1.0, 1.0, 1.0,
    1.0,-1.0, 1.0,
    1.0,-1.0,-1.0,

    1.0,  1.0, 1.0,
    -1.0, 1.0,-1.0,
    1.0,  1.0,-1.0,
    1.0,  1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0,-1.0,

    1.0,  1.0, 1.0,
    -1.0,-1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0
    ];

app.objects.Box.normals = [
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,

    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,

    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, -0.0, 0.0,
    -1.0, -0.0, 0.0,
    -1.0, -0.0, 0.0,

    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,

    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,

    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0
    ];

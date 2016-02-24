var app = app || {};
app.objects = app.objects || {};

app.objects.Box = function(position, scale, color) {
    this.position = position;
    this.scale = scale;
    this.updateModelMat();
    this.boundingBox = new app.BoundingBox(position, scale);

    if (color) {
        this.color = color;
    } 
    else {
        this.color = new app.math.Vector3(0, 0, 0);
    }

    this.mesh = new app.Mesh(app.objects.rectangleModelData["vertices"], 
                             app.objects.rectangleModelData["normals"],
                             app.objects.rectangleModelData["faces"],
                             this.color);
};

app.objects.Box.prototype.updateModelMat = function() {
    var translationMat = app.math.Matrix4.translation(this.position.x, this.position.y, this.position.z);
    var scaleMat = app.math.Matrix4.scale(this.scale.x, this.scale.y, this.scale.z);
    this.modelMat = translationMat.times(scaleMat);
};

app.objects.Box.prototype.draw = function(shader) {
    this.mesh.draw(shader, this.modelMat);
};

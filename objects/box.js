var app = app || {};
app.objects = app.objects || {};

app.objects.Box = function(position, scale) {
    var translationMat = app.math.Matrix4.translation(position.x, position.y, position.z);
    var scaleMat = app.math.Matrix4.scale(scale.x, scale.y, scale.z);

    this.modelMat = translationMat.times(scaleMat);
    this.mesh = new app.Mesh(app.objects.rectangleModelData["vertices"], 
                             app.objects.rectangleModelData["normals"],
                             app.objects.rectangleModelData["faces"]);
};

app.objects.Box.prototype.draw = function(shader) {
    this.mesh.draw(shader, this.modelMat);
};

var app = app || {};
app.objects = app.objects || {};

app.objects.Ramp = function(position, rotation) {
    var translationMat = app.math.Matrix4.translation(position.x, position.y - 0.5, position.z);
    var scaleMat = app.math.Matrix4.scale(1, 0.1, 2);
    var rotationMat = app.math.Matrix4.rotation(new app.math.Vector3(1, 0, 0), rotation);

    this.modelMat = translationMat.times(rotationMat).times(scaleMat);
    this.mesh = new app.objects.Mesh(app.objects.rectangleModelData["vertices"], 
                                     app.objects.rectangleModelData["normals"],
                                     app.objects.rectangleModelData["faces"],
                                     new app.math.Vector3(-0.5, -0.5, -0.5));
};

app.objects.Ramp.prototype.draw = function(shader) {
    this.mesh.draw(shader, this.modelMat);
};

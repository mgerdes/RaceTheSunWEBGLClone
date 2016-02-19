var app = app || {};

app.BoundingBox = function(position, scale) {
    this.position = position;
    this.scale = scale;

    this.mesh = new app.LineLoopMesh(app.objects.rectangleModelData["vertices"]);
};

app.BoundingBox.prototype.doesCollideWith = function(boundingBox) {

};

app.BoundingBox.prototype.draw = function() {
    var translationMat = app.math.Matrix4.translation(this.position.x, this.position.y, this.position.z);
    var scaleMat = app.math.Matrix4.scale(this.scale.x, this.scale.y, this.scale.z);
    var modelMat = translationMat.times(scaleMat);

    var shader = app.shaders["bounding_box_shader"];

    this.mesh.draw(shader, modelMat);
};

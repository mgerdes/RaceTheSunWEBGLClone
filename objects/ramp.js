var app = app || {};
app.objects = app.objects || {};

app.objects.Ramp = function(position, rotation) {
    this.position = new app.math.Vector3(position.x, position.y - 0.5, position.z);
    this.scale = new app.math.Vector3(1, 0.1, 2);   
    this.rotation = rotation;
    this.updateModelMat();

    var boundingBoxPosition = new app.math.Vector3(position.x, position.y, position.z);
    var boundingBoxScale = new app.math.Vector3(1, 1, 2);
    this.boundingBox = new app.BoundingBox(boundingBoxPosition, boundingBoxScale, this.rotation);

    this.mesh = new app.Mesh(app.objects.rectangleModelData["vertices"], 
                             app.objects.rectangleModelData["normals"],
                             app.objects.rectangleModelData["faces"],
                             new app.math.Vector3(-0.5, -0.5, -0.5));
};

app.objects.Ramp.prototype.draw = function(shader) {
    this.mesh.draw(shader, this.modelMat);
    this.boundingBox.draw(app.shaders["bounding_box_shader"]);
};

app.objects.Ramp.prototype.updateModelMat = function() {
    var translationMat = app.math.Matrix4.translation(this.position.x, this.position.y, this.position.z);
    var scaleMat = app.math.Matrix4.scale(this.scale.x, this.scale.y, this.scale.z);
    var rotationMat = app.math.Matrix4.rotation(new app.math.Vector3(1, 0, 0), this.rotation);
    this.modelMat = translationMat.times(rotationMat).times(scaleMat);
};

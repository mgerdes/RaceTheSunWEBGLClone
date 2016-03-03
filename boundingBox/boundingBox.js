var app = app || {};

app.BoundingBox = function(position, scale, rotation) {
    this.position = position;
    this.scale = scale;

    if (!rotation) {
        this.rotation = 0;
    } else {
        this.rotation = rotation;
    }

    this.mesh = new app.LineLoopMesh(app.objects.rectangleModelData["vertices"]);
};

app.BoundingBox.prototype.collidesWith = function(boundingBox) {
    var thisMinX = this.position.x - this.scale.x;
    var thisMaxX = this.position.x + this.scale.x;
    var otherMinX = boundingBox.position.x - boundingBox.scale.x;
    var otherMaxX = boundingBox.position.x + boundingBox.scale.x;

    var thisMinY = this.position.y - this.scale.y;
    var thisMaxY = this.position.y + this.scale.y;
    var otherMinY = boundingBox.position.y - boundingBox.scale.y;
    var otherMaxY = boundingBox.position.y + boundingBox.scale.y;

    var thisMinZ = this.position.z - this.scale.z;
    var thisMaxZ = this.position.z + this.scale.z;
    var otherMinZ = boundingBox.position.z - boundingBox.scale.z;
    var otherMaxZ = boundingBox.position.z + boundingBox.scale.z;

    return thisMaxX >= otherMinX &&
           thisMinX <= otherMaxX &&
           thisMaxY >= otherMinY &&
           thisMinY <= otherMaxY &&
           thisMaxZ >= otherMinZ &&
           thisMinZ <= otherMaxZ;
};

app.BoundingBox.prototype.draw = function() {
    var translationMat = app.math.Matrix4.translation(this.position.x, this.position.y, this.position.z);
    var scaleMat = app.math.Matrix4.scale(this.scale.x, this.scale.y, this.scale.z);
    var modelMat = translationMat.times(scaleMat);

    var shader = app.shaders["bounding_box_shader"];

    this.mesh.draw(shader, modelMat);
};

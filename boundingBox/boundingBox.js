var app = app || {};

app.BoundingBox = function(position, scale) {
    this.position = position;
    this.scale = scale;

    this.mesh = new app.LineLoopMesh(app.objects.rectangleModelData["vertices"]);
};

app.BoundingBox.prototype.doesCollideWith = function(boundingBox) {
    var thisMinX = this.position.x - (this.scale.x / 2);
    var thisMaxX = boundingBox.position.x + (boundingBox.scale.x / 2);
    var otherMinX = boundingBox.position.x - (boundingBox.scale.x / 2);
    var otherMaxX = boundingBox.position.x + (boundingBox.scale.x / 2);

    var xCollide = ((thisMinX >= otherMinX) && (thisMinX <= otherMaxX)) ||
        ((otherMinX >= thisMinX) && (otherMinX <= thisMaxX));
    if (!xCollide) return false;

    var thisMinY = this.position.y - (this.scale.y / 2);
    var thisMaxY = boundingBox.position.y + (boundingBox.scale.y / 2);
    var otherMinY = boundingBox.position.y - (boundingBox.scale.y / 2);
    var otherMaxY = boundingBox.position.y + (boundingBox.scale.y / 2);

    var yCollide = ((thisMinY >= otherMinY) && (thisMinY <= otherMaxY)) ||
        ((otherMinY >= thisMinY) && (otherMinY <= thisMaxY));
    if (!yCollide) return false;

    var thisMinZ = this.position.z - (this.scale.z / 2);
    var thisMaxZ = boundingBox.position.z + (boundingBox.scale.z / 2);
    var otherMinZ = boundingBox.position.z - (boundingBox.scale.z / 2);
    var otherMaxZ = boundingBox.position.z + (boundingBox.scale.z / 2);

    var zCollide = ((thisMinZ >= otherMinZ) && (thisMinZ <= otherMaxZ)) ||
        ((otherMinZ >= thisMinZ) && (otherMinZ <= thisMaxZ));
    if (!zCollide) return false;

    return true; 
};

app.BoundingBox.prototype.draw = function() {
    var translationMat = app.math.Matrix4.translation(this.position.x, this.position.y, this.position.z);
    var scaleMat = app.math.Matrix4.scale(this.scale.x, this.scale.y, this.scale.z);
    var modelMat = translationMat.times(scaleMat);

    var shader = app.shaders["bounding_box_shader"];

    this.mesh.draw(shader, modelMat);
};

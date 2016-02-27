var app = app || {};
app.objects = app.objects || {};

app.objects.Plane = function(position) {
    var self = this;

    this.position = position;
    this.updateModelMatrix();

    this.texture = app.gl.createTexture();
    var img = new Image();
    img.onload = function() { self.loadTexture(img); };
    img.src = "resources/plane-texture.jpg";

    this.mesh = new app.Mesh(app.objects.planeModelData["vertices"], 
                             app.objects.planeModelData["normals"],
                             app.objects.planeModelData["faces"]);
};

app.objects.Plane.prototype.loadTexture = function(img) {
    app.gl.bindTexture(app.gl.TEXTURE_2D, this.texture);
    app.gl.texImage2D(app.gl.TEXTURE_2D, 0, app.gl.RGBA, app.gl.RGBA, app.gl.UNSIGNED_BYTE, img);

    app.gl.texParameteri(app.gl.TEXTURE_2D, app.gl.TEXTURE_WRAP_S, app.gl.REPEAT);
    app.gl.texParameteri(app.gl.TEXTURE_2D, app.gl.TEXTURE_WRAP_T, app.gl.REPEAT);

    app.gl.texParameteri(app.gl.TEXTURE_2D, app.gl.TEXTURE_MAG_FILTER, app.gl.LINEAR);
    app.gl.texParameteri(app.gl.TEXTURE_2D, app.gl.TEXTURE_MIN_FILTER, app.gl.LINEAR);

    app.gl.bindTexture(app.gl.TEXTURE_2D, null);
};

app.objects.Plane.prototype.updateModelMatrix = function() {
    var translationMat = app.math.Matrix4.translation(this.position.x, this.position.y, this.position.z);
    var scaleMat = app.math.Matrix4.scale(500, 1, 500);
    this.modelMat = translationMat.times(scaleMat);
};

app.objects.Plane.prototype.draw = function(shader) {
    app.gl.activeTexture(app.gl.TEXTURE0);
    app.gl.bindTexture(app.gl.TEXTURE_2D, this.texture);
    app.gl.uniform1i(app.gl.getUniformLocation(shader.shaderProgram, "sampler"), 0);

    shader.setVec3Property("shipsPosition", app.ship.position.x, app.ship.position.y, app.ship.position.z);

    this.mesh.draw(shader, this.modelMat);
};

app.objects.Plane.prototype.update = function(timeDelta) {
    app.plane.position.x = app.ship.position.x;
    app.plane.position.z = app.ship.position.z;
    this.updateModelMatrix();
};

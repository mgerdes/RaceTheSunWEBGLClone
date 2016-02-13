var app = app || {};
app.objects = app.objects || {};

app.objects.Mesh = function(vertices, normals, color) {
    this.verticesBuffer = app.gl.createBuffer(); 
    this.normalsBuffer = app.gl.createBuffer(); 
    this.numberOfVertices = vertices.length / 3;

    app.gl.bindBuffer(app.gl.ARRAY_BUFFER, this.verticesBuffer);
    app.gl.bufferData(app.gl.ARRAY_BUFFER, new Float32Array(vertices), app.gl.STATIC_DRAW);

    app.gl.bindBuffer(app.gl.ARRAY_BUFFER, this.normalsBuffer);
    app.gl.bufferData(app.gl.ARRAY_BUFFER, new Float32Array(normals), app.gl.STATIC_DRAW);

    this.color = color;
};

app.objects.Mesh.prototype.draw = function(shader) {
    shader.enable();

    app.gl.bindBuffer(app.gl.ARRAY_BUFFER, this.verticesBuffer);
    app.gl.vertexAttribPointer(shader.vertexPositionAttribute, 3, app.gl.FLOAT, false, 0, 0);

    app.gl.bindBuffer(app.gl.ARRAY_BUFFER, this.normalsBuffer);
    app.gl.vertexAttribPointer(shader.vertexNormalAttribute, 3, app.gl.FLOAT, false, 0, 0);

    if (this.color) {
        shader.setVec3Property("color", this.color.x, this.color.y, this.color.z);
    } 
    else {
        shader.setVec3Property("color", 0, 0, 0);
    }

    app.gl.drawArrays(app.gl.TRIANGLES, 0, this.numberOfVertices);
};

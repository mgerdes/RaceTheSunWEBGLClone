var app = app || {};

app.Mesh = function(vertices, normals, indices, color) {
    this.numberOfVertices = vertices.length / 3;

    this.verticesBuffer = app.gl.createBuffer(); 
    app.gl.bindBuffer(app.gl.ARRAY_BUFFER, this.verticesBuffer);
    app.gl.bufferData(app.gl.ARRAY_BUFFER, new Float32Array(vertices), app.gl.STATIC_DRAW);

    this.normalsBuffer = app.gl.createBuffer(); 
    app.gl.bindBuffer(app.gl.ARRAY_BUFFER, this.normalsBuffer);
    app.gl.bufferData(app.gl.ARRAY_BUFFER, new Float32Array(normals), app.gl.STATIC_DRAW);

    this.indices = indices;
    this.indicesBuffer = app.gl.createBuffer();
    app.gl.bindBuffer(app.gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
    app.gl.bufferData(app.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), app.gl.STATIC_DRAW);

    if (color) {
        this.color = color;
    }
};

app.Mesh.prototype.draw = function(shader, modelMat) {
    shader.enable();

    if (this.color) {
        shader.setVec3Property("color", this.color.x, this.color.y, this.color.z);
    } else {
        shader.setVec3Property("color", 0, 0, 0);
    }

    shader.setMat4Property("modelMat", modelMat);
    shader.setMat4Property("normalMat", modelMat.inverse().transpose());

    app.gl.bindBuffer(app.gl.ARRAY_BUFFER, this.verticesBuffer);
    app.gl.vertexAttribPointer(shader.vertexPositionAttribute, 3, app.gl.FLOAT, false, 0, 0);

    app.gl.bindBuffer(app.gl.ARRAY_BUFFER, this.normalsBuffer);
    app.gl.vertexAttribPointer(shader.vertexNormalAttribute, 3, app.gl.FLOAT, false, 0, 0);

    app.gl.bindBuffer(app.gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
    app.gl.drawElements(app.gl.TRIANGLES, this.numberOfVertices, app.gl.UNSIGNED_SHORT, 0);
};

var app = app || {};

app.LineLoopMesh = function(vertices) {
    this.numberOfVertices = vertices.length / 3;

    this.verticesBuffer = app.gl.createBuffer(); 
    app.gl.bindBuffer(app.gl.ARRAY_BUFFER, this.verticesBuffer);
    app.gl.bufferData(app.gl.ARRAY_BUFFER, new Float32Array(vertices), app.gl.STATIC_DRAW);
};

app.LineLoopMesh.prototype.draw = function(shader, modelMat) {
    shader.enable();

    shader.setMat4Property("modelMat", modelMat);
    shader.setMat4Property("normalMat", modelMat.inverse().transpose());

    app.gl.bindBuffer(app.gl.ARRAY_BUFFER, this.verticesBuffer);
    app.gl.vertexAttribPointer(shader.vertexPositionAttribute, 3, app.gl.FLOAT, false, 0, 0);

    app.gl.drawArrays(app.gl.LINE_LOOP, 0, this.numberOfVertices);
};

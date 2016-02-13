var app = app || {};

app.Shader = function(fragmentShaderId, vertexShaderId) {
    var fragmentShader = app.Shader.getShader(fragmentShaderId);
    var vertexShader = app.Shader.getShader(vertexShaderId);

    this.shaderProgram = app.gl.createProgram();
    app.gl.attachShader(this.shaderProgram, fragmentShader);
    app.gl.attachShader(this.shaderProgram, vertexShader);
    app.gl.linkProgram(this.shaderProgram);

    if (!app.gl.getProgramParameter(this.shaderProgram, app.gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    this.vertexPositionAttribute = app.gl.getAttribLocation(this.shaderProgram, "vertexPosition");
    app.gl.enableVertexAttribArray(this.vertexPositionAttribute);

    this.vertexNormalAttribute = app.gl.getAttribLocation(this.shaderProgram, "vertexNormal");
    app.gl.enableVertexAttribArray(this.vertexNormalAttribute);

    this.uniformLocations = {};
};

app.Shader.prototype.setMat4Property = function(mat4Name, matrix) {
    this.enable();
    if (!this.uniformLocations[mat4Name]) {
        this.uniformLocations[mat4Name] = app.gl.getUniformLocation(this.shaderProgram, mat4Name);
    }
    app.gl.uniformMatrix4fv(this.uniformLocations[mat4Name], false, new Float32Array(matrix.m));
};

app.Shader.prototype.setVec3Property = function(vec3Name, x, y, z) {
    this.enable();
    if (!this.uniformLocations[vec3Name]) {
        this.uniformLocations[vec3Name] = app.gl.getUniformLocation(this.shaderProgram, vec3Name);
    }
    app.gl.uniform3f(this.uniformLocations[vec3Name], x, y, z);
};

app.Shader.prototype.enable = function() {
    app.gl.useProgram(this.shaderProgram);
};

app.Shader.getShader = function(id) {
    var shaderScript = document.getElementById(id);

    if (!shaderScript) {
        return null;
    }

    var theSource = "";
    var currentChild = shaderScript.firstChild;

    while(currentChild) {
        if (currentChild.nodeType == 3) {
            theSource += currentChild.textContent;
        }

        currentChild = currentChild.nextSibling;
    }

    var shader;

    if (shaderScript.type == "x-shader/x-fragment") {
        shader = app.gl.createShader(app.gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = app.gl.createShader(app.gl.VERTEX_SHADER);
    } else {
        return null;
    }

    app.gl.shaderSource(shader, theSource);
    app.gl.compileShader(shader);

    if (!app.gl.getShaderParameter(shader, app.gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + app.gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
};

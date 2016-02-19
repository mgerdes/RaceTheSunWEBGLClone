var app = app || {};

app.start = function() {
    var canvas = document.getElementById("glcanvas");
    app.gl = app.initWebGL(canvas);
    app.initApp();

    if (app.gl) {
        app.gl.clearColor(1, 1, 1, 1);
        app.gl.clearDepth(1);
        app.gl.enable(app.gl.DEPTH_TEST);
        app.gl.depthFunc(app.gl.LESS);

        setInterval(app.gameLoop, 15);
    }
};

app.initWebGL = function(canvas) {
    var gl = null;

    try {
        gl = canvas.getContext("experimental-webgl");
    }
    catch(e) {
    }

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
    }

    canvas.width = window.screen.width;
    canvas.height = window.screen.height;
    gl.viewport(0, 0, canvas.width, canvas.height);

    return gl;
};

app.initApp = function() {
    app.shaders = {};
    app.shaders["default_shader"] = new app.Shader("shader-fs", "shader-vs");
    app.shaders["bounding_box_shader"] = new app.Shader("bounding-box-shader-fs", "bounding-box-shader-vs");

    app.ship = new app.objects.Ship();

    var camera_position = new app.math.Vector3(0, 0.2, 0);
    var camera_center = new app.math.Vector3(0, 0, 0);
    var camera_up = new app.math.Vector3(0, 1, 0);
    var screen_width = 1280;
    var screen_height = 720;
    app.camera = new app.Camera(camera_position, camera_center, camera_up, screen_width, screen_height);

    app.plane = new app.objects.Plane(new app.math.Vector3(0, -1, 0));

    app.obstacles = [];
    for (var i = 0; i < 5; i++) {
        if (i % 2) {
            app.obstacles.push(new app.Obstacle0(new app.math.Vector3(0, 0, 40 + i * 200)));
        } 
        else {
            app.obstacles.push(new app.Obstacle1(new app.math.Vector3(0, 0, 40 + i * 200)));
        }
        app.obstacles.push(new app.Obstacle2(new app.math.Vector3(20, 0, 40 + i * 200)));
        app.obstacles.push(new app.Obstacle2(new app.math.Vector3(20, 0, 80 + i * 200)));
        app.obstacles.push(new app.Obstacle2(new app.math.Vector3(20, 0, 120 + i * 200)));
        app.obstacles.push(new app.Obstacle2(new app.math.Vector3(20, 0, 160 + i * 200)));
    }

    app.isKeyPressed = {};

    document.onkeydown = function (event) {
        if (event.keyCode == 37) {
            app.ship.isMovingLeft = true;
        } 
        else if (event.keyCode == 39) {
            app.ship.isMovingRight = true;
        }
    };
    document.onkeyup = function (event) {
        if (event.keyCode == 37) {
            app.ship.isMovingLeft = false;
        } 
        else if (event.keyCode == 39) {
            app.ship.isMovingRight = false;
        }
    };
};

app.gameLoop = function() {
    app.updateScene(0.015);
    app.drawScene();
};

app.updateScene = function(timeDelta) {
    app.camera.center.z = app.ship.position.z;
    app.camera.position.z = app.ship.position.z - 0.5;

    app.camera.center.x = app.ship.position.x;
    app.camera.position.x = app.ship.position.x;

    for (shaderName in app.shaders) {
        app.shaders[shaderName].setMat4Property("projMat", app.camera.projectionMatrix);
        app.shaders[shaderName].setMat4Property("viewMat", app.camera.viewMatrix);
    }

    app.plane.update(timeDelta);
    app.ship.update(timeDelta);
    app.camera.updateViewMatrix();
};

app.drawScene = function() {
    app.gl.clear(app.gl.COLOR_BUFFER_BIT | app.gl.DEPTH_BUFFER_BIT);

    var shader = app.shaders["default_shader"];

    app.ship.draw(shader);

    for (var i = 0; i < app.obstacles.length; i++) {
        app.obstacles[i].draw(shader);
    }

    app.plane.draw(shader);
};

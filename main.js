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
    app.shaders["shadow_shader"] = new app.Shader("shadow-shader-fs", "shadow-shader-vs");

    app.ship = new app.objects.Ship();
    app.ship.position.z -= 40;

    var camera_position = new app.math.Vector3(0, 0.5, 0);
    var camera_center = new app.math.Vector3(0, 0.2, 0);
    var camera_up = new app.math.Vector3(0, 1, 0);
    app.deltaZ = 1.5;
    var screen_width = window.screen.width;
    var screen_height = window.screen.height;
    app.camera = new app.Camera(camera_position, camera_center, camera_up, screen_width, screen_height);

    app.plane = new app.objects.Plane(new app.math.Vector3(0, -1, 0));

    app.shipZPositionAtStartOfObstacle = app.ship.position.z;
    app.currentObstacleIndex = 0;
    app.obstacles = [];
    app.obstacles.push(new app.Obstacle0(new app.math.Vector3(0, 0, 000)));
    app.obstacles.push(new app.Obstacle1(new app.math.Vector3(0, 0, 200)));
    app.obstacles.push(new app.Obstacle3(new app.math.Vector3(0, 0, 400)));
    app.obstacles.push(new app.Obstacle0(new app.math.Vector3(0, 0, 600)));
    app.obstacles.push(new app.Obstacle1(new app.math.Vector3(0, 0, 800)));
    app.obstacles.push(new app.Obstacle3(new app.math.Vector3(0, 0, 1000)));
    app.obstacles.push(new app.Obstacle0(new app.math.Vector3(0, 0, 1200)));
    app.obstacles.push(new app.Obstacle1(new app.math.Vector3(0, 0, 1400)));
    app.obstacles.push(new app.Obstacle3(new app.math.Vector3(0, 0, 1600)));

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
    app.gl.clear(app.gl.COLOR_BUFFER_BIT | app.gl.DEPTH_BUFFER_BIT);
    app.drawScene();
    app.drawShadows();
};

app.updateScene = function(timeDelta) {
    if (app.shipZPositionAtStartOfObstacle + 200 < app.ship.position.z) {
        app.obstacles[app.currentObstacleIndex].shiftZUnits(9 * 200);
        app.shipZPositionAtStartOfObstacle = app.ship.position.z;
        app.currentObstacleIndex = (app.currentObstacleIndex + 1) % 9;
    }

    //app.handleCollisions();

    app.camera.center.z = app.ship.position.z;
    app.camera.position.z = app.ship.position.z - app.deltaZ;

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

app.handleCollisions = function() {
    var currentObstacle = app.obstacles[app.currentObstacleIndex];
    for (var i = 0; i < currentObstacle.objects.length; i++) {
        if (app.ship.boundingBox1.collidesWith(currentObstacle.objects[i].boundingBox)) {
            location.reload(); 
        }
    }
};

app.drawShadows = function() {
    var shader = app.shaders["shadow_shader"];
    shader.setVec3Property("lightPosition", 0, 1000, app.ship.position.z + 2000);
    app.ship.draw(shader);
    for (var i = 0; i < app.obstacles.length; i++) {
        app.obstacles[i].draw(shader);
    }
};

app.drawScene = function() {
    var shader = app.shaders["default_shader"];
    app.ship.draw(shader);
    for (var i = 0; i < app.obstacles.length; i++) {
        app.obstacles[i].draw(shader);
    }
    app.plane.draw(shader);
};

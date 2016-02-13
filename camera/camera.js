var app = app || {};

app.Camera = function(position, center, up, width, height) {
    this.position = position;
    this.center = center;
    this.up = up;
    this.width = width;
    this.height = height;

    this.updateViewMatrix();
    this.updateProjectionMatrix();
};

app.Camera.prototype.updateViewMatrix = function() {
    var p = app.math.Matrix4.translation(-this.position.x, -this.position.y, -this.position.z);   

    var f = (this.center.minus(this.position)).normal();
    var r = (f.cross(this.up)).normal();
    var u = (r.cross(f)).normal();

    var ori = app.math.Matrix4.identity();
    ori.m[0] = r.x;
    ori.m[4] = r.y;
    ori.m[8] = r.z;
    ori.m[1] = u.x;
    ori.m[5] = u.y;
    ori.m[9] = u.z;
    ori.m[2] = -f.x;
    ori.m[6] = -f.y;
    ori.m[10] = -f.z;

    this.viewMatrix = ori.times(p);
};

app.Camera.prototype.updateProjectionMatrix = function() {
    this.projectionMatrix = new app.math.Matrix4(0, 0, 0, 0,
                                                 0, 0, 0, 0,
                                                 0, 0, 0, 0,
                                                 0, 0, 0, 0);
    var fovy = 60;
    var aspect = this.width / this.height;
    var near = 0.1;
    var far = 1000;

    var fov_rad = fovy * app.math.ONE_DEG_IN_RAD;
    var range = Math.tan(fov_rad / 2) * near;
    var sx = (2 * near) / (range * aspect + range * aspect);
    var sy = near / range;
    var sz = -(far + near) / (far - near);
    var pz = -(2 * far * near) / (far - near);

    this.projectionMatrix.m[0] = sx;
    this.projectionMatrix.m[5] = sy;
    this.projectionMatrix.m[10] = sz;
    this.projectionMatrix.m[14] = pz;
    this.projectionMatrix.m[11] = -1;
};

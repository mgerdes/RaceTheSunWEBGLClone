var app = app || {};
app.math = app.math || {};

app.math.Matrix4 = function(a, b, c, d,
                            e, f, g, h,
                            i, j, k, l,
                            m, n, o, p) {
    this.m = [];
    this.m[0] = a;
    this.m[1] = e;
    this.m[2] = i;
    this.m[3] = m;
    this.m[4] = b;
    this.m[5] = f;
    this.m[6] = j;
    this.m[7] = n;
    this.m[8] = c;
    this.m[9] = g;
    this.m[10] = k;
    this.m[11] = o;
    this.m[12] = d;
    this.m[13] = h;
    this.m[14] = l;
    this.m[15] = p;
};

app.math.Matrix4.identity = function() {
    return new app.math.Matrix4(1, 0, 0, 0,
                                0, 1, 0, 0,
                                0, 0, 1, 0,
                                0, 0, 0, 1);
};

app.math.Matrix4.translation = function(x, y, z) {
    return new app.math.Matrix4(1, 0, 0, x,
                                0, 1, 0, y,
                                0, 0, 1, z,
                                0, 0, 0, 1);
};

app.math.Matrix4.scale = function(x, y, z) {
    return new app.math.Matrix4(x, 0, 0, 0,
                                0, y, 0, 0,
                                0, 0, z, 0,
                                0, 0, 0, 1);
};

app.math.Matrix4.rotation = function(axis, theta) {
    var c = Math.cos(theta);
    var s = Math.sin(theta);
    var x1 = c + axis.x * axis.x * (1 - c);
    var x2 = axis.x * axis.y * (1 - c) - axis.z * s;
    var x3 = axis.x * axis.z * (1 - c) + axis.y * s;
    var y1 = axis.y * axis.x * (1 - c) + axis.z * s;
    var y2 = c + axis.y * axis.y * (1 - c);
    var y3 = axis.y * axis.z * (1 - c) - axis.x * s;
    var z1 = axis.z * axis.x * (1 - c) - axis.y * s;
    var z2 = axis.z * axis.y * (1 - c) + axis.x * s;
    var z3 = c + axis.z * axis.z * (1 - c);
    return new app.math.Matrix4(x1, y1, z1, 0,
                                x2, y2, z2, 0,
                                x3, y3, z3, 0,
                                0, 0, 0, 1);
};

app.math.Matrix4.prototype.determinant = function() {
	return this.m[12] * this.m[9] * this.m[6] * this.m[3] -
		   this.m[8] * this.m[13] * this.m[6] * this.m[3] -
		   this.m[12] * this.m[5] * this.m[10] * this.m[3] +
		   this.m[4] * this.m[13] * this.m[10] * this.m[3] +
		   this.m[8] * this.m[5] * this.m[14] * this.m[3] -
		   this.m[4] * this.m[9] * this.m[14] * this.m[3] -
		   this.m[12] * this.m[9] * this.m[2] * this.m[7] +
		   this.m[8] * this.m[13] * this.m[2] * this.m[7] +
		   this.m[12] * this.m[1] * this.m[10] * this.m[7] -
		   this.m[0] * this.m[13] * this.m[10] * this.m[7] -
		   this.m[8] * this.m[1] * this.m[14] * this.m[7] +
		   this.m[0] * this.m[9] * this.m[14] * this.m[7] +
		   this.m[12] * this.m[5] * this.m[2] * this.m[11] -
		   this.m[4] * this.m[13] * this.m[2] * this.m[11] -
		   this.m[12] * this.m[1] * this.m[6] * this.m[11] +
		   this.m[0] * this.m[13] * this.m[6] * this.m[11] +
		   this.m[4] * this.m[1] * this.m[14] * this.m[11] -
		   this.m[0] * this.m[5] * this.m[14] * this.m[11] -
		   this.m[8] * this.m[5] * this.m[2] * this.m[15] +
		   this.m[4] * this.m[9] * this.m[2] * this.m[15] +
		   this.m[8] * this.m[1] * this.m[6] * this.m[15] -
		   this.m[0] * this.m[9] * this.m[6] * this.m[15] -
		   this.m[4] * this.m[1] * this.m[10] * this.m[15] +
		   this.m[0] * this.m[5] * this.m[10] * this.m[15];
};

app.math.Matrix4.prototype.inverse = function() {
	var det = this.determinant();

	if (det === 0) {
        // Problem if this happens
		return this;
	}

	var inv_det = 1 / det;
	
	return new app.math.Matrix4(
		inv_det * (
			this.m[9] * this.m[14] * this.m[7] - this.m[13] * this.m[10] * this.m[7] +
			this.m[13] * this.m[6] * this.m[11] - this.m[5] * this.m[14] * this.m[11] -
			this.m[9] * this.m[6] * this.m[15] + this.m[5] * this.m[10] * this.m[15]
		),
		inv_det * (
			this.m[13] * this.m[10] * this.m[3] - this.m[9] * this.m[14] * this.m[3] -
			this.m[13] * this.m[2] * this.m[11] + this.m[1] * this.m[14] * this.m[11] +
			this.m[9] * this.m[2] * this.m[15] - this.m[1] * this.m[10] * this.m[15]
		),
		inv_det * (
			this.m[5] * this.m[14] * this.m[3] - this.m[13] * this.m[6] * this.m[3] +
			this.m[13] * this.m[2] * this.m[7] - this.m[1] * this.m[14] * this.m[7] -
			this.m[5] * this.m[2] * this.m[15] + this.m[1] * this.m[6] * this.m[15]
		),
		inv_det * (
			this.m[9] * this.m[6] * this.m[3] - this.m[5] * this.m[10] * this.m[3] -
			this.m[9] * this.m[2] * this.m[7] + this.m[1] * this.m[10] * this.m[7] +
			this.m[5] * this.m[2] * this.m[11] - this.m[1] * this.m[6] * this.m[11]
		),
		inv_det * (
			this.m[12] * this.m[10] * this.m[7] - this.m[8] * this.m[14] * this.m[7] -
			this.m[12] * this.m[6] * this.m[11] + this.m[4] * this.m[14] * this.m[11] +
			this.m[8] * this.m[6] * this.m[15] - this.m[4] * this.m[10] * this.m[15]
		),
		inv_det * (
			this.m[8] * this.m[14] * this.m[3] - this.m[12] * this.m[10] * this.m[3] +
			this.m[12] * this.m[2] * this.m[11] - this.m[0] * this.m[14] * this.m[11] -
			this.m[8] * this.m[2] * this.m[15] + this.m[0] * this.m[10] * this.m[15]
		),
		inv_det * (
			this.m[12] * this.m[6] * this.m[3] - this.m[4] * this.m[14] * this.m[3] -
			this.m[12] * this.m[2] * this.m[7] + this.m[0] * this.m[14] * this.m[7] +
			this.m[4] * this.m[2] * this.m[15] - this.m[0] * this.m[6] * this.m[15]
		),
		inv_det * (
			this.m[4] * this.m[10] * this.m[3] - this.m[8] * this.m[6] * this.m[3] +
			this.m[8] * this.m[2] * this.m[7] - this.m[0] * this.m[10] * this.m[7] -
			this.m[4] * this.m[2] * this.m[11] + this.m[0] * this.m[6] * this.m[11]
		),
		inv_det * (
			this.m[8] * this.m[13] * this.m[7] - this.m[12] * this.m[9] * this.m[7] +
			this.m[12] * this.m[5] * this.m[11] - this.m[4] * this.m[13] * this.m[11] -
			this.m[8] * this.m[5] * this.m[15] + this.m[4] * this.m[9] * this.m[15]
		),
		inv_det * (
			this.m[12] * this.m[9] * this.m[3] - this.m[8] * this.m[13] * this.m[3] -
			this.m[12] * this.m[1] * this.m[11] + this.m[0] * this.m[13] * this.m[11] +
			this.m[8] * this.m[1] * this.m[15] - this.m[0] * this.m[9] * this.m[15]
		),
		inv_det * (
			this.m[4] * this.m[13] * this.m[3] - this.m[12] * this.m[5] * this.m[3] +
			this.m[12] * this.m[1] * this.m[7] - this.m[0] * this.m[13] * this.m[7] -
			this.m[4] * this.m[1] * this.m[15] + this.m[0] * this.m[5] * this.m[15]
		),
		inv_det * (
			this.m[8] * this.m[5] * this.m[3] - this.m[4] * this.m[9] * this.m[3] -
			this.m[8] * this.m[1] * this.m[7] + this.m[0] * this.m[9] * this.m[7] +
			this.m[4] * this.m[1] * this.m[11] - this.m[0] * this.m[5] * this.m[11]
		),
		inv_det * (
			this.m[12] * this.m[9] * this.m[6] - this.m[8] * this.m[13] * this.m[6] -
			this.m[12] * this.m[5] * this.m[10] + this.m[4] * this.m[13] * this.m[10] +
			this.m[8] * this.m[5] * this.m[14] - this.m[4] * this.m[9] * this.m[14]
		),
		inv_det * (
			this.m[8] * this.m[13] * this.m[2] - this.m[12] * this.m[9] * this.m[2] +
			this.m[12] * this.m[1] * this.m[10] - this.m[0] * this.m[13] * this.m[10] -
			this.m[8] * this.m[1] * this.m[14] + this.m[0] * this.m[9] * this.m[14]
		),
		inv_det * (
			this.m[12] * this.m[5] * this.m[2] - this.m[4] * this.m[13] * this.m[2] -
			this.m[12] * this.m[1] * this.m[6] + this.m[0] * this.m[13] * this.m[6] +
			this.m[4] * this.m[1] * this.m[14] - this.m[0] * this.m[5] * this.m[14]
		),
		inv_det * (
			this.m[4] * this.m[9] * this.m[2] - this.m[8] * this.m[5] * this.m[2] +
			this.m[8] * this.m[1] * this.m[6] - this.m[0] * this.m[9] * this.m[6] -
			this.m[4] * this.m[1] * this.m[10] + this.m[0] * this.m[5] * this.m[10]
		)
	);
};


app.math.Matrix4.prototype.transpose = function() {
    return new app.math.Matrix4(
        this.m[0], this.m[4], this.m[8], this.m[12],
        this.m[1], this.m[5], this.m[9], this.m[13],
        this.m[2], this.m[6], this.m[10], this.m[14],
        this.m[3], this.m[7], this.m[11], this.m[15]
    );
};

app.math.Matrix4.prototype.times = function(other) {
    if (other instanceof app.math.Vector3) {
        var x = this.m[0] * other.x + this.m[4] * other.y + this.m[8] * other.z + this.m[12];
        var y = this.m[1] * other.x + this.m[5] * other.y + this.m[9] * other.z + this.m[13];
        var z = this.m[2] * other.x + this.m[6] * other.y + this.m[10] * other.z + this.m[14];

        return new app.math.Vector3(x, y, z);
    } 
    else if (other instanceof app.math.Matrix4) {
        m = new app.math.Matrix4();

        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                var sum = 0;
                for (var i = 0; i < 4; i++) {
                    sum += this.m[row + i * 4] * other.m[i + col * 4];
                }
                m.m[row + col * 4] = sum;
            }
        }

        return m;
    } 
    else {
        m = new app.math.Matrix4();

        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                m.m[row + col * 4] = this.m[row + col * 4] * other;
            }
        }

        return m;
    }
};

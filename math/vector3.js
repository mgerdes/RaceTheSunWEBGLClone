var app = app || {};
app.math = app.math || {};

app.math.Vector3 = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

app.math.Vector3.prototype.add = function(other) {
    if (other instanceof app.math.Vector3) {
        return new app.math.Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    return new app.math.Vector3(this.x + other, this.y + other, this.z + other); 
};

app.math.Vector3.prototype.minus = function(other) {
    if (other instanceof app.math.Vector3) {
        return new app.math.Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    return new app.math.Vector3(this.x - other, this.y - other, this.z - other); 
};

app.math.Vector3.prototype.times = function(other) {
    if (other instanceof app.math.Vector3) {
        return new app.math.Vector3(this.x * other.x, this.y * other.y, this.z * other.z);
    }
    return new app.math.Vector3(this.x * other, this.y * other, this.z * other);
};

app.math.Vector3.prototype.dot = function(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
};

app.math.Vector3.prototype.cross = function(other) {
    var x = this.y * other.z - this.z * other.y;
    var y = this.z * other.x - this.x * other.z;
    var z = this.x * other.y - this.y * other.x;
    return new app.math.Vector3(x, y, z);
};

app.math.Vector3.prototype.length = function() {
    return Math.sqrt(this.dot(this));
};

app.math.Vector3.prototype.normal = function() {
    var l = this.length();
    return new app.math.Vector3(this.x / l, this.y / l, this.z / l);
};

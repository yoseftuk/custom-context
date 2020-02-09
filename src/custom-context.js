HTMLCanvasElement.prototype.getCustomContext = function () {

    const ctx = this.getContext('2d');
    if (!ctx) return null;

    initImageDrawing(ctx);
    initFunctionDrawing(ctx);
    initShapesDrawing(ctx);
    initAnimations(ctx);
    initHotSpot(ctx);
    initRecord(ctx);

    // -- DOWNLOAD BLOB
    ctx.downloadURL = function(url, filename) {
        var a = document.createElement('a');
        a.style = 'display: none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };
    // -- DOWNLOAD IMAGE
    ctx.download = function(filename) {
        const url = this.toDataURL();
        this.downloadURL(url, filename);
    };
    ctx.getAllImageData = function() {
        return this.getImageData(0, 0, this.canvas.width, this.canvas.height);
    };
    ctx.clearAll = function() {
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    };
    ctx.fillAll = function() {
        this.beginPath();
        this.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.closePath();
    };
    ctx.circle = function(x, y, r) {
        this.beginPath();
        this.arc(x, y, r, 0, Math.PI * 2);
        this.fill();
        this.closePath();
    };
    // -- FLIP VERTICAL -- //
    ctx.flipVertical = function() {
        this.replacePixelsBy((row, col) => ({
            newRow: this.canvas.height - row,
            newCol: col
        }));
    };
    // -- FLIP HORIZONTAL -- //
    ctx.flipHorizontal = function() {
        this.replacePixelsBy((row, col) => ({
          newRow: row,
          newCol: this.canvas.width - col
        }));
    };
    // -- GET INDEX POSITION -- //
    ctx.getIndexPosition = function(index) {
        const col = index % this.canvas.width;
        const row = (index - col) / this.canvas.width;
        return {row, col};
    };
    // -- REPLACE PIXELS BY -- //
    ctx.replacePixelsBy = function(callback) {
        const imageData = this.getAllImageData();
        const data = [...imageData.data];
        for (let i=0; i<this.canvas.width*this.canvas.height; i++) {
            const {row, col} = this.getIndexPosition(i);
            const {newRow, newCol} = callback(row, col);
            const j = this.canvas.width * newRow * 4 + newCol * 4;
            const k = i * 4;
            for (let l=0; l<4; l++) {
                imageData.data[j + l] = data[k + l];
            }
        }
        this.putImageData(imageData, 0, 0);
    };
    // -- CIRCLE LIGHT -- //
    ctx.circleLight = function(cx, cy, radius, brightness = 1.5, vagueness = .5) {
        const imageData = this.getAllImageData();
        const data = imageData.data;
        for (let i = cx - radius; i < cx + radius; i++) {
            for(let j = cy - radius; j < cy + radius; j ++) {
                for (let k=0; k<4; k++) {
                    // console.log(i, j, k, this.canvas.width);
                    data[i * 4 + j * this.canvas.width * 4 + k] *= 1 + (radius - mathTools.distance(i, j, cx, cy) >= 0 ? (1 - mathTools.distance(i, j, cx, cy) / radius) * brightness : 0);
                }
            }
        }
        this.putImageData(imageData, 0, 0);
    };
    // -- FILL RECT ROTATED -- //
    ctx.fillRectRotated = function(x, y, width, height, rotate) {
        ctx.beginPath();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(rotate);
        ctx.fillRect(- width / 2, - height / 2, width, height);
        ctx.closePath();
    };
    // -- FILTERS -- //
    ctx.filterImage = function (img) {
        return new ImageFilter(this, img);
    };

    return ctx;
};


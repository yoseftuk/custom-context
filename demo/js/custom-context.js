HTMLCanvasElement.prototype.getCustomContext = function () {

    const ctx = this.getContext('2d');
    if (!ctx) return null;

    initImageDrawing(ctx);
    initFunctionDrawing(ctx);
    initShapesDrawing(ctx);
    initAnimations(ctx);

    ctx.getAllImageData = function() {
        return this.getImageData(0, 0, this.canvas.width, this.canvas.height);
    };
    ctx.clearAllRect = function() {
        return this.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    ctx.circleLight = function(radius = 0, brightness = 1.5, vagueness = .5) {

    };
    // -- FILTERS -- //
    ctx.filterImage = function (img) {
        return new ImageFilter(this, img);
    };

    return ctx;
};


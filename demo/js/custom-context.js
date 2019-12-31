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
    // -- FILTERS -- //
    ctx.filterImage = function (img) {
        return new ImageFilter(this, img);
    };

    return ctx;
};


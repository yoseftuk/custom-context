HTMLCanvasElement.prototype.getCustomContext = function () {

    const ctx = this.getContext('2d');
    if (!ctx) return null;

    initImageDrawing(ctx);
    initFunctionDrawing(ctx);
    initShapesDrawing(ctx);
    initAnimations(ctx);

    // -- FILTERS -- //
    ctx.filterImage = function (img) {
        return new ImageFilter(this, img);
    };

    return ctx;
};


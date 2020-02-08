function initFunctionDrawing(ctx) {

    // -- DRAW FUNCTION -- //
    ctx.drawFunction = function(callback, options = {}) {
        const xFrom = options.xFrom || 0;
        const xTo = options.xTo === undefined ? ctx.canvas.width : options.xTo;
        const yFrom = options.yFrom || 0;
        const yTo = options.yTo === undefined ? ctx.canvas.height : options.yTo;
        const fill = options.fill;
        const lineWidth = options.lineWidth || 1;
        this.beginPath();
        for (let i=0; i<this.canvas.width; i++) {
            const x = xFrom + i / this.canvas.width * (xTo -xFrom);
            const y = (callback(x) - yFrom) / (yTo - yFrom) * this.canvas.height;
            this.fillRect(i, this.canvas.height - y, 1, fill ? y : lineWidth);
        }
        this.closePath();
    };

    // -- DRAW RADIAL FUNCTION -- //
    ctx.drawRadialFunction = function(callback, options = {}) {
        const xFrom = options.xFrom || 0;
        const xTo = options.xTo === undefined ? ctx.canvas.width / 2 : options.xTo;
        const yFrom = options.yFrom || 0;
        const yTo = options.yTo === undefined ? ctx.canvas.height / 2 : options.yTo;
        const fill = options.fill;
        const lineWidth = options.lineWidth || 1;
        const centerX = options.centerX === undefined ? ctx.canvas.width / 2 : options.centerX;
        const centerY = options.centerY === undefined ? ctx.canvas.height / 2 : options.centerY;

        this.beginPath();
        for (let i=0; i<=Math.PI * 2; i+= .01) {
            const x = (callback(i) - xFrom) / (xTo - xFrom) * Math.cos(i) * this.canvas.width / 2  + centerX,
                y = (callback(i) - yFrom) / (yTo - yFrom) * Math.sin(i) * this.canvas.height / 2 + centerY;
            if(i === 0) {
                this.moveTo(x, y);
            } else {
                this.lineTo(x, y);
            }
        }
        ctx.lineWidth = lineWidth;
        fill ? this.fill() : this.stroke();
        this.closePath();
    };

    // -- DRAW FOURIER SERIES
    /*
    @param a0: number = the cosine with 0 frequency (=constant)
    @param an: (n) => number = function which return the coefficient of cosine with frequency n
    @param bn: (n) => number = function which return the coefficient of sine with frequency n
    @param options: {} = drawing settings
     */
    ctx.drawFuriesSeries = function(a0, an, bn, options = {}) {
        const depth = options.depth || 100;
        this.drawFunction(x => {
            let y = a0;
            for (let i=0; i<depth; i++) {
                y += an(i) * Math.cos(x*i) + bn(i) * Math.sin(x*i);
            }
            return y;
        }, options);

    }

}

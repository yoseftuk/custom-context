function initFunctionDrawing(ctx) {

    // -- DRAW FUNCTION -- //
    ctx.drawFunction = function (callback, options = {}) {
        const xFrom = options.xFrom || 0;
        const xTo = options.xTo === undefined ? ctx.canvas.width : options.xTo;
        const yFrom = options.yFrom || 0;
        const yTo = options.yTo === undefined ? ctx.canvas.height : options.yTo;
        const fill = options.fill;
        const lineWidth = options.lineWidth || 1;
        this.beginPath();
        for (let i = 0; i < this.canvas.width; i++) {
            const x = xFrom + i / this.canvas.width * (xTo - xFrom);
            const y = (callback(x) - yFrom) / (yTo - yFrom) * this.canvas.height;
            console.log(callback(x), yFrom, yTo, this.canvas.height);
            this.fillRect(i, this.canvas.height - y, 1, fill ? y : lineWidth);
        }
        this.closePath();
    };

    // -- DRAW RADIAL FUNCTION -- //
    ctx.drawRadialFunction = function (callback, options = {}) {
        const xFrom = options.xFrom || 0;
        const xTo = options.xTo === undefined ? ctx.canvas.width / 2 : options.xTo;
        const yFrom = options.yFrom || 0;
        const yTo = options.yTo === undefined ? ctx.canvas.height / 2 : options.yTo;
        const fill = options.fill;
        const lineWidth = options.lineWidth || 1;
        const centerX = options.centerX === undefined ? ctx.canvas.width / 2 : options.centerX;
        const centerY = options.centerY === undefined ? ctx.canvas.height / 2 : options.centerY;

        this.beginPath();
        for (let i = 0; i <= Math.PI * 2; i += .01) {
            const x = (callback(i) - xFrom) / (xTo - xFrom) * Math.cos(i) * this.canvas.width / 2 + centerX,
                y = (callback(i) - yFrom) / (yTo - yFrom) * Math.sin(i) * this.canvas.height / 2 + centerY;
            if (i === 0) {
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
    ctx.drawFuriesSeries = function (a0, an, bn, options = {}) {
        const depth = options.depth || 100;
        this.drawFunction(x => {
            let y = a0;
            for (let i = 0; i < depth; i++) {
                y += an(i) * Math.cos(x * i) + bn(i) * Math.sin(x * i);
            }
            return y;
        }, options);

    };

    // -- POLYNOMIAL REGRESSION
    /*
    @param arrX: number[] = sorted array of X values
    @param arrY: number[] = array of Y values for the relevant Xi
    @return (x) => number function which receive number X and return estimated Y
     */
    ctx.polynomialRegression = function (x, y) {
        const N = x.length, arrX = [...x], arrY = [...y];

        return function (t) {
            const x = [...arrX], y = [...arrY];
            for (let i = 1; i < N; i++) {
                for (let j = 0; j < N - i; j++) {
                    y[j] = ((t - x[j + i]) * y[j] + (x[j] - t) * y[j + 1]) / (x[j] - x[j + i]);
                }
            }
            return y[0]
        }
    };
    // -- DRAW DATA POLYNOMIAL
    ctx.drawDataPolynomial = function (arrX, arrY, options) {
        this.drawFunction(this.polynomialRegression(arrX, arrY), options);
    };

    // ctx.cubicBezier = function (p0, p1, p2, p3) {
    //     return (start, end, t) => (((1-t)**3)*p1+3*(1-t)*(1-t)*t*p0+3*(1-t)*t*t*p2 + (t**3)*p3) * (end-start)+start
    // }
    ctx.drawColors = function (callback, options) {
        const xFrom = options.xFrom || 0;
        const xTo = options.xTo === undefined ? ctx.canvas.width : options.xTo;
        const yFrom = options.yFrom || 0;
        const yTo = options.yTo === undefined ? ctx.canvas.height : options.yTo;
        const brightness = options.brightness || ((nx, ny) => 1 / (1 + 1/Math.pow(nx ** 2 + ny ** 2, 1/10) * 5));
        function hslToRgb(h, s, l){
            let r, g, b;
            if(s === 0){
                r = g = b = l; // achromatic
            }else{
                const hue2rgb = (p, q, t) => {
                    if(t < 0) t += 1;
                    if(t > 1) t -= 1;
                    if(t < 1/6) return p + (q - p) * 6 * t;
                    if(t < 1/2) return q;
                    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };

                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }

            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }
        const imageData = this.getAllImageData();
        const data = imageData.data;
        for (let i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
                const x = xFrom + i / this.canvas.width * (xTo - xFrom);
                const y = yFrom + j / this.canvas.height * (yTo - yFrom);
                const [nx, ny] = callback(x, y);
                let hue = Math.atan2(ny, nx) + Math.PI / 2;
                hue /=  2 * Math.PI;
                const lightness = brightness(nx, ny);
                const [r, g, b] = hslToRgb(hue, 1, Math.min(lightness, 1));
                const index = i * this.canvas.width * 4 + j * 4;
                data[index] = r;
                data[index+1] = g;
                data[index+2] = b;
                data[index+3] = 255;
            }
        }
        this.putImageData(imageData, 0, 0);
    }
}

function ImageFilter(ctx, img) {
    this.ctx = ctx;
    this.img = img;
    this.mCanvas = document.createElement('canvas');
    this.mCanvas.width = img.width;
    this.mCanvas.height = img.height;
    this.mCtx = this.mCanvas.getContext('2d');
    this.mCtx.drawImage(img, 0, 0);
    this.imagedata = this.mCtx.getImageData(0, 0, this.mCanvas.width, this.mCanvas.height);
    this.data = this.imagedata.data;

    // -- DRAW -- //
    this.draw = (sx = 0, sy = 0, sw = this.img.width, sh = this.img.height, dx = 0, dy = 0, dw = this.ctx.canvas.width, dh = this.ctx.canvas.height) => {
        this.ctx.drawImageUrl(this.url(), dx, dy, dw, dh, sx, sy, sw, sh);
    };

    // -- GET RESULT URL -- //
    this.url = () => {
        this.mCtx.putImageData(this.imagedata, 0, 0);
        return this.mCanvas.toDataURL();
    };

    // -- GRAYSCALE -- //

    this.grayscale = (percent = 1) => {
        for (let i = 0; i < this.data.length; i += 4) {
            const avg = (this.data[i] + this.data[i + 1] + this.data[i + 2]) / 3;
            this.data[i] += (avg - this.data[i]) * percent;
            this.data[i + 1] += (avg - this.data[i + 1]) * percent;
            this.data[i + 2] += (avg - this.data[i + 2]) * percent;
        }
        return this;
    };

    // -- CONTRAST -- //
    this.contrast = (percent = .75) => {
        for (let i = 0; i < this.data.length; i += 4) {
            for (let j = 0; j < 3; j++) {
                this.data[i + j] = 2 * percent * (this.data[i + j] - 128) + 128;
            }
        }
        return this;
    };

    // -- MAT -- //
    this.mat = (percent = .75) => {
        percent /= 3;
        for (let i = 0; i < this.data.length; i += 4) {
            for (let j = 0; j < 3; j++) {
                if (this.data[i + j] >= 128) {
                    this.data[i + j] += percent * (255 - this.data[i + j]);
                } else {
                    this.data[i + j] *= 1 - percent;
                }
            }
        }
        return this;
    };

    // -- BRIGHTNESS -- //
    this.brightness = (percent = 1.25) => {
        for (let i = 0; i < this.data.length; i += 4) {
            for (let j = 0; j < 3; j++) {
                this.data[i + j] *= percent;
            }
        }
        return this;
    };

    // -- INVERT -- //
    this.invert = (percent = 1) => {
        for (let i = 0; i < this.data.length; i += 4) {
            for (let j = 0; j < 3; j++) {
                this.data[i + j] += (255 - this.data[i + j] * 2) * percent;
            }
        }
        return this;
    };

    // -- R -- //
    this.r = (percent = 1) => {
        for (let i = 0; i < this.data.length; i += 4) {
            this.data[i] *= percent;
        }
        return this;
    };
    // -- G -- //
    this.g = (percent = 1) => {
        for (let i = 1; i < this.data.length; i += 4) {
            this.data[i] *= percent;
        }
        return this;
    };
    // -- B -- //
    this.b = (percent = 1) => {
        for (let i = 2; i < this.data.length; i += 4) {
            this.data[i] *= percent;
        }
        return this;
    };
}

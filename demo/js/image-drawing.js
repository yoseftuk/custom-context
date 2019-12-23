function initImageDrawing(ctx) {

    // -- LOAD IMAGE -- //
    ctx.loadImage = function (url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                img.onload = null;
                resolve(img);
            };
            img.onerror = () => {
                reject('field to load resource');
            };
        });
    };

    // -- DRAW IMAGE URL -- //
    ctx.drawImageUrl = function (url, dx, dy, dw, dh, sx, sy, sw, sh) {
        this.loadImage(url)
            .then(img => {
                if (sx) {
                    this.drawImage(img, dx, dy, dw, dh, sx, sy, sw, sh);
                } else if (dw) {
                    this.drawImage(img, dx, dy, dw, dh)
                } else {
                    this.drawImage(img, dx, dy)
                }
            })
            .catch(() => {
            });
    };


    // -- DRAW CIRCLE IMAGE -- //
    ctx.drawCircleImage = function (img, x, y, radius, sx = 0, sy = 0, sw = img.width, sh = img.height) {
        this.save();
        this.beginPath();
        this.arc(x + radius, y + radius, radius, 0, Math.PI * 2, true);
        this.closePath();
        this.clip();

        this.drawImage(img, sx, sy, sw, sh, x, y, radius * 2, radius * 2);
        this.restore();
    };

    // -- DRAW CIRCLE IMAGE URL -- //
    ctx.drawCircleImageUrl = function (url, x, y, radius, sx = 0, sy = 0, sw, sh) {
        this.loadImage(url)
            .then(img => {
                this.drawCircleImage(img, x, y, radius, sx, sy, sw || img.width, sh || img.height);
            })
            .catch(() => {
            });
    };

    // -- LOAD IMAGE COVER -- //
    ctx.loadImageCover = function (url, w, h) {
        return new Promise((resolve, reject) => {
            this.loadImage(url).then(img => {
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const context = canvas.getCustomContext();
                context.drawImageCover(img, 0, 0, w, h);
                this.loadImage(canvas.toDataURL()).then(resolve).catch(reject);
            }).catch(err => console.error(err));
        });
    };

    // -- DRAW IMAGE COVER -- //
    ctx.drawImageCover = function (img, x, y, w, h) {
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;

        if (imgRatio > canvasRatio) {
            this.drawImage(img, (img.width - img.width * canvasRatio / imgRatio) / 2, 0, img.width * canvasRatio / imgRatio, img.height, x, y, w, h);
        } else {
            this.drawImage(img, 0, (img.height - img.height * imgRatio / canvasRatio) / 2, img.width, img.height * imgRatio / canvasRatio, x, y, w, h);
        }
    };
    // -- DRAW IMAGE COVER URL --//
    ctx.drawImageCoverUrl = function (url, x, y, w, h) {
        return this.loadImage(url).then(img => {
            this.drawImageCover(img, x, y, w, h);
        });
    };

    // -- LOAD IMAGE CONTAIN -- //
    ctx.loadImageContain = function(url, w, h) {
        return new Promise((resolve, reject) => {
            this.loadImage(url).then(img => {
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const context = canvas.getCustomContext();
                context.drawImageContain(img, 0, 0, w, h);
                this.loadImage(canvas.toDataURL()).then(resolve).catch(reject);
            }).catch(err => console.error(err));
        });
    };

    // -- DRAW IMAGE CONTAIN -- //
    ctx.drawImageContain = function (img, x, y, w, h) {
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;

        if (imgRatio > canvasRatio) {
            this.drawImage(img, x, y + (h - h * canvasRatio / imgRatio) / 2, w , h * canvasRatio / imgRatio);
        } else {
            this.drawImage(img, x + (w - w * imgRatio/ canvasRatio) / 2, y, w * imgRatio/ canvasRatio, h);
        }
    };

    // -- DRAW IMAGE CONTAIN URL -- //
    ctx.drawImageContainUrl = function(url, x, y, w, h) {
        return this.loadImage(url).then(img => {
            this.drawImageContain(img, x, y, w, h);
        });
    };

}

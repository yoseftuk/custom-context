
HTMLCanvasElement.prototype.getCustomContext = function() {

    const ctx = this.getContext('2d');
    const canvas = this;
    if(!ctx) return null;

    // -- DRAW ARROW -- //
    ctx.drawArrow = function(x1, y1, x2, y2, arrowEndHeight = 10, arrowEndWidth = 6) {
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.stroke();
        this.closePath();

        const getDiffX = () => x2 - x1;
        const getDiffY = () => y2 - y1;
        var D = Math.sqrt(Math.pow(getDiffX(), 2) + Math.pow(getDiffY(), 2));
        var d1 = {
            x: x2,
            y: y2
        };
        var d2 = {
            x: x2 - arrowEndHeight / D * getDiffX(),
            y: y2 - arrowEndHeight / D * getDiffY()
        };
        var M = getDiffY() / getDiffX();
        var m = 0;
        if (M === Infinity) {
            M = 0;
        } else {
            m = -1 / M;
        }

        var changeX = arrowEndWidth / Math.sqrt(1 + Math.pow(m, 2));
        var d3 = {
            x: d2.x + changeX,
            y: d2.y + m * changeX
        };
        var d4 = {
            x: d2.x - changeX,
            y: d2.y - m * changeX
        };
        ctx.beginPath();
        ctx.moveTo(d1.x, d1.y);
        ctx.lineTo(d3.x, d3.y);
        ctx.lineTo(d4.x, d4.y);
        ctx.lineTo(d1.x, d1.y);
        ctx.fill();
        ctx.closePath();
    };

    // -- LOAD IMAGE -- //
    ctx.loadImage = function(url) {
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
    ctx.drawImageUrl = function(url, dx, dy, dw, dh, sx, sy, sw, sh) {
        this.loadImage(url)
            .then(img => {
                if(sx) {
                    this.drawImage(img, dx, dy, dw, dh, sx, sy, sw, sh);
                } else if(dw) {
                    this.drawImage(img, dx, dy, dw, dh)
                } else {
                    this.drawImage(img, dx, dy)
                }
            })
            .catch(() => {});
    };


    // -- DRAW CIRCLE IMAGE -- //
    ctx.drawCircleImage = function(img, x, y, radius, sx = 0, sy = 0, sw = img.width, sh = img.height) {
        this.save();
        this.beginPath();
        this.arc(x + radius, y + radius, radius, 0, Math.PI * 2, true);
        this.closePath();
        this.clip();

        this.drawImage(img, sx, sy, sw, sh, x, y, radius*2, radius*2);
        this.restore();
    };

    // -- DRAW CIRCLE IMAGE URL -- //
    ctx.drawCircleImageUrl = function(url, x, y, radius, sx = 0, sy = 0, sw, sh) {
      this.loadImage(url)
          .then(img => {
              this.drawCircleImage(img, x, y, radius, sx, sy, sw || img.width, sh || img.height);
          })
          .catch(() => {});
    };

    // -- LINE POLYGON -- //
    ctx.linePolygon = function(cx, cy, radius, vertexesNum, rotate = 0) {

        this.moveTo(cx + Math.cos(rotate) * radius, cy + Math.sin(rotate) * radius);
        for (let i=1; i<=vertexesNum; i++) {
            this.lineTo(cx + Math.cos(rotate + i / vertexesNum * Math.PI * 2) * radius,
                cy + Math.sin(rotate + i / vertexesNum * Math.PI * 2) * radius );
        }
    };

    // -- STROKE POLYGON
    ctx.strokePolygon = function(cx, cy, radius, vertexesNum, rotate = 0) {
        this.beginPath();
        this.linePolygon(cx, cy, radius, vertexesNum, rotate);
        this.stroke();
        this.closePath();
    };

    // -- FILL POLYGON
    ctx.fillPolygon = function(cx, cy, radius, vertexesNum, rotate = 0) {
        this.beginPath();
        this.linePolygon(cx, cy, radius, vertexesNum, rotate);
        this.fill();
        this.closePath();
    };

    // -- FILTERS -- //
    ctx.filterImage = function(img) {
        return new ImageFilter(this, img);
    };

    return ctx;
};


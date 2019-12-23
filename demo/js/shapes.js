function initShapesDrawing(ctx){
    // -- DRAW ARROW -- //
    ctx.drawArrow = function (x1, y1, x2, y2, arrowEndHeight = 10, arrowEndWidth = 6) {
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

    // -- LINE POLYGON -- //
    ctx.linePolygon = function (cx, cy, radius, vertexesNum, rotate = 0) {

        this.moveTo(cx + Math.cos(rotate) * radius, cy + Math.sin(rotate) * radius);
        for (let i = 1; i <= vertexesNum; i++) {
            this.lineTo(cx + Math.cos(rotate + i / vertexesNum * Math.PI * 2) * radius,
                cy + Math.sin(rotate + i / vertexesNum * Math.PI * 2) * radius);
        }
    };

    // -- STROKE POLYGON
    ctx.strokePolygon = function (cx, cy, radius, vertexesNum, rotate = 0) {
        this.beginPath();
        this.linePolygon(cx, cy, radius, vertexesNum, rotate);
        this.stroke();
        this.closePath();
    };

    // -- FILL POLYGON
    ctx.fillPolygon = function (cx, cy, radius, vertexesNum, rotate = 0) {
        this.beginPath();
        this.linePolygon(cx, cy, radius, vertexesNum, rotate);
        this.fill();
        this.closePath();
    };
}

function initHotSpot(ctx) {

    ctx.addHotSpot = function (type, options) {

        return new (window[type[0].toUpperCase() + type.substring(1).toLowerCase() + 'HotSpot'])(this, options);
    }
}


class HotSpot {


    constructor(ctx, options) {
        this.ctx = ctx;
        this.options = options;
        this.listeners = {};
        this.mouseIn = false;
        this.ctx.canvas.addEventListener('click', e => {
            const {X, Y} = this.getXY(e, this.ctx);
            if (this.listeners.click && this.isIn(X, Y)) {
                this.listeners.click(e);
            }
        });
        this.ctx.canvas.addEventListener('mousemove', e => {
            const {X, Y} = this.getXY(e, this.ctx);
            if (this.isIn(X, Y)) {
                this.options.pointOnHover !== false && (this.ctx.canvas.style.cursor = 'pointer');
                this.listeners.mousemove && this.listeners.mousemove(e);
                !this.mouseIn && this.listeners.mouseenter && this.listeners.mouseenter(e);
                this.mouseIn = true;
            } else {
                this.options.pointOnHover !== false && (this.ctx.canvas.style.cursor = '');
                this.mouseIn && this.listeners.mouseleave && this.listeners.mouseleave(e);
                this.mouseIn = false;
            }
        });
    }

    isIn(X, Y) {
        return false
    };
    draw() {
        return this;
    }

    getXY(event, ctx) {
        const X = event.offsetX * ctx.canvas.width / ctx.canvas.offsetWidth;
        const Y = event.offsetY * ctx.canvas.height / ctx.canvas.offsetHeight;
        return {X, Y}
    };

    remove() {
        this.listeners = {};
        return this;
    };

    on(type, callback) {
        this.listeners[type] = callback;
        return this;
    }

    debug(color = 'red') {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        for (let i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                if (this.isIn(i, j)) {
                    this.ctx.fillRect(i, j, 1, 1);
                }
            }
        }
        this.ctx.closePath();
        this.ctx.restore();
        return this;
    }

}

class RectHotSpot extends HotSpot {

    isIn(X, Y) {
        const {x, y, width, height, rotate} = this.options;
        const cx = (x + width / 2),
            cy = (y + height / 2);
        const p = mathTools.rotation(X - cx, Y - cy, -(rotate || 0));
        p.x += cx;
        p.y += cy;
        return p.x > x && p.x < x + width && p.y > y && p.y < y + height;
    }

    draw() {
        const {x, y, width, height }= this.options;
        this.ctx.fillRect(x, y,width, height);
        return super.draw();
    }
}

class CircleHotSpot extends HotSpot {

    isIn(X, Y) {
        const {cx, cy, radius} = this.options;
        return mathTools.distance(cx, cy, X, Y) < radius;
    }
    draw() {
        const {cx, cy, radius }= this.options;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        return super.draw();
    }
}

class PolygonHotSpot extends HotSpot {

    isIn(X, Y) {
        const {cx, cy, radius, vertexCount, rotate} = this.options;
        // -- FIND THE ANGLE
        const theta = (Math.PI * 2.5 - (rotate || 0) - Math.atan2(X - cx, Y - cy)) % (Math.PI * 2);
        // -- FIND THE EDGE WHERE A LINE FROM THE CENTER TO THE EVENT SHOULD MEET
        const edgeIndex = Math.floor(theta * vertexCount / Math.PI / 2);
        // -- CALCULATE THE FUNCTION OF THE EDGE LINE
        const degInterval = Math.PI * 2 / vertexCount;
        const edgeStart = mathTools.degToXY(degInterval * edgeIndex + (rotate || 0), radius);
        const edgeEnd = mathTools.degToXY(degInterval * (edgeIndex + 1) + (rotate || 0), radius);
        const edge = mathTools.lineFunc(edgeStart.x + cx, edgeEnd.x + cx, edgeStart.y + cy, edgeEnd.y + cy);

        // -- CALCULATE THE FUNCTION OF THE LINE GOING FROM THE CENTER TO THE EVENT POINT
        const {m, a} = mathTools.lineFunc(cx, X, cy, Y);
        // -- CALCULATE THE MEETING POINT
        const meetingX = (edge.a - a) / (m - edge.m);
        const meetingY = m * meetingX + a;
        // -- SEE WHETHER THE MEETING POINT IS BEFORE THE EVENT (=EVENT OUT) OR AFTER (=EVENT IN)
        return mathTools.distance(cx, cy, X, Y) < mathTools.distance(cx, cy, meetingX, meetingY);
    }
    draw() {
        const {cx, cy, radius, vertexCount, rotate}= this.options;
        this.ctx.fillPolygon(cx, cy,radius, vertexCount, rotate);
        return super.draw();
    }
}

class StarHotSpot extends HotSpot {

    isIn(X, Y) {
        const {cx, cy, r1, r2, vertexCount, rotate} = this.options;
        // -- FIND THE ANGLE
        const theta = (Math.PI * 2.5 - (rotate || 0) - Math.atan2(X - cx, Y - cy)) % (Math.PI * 2);
        // -- FIND THE EDGE WHERE A LINE FROM THE CENTER TO THE EVENT SHOULD MEET
        const edgeIndex = Math.floor(theta * vertexCount / Math.PI);
        // -- CALCULATE THE FUNCTION OF THE EDGE LINE
        const degInterval = Math.PI / vertexCount;
        const rStart = edgeIndex % 2 === 0 ? r2 : r1;
        const rEnd = edgeIndex % 2 === 0 ? r1 : r2;
        const edgeStart = mathTools.degToXY(degInterval * edgeIndex + (rotate || 0), rStart);
        const edgeEnd = mathTools.degToXY(degInterval * (edgeIndex + 1) + (rotate || 0), rEnd);
        const edge = mathTools.lineFunc(edgeStart.x + cx, edgeEnd.x + cx, edgeStart.y + cy, edgeEnd.y + cy);

        // -- CALCULATE THE FUNCTION OF THE LINE GOING FROM THE CENTER TO THE EVENT POINT
        const {m, a} = mathTools.lineFunc(cx, X, cy, Y);
        // -- CALCULATE THE MEETING POINT
        const meetingX = (edge.a - a) / (m - edge.m);
        const meetingY = m * meetingX + a;
        // -- SEE WHETHER THE MEETING POINT IS BEFORE THE EVENT (=EVENT OUT) OR AFTER (=EVENT IN)
        return mathTools.distance(cx, cy, X, Y) < mathTools.distance(cx, cy, meetingX, meetingY);
    }
    draw() {
        const {cx, cy, r1, r2, vertexCount, rotate}= this.options;
        this.ctx.fillStar(cx, cy, r1, r2, vertexCount, rotate);
        return super.draw();
    }
}

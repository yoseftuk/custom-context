function initHotSpot(ctx) {

    ctx.addHotSpot = function (type, options) {
        return new HotSpot(this, type, options);
    }
}

function HotSpot(ctx, type, options) {


    this.ctx = ctx;
    this.options = options;
    this.listeners = {};
    this.isIn = function (x, y) {
        return false
    };
    const getXY = (event, ctx) => {
        const X = event.offsetX * ctx.canvas.width / ctx.canvas.offsetWidth;
        const Y = event.offsetY * ctx.canvas.height / ctx.canvas.offsetHeight;
        return {X, Y}
    };
    switch (type) {

        case 'rect':
            this.isIn = (X, Y) => {
                const {x, y, width, height, rotate} = this.options;
                const cx = (x + width / 2),
                    cy = (y + height / 2) ;
                const p = mathTools.rotation(X - cx, Y - cy, -(rotate || 0));
                p.x  += cx;
                p.y += cy;
                return p.x > x && p.x < x + width && p.y > y && p.y < y + height;
            };
            break;
        case 'circle':
            this.isIn = (X, Y) => {
                const {x, y, radius} = this.options;
                return mathTools.distance(x, y, X, Y) < radius;
            };
            break;
        case 'diamond':
            this.isIn = (X, Y) => {
                const {x, y, width, height, rotate} = this.options;
                const p = mathTools.rotation(X, Y, -rotate);
                return p.x > x && p.x < x + width && p.y > y && p.y < y + height;
            };
            break;
        case 'polygon':
            this._listener = ctx.canvas.addEventListener('click', e => {
                const x = e.x / ctx.canvas.offsetWidth * ctx.canvas.width;
                const y = e.y / ctx.canvas.offsetHeight * ctx.canvas.height;
                const vertexCount = options.vertexCount >= 3 ? options.vertexCount : 3;
                const rotate = options.rotate !== undefined ? options.rotate : 0;
                const cx = options.cx, cy = options.cy;
                // -- FIND THE ANGLE FROM THE CENTER OF THE POINT TO THE EVENT POINT
                const theta = x > cx ? Math.atan((cy - y) / (cx - x)) : -Math.atan((cy - y) / (cx - x));
                console.log(theta);
                // -- FIND THE EDGE WHERE A LINE FROM THE CENTER TO THE EVENT SHOULD MEET

                // -- CALCULATE THE FUNCTION OF THE EDGE LINE
                // -- CALCULATE THE FUNCTION OF THE LINE GOING FROM THE CENTER TO THE EVENT POINT
                // -- CALCULATE THE MEETING POINT
                // -- SEE WHETHER THE MEETING POINT IS BEFORE THE EVENT (=EVENT OUT) OR AFTER (=EVENT IN)
            });
            break;
        case 'custom':
            break;
        default:
    }
    this.ctx.canvas.addEventListener('click', e => {
        const {X, Y} = getXY(e, this.ctx);
        if(this.listeners.click && this.isIn(X, Y)) {
            this.listeners.click(e);
        }
    });
    this.ctx.canvas.addEventListener('mousemove', e => {
        const {X, Y} = getXY(e, this.ctx);
        if(this.isIn(X, Y)) {
            this.ctx.canvas.style.cursor = 'pointer';
            this.options.pointOnHover !== false && this.listeners.mouseenter && this.listeners.mouseenter(e);
        } else {
            this.ctx.canvas.style.cursor = '';
            this.options.pointOnHover !== false && this.listeners.mouseleave && this.listeners.mouseleave(e);
        }
    });
    this.remove = function () {
        this.listeners = {};
        return this;
    };
    this.on = function (type, callback) {

        this.listeners[type] = callback;
        switch (type) {
            case 'click':

        }
        const listener = this.ctx.canvas.addEventListener(type, e => {
            const {X, Y} = getXY(e, this.ctx);
            if (this.isIn(X, Y)) {
                callback(e);
            }
        });
        return this;
    }

}

function initHotSpot(ctx){

    ctx.addHotSpot = function(type, options) {
        return new HotSpot(this, type, options);
    }
}

function HotSpot(ctx, type, options) {

    switch (type) {

        case 'polygon':
            this._listener = ctx.canvas.addEventListener('click', e => {
                const x = e.x / ctx.canvas.offsetWidth * ctx.canvas.width;
                const y = e.y / ctx.canvas.offsetHeight * ctx.canvas.height;
                const vertexCount = options.vertexCount >=3 ? options.vertexCount : 3;
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
}

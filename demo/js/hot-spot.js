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
            });
            break;
        default:
    }
}

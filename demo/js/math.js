const mathTools = {

    distance: function(x1, y1, x2 = 0, y2 = 0) {
        return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
    },
    rotation(x, y, deg) {
        return {
            x: x * Math.cos(deg) - y * Math.sin(deg),
            y: x * Math.sin(deg) + y * Math.cos(deg)
        }
    },
    lineFunc(x1, x2, y1, y2) {
        const m = (y2 - y1) / (x2 - x1);
        const a = y2 - x2*m;
        return {m, a};
    },
    degToXY(deg, r) {
        return {
            x: Math.cos(deg) * r,
            y: Math.sin(deg) * r
        }
    }
};

function initAnimations(ctx) {
    // -- ANIMATION CONSTANTS
    ctx.ANIMATION_TYPE_LINEAR = 0;
    ctx.ANIMATION_TYPE_EASE = 1;
    ctx.ANIMATION_TYPE_EASE_IN = 2;
    ctx.ANIMATION_TYPE_EASE_OUT = 3;

    ctx.isAnimated = false;
    ctx.lastLoop = new Date().getTime();
    ctx.animationCallback = function(){};

    // -- CANCEL ANIMATION
    ctx.cancelAnimation = function(){this.isAnimated = false};
    // -- START ANIMATION
    ctx.startAnimation = function(callback) {
        this.isAnimated = true;
        this.animationCallback = callback;
        ctx.lastLoop = new Date().getTime();
        this.loop();
    };
    ctx.loop = function() {
        if(!this.isAnimated) return;
        const lastLoop = this.lastLoop;
        this.lastLoop = new Date().getTime();
        const deltaTime = this.lastLoop - lastLoop;
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animationCallback(deltaTime, this);
        requestAnimationFrame(this.loop.bind(this));
    };
    // -- ANIMATE
    const linear = (x, t) => x/t;
    const ease = (x, t) => (1 + Math.cos(Math.PI + Math.PI * x/t)) / 2;
    const easeIn = (x, t) => 1 + Math.cos(Math.PI + Math.PI * x/t/2);
    const easeOut = (x, t) => Math.sin(Math.PI * x/t/2);
    const animateFrame = (from, to, type, callback, lasttime = new Date().getTime()) => {
        const time = new Date().getTime();
        from += time - lasttime;
        if(from >= to) {
            callback(1);
            return;
        }
        let x = 0;
        switch (type) {
            case ctx.ANIMATION_TYPE_LINEAR: x = linear(from, to);
            break;
            case ctx.ANIMATION_TYPE_EASE: x = ease(from, to);
            break;
            case ctx.ANIMATION_TYPE_EASE_IN: x = easeIn(from, to);
            break;
            case ctx.ANIMATION_TYPE_EASE_OUT: x = easeOut(from, to);
        }
        callback(x);
        requestAnimationFrame(() => animateFrame(from, to, type, callback, time));
    };
    /*
    @param: time: number = animation duration in milliseconds
    @param: type: number = one of the enum ANIMATION_TYPE constants (default linear)
    @param: callback: (x) => void = function which receive the current progress percent and do the drawing
     */
    ctx.partialAnimation = function(time, callback, type = ctx.ANIMATION_TYPE_LINEAR) {
        animateFrame(0, time, type, callback);
    }
}

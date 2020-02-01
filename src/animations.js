function initAnimations(ctx) {
    ctx.isAnimated = false;
    ctx.lastLoop = new Date().getTime();
    ctx.animationCallback = function(){};
    ctx.cancelAnimation = function(){this.isAnimated = false};
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
    }
}

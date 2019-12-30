"use strict";function initAnimations(t){t.isAnimated=!1,t.lastLoop=(new Date).getTime(),t.animationCallback=function(){},t.cancelAnimation=function(){this.isAnimated=!1},t.startAnimation=function(a){this.isAnimated=!0,this.animationCallback=a,t.lastLoop=(new Date).getTime(),this.loop()},t.loop=function(){if(this.isAnimated){var t=this.lastLoop;this.lastLoop=(new Date).getTime();var a=this.lastLoop-t;this.clearRect(0,0,this.canvas.width,this.canvas.height),this.animationCallback(a,this),requestAnimationFrame(this.loop.bind(this))}}}function initFunctionDrawing(t){t.drawFunction=function(a){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=i.xFrom||0,o=void 0===i.xTo?t.canvas.width:i.xTo,e=i.yFrom||0,h=void 0===i.yTo?t.canvas.height:i.yTo,r=i.fill,s=i.lineWidth||1;this.beginPath();for(var c=0;c<this.canvas.width;c++){var d=n+c/this.canvas.width*(o-n),l=(a(d)-e)/(h-e)*this.canvas.height;this.fillRect(c,this.canvas.height-l,1,r?l:s)}this.closePath()},t.drawRadialFunction=function(a){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=i.xFrom||0,o=void 0===i.xTo?t.canvas.width/2:i.xTo,e=i.yFrom||0,h=void 0===i.yTo?t.canvas.height/2:i.yTo,r=i.fill,s=i.lineWidth||1,c=void 0===i.centerX?t.canvas.width/2:i.centerX,d=void 0===i.centerY?t.canvas.height/2:i.centerY;this.beginPath();for(var l=0;l<=2*Math.PI;l+=.01){var g=(a(l)-n)/(o-n)*Math.cos(l)*this.canvas.width/2+c,v=(a(l)-e)/(h-e)*Math.sin(l)*this.canvas.height/2+d;0===l?this.moveTo(g,v):this.lineTo(g,v)}t.lineWidth=s,r?this.fill():this.stroke(),this.closePath()}}function initHotSpot(t){t.addHotSpot=function(t,a){return new HotSpot(this,t,a)}}function HotSpot(t,a,i){switch(a){case"polygon":this._listener=t.canvas.addEventListener("click",(function(a){a.x,t.canvas.offsetWidth,t.canvas.width,a.y,t.canvas.offsetHeight,t.canvas.height}))}}function initImageDrawing(t){t.loadImage=function(t){return new Promise((function(a,i){var n=new Image;n.src=t,n.onload=function(){n.onload=null,a(n)},n.onerror=function(){i("field to load resource")}}))},t.drawImageUrl=function(t,a,i,n,o,e,h,r,s){var c=this;return this.loadImage(t).then((function(t){e?(console.log(8),c.drawImage(t,a,i,n,o,e,h,r,s)):n?c.drawImage(t,a,i,n,o):c.drawImage(t,a,i)})).catch((function(){}))},t.drawCircleImage=function(t,a,i,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,e=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,h=arguments.length>6&&void 0!==arguments[6]?arguments[6]:t.width,r=arguments.length>7&&void 0!==arguments[7]?arguments[7]:t.height;this.save(),this.beginPath(),this.arc(a+n,i+n,n,0,2*Math.PI,!0),this.closePath(),this.clip(),this.drawImage(t,o,e,h,r,a,i,2*n,2*n),this.restore()},t.drawCircleImageUrl=function(t,a,i,n){var o=this,e=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,h=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,r=arguments.length>6?arguments[6]:void 0,s=arguments.length>7?arguments[7]:void 0;this.loadImage(t).then((function(t){o.drawCircleImage(t,a,i,n,e,h,r||t.width,s||t.height)})).catch((function(){}))},t.loadImageCover=function(t,a,i){var n=this;return new Promise((function(o,e){n.loadImage(t).then((function(t){var h=document.createElement("canvas");h.width=a,h.height=i,h.getCustomContext().drawImageCover(t,0,0,a,i),n.loadImage(h.toDataURL()).then(o).catch(e)})).catch((function(t){return console.error(t)}))}))},t.drawImageCover=function(t,a,i,n,o){var e=t.width/t.height,h=n/o;e>h?this.drawImage(t,(t.width-t.width*h/e)/2,0,t.width*h/e,t.height,a,i,n,o):this.drawImage(t,0,(t.height-t.height*e/h)/2,t.width,t.height*e/h,a,i,n,o)},t.drawImageCoverUrl=function(t,a,i,n,o){var e=this;return this.loadImage(t).then((function(t){e.drawImageCover(t,a,i,n,o)}))},t.loadImageContain=function(t,a,i){var n=this;return new Promise((function(o,e){n.loadImage(t).then((function(t){var h=document.createElement("canvas");h.width=a,h.height=i,h.getCustomContext().drawImageContain(t,0,0,a,i),n.loadImage(h.toDataURL()).then(o).catch(e)})).catch((function(t){return console.error(t)}))}))},t.drawImageContain=function(t,a,i,n,o){var e=t.width/t.height,h=n/o;e>h?this.drawImage(t,a,i+(o-o*h/e)/2,n,o*h/e):this.drawImage(t,a+(n-n*e/h)/2,i,n*e/h,o)},t.drawImageContainUrl=function(t,a,i,n,o){var e=this;return this.loadImage(t).then((function(t){e.drawImageContain(t,a,i,n,o)}))},t.drawRotatesImage=function(t,a){arguments.length>2&&void 0!==arguments[2]?arguments[2]:t.width,arguments.length>3&&void 0!==arguments[3]?arguments[3]:t.height,arguments.length>4&&void 0!==arguments[4]?arguments[4]:this.canvas.width,arguments.length>5&&void 0!==arguments[5]?arguments[5]:this.canvas.height},t.straighten=function(t,a){a=(a=(+a+Math.pow(360,2))%360)/180*Math.PI;var i=t.width,n=t.height,o=mathTools.rotation(-i/2,-n/2,a),e=mathTools.rotation(i/2,-n/2,a);mathTools.rotation(-i/2,n/2,a),mathTools.rotation(i/2,n/2,a);console.log(o,e);var h=mathTools.lineFunc(o.x,e.x,o.y,e.y),r=h.m,s=h.a;console.log("line",r,s);var c=n/i,d=s/((c=a%Math.PI<Math.PI/2?-n/i:n/i)-r),l=d*c,g=2*mathTools.distance(d,l);console.log("disptance",d,l,g);var v=Math.atan(n/i),m=g*Math.cos(v),u=g*Math.sin(v);console.log("params",i,n,m,u);var f=document.createElement("canvas"),w=f.getCustomContext();return f.width=i,f.height=n,w.save(),w.beginPath(),w.rect(i/2-m/2,n/2-u/2,m,u),w.clip(),w.translate(i/2,n/2),w.rotate(a),w.drawImage(t,0,0,i,n,-i/2,-n/2,i,n),w.closePath(),w.restore(),new Promise((function(t,a){w.loadImage(f.toDataURL()).then((function(a){w.drawImage(a,i/2-m/2,n/2-u/2,m,u,0,0,f.width,f.height),t(f.toDataURL())})).catch((function(t){return a(t)}))}))},t.straightenUrl=function(t,a){var i=this;return this.loadImage(t).then((function(t){return i.straighten(t,a)}))}}function ImageFilter(t,a){var i=this;this.ctx=t,this.img=a,this.mCanvas=document.createElement("canvas"),this.mCanvas.width=a.width,this.mCanvas.height=a.height,this.mCtx=this.mCanvas.getContext("2d"),this.mCtx.drawImage(a,0,0),this.imagedata=this.mCtx.getImageData(0,0,this.mCanvas.width,this.mCanvas.height),this.data=this.imagedata.data,this.draw=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.img.width,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:i.img.height,e=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,h=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,r=arguments.length>6&&void 0!==arguments[6]?arguments[6]:i.ctx.canvas.width,s=arguments.length>7&&void 0!==arguments[7]?arguments[7]:i.ctx.canvas.height;i.ctx.drawImageUrl(i.url(),e,h,r,s,t,a,n,o)},this.url=function(){return i.mCtx.putImageData(i.imagedata,0,0),i.mCanvas.toDataURL()},this.grayscale=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=0;a<i.data.length;a+=4){var n=(i.data[a]+i.data[a+1]+i.data[a+2])/3;i.data[a]+=(n-i.data[a])*t,i.data[a+1]+=(n-i.data[a+1])*t,i.data[a+2]+=(n-i.data[a+2])*t}return i},this.contrast=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.75,a=0;a<i.data.length;a+=4)for(var n=0;n<3;n++)i.data[a+n]=2*t*(i.data[a+n]-128)+128;return i},this.mat=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.75;t/=3;for(var a=0;a<i.data.length;a+=4)for(var n=0;n<3;n++)i.data[a+n]>=128?i.data[a+n]+=t*(255-i.data[a+n]):i.data[a+n]*=1-t;return i},this.brightness=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1.25,a=0;a<i.data.length;a+=4)for(var n=0;n<3;n++)i.data[a+n]*=t;return i},this.invert=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=0;a<i.data.length;a+=4)for(var n=0;n<3;n++)i.data[a+n]+=(255-2*i.data[a+n])*t;return i}}HTMLCanvasElement.prototype.getCustomContext=function(){var t=this.getContext("2d");return t?(initImageDrawing(t),initFunctionDrawing(t),initShapesDrawing(t),initAnimations(t),t.filterImage=function(t){return new ImageFilter(this,t)},t):null};var mathTools={distance:function(t,a){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return Math.sqrt(Math.pow(i-t,2)+Math.pow(n-a,2))},rotation:function(t,a,i){return{x:t*Math.cos(i)-a*Math.sin(i),y:t*Math.sin(i)+a*Math.cos(i)}},lineFunc:function(t,a,i,n){var o=(n-i)/(a-t);return{m:o,a:n-a*o}}};function initShapesDrawing(t){t.drawArrow=function(a,i,n,o){var e=arguments.length>4&&void 0!==arguments[4]?arguments[4]:10,h=arguments.length>5&&void 0!==arguments[5]?arguments[5]:6;this.beginPath(),this.moveTo(a,i),this.lineTo(n,o),this.stroke(),this.closePath();var r=function(){return n-a},s=function(){return o-i},c=Math.sqrt(Math.pow(r(),2)+Math.pow(s(),2)),d={x:n,y:o},l={x:n-e/c*r(),y:o-e/c*s()},g=s()/r(),v=0;g===1/0?g=0:v=-1/g;var m=h/Math.sqrt(1+Math.pow(v,2)),u={x:l.x+m,y:l.y+v*m},f={x:l.x-m,y:l.y-v*m};t.beginPath(),t.moveTo(d.x,d.y),t.lineTo(u.x,u.y),t.lineTo(f.x,f.y),t.lineTo(d.x,d.y),t.fill(),t.closePath()},t.linePolygon=function(t,a,i,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;this.moveTo(t+Math.cos(o)*i,a+Math.sin(o)*i);for(var e=1;e<=n;e++)this.lineTo(t+Math.cos(o+e/n*Math.PI*2)*i,a+Math.sin(o+e/n*Math.PI*2)*i)},t.strokePolygon=function(t,a,i,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;this.beginPath(),this.linePolygon(t,a,i,n,o),this.stroke(),this.closePath()},t.fillPolygon=function(t,a,i,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;this.beginPath(),this.linePolygon(t,a,i,n,o),this.fill(),this.closePath()}}
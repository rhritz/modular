function resizeCanvas(canvas) {
	canvas.height = window.innerHeight; 
	canvas.width  = window.innerWidth;
	canvas.style.width  = canvas.width  + 'px';
	canvas.style.height = canvas.height + 'px';
}

var canvas  = document.getElementById('cableCanvas');
var overlay = document.getElementById('overlayCanvas');
const ctx     = canvas.getContext('2d');
const overCtx = overlay.getContext('2d');

export function resetCanvas() {
	resizeCanvas(canvas);
	resizeCanvas(overlay);

	ctx.lineCap         = 'round';
	ctx.shadowColor     = '#000';
	ctx.shadowBlur      = 3;
	ctx.lineWidth       = 3;
	ctx.shadowOffsetX   = 1; 
	ctx.shadowOffsetY   = 1;

	overCtx.lineWidth   = 3;
	overCtx.strokeStyle = '#444';
	overCtx.lineCap     = 'butt';
	overCtx.setLineDash([3, 3]);
}

resetCanvas();

export {ctx, overCtx};


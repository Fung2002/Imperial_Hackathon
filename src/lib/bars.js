export class Bar {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	update = (amplitude) => {
		this.height = amplitude;
	};

	draw = (canvasCtx) => {
		canvasCtx.fillStyle = this.color;
		canvasCtx.fillRect(this.x, this.y, this.width, this.height);
	};
}

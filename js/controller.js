import { slurp } from './util'

export default class Controller {

	constructor() {
		this.animAmt = 0;
		this.period = 5;
	}

	/**
	 * @param {Number} dt Time in seconds since last update
	 */
	update(dt) {
		this.animAmt += dt / this.period;
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		context.globalCompositeOperation = 'multiply';

		const size = 500;
		const numLines = 10;
		const halfThickness = size / (numLines - 1) / 3;
		const colors = ['#FF0', '#0FF', '#F0F'];
		const numDirections = 3;
		for (let i = 0; i < numDirections; i ++) {
			const color = colors[i];
			for (let l = 0; l < numLines; l ++) {
				const amt = l / (numLines - 1);

				const linePos = slurp(-size, size, amt);

				context.beginPath();
				context.fillStyle = color;
				context.moveTo(-size, linePos - halfThickness);
				context.lineTo(-size, linePos + halfThickness);
				context.lineTo( size, linePos + halfThickness);
				context.lineTo( size, linePos - halfThickness);
				context.closePath();
				context.fill();
			}

			context.rotate(2 * Math.PI / numDirections);
		}
	}

}

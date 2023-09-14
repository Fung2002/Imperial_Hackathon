<script>
	import { onMount } from 'svelte';
	import { recording, waveDomain } from '$lib/stores';
	import { Microphone } from '$lib/microphone';
	import { Bar } from '$lib/bars';

	// Constants
	const RECORDING_STROKE_STYLE = '#2dd4bf';
	const PAUSED_STROKE_STYLE = '#374151';

	// Instance Variables
	const microphone = new Microphone();
	const numOfBars = microphone.fftSize / 2;
	let bars = [];
	let canvas;
	let canvasCtx;

	// Reactive statement to draw canvas when recording state changes
	$: $recording, draw();

	// On component mount
	onMount(() => {
		canvasCtx = canvas.getContext('2d');
		createBars();
		handleWindowResize();

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	});

	// Functions
	function draw() {
		if (!canvasCtx) return;

		drawFlatLine();

		// Toggle microphone listening state based on recording state
		if (!$recording) {
			microphone.disconnect();
		} else {
			microphone.listen();
		}

		animate();
	}

	function animate() {
		if (!canvasCtx) return;

		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

		if (microphone.initialized) {
			let samples =
				$waveDomain === 'time'
					? microphone.getTimeDomainSamples(1000)
					: microphone.getFrequencyDomainSamples(5);

			bars.forEach((bar, i) => {
				bar.update(samples[i]);
				bar.draw(canvasCtx);
			});
		} else {
			drawFlatLine();
		}

		requestAnimationFrame(animate);
	}

	function drawFlatLine(color = PAUSED_STROKE_STYLE) {
		canvasCtx.strokeStyle = color;
		canvasCtx.beginPath();
		canvasCtx.moveTo(0, canvas.height / 2);
		canvasCtx.lineTo(canvas.width, canvas.height / 2);
		canvasCtx.stroke();
	}

	function createBars() {
		bars = [];
		const barWidth = canvas.width / numOfBars;

		for (let i = 0; i < numOfBars; i++) {
			bars.push(new Bar(i * barWidth, canvas.height / 2, barWidth, 20, RECORDING_STROKE_STYLE));
		}
	}

	function handleWindowResize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		createBars();
		drawFlatLine();
	}
</script>

<p>{$recording ? 'Listening' : 'Paused'}</p>
<canvas bind:this={canvas} class="full-size" />

<style>
	.full-size {
		width: 100%;
		height: 100%;
	}
</style>

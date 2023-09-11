<script>
	import { onMount } from 'svelte';
	import { recording, waveDomain } from '$lib/stores';
	import { Microphone } from '$lib/microphone';
	import { Bar } from '$lib/bars';

	const recordingStrokeStyle = '#2dd4bf';
	const pausedStrokeStyle = '#374151';
	const microphone = new Microphone();
	const numOfBars = microphone.fftSize / 2;

	let bars = [];
	let canvas;
	let canvasCtx;

	$: $recording, draw();

	function draw() {
		// Set canvas styling
		if (!canvasCtx) return;

		drawFlatLine();

		// Stop listening if user pauses
		if (!$recording) {
			microphone.disconnect();
		} else {
			microphone.listen();
		}
		animate();
	}

	function animate() {
		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		if (microphone.initialized) {
			let samples;
			if ($waveDomain === 'time') {
				samples = microphone.getTimeDomainSamples(500);
			} else {
				samples = microphone.getFrequencyDomainSamples(1);
			}
			bars.forEach((bar, i) => {
				bar.update(samples[i]);
				bar.draw(canvasCtx);
			});
		} else {
			drawFlatLine();
		}

		requestAnimationFrame(animate);
	}

	function drawFlatLine(color) {
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
			bars.push(new Bar(i * barWidth, canvas.height / 2, 1, 20, recordingStrokeStyle));
		}
	}

	onMount(() => {
		canvasCtx = canvas.getContext('2d');

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			createBars();

			canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
			drawFlatLine(pausedStrokeStyle);
		}

		createBars();

		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
		};
	});
</script>

<p>{$recording ? 'Recording' : 'Paused'}</p>
<canvas bind:this={canvas} class="w-full h-full" />

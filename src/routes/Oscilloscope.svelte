<script>
	import { onMount } from 'svelte';
	import { recording } from '$lib/stores';
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
		canvasCtx.strokeStyle = $recording ? recordingStrokeStyle : pausedStrokeStyle;

		// Stop listening if user pauses
		if (!$recording) {
			microphone.disconnect();
			// show flat line
			canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
			return;
		}

		// Start listening and draw the waveform
		microphone.listen();
		animate();
	}

	function animate() {
		if (microphone.initialized) {
			canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
			const samples = microphone.getSamples();
			bars.forEach((bar, i) => {
				bar.update(samples[i] * 1000);
				bar.draw(canvasCtx);
			});
		}

		requestAnimationFrame(animate);
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

<script>
	import { onMount } from 'svelte';
	import { recording } from '$lib/stores';
	import { Microphone } from '$lib/microphone';

	const recordingStrokeStyle = '#2dd4bf';
	const pausedStrokeStyle = '#374151';
	const lineWidth = 4;
	const microphone = new Microphone();

	let canvas;
	let canvasCtx;

	$: $recording, draw();

	function resetCanvas() {
		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		canvasCtx.beginPath();
		canvasCtx.moveTo(0, canvas.height / 3);
		canvasCtx.lineTo(canvas.width, canvas.height / 3);
		canvasCtx.stroke();
	}

	function draw() {
		// Set canvas styling
		if (!canvasCtx) return;
		canvasCtx.lineWidth = lineWidth;
		canvasCtx.strokeStyle = $recording ? recordingStrokeStyle : pausedStrokeStyle;
		resetCanvas();
		if (!$recording) {
			microphone.disconnect();
			return;
		}

		// Waveform visualizer
		microphone.listen();
		console.log(microphone);
	}

	onMount(() => {
		canvasCtx = canvas.getContext('2d');

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			draw();
		}

		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
		};
	});
</script>

<p>{$recording ? 'Recording' : 'Paused'}</p>
<canvas bind:this={canvas} class="w-full h-full" />

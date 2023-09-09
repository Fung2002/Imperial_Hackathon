<script>
	import { onMount } from 'svelte';
	import { paused } from '$lib/stores';

	// playback settings
	const src = '/song.mp3';
	let time;
	let duration;

	// visualizer settings
	let canvas;
	let canvasCtx;
	let audio;
	let analyser;
	let audioContext;
	let dataArray;

	const playingStrokeStyle = '#2dd4bf';
	const pausedStrokeStyle = '#374151';
	const lineWidth = 4;

	$: $paused, draw();

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
		canvasCtx.strokeStyle = $paused ? pausedStrokeStyle : playingStrokeStyle;
		resetCanvas();
		if ($paused) return;

		// Waveform visualizer
		console.log('draw');
		if (!audioContext) {
			audioContext = new (window.AudioContext || window.webkitAudioContext)();
		}

		if (!analyser) {
			analyser = audioContext.createAnalyser();
		}
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

<p>{$paused ? 'Paused' : 'Playing'}</p>
<audio
	{src}
	bind:this={audio}
	bind:currentTime={time}
	bind:duration
	bind:paused={$paused}
	on:ended={() => {
		time = 0;
	}}
/>
<canvas bind:this={canvas} class="w-full h-full" />

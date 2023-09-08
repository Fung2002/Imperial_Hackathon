<script>
	import { onMount } from 'svelte';
	import { paused } from '$lib/stores';

	// https://davidmatthew.ie/creating-an-oscilloscope-with-javascript/
	let audioCtx;

	async function startAudioCtx() {
		// https://www.okupter.com/blog/sveltekit-window-is-not-defined
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		audioCtx = new AudioContext();
	}

	async function stopAudioCtx() {
		if (audioCtx) {
			audioCtx.close();
		}
		audioCtx = null;
	}
</script>

<p>Paused: {$paused}</p>
<canvas class="w-full h-full" />

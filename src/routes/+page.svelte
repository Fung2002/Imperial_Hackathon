<script>
	import { onMount } from 'svelte';
	import AudioController from './AudioController.svelte';
	import Oscilloscope from './Oscilloscope.svelte';

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});
</script>

<div class="flex flex-col h-screen items-stretch">
	<div class="visualizer flex-grow">
		<Oscilloscope />
	</div>

	<div class="controller fixed bottom-0 left-0 m-4">
		<AudioController />
	</div>
</div>

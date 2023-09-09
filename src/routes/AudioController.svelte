<script>
	import { recording } from '$lib/stores';
</script>

<button
	class="btn btn-secondary hover:btn-accent rounded-full w-20 h-20 drop-shadow-md"
	aria-label={$recording ? 'pause' : 'play'}
	on:click={() => {
		$recording = !$recording;
	}}
/>

<style>
	button {
		width: 100%;
		aspect-ratio: 1;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		border-radius: 50%;
	}
	[aria-label='play'] {
		background-image: url(./play.svg);
	}
	[aria-label='pause'] {
		background-image: url(./pause.svg);
	}
</style>

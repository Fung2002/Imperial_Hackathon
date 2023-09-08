<script>
	import { paused } from '$lib/stores';
	/**
	 * @type {any}
	 */
	export let src;

	/**
	 * @type {number}
	 */
	let time;
	let duration;
	$paused = true;
</script>

<audio
	{src}
	bind:currentTime={time}
	bind:duration
	bind:paused={$paused}
	on:ended={() => {
		time = 0;
	}}
/>
<button
	class="btn btn-secondary hover:btn-accent rounded-full w-20 h-20 drop-shadow-md"
	aria-label={$paused ? 'play' : 'pause'}
	on:click={() => {
		$paused = !$paused;
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

<script>
	/**
	 * @type {any}
	 */
	export let src;

	/**
	 * @type {number}
	 */
	let time;
	let duration;
	let paused = true;
</script>

<div class="controller" class:paused>
	<audio
		{src}
		bind:currentTime={time}
		bind:duration
		bind:paused
		on:ended={() => {
			time = 0;
		}}
	/>
	<button
		class="btn-lg btn-secondary btn-circle"
		aria-label={paused ? 'play' : 'pause'}
		on:click={() => {
			paused = !paused;
		}}
	/>
</div>

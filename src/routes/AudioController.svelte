<script>
	import { recording, waveDomain } from '$lib/stores';
</script>

<div class="flex items-center">
	<button
		class="btn-lg btn-accent rounded-full drop-shadow-md"
		aria-label={$recording ? 'pause' : 'play'}
		on:click={() => {
			$recording = !$recording;
		}}
	/>
	<label class="join ml-4">
		{#each ['time', 'frequency'] as domain}
			<input
				type="radio"
				name="domain"
				class="join-item btn btn-{$waveDomain === domain
					? 'secondary'
					: 'neutral'} rounded-full drop-shadow-md"
				value={domain}
				aria-label={domain.toUpperCase()}
				bind:group={$waveDomain}
			/>
		{/each}
	</label>
</div>

<style>
	button {
		aspect-ratio: 1;
		background-repeat: no-repeat;
		background-position: 50% 50%;
	}
	[aria-label='play'] {
		background-image: url(./play.svg);
	}
	[aria-label='pause'] {
		background-image: url(./pause.svg);
	}
</style>

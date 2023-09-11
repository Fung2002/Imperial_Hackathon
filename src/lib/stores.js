import { writable } from 'svelte/store';

export const recording = writable(false);
export const waveDomain = writable('time');

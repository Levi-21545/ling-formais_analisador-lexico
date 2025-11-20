<script lang="ts">
	import type { Automaton } from "./automaton";

	export let automaton: Automaton;

	export let onUpdateState: (data: {
		state: number | null;
		lastFrom: number | null;
		lastSymbol: string | null;
		error: boolean;
	}) => void;

	let input = "";
	let currentState = automaton.start;
	let error = false;

	function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
		const value = event.currentTarget.value;

		let state = automaton.start;
		let lastFrom: number | null = null;
		let lastSymbol: string | null = null;
		let hasError = false;

		for (const ch of value) {
			lastFrom = state;
			lastSymbol = ch;

			const next = automaton.transitions[state]?.[ch] ?? null;
			if (next === null) {
				hasError = true;
				break;
			}
			state = next;
		}

		currentState = hasError ? -1 : state;
		error = hasError;

		onUpdateState({
			state: currentState,
			lastFrom,
			lastSymbol,
			error,
		});
	}
</script>

<div style="display:flex;flex-direction:column;gap:4px;">
	<input
		bind:value={input}
		on:input={handleInput}
		placeholder="Digite uma palavra e pressione espaço"
		style="padding:6px 8px;border:1px solid #ccc;border-radius:6px;"
	/>
</div>

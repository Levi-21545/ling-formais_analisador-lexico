<script lang="ts">
	import type { Automaton } from "./automaton";

	export let automaton: Automaton;
	export let currentState: number | null;
	export let lastFrom: number | null;
	export let lastSymbol: string | null;
	export let error: boolean;

	const symbols = Object.values(automaton.transitions)
		.flatMap((t) => Object.keys(t))
		.filter((v, i, arr) => arr.indexOf(v) === i);
</script>

<div style="overflow-x:auto;">
	<table style="border-collapse:collapse;width:100%;font-size:0.9rem;">
		<thead>
			<tr>
				<th style="border:1px solid #ccc;padding:4px 6px;">Estado</th>
				{#each symbols as sym}
					<th style="border:1px solid #ccc;padding:4px 6px;">{sym}</th
					>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(automaton.transitions) as [state, trans]}
				<tr
					style="
						background: {+state === currentState
						? '#7993b3'
						: error && +state === lastFrom
							? '#f78383'
							: 'gray'};
						transition:background 0.2s;
					"
				>
					<td style="border:1px solid #ccc;padding:4px 6px;"
						>q{state}</td
					>
					{#each symbols as sym}
						<td
							style="
                border:1px solid #ccc;padding:4px 6px;text-align:center;
                background:
                  {lastFrom === +state && lastSymbol === sym
								? error
									? '#eb4646'
									: '#93c5fd'
								: 'transparent'};
              "
						>
							{trans[sym] !== undefined ? `q${trans[sym]}` : "–"}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

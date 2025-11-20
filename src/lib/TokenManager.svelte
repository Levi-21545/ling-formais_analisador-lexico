<script lang="ts">
	export let onSetToken: (token: string) => void;

	let token = "";

	function handleSubmit() {
		if (token.trim() && onSetToken) {
			onSetToken(token.trim());
			token = "";
		}
	}
</script>

<div style="display:flex;gap:8px;">
	<input
		bind:value={token}
		placeholder="Digite o token (ex: casa)"
		style="flex:1;padding:6px 8px;border:1px solid #ccc;border-radius:6px;"
		on:keydown={(e) => e.key === "Enter" && handleSubmit()}
	/>
	<button
		on:click={handleSubmit}
		style="background:#2563eb;color:white;padding:6px 12px;border:none;border-radius:6px;cursor:pointer;"
	>
		Confirmar
	</button>
</div>

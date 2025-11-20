<script lang="ts">
  import TokenManager from "./lib/TokenManager.svelte";
  import LexicalAnalyzer from "./lib/LexicalAnalyzer.svelte";
  import { buildAutomaton } from "./lib/automaton";
  import type { Automaton } from "./lib/automaton";

  let automaton: Automaton | null = null;
  let token = "";
  let tokenKey = 0;

  let currentState: number | null = null;
  let currentFrom: number | null = null;
  let currentSymbol: string | null = null;
  let errorFlag = false;

  function handleSetToken(newToken: string) {
    token = newToken;
    console.log("Token definido:", token);

    automaton = buildAutomaton(token);

    currentState = automaton.start;
    currentFrom = null;
    currentSymbol = null;
    errorFlag = false;

    tokenKey += 1;
  }

  function handleUpdateState(data: {
    state: number | null;
    lastFrom: number | null;
    lastSymbol: string | null;
    error: boolean;
  }) {
    console.log("Recebendo atualização de estado:", data);

    currentState = data.state;
    currentFrom = data.lastFrom;
    currentSymbol = data.lastSymbol;
    errorFlag = data.error;

    console.log("Estado atualizado:", {
      currentState,
      currentFrom,
      currentSymbol,
      errorFlag,
    });
  }
</script>

<main style="max-width:900px;margin:28px auto;padding:0 12px;">
  <h1 style="font-size:1.4rem;margin-bottom:12px;">
    Analisador Léxico — AFD (token único)
  </h1>

  <section style="margin-bottom:14px;">
    <TokenManager onSetToken={handleSetToken} />
  </section>

  {#if automaton}
    {#key tokenKey}
      <section style="display:grid;grid-template-columns: 1fr; gap:12px;">
        <LexicalAnalyzer {automaton} onUpdateState={handleUpdateState} />
      </section>
    {/key}
  {:else}
    <div style="color:#6b7280;">Crie um token para começar (ex: "casa").</div>
  {/if}
</main>

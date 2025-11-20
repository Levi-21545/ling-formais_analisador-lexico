<script lang="ts">
  import TokenManager from "./lib/TokenManager.svelte";

  let token = "";
  let tokenKey = 0;

  let currentState: number | null = null;
  let currentFrom: number | null = null;
  let currentSymbol: string | null = null;
  let errorFlag = false;

  function handleSetToken(newToken: string) {
    token = newToken;
    console.log("Token definido:", token);

    currentState = null;
    currentFrom = null;
    currentSymbol = null;
    errorFlag = false;

    tokenKey += 1;
  }
</script>

<main style="max-width:900px;margin:28px auto;padding:0 12px;">
  <h1 style="font-size:1.4rem;margin-bottom:12px;">
    Analisador Léxico — AFD (token único)
  </h1>

  <section style="margin-bottom:14px;">
    <TokenManager onSetToken={handleSetToken} />
  </section>

  <div style="color:#6b7280;">Crie um token para começar (ex: "casa").</div>
</main>

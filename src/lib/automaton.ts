export interface Automaton {
	start: number;
	finals: number[];
	transitions: Record<number, Record<string, number>>;
}

// Gera um AFD simples para reconhecer o token literal, ex: "casa"
export function buildAutomaton(token: string): Automaton {
	const transitions: Record<number, Record<string, number>> = {};

	for (let i = 0; i <= token.length; i++) {
		transitions[i] = {};
	}
	for (let i = 0; i < token.length; i++) {
		transitions[i][token[i]] = i + 1;
	}

	console.log("Automaton transitions:", transitions);

	return { start: 0, finals: [token.length], transitions };
}

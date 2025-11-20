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

// Processa uma string de entrada através do AFD
export function processString(automaton: Automaton, input: string) {
	let current = automaton.start;

	for (const char of input) {
		const next = automaton.transitions[current]?.[char];

		if (next === undefined) {
			return { accepted: false, current };
		}
		current = next;
	}

	console.log(automaton)

	return { accepted: automaton.finals.includes(current), current };
}

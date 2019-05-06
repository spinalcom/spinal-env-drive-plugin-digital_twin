export default function delayFctGen<T>(fct: () => T, timeout: number): () => Promise<T>;

export function getRandomInterval(
	minMinutes: number,
	maxMinutes: number,
): number {
	const min = minMinutes * 60 * 1000;
	const max = maxMinutes * 60 * 1000;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

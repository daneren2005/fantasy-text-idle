export default function formatTime(ms: number) {
	let totalSeconds = Math.floor(ms / 1_000);
	let hours = Math.floor(totalSeconds / 3_600 % 60).toString().padStart(2, '0');
	let minutes = Math.floor(totalSeconds / 60 % 60).toString().padStart(2, '0');
	let seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');

	return `${hours}:${minutes}:${seconds}`;
}
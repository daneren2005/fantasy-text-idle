import type State from '../state';
import autoSave from './auto-save';
import runGame from './run-game';

const TICK_TIME = 30;
const AUTO_SAVE_TIME = 1_000;
let lastUpdateTime = 0;
let lastSavedTime = 0;
export default function start(state: State) {
	state.running = true;
	lastUpdateTime = lastSavedTime = performance.now();
	window.setTimeout(() => {
		runTick(state);
	}, TICK_TIME);
}

async function runTick(state: State) {
	if(!state.running) {
		return;
	}
	let now = performance.now();
	let elapsedTime = now - lastUpdateTime;

	runGame(state, elapsedTime);
	if((lastSavedTime + AUTO_SAVE_TIME) < now) {
		await autoSave(state);
		lastSavedTime = now;
	}

	lastUpdateTime = now;
	window.setTimeout(() => {
		runTick(state);
	}, TICK_TIME);
}
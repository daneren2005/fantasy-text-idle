import State from '@/game/state';
import getBestAction from './run-bot/get-best-action';
import serialize from './run-bot/serialize';
import canDoAction from './run-bot/can-do-action';
import runGame from '@/game/actions/run-game';
import formatTime from '@/game/utils/format-time';
import runAction from './run-bot/run-action';

let state = new State();
let running = true;

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
	if(str === 'q') {
		running = false;
	} else if(str === 'p') {
		process.stdout.write("\n" + serialize(state, 'production') + "\n");
	} else if(key.ctrl && key.name === 'c') {
		process.exit();
	}
});

let nextAction = getBestAction(state);
while(running) {
	process.stdout.clearLine(0);
	process.stdout.cursorTo(0);
	process.stdout.write(`Time: ${formatTime(state.gametime)}`);
	if(canDoAction(state, nextAction)) {
		process.stdout.write("\n" + serialize(state, nextAction) + "\n");

		runAction(state, nextAction);
		nextAction = getBestAction(state);
	}

	runGame(state, 1_000);
	// Just waiting so be can process keyboard io
	await sleep(0);
}
process.stdout.write("\n" + serialize(state, 'production') + "\n");
process.exit();

async function sleep(ms: number) {
	await new Promise(resolve => setTimeout(resolve, ms));
}
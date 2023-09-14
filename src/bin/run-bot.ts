import State from '@/game/state';
import getBestAction from './run-bot/get-best-action';
import serialize from './run-bot/serialize';
import canDoAction from './run-bot/can-do-action';
import runGame from '@/game/actions/run-game';
import formatTime from '@/game/utils/format-time';
import runAction from './run-bot/run-action';
import getBestSkillAction from './run-bot/get-best-skill-action';

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

const start = performance.now();
let nextAction = getBestAction(state);
let nextSkill = getBestSkillAction(state);
while(running) {
	process.stdout.clearLine(0);
	process.stdout.cursorTo(0);
	process.stdout.write(`Time: ${formatTime(state.gametime)}`);
	if(canDoAction(state, nextAction)) {
		process.stdout.write("\n" + serialize(state, nextAction) + "\n");

		runAction(state, nextAction);
		nextAction = getBestAction(state);
	}

	// Run skill upgrades separately since we can have enough to upgrade these at almost any time
	if(canDoAction(state, nextSkill)) {
		process.stdout.write("\n" + serialize(state, nextSkill) + "\n");
		
		runAction(state, nextSkill);
		nextSkill = getBestSkillAction(state);
	}

	runGame(state, 1_000);
	// Just waiting so be can process keyboard io
	await sleep(0);
}
process.stdout.write("\n" + serialize(state, 'production') + "\n");
process.stdout.write(`Completed ${formatTime(state.gametime)} runtime in ${Math.round((performance.now() - start) / 1_000)} seconds\n`);
process.exit();

async function sleep(ms: number) {
	await new Promise(resolve => setTimeout(resolve, ms));
}
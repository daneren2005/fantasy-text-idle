import State from '@/game/state';
import getBestAction from './run-bot/get-best-action';
import serialize from './run-bot/serialize';
import canDoAction from './run-bot/can-do-action';
import runGame from '@/game/actions/run-game';
import formatTime from '@/game/utils/format-time';
import runAction from './run-bot/run-action';
import getBestSkillAction from './run-bot/get-best-skill-action';
import path from 'path';
import fs from 'fs';
import createActionChart from './run-bot/create-chart';
import chalk from 'chalk';

const outputDir = path.join(process.cwd(), 'output');
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

const actions: {[key:number]:string} = {};
const start = performance.now();
let nextAction = getBestAction(state);
let nextSkill = getBestSkillAction(state);
while(running) {
	process.stdout.clearLine(0);
	process.stdout.cursorTo(0);
	process.stdout.write(`Time: ${formatTime(state.gametime)}`);
	let hasRunAction = false;
	if(canDoAction(state, nextAction)) {
		process.stdout.write("\n" + serialize(state, nextAction) + "\n");

		if(runAction(state, nextAction)) {
			actions[state.gametime / 1_000] = nextAction.type;
		} else {
			process.stdout.write("	Failed to run action\n");
		}
		nextAction = getBestAction(state);
		hasRunAction = true;
	}

	// Run skill upgrades separately since we can have enough to upgrade these at almost any time
	if(canDoAction(state, nextSkill)) {
		if(!hasRunAction) {
			process.stdout.write("\n");
		}
		process.stdout.write(serialize(state, nextSkill) + "\n");
		
		if(runAction(state, nextSkill)) {
			actions[state.gametime / 1_000] = nextSkill.type;
		} else {
			process.stdout.write(chalk.bgRedBright("	Failed to run action\n"));
		}
		nextSkill = getBestSkillAction(state);
	}

	runGame(state, 1_000);
	// Just waiting so be can process keyboard io
	await sleep(0);
}
process.stdout.write("\n" + serialize(state, 'production') + "\n");
process.stdout.write(`Completed ${formatTime(state.gametime)} runtime in ${Math.round((performance.now() - start) / 1_000)} seconds\n`);

if(!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir);
}
fs.writeFileSync(path.join(outputDir, 'output.json'), JSON.stringify({
	state: state.save(),
	actions
}, null, "\t"));

let htmlFileContents = fs.readFileSync(path.join(__dirname, '/run-bot/chart.html'), { encoding: 'utf-8' });
let chartContents = createActionChart(state, actions);
htmlFileContents = htmlFileContents.replace('__DATA__', JSON.stringify(chartContents.chart)).replace('__NOBILITY_LEVELS__', JSON.stringify(chartContents.nobilityMap));
fs.writeFileSync(path.join(outputDir, 'chart.html'), htmlFileContents);
process.exit();

async function sleep(ms: number) {
	await new Promise(resolve => setTimeout(resolve, ms));
}
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
import Action from './run-bot/action';
import nobilities from '@/game/config/nobilities';

let options: {
	startAtNobility: null | string,
	stopAtNobility: null | string
} = {
	startAtNobility: null,
	stopAtNobility: null
};
process.argv.forEach(arg => {
	let parts = arg.split('=');
	if(parts.length !== 2) {
		return;
	}

	switch(parts[0]) {
		case 'start':
			options.startAtNobility = parts[1];
			break;
		case 'stop': case 'end':
			options.stopAtNobility = parts[1];
			break;
	}
});

const outputDir = path.join(process.cwd(), 'output');
let state = new State();
let actions: {[key:number]:string} = {};
let running = true;

if(options.startAtNobility) {
	let startConfigFile = path.join(outputDir, `start-${options.startAtNobility}.json`);
	if(fs.existsSync(startConfigFile)) {
		let startConfig = JSON.parse(fs.readFileSync(startConfigFile, { encoding: 'utf-8' }));
		state.load(startConfig.state);
		actions = startConfig.actions;
	}
}

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
	process.stdout.write(`${formatTime(state.gametime)}`);
	let hasRunAction = false;
	if(canDoAction(state, nextAction)) {
		process.stdout.write("\t" + serialize(state, nextAction) + "\n");

		if(runAction(state, nextAction)) {
			actions[state.gametime / 1_000] = actionToString(nextAction);

			if(nextAction.type === 'upgrade-nobility') {
				let nobility = nobilities[state.nobility].name;
				fs.writeFileSync(path.join(outputDir, `start-${nobility}.json`), JSON.stringify(getOutputContents(), null, "\t"));

				if(options.stopAtNobility === nobility) {
					running = false;
				}
			}
		} else {
			process.stdout.write("	Failed to run action\n");
		}
		nextAction = getBestAction(state);
		hasRunAction = true;
	}

	// Run skill upgrades separately since we can have enough to upgrade these at almost any time
	if(canDoAction(state, nextSkill)) {
		if(hasRunAction) {
			process.stdout.write(`${formatTime(state.gametime)}`);
		}
		process.stdout.write("\t");
		process.stdout.write(serialize(state, nextSkill) + "\n");
		
		if(runAction(state, nextSkill)) {
			actions[state.gametime / 1_000] = actionToString(nextSkill);
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
fs.writeFileSync(path.join(outputDir, 'output.json'), JSON.stringify(getOutputContents(), null, "\t"));

let htmlFileContents = fs.readFileSync(path.join(__dirname, '/run-bot/chart.html'), { encoding: 'utf-8' });
let chartContents = createActionChart(state, actions);
htmlFileContents = htmlFileContents.replace('__DATA__', JSON.stringify(chartContents.chart)).replace('__NOBILITY_LEVELS__', JSON.stringify(chartContents.nobilityMap));
fs.writeFileSync(path.join(outputDir, 'chart.html'), htmlFileContents);
process.exit();

async function sleep(ms: number) {
	await new Promise(resolve => setTimeout(resolve, ms));
}

function getOutputContents() {
	return {
		state: state.save(),
		export: btoa(JSON.stringify(state.save())),
		actions
	};
}
function actionToString(action: Action) {
	if(action.type === 'upgrade-nobility') {
		return action.type;
	} else {
		return `${action.type}:${action.name}`;
	}
}
import nobilities from '@/game/config/nobilities';
import State from '@/game/state';
import formatTime from '@/game/utils/format-time';

export default function createActionChart(state: State, actions: {[key:number]:string}) {
	// Exclude skills for now since those are pretty linear
	// @ts-expect-error
	let actionTimes = Object.keys(actions).filter(a => !actions[a].includes('upgrade-skill')).map(a => parseInt(a)) as Array<number>;
	let timeBetweenActions = [];
	let nobilityUpgradeTimes = [];
	for(let i = 1; i < actionTimes.length; i++) {
		timeBetweenActions.push(actionTimes[i] - actionTimes[i - 1]);
	}

	let nobilityLevel = 0;
	const maxNobilityLevel = state.nobility + 1;
	let maxTimeBetweenActions = Math.max(...timeBetweenActions);
	let nobilityMap: any = {};
	for(let i = 1; i < actionTimes.length; i++) {
		if(actions[actionTimes[i]].includes('upgrade-nobility')) {
			nobilityLevel++;
		}

		let nobilityNumber = maxTimeBetweenActions / Math.abs(nobilityLevel - maxNobilityLevel);
		nobilityUpgradeTimes.push(nobilityNumber);
		nobilityMap[nobilityNumber] = nobilities[nobilityLevel].name;
	}

	return {
		chart: {
			labels: timeBetweenActions.map((v, i) => formatTime(actionTimes[i + 1] * 1_000)),
			datasets: [
				{
					label: 'Time Between Actions',
					data: timeBetweenActions,
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					tension: 0.1
				},
				{
					label: 'Nobility',
					data: nobilityUpgradeTimes,
					fill: false,
					borderColor: 'rgb(0, 255, 0)',
					tension: 0.1
				}
			]
		},
		nobilityMap
	};
}
import State from '@/game/state';
import Action from './action';
import buyProperty from '@/game/actions/buy-property';
import upgradeNobility from '@/game/actions/upgrade-nobility';

export default function runAction(state: State, action: Action) {
	if(action.type === 'upgrade-property') {
		buyProperty(state, action.name);
	} else if(action.type === 'upgrade-nobility') {
		upgradeNobility(state);
	}
}
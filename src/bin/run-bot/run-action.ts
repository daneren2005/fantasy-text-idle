import State from '@/game/state';
import Action from './action';
import buyProperty from '@/game/actions/buy-property';
import upgradeNobility from '@/game/actions/upgrade-nobility';
import upgradeSkill from '@/game/actions/upgrade-skill';

export default function runAction(state: State, action: Action) {
	if(action.type === 'upgrade-property') {
		return buyProperty(state, action.name);
	} else if(action.type === 'upgrade-nobility') {
		return upgradeNobility(state);
	} else if(action.type === 'upgrade-skill') {
		return upgradeSkill(state, action.name);
	}

	return false;
}
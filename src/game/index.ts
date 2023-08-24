import State from './state';
import createActions from './actions';
import { reactive } from 'vue';

function createGame() {
	const state = reactive(new State());

	return {
		state: state,
		actions: createActions(state)
	};
}
export default createGame();
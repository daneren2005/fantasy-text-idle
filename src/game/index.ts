import State from './state';

function createGame() {
	return {
		state: new State()
	};
}
export default createGame();
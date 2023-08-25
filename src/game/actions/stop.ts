import State from '../state';

export default function stop(state: State) {
	state.running = false;
}
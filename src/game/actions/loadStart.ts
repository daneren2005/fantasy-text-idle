import State from '../state';
import localforage from 'localforage';
import { AUTO_SAVE_KEY } from '../utils/constants';

export default async function loadStart(state: State) {
	const value = await localforage.getItem(AUTO_SAVE_KEY) as string | null;
	if(value) {
		let json = JSON.parse(value);
		state.load(json);
	}
}
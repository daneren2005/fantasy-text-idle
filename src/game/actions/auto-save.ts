import State from '../state';
import localforage from 'localforage';
import { AUTO_SAVE_KEY } from '../utils/constants';

export default async function autoSave(state: State) {
	let serialized = JSON.stringify(state.save());
	await localforage.setItem(AUTO_SAVE_KEY, serialized);
}
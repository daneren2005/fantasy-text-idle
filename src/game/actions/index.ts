import type State from '../state';
import PropertyTypes from '../types/property-types';
import buyProperty from './buy-property';
import loadStart from './loadStart';
import autoSave from './auto-save';
import start from './start';
import stop from './stop';
import upgradeNobility from './upgrade-nobility';
import upgradeSkill from './upgrade-skill';
import SkillTypes from '../types/skill-types';

export default function createActions(state: State) {
	return {
		start: () => start(state),
		stop: () => stop(state),
		autoSave: () => autoSave(state),
		loadStart: () => loadStart(state),
		buyProperty: (propertyName: PropertyTypes) => buyProperty(state, propertyName),
		upgradeNobility: () => upgradeNobility(state),
		upgradeSkill: (skillName: SkillTypes) => upgradeSkill(state, skillName)
	};
}
<template>
	<tr>
		<td>{{ skillName }}</td>
		<td>{{ level }}</td>
		<td>
			<div v-for="perk in currentPerks" :key="perk">{{ perk }}</div>
		</td>
		<td>
			Skill Points: {{ nextLevelSkillPoints }}
		</td>
		<td>
			<v-btn @click="actions.upgradeSkill(skillName)" :color="upgradeColor">Upgrade</v-btn>
		</td>
	</tr>
</template>


<script setup lang="ts">
import skills from '@/game/config/skills';
import Skill from '@/game/interfaces/skill';
import State from '@/game/state';
import Actions from '@/game/types/actions';
import ResourceTypes from '@/game/types/resource-types';
import SkillTypes from '@/game/types/skill-types';
import { computed } from 'vue';

const props = defineProps<{
	state: State
	skillName: SkillTypes
	actions: Actions
}>();
const level = computed(() => props.state.skills[props.skillName] ?? 0);
const skill = computed(() => skills[props.skillName]);

const nextLevelSkillPoints = computed(() => Math.floor(skill.value.upgradePoints.base * Math.pow(skill.value.upgradePoints.exponent, level.value)));
const currentPerks = computed(() => getPerks(skill.value));
function getPerks(config: Skill) {
	let perks: Array<string> = [];

	if(config.perks.propertyCostMultipler) {
		perks.push(`Decrease property upgrade costs by: ${Math.round(config.perks.propertyCostMultipler * (level.value ?? 1) * 100)}%`);
	}
	if(config.perks.resourceMultipler) {
		let resource: ResourceTypes;
		for(resource in config.perks.resourceMultipler) {
			perks.push(`Increase ${resource} production: ${Math.round((config.perks.resourceMultipler[resource] ?? 0) * (level.value ?? 1) * 100)}%`);
		}
	}

	return perks;
}
const upgradeColor = computed(() => (props.state.skill >= nextLevelSkillPoints.value) ? 'primary' : 'error');
</script>
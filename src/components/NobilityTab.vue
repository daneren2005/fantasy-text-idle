<template>
	<div>
		<v-card>
			<v-card-title>
				Current rank: {{ nobilityConfig.name }}
			</v-card-title>
			<template v-if="nextNobilityConfig">
				<v-card-subtitle class="text-h6">
					Cost to upgrade:
				</v-card-subtitle>
				<v-card-text>
					{{ upgradeCostsString }}
				</v-card-text>

				<v-card-subtitle>
					Upgrade Perks:
				</v-card-subtitle>
				<v-card-text>
					<div v-for="perk in upgradePerks" :key="perk">{{ perk }}</div>
				</v-card-text>

				<v-card-actions>
					<v-btn :color="upgradeColor" variant="flat" @click="actions.upgradeNobility()">Upgrade to {{ nextNobilityConfig.name }}</v-btn>
				</v-card-actions>
			</template>
			<v-card-title v-else class="text-primary">
				MAX LEVEL
			</v-card-title>
		</v-card>
	</div>
</template>

<script setup lang="ts">
import nobilities from '@/game/config/nobilities';
import type State from '@/game/state';
import type Actions from '@/game/types/actions';
import getNextLevelCost from '@/game/utils/get-next-level-cost';
import { computed } from 'vue';
import simpleResourcesString from './utils/simple-resources-string';
import hasResources from '@/game/utils/has-resources';
import Nobility from '@/game/interfaces/nobility';
import properties from '@/game/config/properties';
import PropertyTypes from '@/game/types/property-types';
import skills from '@/game/config/skills';
import SkillTypes from '@/game/types/skill-types';

const props = defineProps<{
	state: State,
	actions: Actions
}>();

const nobilityConfig = computed(() => nobilities[props.state.nobility]);

const nextNobilityConfig = computed(() => nobilities[props.state.nobility + 1]);
const upgradeCosts = computed(() => getNextLevelCost(nextNobilityConfig.value.upgradeCosts, 0));
const upgradeColor = computed(() => hasResources(props.state, upgradeCosts.value) ? 'primary' : 'error');
const upgradePerks = computed(() => getPerks(nextNobilityConfig.value));

const upgradeCostsString = computed(() => {
	return simpleResourcesString(upgradeCosts.value);
});

function getPerks(nobilityConfig: Nobility) {
	let perks: Array<string> = [];

	let unlockedSkills = Object.keys(skills) as Array<SkillTypes>;
	unlockedSkills = unlockedSkills.filter(name => {
		let skill = skills[name];
		return skill.requireNobility && nobilityConfig.name === skill.requireNobility;
	});
	if(unlockedSkills.length) {
		perks.push(`Unlocks new skills: ${unlockedSkills.join(', ')}`);
	}

	let unlockedProperties = Object.keys(properties) as Array<PropertyTypes>;
	unlockedProperties = unlockedProperties.filter(propertyName => {
		let property = properties[propertyName];
		return property.requireNobility && nobilityConfig.name === property.requireNobility;
	});
	if(unlockedProperties.length) {
		perks.push(`Unlocks new properties: ${unlockedProperties.join(', ')}`);
	}

	return perks.length ? perks : ['NONE'];
}
</script>

<style scoped>
.free {
	color: green;
	font-weight: bold;
}
</style>
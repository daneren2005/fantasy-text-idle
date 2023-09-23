<template>
	<div class="greetings">
		<h1 class="green">Idle Sim</h1>
		<h3>
			Time: {{ formattedTime }}

			<v-btn icon @click="actions.stop" color="error" variant="outlined" v-if="state.running"><v-icon>pause</v-icon></v-btn>
			<v-btn icon @click="actions.start" color="primary" v-else><v-icon>play_arrow</v-icon></v-btn>
		</h3>

		<h3 style="margin-bottom: 0.5em">
			Skill Points: {{ formatNumber(state.resources['Skill Point'] ?? 0) }}
			<span class="text-light-blue income">+{{ formatNumber(skillPointsPerSecond) }}/sec</span>
		</h3>

		<h3>
			Resources:
		</h3>
		<div>
			<div v-for="name in validResourceNames" :key="name">
				<resource-display :state="state" :name="name" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type State from '@/game/state';
import { computed } from 'vue';
import ResourceDisplay from './ResourceDisplay.vue';
import Actions from '@/game/types/actions';
import nobilities from '@/game/config/nobilities';
import ResourceTypes from '@/game/types/resource-types';
import getResourceIncome from '@/game/utils/get-resource-income';
import formatTime from '@/game/utils/format-time';
import formatNumber from '@/game/utils/format-number';

const props = defineProps<{
	state: State,
	actions: Actions
}>();

const formattedTime = computed(() => formatTime(props.state.gametime));
const skillPointsPerSecond = computed(() => {
	let nobility = nobilities[props.state.nobility];

	return nobility.skillPoints + getResourceIncome(props.state, 'Skill Point').income;
});
const validResourceNames = computed(() => Object.keys(props.state.resources).filter(name => name !== 'Skill Point') as Array<ResourceTypes>);
</script>

<style scoped>
h1 {
	font-weight: 500;
	font-size: 2.6rem;
	position: relative;
	top: -10px;
}

h3 {
	font-size: 1.2rem;
}

.greetings,
.greetings h1,
.greetings h3 {
	text-align: center;
}

@media (min-width: 1024px) {
	.greetings,
	.greetings h1,
	.greetings h3 {
		text-align: left;
	}
}
</style>

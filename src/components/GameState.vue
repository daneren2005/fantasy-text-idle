<template>
	<div class="greetings">
		<h1 class="green">Idle Sim</h1>
		<h3>
			Time: {{ formattedTime }}

			<v-btn icon @click="actions.stop" color="error" variant="outlined" v-if="state.running"><v-icon>pause</v-icon></v-btn>
			<v-btn icon @click="actions.start" color="primary" v-else><v-icon>play_arrow</v-icon></v-btn>
		</h3>

		<h3 style="margin-bottom: 0.5em">
			Skill Points: {{ Math.floor(state.skill) }}
			<span class="text-light-blue income">+{{ skillPointsPerSecond }}/sec</span>
		</h3>

		<h3>
			Resources:
		</h3>
		<div>
			<div v-for="(value, name) in state.resources" :key="name">
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

const props = defineProps<{
	state: State,
	actions: Actions
}>();

const formattedTime = computed(() => {
	let totalSeconds = Math.floor(props.state.gametime / 1_000);
	let hours = Math.floor(totalSeconds / 3_600 % 60).toString().padStart(2, '0');
	let minutes = Math.floor(totalSeconds / 60 % 60).toString().padStart(2, '0');
	let seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');

	return `${hours}:${minutes}:${seconds}`;
});
const skillPointsPerSecond = computed(() => {
	let nobility = nobilities[props.state.nobility];

	return nobility.skillPoints;
});
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

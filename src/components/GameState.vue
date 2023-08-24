<template>
	<div class="greetings">
		<h1 class="green">Idle Sim</h1>
		<h3>
			Time: {{ formattedTime }}
		</h3>
		<h3>
			Resources:
			<br/>
			<div v-for="(value, name) in state.resources" :key="name">
				{{ name }}: {{ Math.floor(value) }}
			</div>
		</h3>
	</div>
</template>

<script setup lang="ts">
import type State from '@/game/state';
import { computed } from 'vue';

const props = defineProps<{
	state: State
}>();

const formattedTime = computed(() => {
	let totalSeconds = Math.floor(props.state.gametime / 1_000);
	let hours = Math.floor(totalSeconds / 3_600 % 60).toString().padStart(2, '0');
	let minutes = Math.floor(totalSeconds / 60 % 60).toString().padStart(2, '0');
	let seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');

	return `${hours}:${minutes}:${seconds}`;
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

.greetings h1,
.greetings h3 {
	text-align: center;
}

@media (min-width: 1024px) {
	.greetings h1,
	.greetings h3 {
		text-align: left;
	}
}
</style>

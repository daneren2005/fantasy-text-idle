<template>
	<div class="greetings">
		<h1 class="green">Idle Sim</h1>
		<h3>
			Money: ${{ state.money }}
		</h3>
	</div>
</template>

<script setup lang="ts">
import type State from '@/game/state';

defineProps<{
	state: State
}>();
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

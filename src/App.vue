<template>
	<div class="header-wrapper">
		<div class="wrapper">
			<GameState :state="state" :actions="actions" />
		</div>
	</div>

	<div class="main-game-wrapper">
		<GuiTabs :state="state" :actions="actions" />
	</div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import GameState from './components/GameState.vue';
import GuiTabs from './components/GuiTabs.vue';
import game from '@/game';

const state = game.state;
const actions = game.actions;

actions.loadStart().then(() => actions.start());

onUnmounted(() => actions.stop());
</script>

<style scoped>
.header-wrapper {
	margin-bottom: 1em;
	flex-shrink: 1;
}

.main-game-wrapper {
	flex-grow: 1;
}

@media (min-width: 1024px) {
	.header-wrapper {
		margin-right: 2em;
	}
}
</style>

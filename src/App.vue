<template>
	<div class="header-wrapper">
		<div class="wrapper">
			<GameState :state="state" :actions="actions" />
		</div>
	</div>

	<div class="main-game-wrapper">
		<GuiTabs :state="state" :actions="actions" />
	</div>

	<v-snackbar :model-value="isMaxNobility && !closeYouWon" @update:modelValue="closeYouWon = true" color="green" timeout="-1">
		<span class="text-h5">Congrats: You beat the game.  Feel free to keep playing as long as you like, but there are no new achievements.</span>

		<template v-slot:actions>
			<v-btn color="primary" variant="flat" @click="closeYouWon = true">Close</v-btn>
		</template>
	</v-snackbar>
</template>

<script setup lang="ts">
import { onUnmounted, computed, ref } from 'vue';
import GameState from './components/GameState.vue';
import GuiTabs from './components/GuiTabs.vue';
import game from '@/game';
import nobilities from './game/config/nobilities';

const state = game.state;
const actions = game.actions;

actions.loadStart().then(() => actions.start());
const isMaxNobility = computed(() => {
	return state.nobility >= (Object.keys(nobilities).length - 1);
});
const closeYouWon = ref(false);

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

	.main-game-wrapper {
		max-height: 100%;
		overflow: auto;
	}
}
</style>

<template>
	<div>
		<v-btn color="error" @click="startReset">Hard Reset</v-btn>

		<ConfirmDialog title="Confirm Reset" message="Confirm you want to completey remove your game and start over" v-model="resetDialog" color="error" @accepted="finishReset" @cancelled="resetDialog = false" />
	</div>
</template>

<script setup lang="ts">
import { AUTO_SAVE_KEY } from '@/game/utils/constants';
import localforage from 'localforage';
import { ref } from 'vue';
import ConfirmDialog from './dialogs/ConfirmDialog.vue';

const resetDialog = ref(false);
function startReset() {
	resetDialog.value = true;
}
function finishReset() {
	localforage.removeItem(AUTO_SAVE_KEY).then(() => {
		window.location.reload();
	});
}
</script>
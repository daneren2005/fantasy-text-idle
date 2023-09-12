<template>
	<div>
		<div class="import-export-wrapper">
			<v-btn color="error" :disabled="!canImport" @click="importSettings">Import</v-btn>
			<v-btn color="primary" style="margin-left: 0.5em" @click="exportSettings">Export</v-btn>
		</div>
		<div>
			<v-text-field v-model="settingsString" ref="settingsBox" @focus="selectAllSettingText" />
		</div>

		<div class="hard-reset-wrapper">
			<div class="text-h4 text-red">Warning: Danger Zone</div>
			<v-btn color="error" @click="startReset">Hard Reset</v-btn>
		</div>

		<ConfirmDialog title="Confirm Reset" message="Confirm you want to completey remove your game and start over" v-model="resetDialog" color="error" @accepted="finishReset" @cancelled="resetDialog = false" />
		<v-snackbar v-model="clipboardSnackbar" :timeout="5_000">
			Copied to clipboard

			<template v-slot:actions>
				<v-btn color="primary" variant="text" @click="clipboardSnackbar = false">Close</v-btn>
			</template>
		</v-snackbar>

		<v-snackbar v-model="errorSnackbar">
			{{ errorMessage }}

			<template v-slot:actions>
				<v-btn color="primary" variant="text" @click="errorSnackbar = false">Close</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script setup lang="ts">
import { AUTO_SAVE_KEY } from '@/game/utils/constants';
import localforage from 'localforage';
import { ref, computed, nextTick } from 'vue';
import ConfirmDialog from './dialogs/ConfirmDialog.vue';
import State from '@/game/state';
import Actions from '@/game/types/actions';

const props = defineProps<{
	state: State,
	actions: Actions
}>();

const resetDialog = ref(false);
function startReset() {
	resetDialog.value = true;
}
function finishReset() {
	localforage.removeItem(AUTO_SAVE_KEY).then(() => {
		window.location.reload();
	});
}

const settingsString = ref('');
const canImport = computed(() => !!settingsString.value);
const clipboardSnackbar = ref(false);
const errorSnackbar = ref(false);
const errorMessage = ref('');
const settingsBox = ref<HTMLInputElement>();

function exportSettings() {
	const state = props.state.save();
	settingsString.value = btoa(state);

	nextTick(() => {
		settingsBox.value?.focus();
		selectAllSettingText();
	});
	navigator.clipboard.writeText(settingsString.value).then(() => {
		clipboardSnackbar.value = true;
	});
}
function importSettings() {
	try {
		const decodedString = atob(settingsString.value);
		const state = JSON.parse(decodedString);
		props.state.load(state);
		props.actions.autoSave();
	} catch(error) {
		// @ts-expect-error
		errorMessage.value = `Failed to parse settings: ${error.message}`;
		errorSnackbar.value = true;
	}
}
function selectAllSettingText() {
	settingsBox.value?.select();
}
</script>

<style scoped>
.import-export-wrapper {
	margin-top: 1em;
	margin-bottom: 1em;
}
.hard-reset-wrapper {
	margin-top: 1em;
}
</style>
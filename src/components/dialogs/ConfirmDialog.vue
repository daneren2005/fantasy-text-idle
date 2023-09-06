<template>
	<v-dialog
		:modelValue="modelValue"
		@update:modelValue="$emit('update:modelValue', $event)"
		@keydown.esc="$emit('update:modelValue', false); $emit('cancelled')"
		width="auto"
	>
		<v-card>
			<v-toolbar :color="color ?? 'primary'" dark dense flat>
				<v-toolbar-title class="text-body-2 font-weight-bold grey--text">
					{{ title }}
				</v-toolbar-title>
			</v-toolbar>
			<v-card-text
				v-show="!!message"
				class="pa-4 black--text"
			>{{ message }}</v-card-text>
			<v-card-actions class="pt-3">
				<v-spacer></v-spacer>
				<v-btn
					color="grey"
					class="body-2 font-weight-bold"
					@click="$emit('cancelled')"
					>Cancel</v-btn>
				<v-btn
					:color="color ?? 'primary'"
					class="body-2 font-weight-bold"
					outlined
					@click="$emit('accepted')">OK</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
defineProps<{
	title: string,
	message: string,
	modelValue: boolean,
	color: string
}>();
</script>
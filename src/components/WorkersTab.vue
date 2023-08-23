<template>
	<div>
		<v-btn>Buy Farm</v-btn>
	</div>
</template>

<script setup lang="ts">
import type State from '@/game/state';

defineProps<{
	state: State
}>();
</script>
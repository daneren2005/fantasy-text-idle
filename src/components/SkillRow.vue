<template>
	<tr>
		<td>{{ skillName }}</td>
		<td>{{ level }}</td>
		<td>
			
		</td>
		<td>
			
		</td>
		<td>
			<v-btn>Upgrade</v-btn>
		</td>
	</tr>
</template>


<script setup lang="ts">
import State from '@/game/state';
import Actions from '@/game/types/actions';
import SkillTypes from '@/game/types/skill-types';
import { computed } from 'vue';

const props = defineProps<{
	state: State
	skillName: SkillTypes
	actions: Actions
}>();
const level = computed(() => props.state.skills[props.skillName] ?? 0);

</script>
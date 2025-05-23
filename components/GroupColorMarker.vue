<script setup lang="ts">
import {CATEGORIES} from "~/utils/colour";

const props = defineProps<{
  groupId: string
}>();
const state = useRedeboonState();
const colourValue = computed(()=>{
  const index = state.value.groups.map(g => g.id).indexOf(props.groupId);
  return CATEGORIES[index % CATEGORIES.length];
});
</script>

<template>
  <span :style="{color: colourValue}">⬤</span>
</template>

<style scoped>

</style>
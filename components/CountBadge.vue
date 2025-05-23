<script setup lang="ts">

const props = defineProps<{
  count: number
}>();
const colourClass = computed(() => 'badge rounded-pill ' + (props.count === 0 ? 'text-bg-primary' : 'text-bg-secondary'));
</script>

<template>
  <span :class="colourClass">{{ count }}</span>
</template>

<style scoped>

</style>
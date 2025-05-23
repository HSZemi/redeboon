<script setup lang="ts">
import {Person} from "~/utils/interfaces";

const props = defineProps<{
  position: number,
  person: Person,
}>();
const state = useRedeboonState();

const personDone = (person: Person) => {
  person.count++;
  person.queuedAt = null;
  if (person.group === state.value.groups[state.value.queueStartIndex].id) {
    state.value.queueStartIndex = (state.value.queueStartIndex + 1) % state.value.groups.length;
  }
}

const cancel = (person: Person) => {
  person.queuedAt = null;
}

const liClass = computed(() => 'list-group-item ' + (props.position === 1 ? 'bg-primary-subtle' : props.position === 2 ? 'bg-warning-subtle' : ''))
const badgeClass = computed(() => 'badge ' + (props.position === 1 ? 'text-bg-primary' : props.position === 2 ? 'text-bg-warning' : 'text-bg-secondary'))

</script>

<template>
  <li :class="liClass">
    <span :class="badgeClass">{{ props.position }}</span>
    {{ props.person.name }}
    <CountBadge :count="props.person.count"/>
    <button class="btn btn-sm" @click="personDone(props.person)">✔️</button>
    <button class="btn btn-sm" @click="cancel(props.person)">❌</button>
  </li>
</template>

<style scoped>

</style>
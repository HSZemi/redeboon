<script setup lang="ts">
import {Group, GroupedPeople, Person, QueuedPerson} from "~/utils/interfaces";

const props = defineProps<{
  group: Group
}>();
const state = useRedeboonState();

const innerSortFunction = (a: Person, b: Person) => {
  if (a.count === 0 && b.count === 0 || a.count !== 0 && b.count !== 0) {
    return (a.queuedAt || 0) - (b.queuedAt || 0);
  }
  if (a.count === 0) {
    return -1;
  }
  return 1;
}

const sortFunction = (people: Person[]) => {
  const byGroup: GroupedPeople = {}
  for (const group of state.value.groups) {
    byGroup[group.id] = [];
  }
  for (let person of people) {
    byGroup[person.group].push(person);
  }
  for (let groupId in byGroup) {
    byGroup[groupId] = byGroup[groupId].sort(innerSortFunction);
  }
  const sorted = [];
  let groupIndex = state.value.queueStartIndex;
  while (sorted.length < people.length) {
    let nextPerson = byGroup[state.value.groups[groupIndex].id].shift();
    if (nextPerson) {
      sorted.push(nextPerson);
    }
    groupIndex = (groupIndex + 1) % state.value.groups.length;
  }
  return sorted;
}

const queuedPeople = computed(() => {
      const queued = state.value.people
          .filter(p => p.queuedAt !== null)
      const sorted = sortFunction(queued);
      return sorted.map((p: Person, i: number) => ({position: i + 1, person: p}))
          .filter((p: QueuedPerson) => p.person.group === props.group.id)
    }
);
</script>

<template>
  <ul class="list-group list-group-flush">
    <template v-for="item in queuedPeople" :key="item.person.id">
      <QueuedPersonLine :position="item.position" :person="item.person"/>
    </template>
  </ul>
</template>

<style scoped>

</style>
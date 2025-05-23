<script setup lang="ts">
import {List, Person} from "~/utils/interfaces";

const props = defineProps<{
  list: List
}>();
const state = useRedeboonState();
const queue = (member: Person) => member.queuedAt = new Date().getTime()
const members = computed(() => state.value.people.filter(p => p.list === props.list.id).sort((a, b) => a.name.localeCompare(b.name)));
</script>

<template>
  <ul class="list-group list-group-flush">
    <template v-for="member in members" :key="member.id">
      <li class="list-group-item">
        <GroupColorMarker :groupId="member.group"/> {{ member.name }} <CountBadge :count="member.count"/>
        <button class="btn btn-sm" @click="queue(member)" v-if="member.queuedAt === null">☝️</button>
        <button class="btn btn-sm" v-else>…</button>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.list-group-item {
  font-size: 85%;
  padding: .2rem;
  text-align: left;
}
</style>
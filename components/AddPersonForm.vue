<script setup lang="ts">
import {Group, List, Person} from "~/utils/interfaces";

const props = defineProps<{
  list: List
}>();
const state = useRedeboonState();
const name = ref('');
const addPerson = (group: Group) => {
  if (name.value === "") {
    return;
  }
  const person: Person = {
    id: self.crypto.randomUUID(),
    name: name.value,
    group: group.id,
    list: props.list.id,
    count: 0,
    queuedAt: null,
  }
  state.value.people.push(person);
  name.value = '';
};
</script>

<template>
  <div class="input-group">
    <input type="text" class="form-control" placeholder="Name" aria-label="Name" v-model="name">
    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">+
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <template v-for="group in state.groups" :key="group.id">
        <li>
          <button class="dropdown-item" @click="addPerson(group)">
            <GroupColorMarker :groupId="group.id"/>
            {{ group.name }}
          </button>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>

</style>
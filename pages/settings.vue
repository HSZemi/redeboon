<script setup lang="ts">
import {Person} from "~/utils/interfaces";

const state = useRedeboonState();

// Hinzufügen von groups, lists, people
// Group and List ändern für people
const newGroupName = ref('');
const newListName = ref('');
const newPersonName = ref('');
const newPersonList = ref(state.value.lists[0].id);
const newPersonGroup = ref(state.value.groups[0].id);
const addGroup = () => {
  if (newGroupName.value === "") {
    return;
  }
  state.value.groups.push({
    id: self.crypto.randomUUID(),
    name: newGroupName.value,
  });
  newGroupName.value = "";
}
const addList = () => {
  if (newListName.value === "") {
    return;
  }
  state.value.lists.push({
    id: self.crypto.randomUUID(),
    name: newListName.value,
  });
  newListName.value = "";
}
const addPerson = () => {
  if (newPersonName.value === "") {
    return;
  }
  state.value.people.push({
    id: self.crypto.randomUUID(),
    name: newPersonName.value,
    group: newPersonGroup.value,
    list: newPersonList.value,
    count: 0,
    queuedAt: null,
  });
  newListName.value = "";
}
const moveGroupUp = (groupId: string) => {
  const groups = [...state.value.groups]
  const groupIndex = groups.findIndex(group => group.id === groupId);
  if (groupIndex === 0) {
    return;
  }
  const value = groups.splice(groupIndex, 1)[0];
  state.value.groups = groups.toSpliced(groupIndex - 1, 0, value);
}
const moveGroupDown = (groupId: string) => {
  const groups = [...state.value.groups]
  const groupIndex = groups.findIndex(group => group.id === groupId);
  if (groupIndex === groups.length - 1) {
    return;
  }
  const value = groups.splice(groupIndex, 1)[0];
  state.value.groups = groups.toSpliced(groupIndex + 1, 0, value);
}
const moveListUp = (listId: string) => {
  const lists = [...state.value.lists]
  const listIndex = lists.findIndex(list => list.id === listId);
  if (listIndex === 0) {
    return;
  }
  const value = lists.splice(listIndex, 1)[0];
  state.value.lists = lists.toSpliced(listIndex - 1, 0, value);
}
const moveListDown = (listId: string) => {
  const lists = [...state.value.lists]
  const listIndex = lists.findIndex(list => list.id === listId);
  if (listIndex === lists.length - 1) {
    return;
  }
  const value = lists.splice(listIndex, 1)[0];
  state.value.lists = lists.toSpliced(listIndex + 1, 0, value);
}
const deleteGroup = (groupId: string) => {
  if (state.value.groups.length === 1) {
    return;
  }
  state.value.groups = state.value.groups.filter(value => value.id !== groupId);
  for (let person of state.value.people) {
    if (person.group === groupId && state.value.groups.length) {
      person.group = state.value.groups[0].id;
    }
  }
}
const deleteList = (listId: string) => {
  if (state.value.lists.length === 1) {
    return;
  }
  state.value.lists = state.value.lists.filter(value => value.id !== listId);
  for (let person of state.value.people) {
    if (person.list === listId && state.value.lists.length) {
      person.list = state.value.lists[0].id;
    }
  }
}
const deletePerson = (personId: string) => {
  state.value.people = state.value.people.filter(value => value.id !== personId);
}
const peopleSorter = (a: Person, b: Person) => {
  if (a.list !== b.list) {
    return a.list.localeCompare(b.list);
  }
  return a.name.localeCompare(b.name);
}

const resetAll = () => {
  state.value = initialValue();
};
const sortedPeople = computed(() => state.value.people.sort(peopleSorter))
</script>

<template>
  <div class="row">
    <div class="col">
      <h2>Redelisten</h2>
      <p class="text-muted">Zum Umbenennen einer Redeliste den Text im Eingabefeld ändern.
        Änderungen werden direkt übernommen.</p>
      <ol>
        <li v-for="group in state.groups" :key="group.id">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Name der Redeliste" v-model="group.name"/>
            <button class="btn btn-outline-secondary" type="button" @click="moveGroupUp(group.id)">↑</button>
            <button class="btn btn-outline-secondary" type="button" @click="moveGroupDown(group.id)">↓</button>
            <button class="btn btn-outline-secondary" type="button" @click="deleteGroup(group.id)">❌</button>
          </div>
        </li>
        <li>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Name der Redeliste" aria-label="Name der Redeliste"
                   aria-describedby="button-add-group" v-model="newGroupName">
            <button class="btn btn-outline-secondary" type="button" id="button-add-group" @click="addGroup">Hinzufügen
            </button>
          </div>
        </li>
      </ol>
    </div>

    <div class="col">
      <h2>Fraktionen</h2>
      <p class="text-muted">Zum Umbenennen einer Fraktion den Text im Eingabefeld ändern.
        Änderungen werden direkt übernommen.</p>
      <ol>
        <li v-for="list in state.lists" :key="list.id">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Name der Fraktion" v-model="list.name"/>
            <button class="btn btn-outline-secondary" type="button" @click="moveListUp(list.id)">↑</button>
            <button class="btn btn-outline-secondary" type="button" @click="moveListDown(list.id)">↓</button>
            <button class="btn btn-outline-secondary" type="button" @click="deleteList(list.id)">❌</button>
          </div>
        </li>
        <li>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Name der Fraktion" aria-label="Name der Fraktion"
                   aria-describedby="button-add-list" v-model="newListName">
            <button class="btn btn-outline-secondary" type="button" id="button-add-list" @click="addList">Hinzufügen
            </button>
          </div>
        </li>
      </ol>

    </div>
  </div>

  <h2>Personen</h2>
  <p class="text-muted">Zum Umbenennen einer Person den Text im Eingabefeld ändern.
    Änderungen werden direkt übernommen.</p>
  <ol>
    <li v-for="person in sortedPeople" :key="person.id">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Name der Person" v-model="person.name"/>
        <select class="form-select" v-model="person.list">
          <option v-for="list in state.lists" :key="list.id" :value="list.id">{{ list.name }}</option>
        </select>
        <select class="form-select" v-model="person.group">
          <option v-for="group in state.groups" :key="group.id" :value="group.id">{{ group.name }}</option>
        </select>
        <button class="btn btn-outline-secondary" type="button" @click="deletePerson(person.id)">❌</button>
      </div>
    </li>
    <li>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Name der Person" v-model="newPersonName"/>
        <select class="form-select" v-model="newPersonList">
          <option v-for="list in state.lists" :key="list.id" :value="list.id">{{ list.name }}</option>
        </select>
        <select class="form-select" v-model="newPersonGroup">
          <option v-for="group in state.groups" :key="group.id" :value="group.id">{{ group.name }}</option>
        </select>
        <button class="btn btn-outline-secondary" type="button" id="button-add-list" @click="addPerson">Hinzufügen
        </button>
      </div>
    </li>
  </ol>
  <div class="card mb-3">
    <div class="card-body">
      <h2>Gefahrenzone</h2>
      <button type="button" class="btn btn-danger" @click="resetAll">Vollständiger Reset</button>
    </div>
  </div>
</template>

<style scoped>

</style>
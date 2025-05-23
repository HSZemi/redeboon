<script setup lang="ts">

import {initialValue, useRedeboonState} from "~/composables/states";

const state = useRedeboonState();
const resetState = () => {
  for (let person of state.value.people) {
    person.count = 0;
    person.queuedAt = null;
  }
}
</script>

<template>
  <button class="btn btn-primary" @click="resetState">Zurücksetzen</button>
</template>

<style scoped>

</style>

<script setup lang="ts">

import GroupColorMarker from "~/components/GroupColorMarker.vue";

const state = useRedeboonState();
</script>

<template>
  <div class="row">
    <template v-for="group in state.groups" :key="group.id">
      <div class="col pb-2">
        <div class="card text-center">
          <div class="card-header">
           <GroupColorMarker :groupId="group.id"/> {{ group.name }}
          </div>
          <div class="card-body">
            <QueueForGroup :group="group"/>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.card-body {
  min-height: 15rem;
}
</style>
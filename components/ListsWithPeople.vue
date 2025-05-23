<script setup lang="ts">

const state = useRedeboonState();
</script>

<template>
  <div class="row row-cols-auto">
    <template v-for="list in state.lists" :key="list.id">
      <div class="col pb-2">
        <div class="card text-center" style="width: 18rem;">
          <div class="card-header">
            {{ list.name }}
          </div>
          <div class="card-body">
            <ListMembers :list="list"/>
          </div>
          <div class="card-footer text-body-secondary">
            <AddPersonForm :list="list"/>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
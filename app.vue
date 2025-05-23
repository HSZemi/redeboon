<script setup lang="ts">
import {useRedeboonState} from "~/composables/states";
import {downloadText, importData} from "~/utils/file";

const state = useRedeboonState();
const loadCallback = (text: string) => {
  try {
    const parsedValue = JSON.parse(text);
    state.value = parsedValue;
  } catch (e: any) {
    alert('Fehler: Daten konnten nicht geladen werden:\n' + e.toString());
  }
}
const load = () => {
  importData(loadCallback);
};
const save = () => {
  const value = JSON.stringify(state.value, null, 2);
  downloadText(value);
};
</script>
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <NuxtLink to="/" class="navbar-brand">redeboon</NuxtLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link" v-bind:class="{ 'active': $route.path == '/' }">
              Redeliste
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/settings" class="nav-link" v-bind:class="{ 'active': $route.path == '/settings' }">
              Einstellungen
            </NuxtLink>
          </li>
        </ul>
        <div class="btn-group me-3" role="group" aria-label="Laden/Speichern">
          <ResetButton/>
          <button type="button" class="btn btn-outline-primary" @click="load">Laden</button>
          <button type="button" class="btn btn-outline-primary" @click="save">Speichern</button>
        </div>
        <div class="d-flex me-1">
          <a href="https://github.com/hszemi/redeboon" title="Open Project on GitHub">
            <img style="height: 2em;" src="/github-mark.svg" alt="GitHub logo"/>
          </a>
        </div>
      </div>
    </div>
  </nav>
  <div class="container-fluid pt-3">
    <NuxtPage/>
  </div>
</template>

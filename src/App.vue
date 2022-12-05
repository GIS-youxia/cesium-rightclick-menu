<template>
  <div id="app">
    <common-map-comp></common-map-comp>
  </div>
</template>

<script>
import commonMapComp from "@/components/RightClickMenu/CommonMapComp";
export default {
  name: 'App',
  components: {
    commonMapComp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

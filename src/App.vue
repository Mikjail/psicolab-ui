<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
  height: 100%;
}
.page-item {
   &.active{
     .page-link{
       background-color: $primary !important;
       border-color: $primary !important;
     }
   }
   .page-link{
     color: $primary;
   }
}
</style>

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
  font-family: OpenSans, Avenir, Helvetica, Arial, sans-serif;
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
.progress {
  background-color: $primary;
  border: 2px solid white;
  .progress-bar{
   background-color: white;
  }
}
</style>

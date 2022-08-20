<template>
  <div id="app" class="home-nav">
    <nav>
      <router-link to="/">ホーム</router-link> |
      <router-link to="/model-viewer/heat-map-3d">グリグリを使った3Dヒートマップ</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
%container{
  width: 1284px;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

h2,h3,p {
  text-align: left; 
  margin-block-start: 0;
  margin-block-end: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #000;
  text-decoration: none;
}

.home-nav{
  @extend %container;
  padding: 0 40px;
}
</style>

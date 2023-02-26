<template>
  <div id="app" class="home-wrapper">
    <nav class="home-nav">
      <router-link to="/">ホーム</router-link>
      <router-link to="/model-viewer/demo">グリグリ</router-link>
      <router-link to="/model-viewer/heat-map-3d">ヒートマップ</router-link>
    </nav>
    <router-view class="contents"/>
  </div>
</template>

<style lang="scss">
%container{
  width: 100vw;
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
  padding: 30px 20px 0 0;
  font-size: 1.2rem;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

h2,h3,h4,p {
  text-align: left; 
  margin-block-start: 0;
  margin-block-end: 0;
  white-space: pre ;
}
ul {
  list-style: disc;
  padding-left: 0;
}
li {
  margin: 0 10px;
  text-align: left;
}
a {
  color: #000;
  text-decoration: none;
}

.home-wrapper{
  @extend %container;
}

.home-nav{
  display: flex;
  justify-content: center;
  column-gap: 5vw;
  padding: 2vw 0;
  text-align: left;
  border-bottom: 2px solid #222;
}

.contents{
  width: 90vw;
  padding: 0 5vw;
}
</style>

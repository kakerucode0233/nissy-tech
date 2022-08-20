<template>
  <div class="home">
    <h1>にっしーの技術ノート</h1>
    <router-link to="/model-viewer/heat-map-3d">
      <div class="link-box">
        <h2 class="link-box-title">グリグリを使った3Dヒートマップ</h2>
        <p class="link-box-text">
          お客さんが家具のどこを注目しているか分析するための技術を紹介！
          <br>
          商品開発の助けになるかも？
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'HomeView'
}
</script>

<style lang="scss">
//main
.link-box {
  margin: 0 auto;
  width: 1000px;
  border: 2px solid #42b983;
  border-radius: 12px;
  padding: 20px 10px;
  transition: .3s;

  &:hover{
    opacity: 0.5;
  }
}

.link-box-title{
  margin-bottom: 20px;
}
</style>
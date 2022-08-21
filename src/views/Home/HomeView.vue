<template>
  <div class="home">
    <h1>にっしーの技術ノート</h1>
    <router-link to="/model-viewer/heat-map-3d">
      <div class="link-box">
        <img src="assets/images/thumbnail-heat-map-3d.jpg" alt="thumbnail-heat-map-3d" width="250" height="250" class="link-box-img">
        <div>
          <h2 class="link-box-title">グリグリを使った3Dヒートマップ</h2>
          <p class="link-box-text">
            お客さんが家具のどこを注目しているか分析するための技術を紹介！
            <br>
            商品開発の助けになるかも？
          </p>
        </div>
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
%container{
  width: 1000px;
  margin-left: 350px;
  border-left: 1px solid #555;
}

//main
.home{
  @extend %container;
  padding-left: 40px;
}

.link-box {
  display: flex;
  column-gap: 40px;
  border: 2px solid #42b983;
  border-radius: 12px;
  padding: 20px 10px;
  transition: .3s;

  &:hover{
    opacity: 0.5;
  }
}

.link-box-img{
  display: block;
  width: 250px;
  height: 250px;
}

.link-box-title{
  margin: 20px 0;
}
</style>
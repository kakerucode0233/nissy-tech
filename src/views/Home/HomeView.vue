<template>
  <div class="home">
    <h1>にっしーの技術ノート</h1>
    <ul class="page-box-list">
      <li v-for="page in pages" :key="`page-${page.key}`">
        <router-link :to="page.to">
          <div class="page-box">
            <img :src="page.thumbnail" :alt="page.key" width="250" height="250" class="page-box-img">
            <div class="page-box-detail">
              <h2 class="page-box-title">{{page.title}}</h2>
              <p class="page-box-text">{{page.detail}}</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      pages:[
        {
          key: 'model-viewer-demo',
          to: '/model-viewer/demo',
          thumbnail: 'assets/images/thumbnail-model-viewer.jpg',
          title: '3D家具グリグリ',
          detail: 'お客さんが家具を360度自由に見られる技術を紹介！\n購買意欲を搔き立てること間違いなし！',
        },
        {
          key: 'heat-map-3d',
          to: '/model-viewer/heat-map-3d',
          thumbnail: 'assets/images/thumbnail-heat-map-3d.jpg',
          title: 'グリグリを使った3Dヒートマップ',
          detail: 'お客さんが家具のどこを注目しているか分析するための技術を紹介！\n商品開発の助けになるかも？',
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.home{
  width: 90vw;
}

.page-box-list{
  list-style-type: none;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}

.page-box {
  display: flex;
  justify-content: center;
  width: 75vw;
  flex-wrap: wrap;
  column-gap: 5vw;
  border: 2px solid #42b983;
  border-radius: 12px;
  padding: 3vw 3vw;
  transition: .3s;

  &:hover{
    opacity: 0.5;
  }
}

.page-box-img{
  display: block;
  width: 20vw;
  height: 20vw;
  min-width: 270px;
  min-height: 270px;
}

.page-box-detail{
  width: 30vw;
  min-width: 270px;
}

.page-box-title{
  white-space: pre-line;
  margin: 20px 0;
}

.page-box-text{
  white-space: pre-line;
}
</style>
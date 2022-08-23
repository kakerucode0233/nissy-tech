<template>
  <div class="home">
    <h1>にっしーの技術ノート</h1>
    <ul class="page-box-list">
      <li v-for="page in pages" :key="`page-${page.key}`">
        <router-link :to="page.to">
          <div class="page-box">
            <img :src="page.thumbnail" :alt="page.key" width="250" height="250" class="page-box-img">
            <div>
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

.page-box-list{
  list-style-type: none;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}

.page-box {
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

.page-box-img{
  display: block;
  width: 250px;
  height: 250px;
}

.page-box-title{
  margin: 20px 0;
}
</style>
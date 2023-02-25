<template>
  <div class="introduction-top-wrapper">
    <model-viewer
      id="annotation-demo"
      src="assets/models/model.glb"
      camera-controls
      enable-pan
      touch-action = none
      exposure = 0.7
      class="model-viewer">
        <!-- 注釈 -->
        <button @click="annotations[0].detailOpen = !annotations[0].detailOpen" slot="hotspot-point1" data-position="0.38m 0.15m -0.18m" data-normal="0 0 -1" data-orbit="150deg 60deg 50%">
          <span v-if="annotations[0].detailOpen" class="annotation1-detail">
            <span class="annotation1-detail-ttl">{{annotations[0].ttl}}</span>
            <span class="annotation1-detail-text">{{annotations[0].detailText}}</span>
          </span>
          <span v-else class="annotation1">{{annotations[0].ttl}}</span>
        </button>

        <button @click="annotations[1].detailOpen = !annotations[1].detailOpen" slot="hotspot-point2" data-position="0m 0.6m 0.2m" data-normal="0 0 1" data-orbit="0deg 90deg">
          <span v-if="annotations[1].detailOpen" class="annotation2-detail">
            <span class="annotation2-detail-ttl">{{annotations[1].ttl}}</span>
            <img src="assets/images/detail-img01.jpg" alt="中までテラゾー柄" width="200" height="200">
          </span>
          <span v-else class="annotation2">{{annotations[1].ttl}}</span>
        </button>

        <button @click="annotations[2].detailOpen = !annotations[2].detailOpen" slot="hotspot-point3" data-position="0.25m 0.7m -0.18m" data-normal="0 0 -1" data-orbit="150deg 60deg 50%">
          <div class="annotation-point" />
          <span v-if="annotations[2].detailOpen" class="annotation1-detail">
            <span class="annotation1-detail-ttl">{{annotations[2].ttl}}</span>
          </span>
        </button>
    </model-viewer>
    <div>
      <h3 class="introduction-detail-title">注釈追加</h3>
      <ul class="introduction-detail-text">
        <li>
          3Dモデル上に注釈を追加でき、家具を回転させると注釈が隠れる
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loadModelViewer } from '@/components/lib/modelViewer';

export default {
  name: 'defaultDemo',
  data(){
    return {
      modelViewerObj: null,
      annotations: [
        {
          detailOpen: false,
          ttl: 'コードリール付き！',
          detailText: '背面のコード穴近くにはコードリールを設け、コード類をスッキリ巻き付けることが出来ます。配線を見せない、美しいリビングづくりに一役買うポイントです。',
        },
        {
          detailOpen: false,
          ttl: '中までテラゾー柄！',
          detailText: '扉収納の内側まで、余すことなくテラゾー柄を使用。表面だけではなく、細かいところまで美しく仕上げました。',
        },
        {
          detailOpen: false,
          ttl: 'コードスリット付き！',
          detailText: '天板は飾り棚として使用したり、よく使う小物を置くスペースとして使うのもオススメ！スマホの充電やスタンドライトなどの家電も置けるよう、天板奥にはコードスリットを設けました。',
        }
      ],
    }
  },
  async mounted() {
    await loadModelViewer();
    this.initModelViewer();
  },
  methods: {
    initModelViewer(){
      const modelViewer = document.querySelector('#annotation-demo');
      modelViewer.addEventListener('load', () => {
        this.modelViewerObj = modelViewer;
        this.setUpHotspot();
      })
    },
    setUpHotspot(){
        const annotationClicked = (annotation) => {
          let dataset = annotation.dataset;
          this.modelViewerObj.cameraTarget = dataset.position;
          this.modelViewerObj.cameraOrbit = dataset.orbit;
          this.modelViewerObj.fieldOfView = '45deg';
        }
        this.modelViewerObj.querySelectorAll('button').forEach((hotspot) => {
          hotspot.addEventListener('click', () => annotationClicked(hotspot));
        });
      },
  },
}
</script>

<style lang="scss" scoped>
@keyframes annotationScale{
  0%{
    transform: scale(1, 1);
  }

  50%{
    transform: scale(1.4, 1.4);
  }

  100%{
    transform: scale(1, 1);
  }
}

.introduction-top-wrapper{
  display: flex;
  column-gap: 80px;
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 10px solid #ddd;
}

.introduction-detail-title{
  margin-bottom: 10px;
}

.introduction-detail-text{
  width: 450px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.model-viewer{
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}

.annotation1{
  display: block;
  width: 150px;
  background-color: #888888;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  position: absolute;
  transform: translate(-85px, 10px);
  border-radius: 10px;
  padding: 10px;
}

button[slot="hotspot-point1"]{
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  background-color: red;
  box-sizing: border-box;
  --min-hotspot-opacity: 0;
}

button[slot="hotspot-point2"]{
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  background-color: blue;
  box-sizing: border-box;
  --min-hotspot-opacity: 0;
}

button[slot="hotspot-point3"]{
  border: none;
  background-color: rgba(1,1,1,0);
  --min-hotspot-opacity: 0;

  .annotation-point{
    display: block;
    position: relative;
    animation: annotationScale 1s infinite;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgba(1,1,1,0.5);
    background-color: rgba(124, 124, 124, 0.5);
    box-sizing: border-box;
  
    &::after{
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 17px;
      height: 17px;
      border-radius: 50%;
      border: 1px solid rgba(1,1,1,0.5);
      background-color: rgba(209, 209, 209, 0.5);
    }
  }
}

.annotation1-detail{
  width: 200px;
  background-color: #888888;
  color: #fff;
  position: absolute;
  transform: translate(-85px, 10px);
  border-radius: 5px;
  padding: 10px;
}

.annotation1-detail-ttl{
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
}

.annotation1-detail-text{
  display: block;
  font-size: 1rem;
  font-weight: 400;
}

.annotation2{
  width: 150px;
  background-color: burlywood;
  color: #000;
  font-size: 1rem;
  font-weight: 400;
  position: absolute;
  transform: translate(-85px, 10px);
  border-radius: 5px;
  padding: 10px;
}

.annotation2-detail{
  width: 200px;
  background-color: burlywood;
  color: #000;
  position: absolute;
  transform: translate(-85px, 10px);
  border-radius: 5px;
  padding: 10px;
}

.annotation2-detail-ttl{
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
}

.annotation2-detail-text{
  display: block;
  font-size: 1rem;
  font-weight: 400;
}
</style>
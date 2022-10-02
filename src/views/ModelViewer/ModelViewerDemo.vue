<template>
  <div>
    <section class="introduction">
      <h1 class="page-title">3D家具グリグリ</h1>
      <h2 class="introduction-title">家具の3Dモデルを表示してユーザーが操作可能！</h2>
      <div class="introduction-top-wrapper">
        <model-viewer 
          v-if="isMounted" 
          id="furniture-demo" 
          src="assets/models/model.glb" 
          camera-controls 
          enable-pan
          exposure = 0.7
          touch-action = none
          class="model-viewer">
        </model-viewer>
        <div>
          <h3 class="introduction-detail-title">操作説明</h3>
          <h4>-PCの場合-</h4>
          <ul class="introduction-detail-text">
            <li>
              マウスの左クリックをホールドしながら、上下左右に動かすことで家具を回転
            </li>
            <li>
              マウスの右クリックをホールドしながら、上下左右に動かすことで家具を平行移動
            </li>
            <li>
              マウスのホイールで拡大縮小が可能
            </li>
          </ul>
          <h4>-スマホの場合-</h4>
          <ul class="introduction-detail-text">
            <li>
              スワイプ操作で家具を回転させることができる
            </li>
            <li>
              2本指で拡大縮小が可能
            </li>
          </ul>
        </div>
      </div>

      <div class="introduction-top-wrapper">
        <model-viewer 
          v-if="isMounted" 
          id="room-demo"
          src="assets/models/room1.glb" 
          camera-controls 
          enable-pan
          exposure = 0.7
          touch-action = none
          camera-target="0.7m 1m -0.5m"
          camera-orbit="60deg 70deg 90%"
          class="model-viewer">
        </model-viewer>
        <div>
          <h3 class="introduction-detail-title">部屋を丸ごと表示することも可能！</h3>
          <ul class="introduction-detail-text">
            <li>
              コーディネートを丸ごと3Dにしてお部屋を覗くことも
            </li>
          </ul>
        </div>
      </div>

      <div class="introduction-top-wrapper">
        <model-viewer 
          v-if="isMounted" 
          id="turn-table-demo"
          src="assets/models/model.glb"
          auto-rotate
          exposure = 0.7
          :rotation-per-second = "rotateSpeed * Math.PI + 'rad'"
          class="model-viewer">
          <div class="model-viewer-rotation-range-bar">
            <p class="range-bar-text">回転速度: {{rotateSpeed}}</p>
            <input type="range" id="rotation-speed-bar" min="-1.2" max="1.2" step="0.01"/>
          </div>
        </model-viewer>
        <div>
          <h3 class="introduction-detail-title">ターンテーブル</h3>
          <ul class="introduction-detail-text">
            <li>
              回転・拡縮・移動など永続的な動きを加えられる
            </li>
            <li>
              この動きはglbファイル内に埋め込まなくとも、model viewer側で設定可能
            </li>
          </ul>
        </div>
      </div>

      <div class="introduction-top-wrapper">
        <model-viewer 
          v-if="isMounted" 
          id="exposure-demo"
          src="assets/models/model.glb"
          camera-controls 
          enable-pan
          touch-action = none
          :exposure = "exposure"
          class="model-viewer">
          <div class="model-viewer-rotation-range-bar">
            <p class="range-bar-text">光の強さ(露出):{{exposure}}</p>
            <input type="range" id="exposure-bar" min="0" max="1" step="0.01" value="0.7"/>
          </div>
        </model-viewer>
        <div>
          <h3 class="introduction-detail-title">光の強さ(露出)</h3>
          <ul class="introduction-detail-text">
            <li>
              家具に当たる光の強さを調整することができる
            </li>
          </ul>
        </div>
      </div>

      <div class="introduction-top-wrapper">
        <model-viewer
          v-if="isMounted"
          id="annotation-demo-01"
          src="assets/models/3HWFL_LXMS8V.glb"
          camera-controls
          enable-pan
          touch-action = none
          exposure = 0.7
          camera-orbit="0deg 90deg 80%"
          camera-target = "0m 0.4m 0.2m"
          class="model-viewer">

          <!-- 注釈 -->
          <button v-on:click="annotations[0].detailOpen = !annotations[0].detailOpen" slot="hotspot-point1" data-position="0.38m 0.15m -0.18m" data-normal="0 0 -1" data-orbit="150deg 60deg 50%">
            <span v-if="annotations[0].detailOpen" class="annotation1-detail">
              <span class="annotation1-detail-ttl">{{annotations[0].ttl}}</span>
              <span class="annotation1-detail-text">{{annotations[0].detailText}}</span>
            </span>
            <span v-else class="annotation1">{{annotations[0].ttl}}</span>
          </button>
    
          <button v-on:click="annotations[1].detailOpen = !annotations[1].detailOpen" slot="hotspot-point2" data-position="0m 0.6m 0.2m" data-normal="0 0 1" data-orbit="0deg 90deg">
            <span v-if="annotations[1].detailOpen" class="annotation2-detail">
              <span class="annotation2-detail-ttl">{{annotations[1].ttl}}</span>
              <img src="assets/images/detail-img01.jpg" alt="中までテラゾー柄" width="200" height="200">
            </span>
            <span v-else class="annotation2">{{annotations[1].ttl}}</span>
          </button>

          <button v-on:click="annotations[2].detailOpen = !annotations[2].detailOpen" slot="hotspot-point3" data-position="0.25m 0.7m -0.18m" data-normal="0 0 -1" data-orbit="150deg 60deg 50%">
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

      <div class="introduction-top-wrapper">
        <model-viewer
          v-if="isMounted"
          id="animation-demo-01" 
          src="assets/models/3HWFL_LXMS8V.glb" 
          camera-controls
          enable-pan
          touch-action = none
          exposure = 0.7
          camera-target="0m 0.5m 0m"
          camera-orbit="0deg 90deg 100%"
          animation-crossfade-duration = 0
          class="model-viewer">
        </model-viewer>
        <div>
          <h3 class="introduction-detail-title">様々なアニメーションを追加可能</h3>
          <ul class="introduction-button-list">
            <li>
              <button v-on:click="playAnimation(0)" :id="`animation-play-btn-${0}`" class="animation-play-btn">中央ドアを開く</button>
            </li>
            <li>
              <button v-on:click="playAnimation(1)" :id="`animation-play-btn-${1}`" class="animation-play-btn">左ドアを開く</button>
            </li>
            <li>
              <button v-on:click="playAnimation(2)" :id="`animation-play-btn-${2}`" class="animation-play-btn">右ドアを開く</button>
            </li>
            <li>
              <button v-on:click="resetAnimation()" class="animation-reset-btn">ドアを閉じる</button>
            </li>
          </ul>
        </div>
      </div>

      <div class="introduction-top-wrapper">
        <model-viewer
          v-if="isMounted"
          id="animation-demo-01"
          src="assets/models/cupboard02.glb" 
          camera-controls
          enable-pan
          exposure = 0.7
          touch-action = none
          camera-target="0m 1m 0m"
          camera-orbit="30deg 80deg 10%"
          autoplay
          class="model-viewer">
        </model-viewer>
        <div>
          <h3 class="introduction-detail-title">家具の利用方法もアニメーションに</h3>
          <ul class="introduction-detail-text">
            <li>
              機能性を推したい家具では、アニメーションを使うことでその用途を効果的に説明可能
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'ModelViewerDemo',
  data() {
    return {
      isMounted: false,
      rotateSpeed: 1,
      exposure: 0.7,
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
      ]
    }
  },
  methods:{
    async setIsMounted(){
      this.isMounted = true;
    },
    setRotationSpeed(speed){
      this.rotateSpeed = speed;
    },
    setExposure(exposure){
      this.exposure = exposure;
    },
    async hotspotSettings(){
      const annotationDemo01 = document.querySelector("model-viewer#annotation-demo-01");
      const annotationClicked = (annotation) => {
        let dataset = annotation.dataset;
        annotationDemo01.cameraTarget = dataset.position;
        annotationDemo01.cameraOrbit = dataset.orbit;
        annotationDemo01.fieldOfView = '45deg';
      }
      annotationDemo01.querySelectorAll('button').forEach((hotspot) => {
        hotspot.addEventListener('click', () => annotationClicked(hotspot));
      });
    },
    playAnimation(animationId){
      for(let i=0; i<3; i++){
        this.disableBtnById('animation-play-btn-' + i);
      }
      this.resetAnimation();

      const animationDemo01 = document.querySelector("model-viewer#animation-demo-01");
      animationDemo01.animationName = animationDemo01.availableAnimations[animationId];
      
      animationDemo01.play();
      const animationPauseTime = animationDemo01.duration * 1000/2;
      setTimeout(() => {
        animationDemo01.pause();
        for(let i=0; i<3; i++){
          this.enableBtnById('animation-play-btn-' + i);
        }
      }, animationPauseTime);
    },
    resetAnimation(){
      const animationDemo01 = document.querySelector("model-viewer#animation-demo-01");
      animationDemo01.currentTime = 0;
    },
    disableBtnById(btnId){
      document.getElementById(btnId).disabled = true;
    },
    enableBtnById(btnId){
      document.getElementById(btnId).disabled = false;
    },
  },
  async mounted() {
    await this.loadComponent();
    await this.setIsMounted();
    window.onload = () => {
      const rotateSpeedInputElem = document.getElementById('rotation-speed-bar');
      const exposureInputElem = document.getElementById('exposure-bar');

      rotateSpeedInputElem.addEventListener('input', (event) =>{
        this.setRotationSpeed(event.target.value);
      });
      exposureInputElem.addEventListener('input', (event) =>{
        this.setExposure(event.target.value);
      });
    }
    await this.hotspotSettings();
  },
  created(){
  },
  computed: {
    loadComponent() {
      return () => import('@google/model-viewer');
    }
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

%container{
  width: 940px;
  border-left: 1px solid #555;
}

.page-title{
  font-size: 2rem;
}

// 技術紹介
.introduction{
  @extend %container;
  padding-left: 40px;
}

.introduction-title{
  margin-bottom: 30px;
}

.introduction-top-wrapper{
  display: flex;
  column-gap: 80px;
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 10px solid #ddd;
}

.model-viewer{
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}

.range-bar-text{
  width: 135px;
}

.model-viewer-rotation-range-bar{
  position: absolute;
  bottom: 5px;
  right: 10px;
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

.introduction-button-list{
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  list-style-type: none;
}

.animation-play-btn{
  font-size: 1.4rem;
  font-weight: 500;
  padding: 5px 20px;
  border-radius: 20px;
  background-color: #fff;
  color: #42b983;
  border: 2px solid #42b983;
  transition: 0.3s;
  cursor: pointer;

  &:hover{
    color: #fff;
    background-color: #42b983;
  }
}

.animation-reset-btn{
  font-size: 1.4rem;
  font-weight: 500;
  padding: 5px 20px;
  border-radius: 20px;
  background-color: #fff;
  color: #333;
  border: 2px solid #333;
  transition: 0.3s;
  cursor: pointer;

  &:hover{
    color: #fff;
    background-color: #333;
  }
}
</style>
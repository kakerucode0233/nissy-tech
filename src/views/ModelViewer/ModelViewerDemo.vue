<template>
  <div>
    <section class="introduction">
      <h1 class="page-title">3D家具グリグリ</h1>
      <h2 class="introduction-title">家具の3Dモデルを表示してユーザーが操作可能！</h2>
      <div class="introduction-top-wrapper">
        <model-viewer 
          v-if="isMounted" 
          id="heat-map-3d-demo" 
          src="assets/models/model.glb" 
          camera-controls 
          enable-pan
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
          id="heat-map-3d-demo" 
          src="assets/models/room1.glb" 
          camera-controls 
          enable-pan
          camera-target="0.7m 1m -0.5m"
          camera-orbit="60deg 70deg 90%"
          class="model-viewer">
        </model-viewer>
        <div>
          <h3 class="introduction-detail-title">説明</h3>
          <h4>部屋を丸ごと表示することも可能！</h4>
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
          id="annotation-demo-01" 
          src="assets/models/cupboard01.glb" 
          camera-controls
          enable-pan
          shadow-intensity="1"
          shadow-softness = 0
          camera-target="0m 1m 0m"
          camera-orbit="0deg 90deg 10%"
          class="model-viewer">

          <!-- 注釈 -->
          <button slot="hotspot-point1" data-position="0.3m 1m 0.3m" data-normal="0 0 1">
            <div class="annotation1">ポイント１</div>
          </button>
    
          <button slot="hotspot-point2" data-position="-0.3m 0.3m 0.3m" data-normal="0 0 1">
            <div class="annotation2">ポイント２</div>
          </button>

        </model-viewer>
        <div>
          <h3 class="introduction-detail-title">説明</h3>
          <h4>注釈追加</h4>
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
          src="assets/models/cupboard01.glb" 
          camera-controls
          enable-pan
          shadow-intensity="1"
          shadow-softness = 0
          camera-target="0m 1m 0m"
          camera-orbit="0deg 90deg 10%"
          class="model-viewer">
          <p id="animation-demo-text">アニメーション：停止中</p>
        </model-viewer>
        <div>
          <h3 class="introduction-detail-title">説明</h3>
          <h4>様々なアニメーションを追加可能</h4>
          <ul class="introduction-button-list">
            <li>
              <button v-on:click="playAnimation('body_move')" class="animation-play-btn">移動</button>
            </li>
            <li>
              <button v-on:click="playAnimation('body_rotation')" class="animation-play-btn">回転</button>
            </li>
            <li>
              <button v-on:click="playAnimation('body_scale')" class="animation-play-btn">拡縮</button>
            </li>
            <li>
              <button v-on:click="playAnimation('left_door_open')" class="animation-play-btn">左ドアの開閉</button>
            </li>
            <li>
              <button v-on:click="playAnimation('rigth_door_open')" class="animation-play-btn">右ドアの開閉</button>
            </li>
            <li>
              <button v-on:click="stopAnimation()" class="animation-pause-btn">停止</button>
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
          shadow-intensity="1"
          shadow-softness = 0
          camera-target="0m 1m 0m"
          camera-orbit="30deg 80deg 10%"
          autoplay
          class="model-viewer">
        </model-viewer>
        <div>
          <h3 class="introduction-detail-title">説明</h3>
          <h4>家具の利用方法もアニメーションに</h4>
          <ul class="introduction-button-list">
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
    }
  },
  methods:{
    playAnimation(animationName){
      const animationDemo01 = document.querySelector("model-viewer#animation-demo-01");
      animationDemo01.animationName = animationName;
      animationDemo01.play();
      document.getElementById('animation-demo-text').textContent = 'アニメーション：再生中';
    },
    stopAnimation(){
      const animationDemo01 = document.querySelector("model-viewer#animation-demo-01");
      animationDemo01.pause();
      document.getElementById('animation-demo-text').textContent = 'アニメーション：停止中';
    }
  },
  mounted() {
    this.isMounted = true;
    this.loadComponent();
  },
  computed: {
    loadComponent() {
      return () => import('@google/model-viewer');
    }
  },
}
</script>

<style lang="scss" scoped>
%container{
  width: 1000px;
  margin-left: 350px;
  border-left: 1px solid #555;
}

.page-title{
  font-size: 2rem;
}

// 技術紹介
.introduction{
  @extend %container;
  padding: 0 40px;
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
  width: 400px;
  height: 400px;
  border: 1px solid #eee;
  margin-bottom: 20px;
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
  width: 10px;
  height: 10px;
  border-radius: 10px;
  border: none;
  background-color: red;
  box-sizing: border-box;
  --min-hotspot-opacity: 0;
}

button[slot="hotspot-point2"]{
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  border: none;
  background-color: blue;
  box-sizing: border-box;
  --min-hotspot-opacity: 0;
}

.annotation1{
  width: 120px;
  background-color: #888888;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  position: absolute;
  transform: translate(10px, 10px);
  border-radius: 10px;
  padding: 10px;
}

.annotation2{
  width: 120px;
  background-color: burlywood;
  color: #000;
  font-size: 1rem;
  font-weight: 400;
  position: absolute;
  transform: translate(10px, 10px);
  border-radius: 5px;
  padding: 10px;
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

.animation-pause-btn{
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
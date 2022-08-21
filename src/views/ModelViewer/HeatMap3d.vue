<template>
  <div class="heat-map-3d">
    <h1 class="page-title">グリグリを使った3Dヒートマップ</h1>
    <section class="introduction">
      <h2>技術紹介</h2>
      <div class="introduction-top-wrapper">
        <div>
          <model-viewer id="heat-map-3d-demo" v-if="isMounted" src="assets/models/cube.glb" camera-controls class="model-viewer">
          </model-viewer>
          <div class="introduction-btn-wrapper">
            <button v-on:click="startMeasuremunt()" class="introduction-btn">計測を開始</button>
            <button id="stop-btn" v-on:click="stopMeasuremunt()" class="introduction-btn">計測を終了</button>
          </div>
        </div>
        <ul class="introduction-score-list">
          <li v-for="score in scores" :key="score.key" :class="`introduction-score-itme-${score.key}`">
            <component :is="'style'">
              .introduction-score-itme-{{score.key}}{
                color: rgb({{score.color[0]}},{{score.color[1]}},{{score.color[2]}});
              }
            </component>
            {{score.name}}：{{score.value}} %
          </li>
        </ul>
      </div>

    </section>
  </div>
</template>

<script>

export default {
  name: 'HeatMap3d',
  data() {
    return {
      isMounted: false,
      // modelSrc: '/assets/models/cube.glb',
      timer: null,
      deltaTime: 100,
      thetaArray: [],
      phiArray: [],
      scores:[
        {
          key: 'front',
          name: '正面',
          value: 0,
          color: [0,0,0],
        },
        {
          key: 'back',
          name: '裏面',
          value: 0,
          color: [0,0,0],
        },
        {
          key: 'right',
          name: '右面',
          value: 0,
          color: [0,0,0],
        },
        {
          key: 'left',
          name: '左面',
          value: 0,
          color: [0,0,0],
        },
        {
          key: 'up',
          name: '上面',
          value: 0,
          color: [0,0,0],
        },
        {
          key: 'down',
          name: '下面',
          value: 0,
          color: [0,0,0],
        },
      ],
    }
  },
  methods:{
    startMeasuremunt(){
      this.timer = window.setInterval(()=>{this.getCameraLocation()}, 100);
    },
    stopMeasuremunt(){
      clearInterval(this.timer);
      this.time = null;
      this.scores[0].value = this.calculateFrontScore();
      this.scores[1].value = this.calculateBackScore();
      this.scores[2].value = this.calculateRightScore();
      this.scores[3].value = this.calculateLeftScore();
      [this.scores[4].value, this.scores[5].value] = this.calculateUpDownScore();
      this.scoreToColor();
      this.setMaterialColor();
      this.NormalizeScore();
      this.thetaArray = [];
      this.phiArray = [];
    },
    getCameraLocation(){
      const modelviewer01 = document.querySelector('model-viewer#heat-map-3d-demo');
      
      const rawTheta = modelviewer01.getCameraOrbit().theta;
      const rawPhi = modelviewer01.getCameraOrbit().phi;
      const theta = this.convertAngle(rawTheta);
      const phi = this.convertAngle(rawPhi);

      this.thetaArray.push(theta)
      this.phiArray.push(phi)
    },
    convertAngle(rawAngle){
      let angle = Math.abs(rawAngle/Math.PI);
      angle = 2 * (angle/2 - Math.floor(angle/2));
      if(angle>1){
        angle = angle - 2;
      }
      angle = Math.floor(100 * angle) / 100;

      return angle;
    },
    calculateFrontScore(){
      let frontScore = 0;

      for(let i=0; i<this.thetaArray.length; i++){
        let thetaFrontScore = 0;
        let phiFrontScore = 0;

        if(Math.abs(this.thetaArray[i]) < 0.5){
          thetaFrontScore = Math.cos(this.thetaArray[i]*Math.PI);
        }
        if(Math.abs(this.phiArray[i]) > 0 && Math.abs(this.phiArray[i])< 1){
          phiFrontScore = Math.sin(this.phiArray[i]*Math.PI);
        }
        frontScore += thetaFrontScore * phiFrontScore;
      }
      frontScore /= this.thetaArray.length;
      return frontScore;
    },
    calculateBackScore(){
      let backScore = 0;

      for(let i=0; i<this.thetaArray.length; i++){
        let thetaBackScore = 0;
        let phiBackScore = 0;

        if(Math.abs(this.thetaArray[i]) > 0.5){
          thetaBackScore = -Math.cos(this.thetaArray[i]*Math.PI);
        }
        if(Math.abs(this.phiArray[i]) > 0 && Math.abs(this.phiArray[i])< 1){
          phiBackScore = Math.sin(this.phiArray[i]*Math.PI);
        }
        backScore += thetaBackScore * phiBackScore;
      }
      backScore /= this.thetaArray.length;
      return backScore;
    },
    calculateRightScore(){
      let rightScore = 0;

      for(let i=0; i<this.thetaArray.length; i++){
        let thetaRightScore = 0;
        let phiRightScore = 0;

        if(this.thetaArray[i] > 0){
          thetaRightScore = Math.sin(this.thetaArray[i]*Math.PI);
        }
        if(Math.abs(this.phiArray[i]) > 0 && Math.abs(this.phiArray[i])< 1){
          phiRightScore = Math.sin(this.phiArray[i]*Math.PI);
        }
        rightScore += thetaRightScore * phiRightScore;
      }
      rightScore /= this.thetaArray.length;
      return rightScore;
    },
    calculateLeftScore(){
      let leftScore = 0;

      for(let i=0; i<this.thetaArray.length; i++){
        let thetaLeftScore = 0;
        let phiLeftScore = 0;

        if(this.thetaArray[i] < 0){
          thetaLeftScore = -Math.sin(this.thetaArray[i]*Math.PI);
        }
        if(Math.abs(this.phiArray[i]) > 0 && Math.abs(this.phiArray[i])< 1){
          phiLeftScore = Math.sin(this.phiArray[i]*Math.PI);
        }
        leftScore += thetaLeftScore * phiLeftScore;
        console.log(this.thetaArray[i]);
      }
      leftScore /= this.thetaArray.length;

      return leftScore;
    },
    calculateUpDownScore(){
      let upScore = 0;
      let downScore = 0;

      for(let i=0; i<this.phiArray.length; i++){
        if(Math.abs(this.phiArray[i]) < 0.5){
          upScore += Math.cos(this.phiArray[i]*Math.PI);
        }
        else{
          downScore -= Math.cos(this.phiArray[i]*Math.PI);
        }
      }
      upScore /= this.phiArray.length;
      downScore /= this.phiArray.length;

      return [upScore, downScore];
    },
    scoreToColor(){
      const maxScore = Math.max(this.scores[0].value, this.scores[1].value, this.scores[2].value, this.scores[3].value, this.scores[4].value, this.scores[5].value);

      for(let i = 0; i < this.scores.length; i++){
        const score = this.scores[i].value/maxScore;
        let r = 0;
        let g = 0;
        let b = 0;

        if(score >= 0.5){
          r = 255 * (2*score - 1);
        }
        if(score >= 0.25 && score <= 0.5){
          g = 255 * 2*score;
        }
        else if(score > 0.5 && score <= 0.75){
          g = 255 * (-2*score + 2);
        }
        if(score <= 0.5){
          b = 255 * (-2*score + 1);
        }
        this.scores[i].color = [Math.floor(r), Math.floor(g), Math.floor(b)];
      }
    },
    setMaterialColor(){
      const modelviewer01 = document.querySelector('model-viewer#heat-map-3d-demo');
      for(let i=0; i<modelviewer01.model.materials.length; i++){
        const flontMaterial = modelviewer01.model.materials[i];
        flontMaterial.pbrMetallicRoughness.setBaseColorFactor([this.scores[i].color[0]/255,this.scores[i].color[1]/255,this.scores[i].color[2]/255]);
      }
    },
    NormalizeScore(){
      let TotalScore = 0;
      for(let i = 0; i < this.scores.length; i++){
        TotalScore += this.scores[i].value;
      }
      for(let i = 0; i < this.scores.length; i++){
        this.scores[i].value = Math.floor(this.scores[i].value/TotalScore * 100);
      }
    },
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
  width: 1284px;
  margin: 0 auto;
}

.page-title{
  @extend %container;
  padding: 0 40px;
}

// 技術紹介
.introduction{
  @extend %container;
  padding: 0 40px;
}

.introduction-top-wrapper{
  display: flex;
  column-gap: 80px;
}

.model-viewer{
  width: 400px;
  height: 400px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}

.introduction-btn-wrapper{
  width: 400px;
  padding: 20px 0;
  border: 1px solid #000;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  column-gap: 30px;
}

.introduction-btn{
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
}

.introduction-score-list{
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  font-size: 1.4rem;
  text-align: left;
}
</style>
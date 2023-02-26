<template>
  <div class="introduction-top-wrapper">
    <model-viewer
      id="animation-demo" 
      src="assets/models/model-animation.glb" 
      camera-controls 
      enable-pan
      exposure = 0.7
      touch-action = none
      class="model-viewer">

      <button v-for="(animationButton, animationIndex) in animationButtons" :key="`animation-button${animationIndex}`" :slot="`hotspot-animation-button${animationIndex}`" @click="playAnimationByIndex(animationIndex)" :data-position="`${animationButton.translation[0]} ${animationButton.translation[1]} ${animationButton.translation[2]}`" data-normal="0 0 1" class="animation-button" :style="`display: ${animationButtonVisibility ? 'block':'none'}`"></button>
    </model-viewer>
    <div>
      <h3 class="introduction-detail-title">操作説明</h3>
      <ul class="introduction-detail-text">
        <li>
          アニメーションの再生が可能
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loadModelViewer } from '@/components/lib/modelViewer';

export default {
  name: 'animationDemo',
  data(){
    return {
      modelViewerObj: null,
      animationButtons: [],
      animationButtonVisibility: false,
    }
  },
  async mounted() {
    await loadModelViewer();
    this.initModelViewer();
  },
  methods: {
    initModelViewer(){
      const modelViewer = document.querySelector('#animation-demo');
      modelViewer.addEventListener('load', () => {
        this.modelViewerObj = modelViewer;
        this.tryGetAnimationButtons(this.modelViewerObj);
      })
    },
    tryGetAnimationButtons(modelViewer){
      modelViewer.addEventListener('progress', (elem) => {
        if(elem.detail.totalProgress === 1){
          this.getAnimationButtons(modelViewer);
          this.animationButtonVisibility = true;
        }
      })
    },
    getAnimationButtons(modelViewer){
      modelViewer.originalGltfJson.nodes.forEach((node) => {
        if(!node.name.indexOf('animation-button')){
          this.animationButtons.push(node);
        }
      })
    },
    async playAnimationByIndex(animationIndex){
      await this.disableAllAnimationButtons();
      await this.playAnimation(animationIndex, this.modelViewerObj);
      this.enableAllAnimationButtons();
    },
    disableAllAnimationButtons(){
      const animationButtonObjs =  document.querySelectorAll('.animation-button');
      animationButtonObjs.forEach((animationButtonObj)=>{
        animationButtonObj.disabled = true;
      })
    },
    enableAllAnimationButtons(){
      const animationButtonObjs =  document.querySelectorAll('.animation-button');
      animationButtonObjs.forEach((animationButtonObj)=>{
        animationButtonObj.disabled = false;
      })
    },
    async playAnimation(animationIndex, modelViewer){
      const sleep = (sleepTime) => new Promise((resolve) => setTimeout(resolve, sleepTime));
      
      modelViewer.animationName = modelViewer.availableAnimations[animationIndex];
      const animationTime = modelViewer.duration * 1000 / 2;
      modelViewer.timeScale = 1;
      modelViewer.currentTime = 0;

      await sleep(100);

      modelViewer.play();

      await sleep(animationTime);
      modelViewer.pause();
    },
  }
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

.animation-button{
    display: block;
    position: relative;
    animation: annotationScale 1s infinite;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgba(1,1,1,0.5);
    background-color: rgba(124, 124, 124, 0.5);
    box-sizing: border-box;
    cursor: pointer;
  
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
</style>
<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import * as BABYLON from "babylonjs";
import '@babylonjs/loaders'

export default {
  name: 'defaultDemoBabylon',
  data(){
    return {
      canvas: null,
      scene: null,
    }
  },
  mounted(){
    this.initScene();
  },
  methods: {
    initScene(){
      window.addEventListener('load', ()=>{

        // Create Babylon.js canvas
        this.canvas = document.getElementById('canvas');
        const engine = new BABYLON.Engine(this.canvas, true);
        
        // Create a scene
        this.scene = new BABYLON.Scene(this.engine);
  
        // Create a camera
        const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), this.scene);
        camera.attachControl(this.canvas, true);
  
        // Create a light
        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);
  
        // Create a box mesh
        const box = BABYLON.MeshBuilder.CreateBox('box', { size: 0.5 }, this.scene);
        box.position.y = 0.25;

        BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, this.scene);
  
        // Start the engine
        engine.runRenderLoop(() => {
          this.scene.render();
        });

        this.addClickListener();
      })
    },
    addClickListener() {
      this.canvas.addEventListener("click", (event) => {
        const pickResult = this.scene.pick(event.offsetX, event.offsetY);
        if (pickResult.hit) {
          const box = BABYLON.MeshBuilder.CreateBox('box', { size: 0.2 }, this.scene);
          box.position = pickResult.pickedPoint;
          box.position.y += 0.1;
        }
        else{
          console.log('no hit!')
        }
      });
    },
  }
}
</script>

<style scoped>
canvas{
  width: 1000px;
  height: 1000px;
}
</style>
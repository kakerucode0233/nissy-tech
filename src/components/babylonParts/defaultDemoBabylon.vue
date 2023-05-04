<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';
import 'babylonjs-loaders';
import * as CANNON from 'cannon';
import 'babylonjs-serializers';
import '@babylonjs/core/Physics/physicsEngineComponent';
// import { ShadowGenerator } from 'babylonjs';

// Cannon.jsを定義する
window.CANNON = CANNON;

export default {
  name: 'defaultDemoBabylon',
  data(){
    return {
      canvas: null,
      scene: null,
      engine: null,
      ground: null,
      groundImpostor: null,
      physicsPlugin: null,
      objects: [],
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
        this.engine = new BABYLON.Engine(this.canvas, true);
        // Create a scene
        this.scene = new BABYLON.Scene(this.engine);

        // 背景色の変更
        this.scene.clearColor = new BABYLON.Color3(0.94, 0.95, 0.94);
        
        this.physicsPlugin = new BABYLON.CannonJSPlugin();
        this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));
  
        // Create a camera
        const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), this.scene);
        camera.attachControl(this.canvas, true);
  
        // Create a light
        // const hemisphericLight = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(-1, 1, 0), this.scene);
        const hemisphericLight = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), this.scene);

        // 地面の作成
        this.ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 1000, height: 1000 }, this.scene);
        this.ground.receiveShadows = true;
        
        BABYLON.SceneLoader.ImportMeshAsync("", "assets/models/", "model3.glb",this.scene);
        // const shadowGen = new ShadowGenerator(1024, hemisphericLight);
        hemisphericLight.shadowEnabled = true;
        // shadowGen.addShadowCaster(this.ground);

        // furniture.map((mesh)=>{
        //   mesh.receiveShadows = true;
        //   shadowGen.addShadowCaster(mesh);
        // })

        // Start the engine
        this.engine.runRenderLoop(() => {
          this.scene.render();
        });

        this.addClickListener();
      })
    },
    addClickListener(){
      this.canvas.addEventListener('click', (event) => this.addProps(event));
    },
    addProps(event){
      const pickResult = this.scene.pick(event.offsetX, event.offsetY);
        if (pickResult.hit) {
          const normal = pickResult.getNormal();
          if(normal.y === 1){
            const box = BABYLON.MeshBuilder.CreateBox('box', { size: 0.1 }, this.scene);
            box.position = pickResult.pickedPoint;
            box.position.y += 0.05;
            box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0.5 }, this.scene);
            this.objects.push(box);
          }
        }
    }
  },
  beforeDestroy() {
    this.engine.dispose();
  },
}
</script>

<style scoped>
canvas{
  width: 1000px;
  height: 1000px;
}
</style>
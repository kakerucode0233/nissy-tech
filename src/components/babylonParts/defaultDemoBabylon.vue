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
        
        this.physicsPlugin = new BABYLON.CannonJSPlugin();
        this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));
  
        // Create a camera
        const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), this.scene);
        camera.attachControl(this.canvas, true);
  
        // Create a light
        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);

        BABYLON.SceneLoader.Append(
          'assets/models/',
          'model3.glb',
          this.scene, (newMeshes)=>{

            console.log(newMeshes[5])
          }
          );
          // const mesh = meshes[0];
          // const boundingBox = mesh.getBoundingInfo().boundingBox;
          // const size = boundingBox.maximum.subtract(boundingBox.minimum);
          // const box = BABYLON.MeshBuilder.CreateBox("box", { height: size.y, width: size.x, depth: size.z }, this.scene);
          // const options = { mass: 1, friction: 0.4, restitution: 0.3 };
          // mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, options, this.scene);
          // box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, this.scene);
          // box.parent = mesh;

        this.ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, this.scene);
        this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0.5 }, this.scene);

        this.scene.onPointerDown = (event, pickResult) => {
          if (pickResult.hit) {
            const box = BABYLON.MeshBuilder.CreateBox('box', { size: 0.2 }, this.scene);
            box.position = pickResult.pickedPoint;
            box.position.y += 0.3;
            box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, friction: 1, restitution: 0.5 }, this.scene);
            this.objects.push(box);
          }
        };

        // Start the engine
        this.engine.runRenderLoop(() => {
          this.scene.render();
        });

        // this.addClickListener();
      })
    },
    addClickListener() {
      this.canvas.addEventListener("click", (event) => {
        const pickResult = this.scene.pick(event.offsetX, event.offsetY);
        if (pickResult.hit) {
          const box = BABYLON.MeshBuilder.CreateBox('box', { size: 0.2 }, this.scene);
          box.position = pickResult.pickedPoint;
          box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, friction: 1, restitution: 0.5 }, this.scene);
          this.objects.push(box);
          // const box = BABYLON.MeshBuilder.CreateBox('box', { size: 0.2 }, this.scene);
          // box.position = pickResult.pickedPoint;
          // box.position.y += 0.3;
          // const boxImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, friction: 0.5, restitution: 0.2 }, this.scene);
          // // 立方体と床の衝突時の動作を定義する
          // boxImpostor.registerOnPhysicsCollide(this.groundImpostor, () => {
          //     console.log("Box collided with ground");
          //     // 立方体が床に衝突した場合、反発するようにする
          //     boxImpostor.setLinearVelocity(boxImpostor.getLinearVelocity().scale(-1));
          // });

        }
        else{
          console.log('no hit!')
        }
      });
    },
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
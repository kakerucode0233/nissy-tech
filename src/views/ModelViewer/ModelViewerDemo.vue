<template>
  <div>
    <section class="introduction">
      <h1 class="page-title">3D家具グリグリ</h1>
      <h2 class="introduction-title">家具の3Dモデルを表示してユーザーが操作可能！</h2>
      
      <defaultDemo></defaultDemo>
      <defaultRoomDemo></defaultRoomDemo>
      <turnTableDemo></turnTableDemo>
      <exposureDemo></exposureDemo>
      <annotationDemo></annotationDemo>
      <sizeViewDemo></sizeViewDemo>
      <animationDemo></animationDemo>
      <functionalityAnimation></functionalityAnimation>
      <addPropsDemo></addPropsDemo>
    </section>
  </div>
</template>

<script>
import defaultDemo from '@/components/parts/defaultDemo.vue';
import defaultRoomDemo from '@/components/parts/defaultRoomDemo.vue';
import turnTableDemo from '@/components/parts/turnTableDemo.vue';
import exposureDemo from '@/components/parts/exposureDemo.vue';
import annotationDemo from '@/components/parts/annotationDemo.vue';
import sizeViewDemo from '@/components/parts/sizeViewDemo.vue';
import animationDemo from '@/components/parts/animationDemo.vue';
import functionalityAnimation from '@/components/parts/functionalityAnimation.vue';
import addPropsDemo from '@/components/parts/addPropsDemo.vue';

export default {
  name: 'ModelViewerDemo',
  components: {
    defaultDemo,
    defaultRoomDemo,
    turnTableDemo,
    exposureDemo,
    annotationDemo,
    sizeViewDemo,
    animationDemo,
    functionalityAnimation,
    addPropsDemo,
  },
}
</script>

<style lang="scss">
.page-title{
  text-align: left;
  font-size: 2rem;
  white-space: pre-line;
}

.introduction-top-wrapper{
  display: flex;
  flex-wrap: wrap;
  column-gap: 5vw;
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 10px solid #ddd;
}

.introduction-detail{
  display: block;
  width: 30vw;
  min-width: 340px;
}

.introduction-title{
  margin-bottom: 30px;
  white-space: pre-line;
}

.introduction-detail-title{
  white-space: pre-line;
}

.introduction-detail-text{
  font-size: 15px;
}

.model-viewer{
  position: relative;
  width: 45vw;
  height: 35vw;
  max-width: 600px;
  min-width: 340px;
  max-height: 500px;
  min-height: 340px;

  border: 1px solid #eee;
  background: linear-gradient(#eee,#fff,#ccc);
  margin-bottom: 20px;
}
</style>
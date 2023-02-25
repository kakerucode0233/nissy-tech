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
  },
}
</script>

<style lang="scss" scoped>
%container{
  width: 940px;
  border-left: 1px solid #555;
}

.page-title{
  font-size: 2rem;
}

.introduction{
  @extend %container;
  padding-left: 40px;
}

.introduction-title{
  margin-bottom: 30px;
}
</style>
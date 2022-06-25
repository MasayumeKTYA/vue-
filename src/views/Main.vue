<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <Asider></Asider>
    </el-aside>
    <el-container>
      <el-header><Heade></Heade></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Asider from "@/components/Asider.vue";
import Heade from "@/components/Header.vue";
export default {
  name: "HomeItem",
  data() {
    return {};
  },
  components: {
    Asider,
    Heade,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0px;
}
</style>
<template>
  <div id="app">
    <div style="
    font-size: 60px;
">
      aiyou-vue-diff
      <img
        alt="Vue logo"
        src="./assets/logo.png"
        style="vertical-align: middle"
      />
    </div>

    <aiyou-vue-diff
      :longText="longText"
      topHeight="100px"
      containerHeight="500px"
    ></aiyou-vue-diff>
  </div>
</template>

<script>

import AiyouVueDiff from "aiyou-vue-diff";
import { A, B } from "./tempData";

export default {
  name: "App",
  components: {
    AiyouVueDiff,
  },
  data() {
    return {
      longText: {
        A: Array(2)
          .fill(1)
          .map(() => A)
          .join("\r\n"),
        B: Array(2)
          .fill(1)
          .map(() => B)
          .join("\r\n"),
      },
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

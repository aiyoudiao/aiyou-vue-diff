<template>
  <div class="vue-diff" id="vue-diff">
    <div class="top-container" :style="{ height: topHeight }">
      <div class="box-wrapper">
        <div class="box">
          <label for="">对比方式：</label>
          <aiyou-switch
            :isActive="fotmat"
            active-text="两列对比"
            inactive-text="单列对比"
            @change="reInitMiniMap"
          ></aiyou-switch>
        </div>
        <div class="box">
          <label for="">隐藏相同行：</label>
          <aiyou-switch
            :isActive="hideEqual"
            @change="handleHideRow"
          ></aiyou-switch>
        </div>
        <div class="box">
          <label for="">对比效果：</label>
          <button class="button ripple" @click="handleChangeDiffStyle">
            {{ diffStyle === "char" ? "精确到字符" : "精确到单词" }}
          </button>
        </div>
      </div>

      <div class="box-wrapper">
        <div class="box"><h4>历史数据</h4></div>
        <div class="box"><h4>最新数据</h4></div>
      </div>
    </div>

    <div id="box-container" :style="{ height: containerHeight }">
      <canvas id="map"></canvas>
      <div id="code-diff" :style="{ height: containerHeight }">
        <code-diff
          ref="codeDiff"
          :old-string="longText.A"
          :new-string="longText.B"
          :context="context"
          :output-format="outputFormat"
          :draw-file-list="drawFileList"
          :render-nothing-when-empty="renderNothingWhenEmpty"
          :diff-style="diffStyle"
          :is-show-no-change="isShowNoChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CodeDiff from "./CodeDiff";
import pageMap from "./lib/pagemap";
import AiyouSwitch from "./Element/aiyou-switch.vue";

export default {
  name: "DiffView5",
  props: {
    topHeight: {
      type: String,
      default: () => {
        return "100px";
      },
    },
    containerHeight: {
      type: String,
      default: () => {
        return "50vh";
      },
    },
    longText: {
      type: Object,
      default: () => {
        return {
          A: "",
          B: "",
        };
      },
    },
  },
  components: {
    "code-diff": CodeDiff,
    [AiyouSwitch.name]: AiyouSwitch,
  },
  data() {
    return {
      fotmat: false,
      context: 10000,
      diffStyle: "char",
      isShowNoChange: false,
      drawFileList: true,
      renderNothingWhenEmpty: false,
      hideEqual: false,
    };
  },
  computed: {
    outputFormat() {
      return this.fotmat ? "line-by-line" : "side-by-side";
    },
  },
  watch: {
    hideEqual() {
      if (this.hideEqual) {
        this.context = 0;
      } else {
        this.context = 10000;
      }
    },
  },
  mounted() {
    this.initMiniMap();
  },
  created() {},
  methods: {
    handleHideRow(val) {
      console.log("val", val);
      this.hideEqual = val;

      console.time("handleHideRow() {reInitMiniMap");
      this.reInitMiniMap();
      console.timeEnd("handleHideRow() {reInitMiniMap");
    },
    handleChangeDiffStyle() {
      this.diffStyle = this.diffStyle === "char" ? "word" : "char";
      this.reInitMiniMap();
    },

    initMiniMap() {
      pageMap(document.querySelector("#map"), {
        viewport: document.querySelector("#code-diff"),
        styles: {
          "td.d2h-change.d2h-del": "rgba(255, 0, 0, 0.4)",
          "td.d2h-change.d2h-del del": "rgba(255, 0, 0, 1)",
          "td.d2h-change.d2h-ins": "rgba(0,255,0, 0.4)",
          "td.d2h-change.d2h-ins ins": "rgba(0,255,0, 1)",
        },
        back: "rgba(0,0,0,0.02)",
        view: "rgba(0,0,0,0.05)",
        drag: "rgba(0,0,0,0.10)",
        interval: null,
      });

    },

    reInitMiniMap(val) {
      if ([true, false].includes(val)) {
        this.fotmat = val;
      }

      setTimeout(() => {
        const map = document.querySelector("#map");
        const parent = map.parentElement;
        const cloneMap = map.cloneNode(true);
        cloneMap.style = "";
        map.remove();
        const fisrtNode = parent.children[0];
        parent.insertBefore(cloneMap, fisrtNode);
        this.initMiniMap();
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-diff {
  #map {
    top: 0;
    right: 0;
    width: 50px;
    // width: 160px;
    margin-right: 10px;
    z-index: 100;
  }

  #box-container {
    display: flex;
    // height: 55vh;
  }

  #code-diff {
    flex: auto;
    // height: 55vh;
    overflow-y: auto;
  }

  .box-wrapper {
    display: flex;
    flex-direction: row;

    .box {
      flex: 1;

      label {
        font-weight: 700;
      }
    }
  }

  /*设置按钮样式*/
  .button {
    width: 100px;
    height: 29px;
    line-height: 29px;
    text-align: center; /*内容居中*/
    cursor: pointer; /*设置光标样式*/
    outline: none; /*消除outline*/
    color: #fff;
    border: none; /*消除border*/
  }

  /*涟漪特效*/
  .ripple {
    position: relative; /*设置为相对定位*/
    background-color: #59c85d;

    border-radius: 7px;
    overflow: hidden; /*让:after超出按钮边框部分隐藏*/
    text-decoration: none;
  }

  .ripple:after {
    content: "";
    background: #90ee90;
    display: block; /*设置为块级元素，以可以设置尺寸*/
    position: absolute; /*相对按钮绝对定位*/
    left: 0; /*如果是right为0，则靠右边出现涟漪*/
    top: 0;
    padding-top: 100%;
    padding-right: 100%;
    opacity: 0; /*默认状态下隐藏*/
    transition: all 0.8s;
  }

  .ripple:active:after {
    padding-right: 0; /*padding-right为0，使:after宽度为0*/
    opacity: 1; /*点击时出现*/
    transition: 0s; /*点击时瞬间出现*/
  }
  /*点击时，:after瞬间出现，但是尺寸为0。
  点击完，在0.8s内，:after宽度增加，但是透明度逐渐为0。
  用此方法，实现涟漪效果。
*/

  padding: 10px;
  // height: 70vh;
  // overflow-y: auto;
  overflow: hidden;

  ::v-deep .d2h-file-list-title,
  ::v-deep .d2h-info {
    display: none;
  }
}
</style>

<template>
  <div id="code-diff" class="code-diff">
    <div v-html="html" />
  </div>
</template>

<script>
import { createPatch } from "diff";
import * as Diff2Html from "diff2html";
import "diff2html/bundles/css/diff2html.min.css";
export default {
  name: "CodeDiff",
  props: {
    oldString: String,
    newString: String,
    context: {
      type: Number,
      default: 5,
    },
    outputFormat: {
      type: String,
      default: "line-by-line",
    },
    drawFileList: {
      type: Boolean,
      defalut: false,
    },
    renderNothingWhenEmpty: {
      type: Boolean,
      default: false,
    },
    diffStyle: {
      type: String,
      default: "word",
    },
    fileName: {
      type: String,
      default: "",
    },
    isShowNoChange: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    html() {
      return this.createdHtml(
        this.oldString,
        this.newString,
        this.context,
        this.outputFormat,
        this.drawFileList,
        this.renderNothingWhenEmpty,
        this.fileName
      );
    },
  },
  methods: {
    createdHtml(
      oldString,
      newString,
      context,
      outputFormat,
      drawFileList,
      renderNothingWhenEmpty,
      fileName
    ) {
      oldString =
        "================= [借用这个BUG] =================\r\n" + oldString;
      newString =
        "================= [我用这个BUG] =================\r\n" + newString;

      const args = [
        fileName,
        oldString,
        newString,
        "",
        "",
        { context: context },
      ];

      const dd = createPatch(...args);
      const outStr = Diff2Html.parse(dd, {
        inputFormat: "diff",
        outputFormat: outputFormat,
        drawFileList: drawFileList,
        // matching: 'lines',
        matching: "words",
        diffStyle: this.diffStyle,
        renderNothingWhenEmpty: renderNothingWhenEmpty,
      });

      outStr[0].addedLines--;
      outStr[0].deletedLines--;

      //#region 去除多余的标识位
      let clearItems = [];
      let i = 0;
      while (clearItems.length < 2) {
        const line = outStr[0].blocks[0].lines[i];
        if (!line) continue;

        if (
          line.content.includes(
            "================= [借用这个BUG] ================="
          )
        ) {
          line.type = '"context"';
          clearItems.push("ok");
        }
        if (
          line.content.includes(
            "================= [我用这个BUG] ================="
          )
        ) {
          line.type = '"context"';
          clearItems.push("ok");
        }
        i++;
      }
      i = 0;
      //#endregion

      outStr[0].blocks[0].lines.forEach((line) => {
        if (line.oldNumber) {
          line.oldNumber--;
        }

        if (line.newNumber) {
          line.newNumber--;
        }
      });

      const html = Diff2Html.html(outStr, {
        inputFormat: "json",
        outputFormat: outputFormat,
        drawFileList: drawFileList,
        diffStyle: this.diffStyle,
        // matching: 'lines',
        matching: "words",
        renderNothingWhenEmpty: renderNothingWhenEmpty,
      });
      return html;
    },
  },
};
</script>

<style lang="postcss">
.d2h-wrapper {
  position: relative;
}

.d2h-wrapper .d2h-file-header {
  display: none;
}

.d2h-wrapper .d2h-files-diff {
  position: relative;
}

.d2h-wrapper .d2h-file-side-diff {
  margin-bottom: -5px;
}

.d2h-wrapper .d2h-files-diff > .d2h-file-side-diff ~ .d2h-file-side-diff {
  position: absolute;
}

.d2h-wrapper .d2h-code-side-emptyplaceholder {
  max-height: 17px;
}

.d2h-wrapper .d2h-code-side-line,
.d2h-wrapper .d2h-code-line {
  display: block;
  width: auto;
}

.d2h-wrapper .d2h-code-side-line.d2h-info {
  height: 18px;
}

.d2h-wrapper .d2h-code-linenumber,
.d2h-code-side-linenumber {
  height: 19px;
}
</style>

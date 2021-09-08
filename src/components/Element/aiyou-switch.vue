<template>
  <div id="aiyou-switch" class="aiyou-switch">
    {{ activeText }}
    <div class="onoffswitch">
      <input
        type="checkbox"
        name="onoffswitch"
        class="onoffswitch-checkbox"
        tabindex="0"
        :checked="isActive"
        @click="clickLable"
      />
      <label class="onoffswitch-label"  @click="clickLable"></label>
    </div>
    {{ inactiveText }}
  </div>
</template>

<script>
export default {
  name: "aiyou-switch",
  props: {
    activeText: String,
    inactiveText: String,
    isActive: Boolean,
  },
  methods: {
    clickLable() {
      this.$emit("change", !this.isActive);
    },
  },
};
</script>

<style scoped lang="scss">
#aiyou-switch.aiyou-switch {
  display: inline-block;

  .onoffswitch {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 60px;
    margin: 0 5px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .onoffswitch-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .onoffswitch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    height: 25px;
    padding: 0;
    line-height: 36px;
    border: 2px solid #e3e3e3;
    border-radius: 25px;
    background-color: #ffffff;
    transition: background-color 0.3s ease-in;
  }
  .onoffswitch-label:before {
    content: "";
    display: block;
    width: 25px;
    margin: 0px;
    background: #ffffff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 32px;
    border: 2px solid #e3e3e3;
    border-radius: 36px;
    transition: all 0.3s ease-in 0s;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label {
    background-color: #49e845;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label,
  .onoffswitch-checkbox:checked + .onoffswitch-label:before {
    border-color: #49e845;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label:before {
    right: 0px;
  }
}
</style>

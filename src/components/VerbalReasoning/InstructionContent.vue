<template>
  <div>
    <slot></slot>
    <button
    @click="onOk"
    class="btn primary-sm-btn vr-example__shadow__panel-instruction__okey">
            Ok!
    </button>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class InstructionContent extends Vue {
  onOk() {
    this.$emit('onOk');
  }
}

</script>

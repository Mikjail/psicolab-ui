<template>
  <div>
    <slot></slot>
    <button
    @click="onOk"
    class="btn primary-sm-btn vr-example__shadow__panel-instruction__okey">
            {{okText}}
    </button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class InstructionContent extends Vue {
  @Prop({ default: 'Ok!' }) okText!: string;

  onOk() {
    this.$emit('onNextTip');
  }
}

</script>

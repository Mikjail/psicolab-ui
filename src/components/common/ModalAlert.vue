<template>
   <b-modal
    ref="modal-alert"
    class="modal-alert"
    :size="modalContent.size"
    centered
    :title="modalContent.title"
    @close="onCancel()"
    no-close-on-backdrop>
    <div class="my-4">
      <slot>
      </slot>
    </div>
     <template v-slot:modal-footer>
        <div class="modal-alert__footer w-100">
           <button
            class="btn primary-outline-btn modal-alert__footer__cancel"
            @click="onCancel()">
            {{modalContent.cancelBtn || Cancelar}}
          </button>
          <button
            class="btn primary-btn modal-alert__footer__start"
            @click="onAccept()"
          >
            {{modalContent.acceptBtn || Aceptar}}
          </button>
        </div>
      </template>
  </b-modaL>
</template>
<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';

@Component
export default class FinishTestModal extends Vue {
  @Prop({ required: true, default: false }) showModal!: boolean;

  @Prop({
    required: true,
    default: {
      title: 'Title not set',
      content: 'Modal Content is not set',
      size: 'md',
      cancelBtn: 'Cancelar',
      acceptBtn: 'Aceptar',
    },
  }) modalContent!: { title: string; content: string};

  @Watch('showModal')
  onShowModalChanged() {
    const modalElement = this.$refs['modal-alert'] as any;
    if (this.showModal) {
      modalElement.show();
    }
  }

  onCancel() {
    this.$emit('onCancel');
    const element = this.$refs['modal-alert'] as any;
    element.hide();
  }

  onAccept() {
    this.$emit('onAccept');
    const element = this.$refs['modal-alert'] as any;
    element.hide('');
  }
}
</script>
<style lang="scss">
 .modal-alert{
    &__footer{
      display:flex;
      justify-content: flex-end;
      &__cancel,
      &__start {
        height: 34px;
      }
      &__cancel{
        margin-right: 16px;
      }
    }
  }
</style>

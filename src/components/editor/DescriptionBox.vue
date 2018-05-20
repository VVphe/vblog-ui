<template>
  <div id="DescripyionBox" style="position: relative">
      <div class="mask" @click="closeBox"></div>
      <div class="modal-dialog dl">
        <div class="modal-content animated fadeIn">
            <div class="modal-header">
                <h4 class="modal-title"><i class="fa fa-edit modal-icon"></i>&nbsp Description</h4>
            </div>
            <div class="modal-body">
                <textarea rows="10" class="description" v-model="description"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeBox" >Close</button>
                <button type="button" class="btn btn-primary" @click="publishArticle">Confirm</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'descriptionbox',
  data() {
    return {
      description: ''
    }
  },
  methods: {
    closeBox: function() {
      this.description = ''
      this.$emit('closeDBox', 'close')
    },
    publishArticle: function() {
      this.$emit('publishMyArticle', this.description)
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
textarea {
  border-radius: 5px;
  width: 100%;
  z-index: 1002;
  border-color: #1ab394;
  border-width: 3px;
  outline: none;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
  background: rgba(0,0,0,.5);
}
.dl {
  position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>

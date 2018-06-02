<template>
  <div id="TagBox">
    <div class="mask" @click="closeBox"></div>
    <div class="modal-dialog dl">
        <div class="modal-content animated fadeIn">
            <div class="modal-header">
                <h4 class="modal-title"><i class="fa fa-edit modal-icon"></i>&nbsp Tag</h4>
            </div>
            <div class="modal-body">
                <textarea rows="1" v-model="tag"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeBox" >Close</button>
                <button type="button" class="btn btn-primary" @click="addTag">Confirm</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tagbox",
  data() {
    return {
        tag: ''
    }
  },
  methods: {
    closeBox: function() {
        this.tag = ''
        this.$emit('closeDBox', 'close')
    },
    addTag: function() {
      this.$emit('addTag', this.tag)
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

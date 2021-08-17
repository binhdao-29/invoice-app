<template>
  <div class="modal">
    <div class="modal-content flex flex-column flex-align-center">
      <p>Are you sure you want to exit? Your changes will not be saved?</p>
      <div class="modal-btn flex">
        <button @click="closeModal" class="btn purple">Return</button>
        <button @click="closeInvoice" class="btn red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: "modal",
  methods: {
    ...mapMutations(['toggleInvoice', 'toggleModal', 'toggleEditInvoice']),

    closeModal() {
      this.toggleModal();
    },

    closeInvoice() {
      this.toggleModal();
      this.toggleInvoice();

      if (this.editInvoice) {
        this.toggleEditInvoice();
      }
    }
  },
  computed: {
    ...mapState(['editInvoice'])
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1001;
}
.modal-content {
  position: fixed;
  inset: 0;
  margin: auto;
  justify-content: space-evenly;
  z-index: 1001;
  background-color: #1e2139;
  color: #fff;
  padding: 40px 30px;
  max-width: 450px;
  max-height: 250px;
  border-radius: 15px;
  box-shadow: 
      3px 3px 6px -1px rgba($color: #000000, $alpha: 0.2),
      2px 2px 4px -1px rgba($color: #000000, $alpha: 0.06);

  p {
    text-align: center;
    margin-bottom: 20px;
  }
}

.modal-btn {
  width: 100%;
  justify-content: space-evenly;
  
  .btn {
    width: 40%;
  }
}
</style>
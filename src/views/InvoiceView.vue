<template>
  <div v-if="currentInvoice" class="invoice-view container">
    <router-link class="nav-link flex flex-align-center" :to="{ name: 'Home' }" >
      <img src="@/assets/icon-arrow-left.svg" alt="" />
      <span>Go back</span>
    </router-link>

    <!-- Header -->
    <div class="header flex">
      <div class="header-left flex flex-align-center">
        <span>Status</span>
         <div class="status-button" 
              :class="{ paid: currentInvoice.invoicePaid, draft: currentInvoice.invoiceDraft, pending: currentInvoice.invoicePending }">
          <span v-if="currentInvoice.invoiePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>
      <div class="header-right flex flex-align-center">
        <button @click="toggleEditInvoice(currentInvoice.docId)" class="btn dark-purple">Edit</button>
        <button @click="deleteInvoice(currentInvoice.docId)" class="btn red">Delete</button>
        <button v-if="currentInvoice.invoicePending" @click="updateStatusToPaid(currentInvoice.docId)" class="btn green">Mark as Paid</button>
        <button v-if="currentInvoice.invoiceDraft || currentInvoice.invoiePaid" @click="updateStatusToPending" class="btn orange">Mark as Pending</button>
      </div>
    </div>

    <!-- Invoice Details -->
    <div class="invoice-details flex flex-column">
      <div class="invoice-details-top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>

      <div class="invoice-details-middle flex">
        <div class="payment flex flex-column">
          <div>
            <h4>Invoice Date</h4>
            <p>{{ currentInvoice.invoiceDate }}</p>
          </div>
          <div class="div">
            <h4>Payment Date</h4>
            <p>{{ currentInvoice.paymentDueDate }}</p>
          </div>
        </div>

        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>

        <div class="sent flex flex-column">
          <h4>Sent To</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>

      <div class="invoice-details-bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Name</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div v-for="(item, index) in currentInvoice.invoiceItemList" :key="index" class="item flex">
            <p>{{ item.name }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>

        </div>
        <div class="total flex flex-align-center">
          <p>Amount Due</p>
          <p>{{ currentInvoice.invoiceTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: "InvoiceView",
  data() {
    return {
      currentInvoice: null
    }
  },
  created() {
    this.getCurrenInvoice();
    console.log(this.currentInvoice);
  },
  methods: {
    ...mapMutations(['setCurrentInvoice']),

    getCurrenInvoice() {
      this.setCurrentInvoice(this.$route.params.invoiceId);
      this.currentInvoice = this.currentInvoiceArray[0];
    }
  },
  computed: {
    ...mapState(['currentInvoiceArray'])
  }
}
</script>

<style lang="scss" scoped>
.invoice-view {
  color: #fff;

  .header,
  .invoice-details {
    background-color: #1E2139;
    padding: 25px;
    margin-top: 25px;
    border-radius: 20px;
  }

  .header {
    font-size: 12px;
    justify-content: space-between;

    .status-button {
      margin-left: 25px;
    }

    .btn {
      margin-left: 15px;
      margin-right: 0;
    }
  }

  .invoice-details-top {
    justify-content: space-between;
    color: #dfe3fa;
    padding-top: 10px;
    padding-bottom: 40px;
    font-size: 12px;

    .left {
      font-size: 16px;

      p:first-child {
        font-size: 24px;
        color: #fff;
        text-transform: uppercase;
      }

      span {
        color: #888eb0;
      }
    }
  }

  .invoice-details-middle {
    width: 85%;
    color: #dfe3fa;
    justify-content: space-between;
    padding-bottom: 40px;

    h4 {
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      margin-bottom: 5px;
    }

    .payment {
      justify-content: space-between;
    }
  }

  .invoice-details-bottom {
    padding-top: 50px;

    .billing-items {
      padding: 32px;
      border-radius: 20px 20px 0 0;
      background-color: #252945;

      .heading,
      .item {
        p:first-child {
          flex: 3;
          text-align: left;
        }

        p {
          flex: 1;
          text-align: right;
        }
      }

      .heading {
        color: #dfe3fa;
        font-size: 12px;
        margin-bottom: 32px;
      }

      .item {
        margin-bottom: 32px;
        font-size: 13px;
        color: #fff;  
      }
    }

    .total {
      color: #fff;
      justify-content: space-between;
      padding: 32px;
      background-color: rgba(12, 14, 22, 0.7);
      border-radius: 0 0 20px 20px;

      p:last-child {
        font-size: 28px;
      }
    }
  }
}

.nav-link {
  color: #fff;
  font-size: 14px;

  img {
    width: 7px;
    height: 10px;
    margin-right: 16px;
  }
}
</style>
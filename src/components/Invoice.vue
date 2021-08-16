<template>
  <router-link class="invoice flex" :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }">
    <div class="invoice-wrapper flex flex-align-center">
      <div class="invoice-content flex">
        <span class="tracking-number">#{{ invoice.invoiceId }}</span>
        <span class="due-date">{{ invoice.paymentDueDate }}</span>
        <span class="client">{{ invoice.clientName }}</span>
      </div>
      <div class="invoice-info flex flex-align-center">
        <span class="price">${{ invoice.invoiceTotal }}</span>
        <div class="status-button" 
              :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }">
          <span v-if="invoice.invoiePaid">Paid</span>
          <span v-if="invoice.invoiceDraft">Draft</span>
          <span v-if="invoice.invoicePending">Pending</span>
        </div>
        <img src="@/assets/icon-arrow-right.svg" alt="" class="icon">
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "invoice",
  props: ["invoice"]
}
</script>

<style lang="scss" scoped>
.invoice {
  background-color: #1E2139;
  color: #fff;
  padding: 20px 30px;
  border-radius: 20px;
  margin-bottom: 25px;
  text-decoration: none;
}

.invoice-wrapper {
  width: 100%;
  justify-content: space-between; 
}

.invoice-content {
  width: 60%;
  justify-content: space-between;

  .tracking-number {
    text-transform: uppercase;
  }

  span {
    font-size: 13px;
    font-weight: 600;
  }
}

.invoice-info {
  width: 35%;
  align-items: center;
  justify-content: space-between;
}
</style>

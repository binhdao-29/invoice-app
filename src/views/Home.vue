<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="flex flex-column">
        <h1>Invoice</h1>
        <span>There are {{ invoicesData.length }} total invoices</span>
      </div>
      <div class="flex flex-align-center">
        <div @click="toggleFilterMenu" class="filter flex flex-align-center">
          <span>Filter by status<span v-if="filteredInvoice">: {{ filteredInvoice }}</span></span>
          <div class="filter-icon flex">
            <img src="@/assets/icon-arrow-down.svg" alt="">
          </div>
          <ul v-show="showFilterMenu" class="filter-menu">
            <li @click="filterInvoice">Draft</li>
            <li @click="filterInvoice">Pending</li>
            <li @click="filterInvoice">Paid</li>
            <li @click="filterInvoice">Clear filter</li>
          </ul>
        </div>

        <div @click="newInvoice" class="btn flex flex-align-center">
          <div class="inner-btn flex">
            <img src="@/assets/icon-plus.svg" alt="">
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>

    <!-- Invoice -->
    <div v-if="invoicesData.length > 0">
      <Invoice v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index" />
    </div>
    <div v-else class="empty flex flex-column flex-align-center flex-justify-center">
      <img src="@/assets/illustration-empty.svg" alt="">
      <h3>There is nothing here</h3>
      <p>Create a new invoice by clicking the New Invoice button and get started</p>
    </div>
  </div>
</template>

<script>
import Invoice from '../components/Invoice.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      showFilterMenu: null,
      filteredInvoice: null,
    }
  },
  components: { Invoice },
  methods: {
    ...mapMutations(['toggleInvoice']),
    toggleFilterMenu() {
      this.showFilterMenu = !this.showFilterMenu;
    },

    newInvoice() {
      this.toggleInvoice();
    },

    filterInvoice(e) {
      if (e.target.innerText === 'Clear filter') {
        this.filteredInvoice = null;
        return;
      }
      this.filteredInvoice = e.target.innerText;
    }
  },
  computed: {
    ...mapState(['invoicesData']),

    filteredData() {
      return this.invoicesData.filter(invoice => {
        if (this.filteredInvoice === 'Paid') {
          return invoice.invoicePaid === true;
        }
        if (this.filteredInvoice === 'Pending') {
          return invoice.invoicePending === true;
        }
        if (this.filteredInvoice === 'Draft') {
          return invoice.invoiceDraft === true;
        }

        return invoice;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  // Have not any invoice
  .empty {
    text-align: center;

    h3 {
      font-size: 20px;
      margin-top: 40px;
    }

    p {
      font-size: 13px;
      max-width: 500px;
    }
  }
}

.header {
  margin-bottom: 65px;
  justify-content: space-between;

  .filter {
    position: relative;
    margin-right: 40px;
    user-select: none;
    cursor: pointer;

    .filter-icon {
      margin-left: 12px;

      img {
        width: 9px;
      }
    }
  }

  .filter-menu {
    width: 120px;
    position: absolute;
    top: 30px;
    list-style: none;
    background-color: #1e2139;
    box-shadow: 
      0 4px 6px -1px rgba($color: #000000, $alpha: 0.1),
      0 2px 4px -1px rgba($color: #000000, $alpha: 0.06);

    li {
      cursor: pointer;
      font-size: 12px;
      padding: 10px 20px;
      transition: all 0.3s ease;

      &:hover {
        color: #1e2139;
        background-color: #fff;
      }
    }
  }

  .btn {
    padding: 8px 10px;
    background-color: #7c5dfa;
    border-radius: 40px;

    .inner-btn {
      margin-right: 8px;
      border-radius: 50%;
      padding: 8px;
      background-color: #fff;
    }

    img {
      width: 10px;
      height: 10px;
    }
  }

  span {
    font-size: 12px;
  }
}
</style>

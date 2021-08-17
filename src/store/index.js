import { createStore } from 'vuex';
import db from '../firebase/firebase';

export default createStore({
  state: {
    invoiceModal: false,
    modalActive: false,
    invoicesData: [],
    invoiceLoaded: null,
    currentInvoiceArray: null,
  },
  mutations: {
    toggleInvoice(state) {
      state.invoiceModal = !state.invoiceModal;
    },

    toggleModal(state) {
      state.modalActive = !state.modalActive;
    },

    setInvoiceData(state, payload) {
      state.invoicesData.push(payload);
    },

    invoicesLoaded(state) {
      state.invoiceLoaded = true;
    },

    setCurrentInvoice(state, payload) {
      state.currentInvoiceArray = state.invoicesData.filter(invoice => invoice.invoiceId === payload);
    }
  },
  actions: {
    async getInvoices({ commit, state }) {
      const getData = db.collection('invoices');
      const results = await getData.get();
      results.forEach( doc => {
        if (!state.invoicesData.some(invoiceData => invoiceData.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
            invoiceTotal: doc.data().invoiceTotal,
            invoiceItemList: doc.data().invoiceItemList
          }
          commit('setInvoiceData', data);
        }
      });
      commit('invoicesLoaded');
    }
  }
})

import { createStore } from 'vuex';
import db from '../firebase/firebase';

export default createStore({
  state: {
    invoiceModal: false,
    modalActive: false,
    invoicesData: [],
    invoiceLoaded: null,
    currentInvoiceArray: null,
    editInvoice: null,
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
    },

    toggleEditInvoice(state) {
      state.editInvoice = !state.editInvoice;
    },

    deleteInvoice(state, payload) {
      state.invoicesData = state.invoicesData.filter(invoice => invoice.docId !== payload);
    },

    updateStatusToPaid(state, payload) {
      state.invoicesData.forEach(invoice => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = true;
          invoice.invoicePending = false;
        }
      });
    },

    updateStatusToPending(state, payload) {
      state.invoicesData.forEach(invoice => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = false;
          invoice.invoicePending = true;
          invoice.invoiceDraft = false;
        }
      });
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
    },

    async updateInvoiceStore({ commit, dispatch }, { docId, routeId }) {
      commit('deleteInvoice', docId); //xoa invoice can update trong list hien thoi
      await dispatch('getInvoices');
      commit('toggleInvoice');
      commit('toggleEditInvoice');
      commit('setCurrentInvoice', routeId);
    },

    async deleteInvoiceStore({ commit }, docId) {
      const invoice = db.collection('invoices').doc(docId);
      await invoice.delete();
      commit('deleteInvoice', docId);
    },

    async updateStatusToPaid({ commit }, docId) {
      const invoice = db.collection('invoices').doc(docId);
      await invoice.update({
        invoicePaid: true,
        invoicePending: false
      });
      commit('updateStatusToPaid', docId);
    },

    async updateStatusToPending({ commit }, docId) {
      const invoice = db.collection('invoices').doc(docId);
      await invoice.update({
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false
      });
      commit('updateStatusToPending', docId);
    }
  }
})

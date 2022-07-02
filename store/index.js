
export const state = () => {
  return {
    showAlert: false,
    alertData: {
      type: 'primary',
      title: '',
      text: '',
    }
  }
}

export const mutations = {
  setAlert(state, payload) {
    state.showAlert = payload.alert;
    state.alertData.type = payload.type;
    state.alertData.title = payload.title;
    state.alertData.text = payload.text;
  },
}

export const getters = {
  showAlert(state) {
    return state.showAlert;
  },
  alertData(state) {
    return state.alertData;
  },
}

export const actions = {
  updateAlert({commit}, params) {
    commit('setAlert', params);
  },
  async initSockeIO() {
    try {
      await this.$axios.get('/sio/init');
    } catch (err) {
      console.error('socket Error : ', err);
    }
  }
}
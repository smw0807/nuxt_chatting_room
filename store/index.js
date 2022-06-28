
export const state = () => {
  return {
    
  }
}

export const mutations = {

}

export const getters = {

}

export const actions = {
  async initSockeIO() {
    try {
      await this.$axios.get('/sio/init');
    } catch (err) {
      console.error('socket Error : ', err);
    }
  }
}
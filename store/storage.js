
export const actions = {

  async getAllCar ({ commit }, data) {
    return this.$axios.get('api/location', data).then(res => res.data)
  },
  async getAllStation ({ commit }, data) {
    return this.$axios.get('api/v1/station/list', data).then(res => res.data)
  },
  async getNews ({ commit }, data) {
    return this.$axios.get('api/v1/advert/list').then(res => res.data)
  }

}

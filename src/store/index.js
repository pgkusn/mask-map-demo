import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currCity: '臺北市',
    currDistrict: '北投區',
    location: [],
    stores: [],
    keywords: '',
  },
  getters: {
    cityList(state) {
    // 城市
      return state.location.map((d) => d.name);
    },
    districtList(state) {
    // 行政區
      return state.location.find((d) => d.name === state.currCity)?.districts || [];
    },
    filteredStores(state) {
      // 依縣市、行政區分組
      const { stores } = state;

      return state.keywords
        ? stores.filter((d) => d.name.includes(state.keywords))
        : stores.filter((d) => d.county === state.currCity && d.town === state.currDistrict);
    },
  },
  mutations: {
    setcurrCity(state, payload) {
      state.currCity = payload;
    },
    setcurrDistrict(state, payload) {
      state.currDistrict = payload;
    },
    setAreaLocation(state, payload) {
      state.location = payload;
    },
    setStores(state, payload) {
      state.stores = payload;
    },
    setKeywords(state, payload) {
      state.keywords = payload;
    },
  },
  actions: {
    async fetchLocations({ commit }) {
      // 取得行政區資料
      const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
        .then((res) => res.json());

      // 透過 commit 來操作 mutations
      commit('setAreaLocation', json);
    },
    async fetchPharmacies({ commit }) {
      // 取得藥局資料
      const json = await fetch('https://kiang.github.io/pharmacies/json/points.json')
        .then((res) => res.json());

      // 資料的格式為 geojson 所以需要針對經緯度做處理
      const data = json.features.map((d) => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1],
      }));

      // 透過 commit 來操作 mutations
      commit('setStores', data);
    },
  },
  modules: {
  },
});

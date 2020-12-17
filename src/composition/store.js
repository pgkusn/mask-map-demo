import { ref, computed } from 'vue';

// 原本的 state
export const currCity = ref('臺北市');
export const currDistrict = ref('北投區');
export const infoBoxSid = ref(null);
export const keywords = ref('');
export const showModal = ref(false);
export const location = ref([]);
export const stores = ref([]);


// 原本的 getters
export const cityList = computed(() => location.value.map((d) => d.name));
export const districtList = computed(() => location.value.find((d) => d.name === currCity.value)?.districts || []);
export const currDistrictInfo = computed(() => districtList.value.find((d) => d.name === currDistrict.value) || {});
export const filteredStores = computed(() => {
  return keywords.value
    ? stores.value.filter((d) => d.name.includes(keywords.value)).slice(0, 30)
    : stores.value.filter((d) => d.county === currCity.value && d.town === currDistrict.value);
});

// 原本的 actions
export const fetchLocations = async () => {
  // 取得行政區資料
  const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
    .then((res) => res.json());
    
  //commit('setAreaLocation', json);
  location.value = json;
};

export const fetchPharmacies = async () => {
  // 取得藥局資料
  const json = await fetch('https://kiang.github.io/pharmacies/json/points.json')
    .then((res) => res.json());

  const data = json.features.map((d) => ({
    ...d.properties,
    latitude: d.geometry.coordinates[0],
    longitude: d.geometry.coordinates[1],
  }));

  //commit('setStores', data);
  stores.value = data;
};
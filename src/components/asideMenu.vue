<template>
  <div class="aside-menu">

    <div class="wraps">
      <label>
        縣市：
        <select v-model="currCity">
          <option v-for="c in cityList" :key="c">{{ c }}</option>
        </select>
      </label>

      <label>
        行政區：
        <select v-model="currDistrict">
          <option v-for="d in districtList" :key="d.id">{{ d.name }}</option>
        </select>
      </label>
    </div>

    <div class="wraps">
      <label>
        <i class="fas fa-search-location"></i> 關鍵字搜尋：
        <input type="text" placeholder="請輸入關鍵字" v-model.trim="keywords">
      </label>
    </div>

    <ul class="store-lists">
      <li class="store-info wraps"
        v-for="s in filteredStores" :key="s.id"
        @click="triggerPopup(s.id)">
        <h1 v-html="keywordHighlight(s.name)"></h1>

        <div class="mask-info">
          <i class="fas fa-head-side-mask"></i>
          <span>大人口罩: {{ s.mask_adult }} 個</span>
        </div>

        <div class="mask-info">
          <i class="fas fa-baby"></i>
          <span>兒童口罩: {{ s.mask_child }} 個</span>
        </div>

        <div class="mask-info">
          最後更新時間: {{ s.updated }}
        </div>

        <button class="btn-store-detail" @click="openInfoBox(s.id)">
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>

      </li>
    </ul>

  </div>
</template>

<script>
import { 
  keywords,
  showModal,
  currCity,
  currDistrict,
  infoBoxSid,
  cityList,
  districtList,
  filteredStores } from '../composition/store';

import {
  triggerPopup
} from '../composition/map';

import { watch } from 'vue';

export default {
  name: 'asideMenu',
  setup () {
    
    const keywordHighlight = val => {
      return val.replace(new RegExp(keywords.value, 'g'), `<span class="highlight">${keywords.value}</span>`)
    };

    const openInfoBox = sid => {
      showModal.value = true;
      infoBoxSid.value = sid;
    }

    watch(districtList, v => {
      const [arr] = v;
      currDistrict.value = arr.name;
    })

    return {
      keywords,
      showModal,
      currCity,
      currDistrict,
      infoBoxSid,
      cityList,
      districtList,
      filteredStores,
      keywordHighlight,
      openInfoBox,
      triggerPopup
    }
  }
};
</script>


<style scoped lang="scss">
label {
  position: relative;
  margin-right: 2em;
  display: block;
  font-size: 1.2rem;
  line-height: 2;
}

select {
  position: absolute;
  margin-top: 0.3rem;
  left: 6rem;
  font-size: 1.2rem;
  width: auto;
  min-width: 110px;
}

input {
  padding: 2px 8px;
  font-size: 1.2rem;
  line-height: 2;
  width: 110%;
}

.wraps {
  padding: 1em;
  border-bottom: 1px solid #666;
}

.store-info {
  position: relative;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1.8;
  background-color: #fff;

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.3em;
  }

  .mask-info{
    position: relative;
    > span {
      position: absolute;
      left: 1.8rem;
    }
  }

  &::v-deep .highlight {
    color: #f08d49;
  }

  &:hover {
    background-color: #eee;
  }

  .btn-store-detail {
    position: absolute;
    display: block;
    cursor: pointer;
    width: 80px;
    height: 80px;
    text-align: center;
    right: 1.2rem;
    top: 1.5rem;
    font-size: .8rem;

    > i {
      display: block;
      font-size: 2rem;
      margin-bottom: 5px;
    }
  }

}
</style>

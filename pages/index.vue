<template>
  <div>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="#">
        <img src="/logo_map.png" class="d-inline-block align-middle" height="70" alt="Maps">
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <b-select
            v-model="mapOptions.url"
            :options="mapOptions.urlOption"
          />
        </b-nav-item>
        <b-nav-item class="">
          <h1 style="color: #0a58ca" class="text-monospace py-0 my-0 font-weight-bold">
            {{ timeNow }}
          </h1>
          <h5 class="py-0 my-0 text-right text-dark ">
            {{ dateNow }}
          </h5>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col pr-0">
          <div id="map-wrap" class="fill" style="height: 90vh;/*transform: rotate(15deg);*/">
            <no-ssr>
              <l-map
                :zoom="mapOptions.zoom"
                :center="mapOptions.center"
              >
                <template v-for="station in stationPosition">
                  <l-marker :key="station.lat + '-' + station.lng" :lat-lng="station">
                    <l-popup :content="station.name + ' ' + station.desc" />
                    <l-icon
                      :icon-size="25"
                      icon-url="/icon/bus_stop.png"
                    />
                  </l-marker>
                </template>
                <template v-for="car in carPosition">
                  <l-marker
                    :key="car.lat + '-' + car.lng"
                    :lat-lng="car"
                  >
                    <l-popup :content="car.name" />
                    <l-icon
                      :icon-size="50"
                      icon-url="/icon/gps.png"
                    />
                  </l-marker>
                </template>

                <l-tile-layer :url="mapOptions.url" :attribution="mapOptions.attribution" />
              </l-map>
            </no-ssr>
          </div>
        </div>
        <div class="col-md-3 h-100">
          <div>
            <b-carousel
              id="carousel-fade"
              indicators
              class="bg-black"
              style="max-height: 50vh"
              img-width="500"
              img-height="500"
            >
              <template v-for="slide in newsList">
                <b-carousel-slide :key="slide" :img-src="slide" />
              </template>
            </b-carousel>
            <ul class="list-group mt-2 overflow-scroll" style="max-height: 50vh">
              <template v-for="station in stationPosition">
                <li :key="'StationList:'+station.lat + '-' + station.lng" class="list-group-item">
                  <h6 class="text-primary">
                    {{ station.name }}
                  </h6>
                  <p>
                    {{ station.desc }}
                  </p>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  async asyncData ({
    route,
    store,
    params
  }) {
    const stationData = await store.dispatch('storage/getAllStation')
    const carData = await store.dispatch('storage/getAllCar')
    const newsData = await store.dispatch('storage/getNews').then(data => data.data)
    return { stationData, carData, newsData }
  },
  data () {
    return {
      timeNow: '',
      dateNow: '',
      imageBaseURL: 'https://ubus.scotty1944.net/',
      mapOptions: {
        urlOption: [
          { text: 'OpenStreetMap', value: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png' },
          { text: 'HikeBike', value: 'https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png' }
        ],
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        // url: 'https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png',
        attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 17,
        center: {
          lat: 13.96587,
          lng: 100.58558
        }
      },
      stationData: [],
      carData: [],
      newsData: []
    }
  },
  computed: {
    stationPosition () {
      return Object.keys(this.stationData).map((k) => {
        return this.stationData[k]
      })
    },
    carPosition () {
      return Object.keys(this.carData).map((k) => {
        return this.carData[k]
      })
    },
    newsList () {
      return this.newsData.map(d => this.imageBaseURL + d.a_image)
    }
  },
  mounted () {
    window.setInterval(() => {
      this.updateTimeClock()
      this.updateCarPosition()
    }, 1000)
  },
  methods: {
    async updateCarPosition () {
      this.carData = await this.$store.dispatch('storage/getAllCar')
      // this.$store.dispatch('storage/getAllCar')
    },
    updateTimeClock () {
      const mm = moment()
      this.dateNow = mm.format('Do MMMM YYYY')
      this.timeNow = mm.format('hh:mm:ss')
    }
  }

}
</script>

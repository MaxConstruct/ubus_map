<template>
  <div>
    <!--    <b-navbar variant="faded" type="light">-->
    <!--      <b-navbar-brand href="#">-->
    <!--        <img src="/logo_map.png" class="d-inline-block align-middle" height="70" alt="Maps">-->
    <!--      </b-navbar-brand>-->
    <!--      <b-navbar-nav class="ml-auto">-->
    <!--        <b-nav-item class="">-->
    <!--          <h1 style="color: #0a58ca" class="text-monospace py-0 my-0 font-weight-bold">-->
    <!--            {{ timeNow }}-->
    <!--          </h1>-->
    <!--          <h5 class="py-0 my-0 text-right text-dark ">-->
    <!--            {{ dateNow }}-->
    <!--          </h5>-->
    <!--        </b-nav-item>-->
    <!--      </b-navbar-nav>-->
    <!--    </b-navbar>-->
    <Nuxt />
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('th')

export default {

  asyncData (ctx) {

  },
  data () {
    return {
      // timeNow: '',
      // dateNow: ''
    }
  }
  // mounted () {
  //   window.setInterval(() => {
  //     this.updateTimeClock()
  //   }, 1000)
  // },
  // methods: {
  //   updateTimeClock () {
  //     const mm = moment()
  //     this.dateNow = mm.format('Do MMMM YYYY')
  //     this.timeNow = mm.format('hh:mm:ss')
  //   }
  // }
}
</script>

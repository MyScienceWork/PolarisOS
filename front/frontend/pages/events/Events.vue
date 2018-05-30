<template>
<div class="hero-body">
    <div class="container is-fluid">
       <div class="columns is-centered">
           <div class="column is-12 has-text-centered">
               <h4 class="title is-4"> USPC Events </h4>
           </div>
       </div>
        <div v-if="state.isAdministrator" class="column is-2 is-offset-9">
            <router-link :to="`/events/create/event`">
                <a class="button is-info">{{lang('l_new_event')}}</a>
            </router-link>
        </div>
      <div class="tabs is-centered is-medium">
        <ul>
          <li  :class="{'is-active': !state.isActive}" @click="state.isActive = !state.isActive" data-tab="Past-Content"><a>{{lang('l_past_events')}}</a></li>
          <li  :class="{'is-active': state.isActive}" @click="state.isActive = !state.isActive" data-tab="Incoming-Content"><a>{{lang('l_incoming_events')}}</a></li>
        </ul>
      </div>
      <div class="container">
        <div :class="{'is-hidden': state.isActive}">

          Pictures past content, Card by default
          <div class="columns is-multiline is-mobile">
                  <div v-for="row in past_events" class="column is-4">
                      <router-link :to="`/events/${row._id}`">
                      <div class="card">
                          <div class="card-image">
                              <figure class="image is-4by3">
                              <img :src="row.picturePath" alt="Placeholder image">
                              </figure>
                          </div>
                          <div class="card-content">
                              <div v-if="row.location" class="content">
                                  {{row.location.country}}, {{row.location.city}}
                                  <time class="is-pulled-right" :datetime="row.endDate">{{row.startDate}}-{{row.endDate}}</time>
                              </div>
                              <span v-for="tag in row.tags" class="tag is-info">{{tag.value}}</span>
                              <div class="media">
                                      <div class="media-content">
                                          <p class="title is-4">{{row.title}}</p>
                                          <span> {{row.header}} </span>
                                      </div>
                              </div>
                          </div>
                      </div>
                    </router-link>
                  </div>
          </div>

      </div>

        <div :class="{'is-hidden': !state.isActive}">
          Music futur content, card by default

          <div class="columns is-multiline is-mobile">
                  <div v-for="row in incoming_events" class="column is-4">
                      <router-link :to="`/events/${row._id}`">
                      <div class="card">
                          <div class="card-image">
                              <figure class="image is-4by3">
                              <img :src="row.picturePath" alt="Placeholder image">
                              </figure>
                          </div>
                          <div class="card-content">
                              <div v-if="row.location" class="content">
                                  {{row.location.country}}, {{row.location.city}}
                                  <time class="is-pulled-right" :datetime="row.endDate">{{row.startDate}}-{{row.endDate}}</time>
                              </div>
                              <span v-for="tag in row.tags" class="tag is-info">{{tag.value}}</span>
                              <div class="media">
                                      <div class="media-content">
                                          <p class="title is-4">{{row.title}}</p>
                                          <span> {{row.header}} </span>
                                      </div>
                              </div>
                          </div>
                      </div>
                      </router-link>
                  </div>
          </div>

      </div >
      </div>

    </div>
</div>
</template>

<script>
module.exports = require('./Events');
</script>

<template>
<div class="hero-body">
    <div class="container is-fluid">
      <div class="tabs is-centered is-medium">
        <ul>
          <li  :class="{'is-active': !state.isActive}" @click="state.isActive = !state.isActive" data-tab="Past-Content"><a>{{lang('l_past_events')}}</a></li>
          <li  :class="{'is-active': state.isActive}" @click="state.isActive = !state.isActive" data-tab="Incoming-Content"><a>{{lang('l_incoming_events')}}</a></li>
        </ul>
      </div>
      <div class="container">
        <container :class="{'is-hidden': state.isActive}">

          Pictures past content, Card by default
          <div class="columns is-multiline">
                  <div class="column is-4">
                      <div v-for="row in past_events" class="card">
                          <div class="card-image">
                              <figure class="image is-4by3">
                              <img :src="row.picturePath" alt="Placeholder image">
                              </figure>
                          </div>
                          <div class="card-content">
                              <div class="content">
                                  {{row.header}}
                                  <time class="is-pulled-right" :datetime="row.startDate">{{row.startDate}}</time>
                              </div>
                              <div class="media">
                                  <div class="media-content">
                                      <div class="media-content is-pulled-right">
                                          <p class="title is-4">{{row.title}}</p>
                                      </div>
                                      <div class="media-left is-pulled-right">
                                          <figure class="image is-48x48">
                                          <img :src="row.picturePath" alt="Placeholder image">
                                          </figure>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
          </div>

        </container >

        <container :class="{'is-hidden': !state.isActive}">
          Music futur content, card by default

          <div class="columns is-multiline">
                  <div class="column is-4">
                      <div v-for="row in incoming_events" class="card">
                          <div class="card-image">
                              <figure class="image is-4by3">
                              <img :src="row.picturePath" alt="Placeholder image">
                              </figure>
                          </div>
                          <div class="card-content">
                              <div class="content">
                                  {{row.header}}
                                  <time class="is-pulled-right" :datetime="row.startDate">{{row.startDate}}</time>
                              </div>
                              <div class="media">
                                  <div class="media-content">
                                      <div class="media-content is-pulled-right">
                                          <p class="title is-4">{{row.title}}</p>
                                      </div>
                                      <div class="media-left is-pulled-right">
                                          <figure class="image is-48x48">
                                          <img :src="row.picturePath" alt="Placeholder image">
                                          </figure>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
          </div>

        </container >
      </div>

    </div>
</div>
</template>

<script>
module.exports = require('./Events');
</script>

<template>
  <div class="hero-body">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column">
          <div class="card">
            <div class="card-content">
              <h4 class="has-small-top-margin title is-4">
                {{ lang("l_deposit_publication") }}
              </h4>
              <widget v-if="is_editing()" :collapsed="true">
                <strong slot="title" class="is-uppercase">{{lang('l_history')}}</strong>
                <div v-if="historys" slot="body">
                  <widget v-for="history in historys" :collapsed="false">
                    <strong v-if="history.denormalization" slot="title">
                      <time class="is-pulled-right" :datetime="history.updated_date">{{history.updated_date | format_date('LLL')}}</time>
                      {{lang('l_step')}} {{lang(history.step)}} - {{lang(history.denormalization.label)}}</strong>
                    <div slot="body">
                      <strong slot="title">{{history.comment}}</strong>
                    </div>
                  </widget>
                </div>
              </widget>
              <div>
                <fselect
                  v-if="!is_editing()"
                  :label="lang('f_choose_publication_group')"
                  :is-required="true"
                  :options="publication_group_options"
                  :form="state.sinks.creations.publication_group"
                  name="group"
                  fieldLabel="label"
                  fieldValue="_id"
                  :view-validation-texts="false"
                  :translatable="true"
                  @select-change="publication_group_change"
                />
                <div
                  v-if="!show_form() && is_editing()"
                  class="column"
                >
                  <div class="columns is-centered">
                    <loader />
                  </div>
                </div>
                <div v-else>
                  <fform
                    :name="state.sinks.creations.publication"
                    :hasButtons="!is_editing()"
                    :hasCancelButton="false"
                    :post_path="state.paths.creations.publication"
                    :put_path="state.paths.creations.publication"
                    :get_path="state.paths.reads.publication"
                    :get_form="state.sinks.reads.publication"
                    @form-success-reset="publication_submitted"
                  >
                    <dynamic-form
                      :form="user_forms(state.selected_publication_form)"
                      :cform="state.sinks.creations.publication"
                    />
                    <finput
                        label=""
                        :hiddenValue="user_id"
                        name="depositor"
                        :form="state.sinks.creations.publication"
                        type="hidden"
                        v-if="!is_editing()"
                    />
                    <finput
                        label=""
                        :form="state.sinks.creations.publication"
                        name="deposit_date"
                        :hidden-value="updated_date"
                        type="hidden"
                        v-if="!is_editing()"
                    />
                    <button v-if="is_editing()"
                            @click.prevent="open_review_modal(props)"
                            :disabled="success"
                            class="button">{{lang('f_finish_review')}}</button>
                    <button v-if="is_editing()"
                            @click.prevent="back()"
                            :disabled="success"
                            class="button">{{lang('f_back')}}</button>
                    <review-modal
                        @review-publication="review_publication"
                        :sink="state.sinks.creations.publication"
                        :show.sync="state.show_review_modal"
                        :status="after_status"
                    ></review-modal>
                  </fform>
                </div>
              </div>
              <article
                class="message is-success"
                v-if="state.statuses.creations.publication === 'ok'"
              >
                <div class="message-body">
                  {{ lang("f_publication_save_success") }}
                </div>
              </article>
              <article
                class="message is-danger"
                v-if="state.statuses.creations.publication === 'nok'"
              >
                <div class="message-body">
                  {{ lang("f_publication_save_failed") }}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = require("./DepositPublication.js");
</script>

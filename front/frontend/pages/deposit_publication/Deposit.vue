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
              <div>
                <fselect
                  :label="lang('f_choose_publication_group')"
                  :is-required="true"
                  :options="publication_group"
                  :form="state.sinks.creations.publication_group"
                  name="group"
                  fieldLabel="label"
                  fieldValue="label"
                  :view-validation-texts="false"
                  :translatable="true"
                  @select-change="publication_group_change"
                />
                <div
                  v-if="
                    state.publication_form_name !== '' &&
                    Object.keys(user_forms(state.publication_form_name)).length === 0
                  "
                  class="column"
                >
                  <div class="columns is-centered">
                    <loader />
                  </div>
                </div>
                <div v-else-if="state.publication_form_name !== ''">
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
                      :form="publication_form"
                      :cform="state.sinks.creations.publication"
                    />
                    <button
                      v-if="is_editing()"
                      @click.prevent="open_review_modal(props)"
                      :disabled="success"
                      class="button"
                    >
                      {{ lang("f_finish_review") }}
                    </button>
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
module.exports = require("./Deposit.js");
</script>

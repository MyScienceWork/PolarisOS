<template>
<div>
    <fvariadic-element class="field" :name="state.variadic_name" :form="sink" :single="true" :default-size="1">
    <template slot="variadic" slot-scope="props">
            <component
                :is="select_component(props.order)"
                :label="lang(label)"
                :name="`${state.inputs[props.order] ? state.inputs[props.order].name : `${props.fname}.${props.order}.dummy`}`"
                :placeholder="lang(get_placeholder(state.inputs[props.order]))"
                type="text"
                :form="sink"
                :has-addons="true"
                :key="`${state.inputs[props.order] ? state.inputs[props.order].name : `${props.fname}.${props.order}.dummy`}`"
                :multi="state.inputs[props.order] ? state.inputs[props.order].element === 'multi-select' : false"
                :options="get_options(props.order, state.inputs[props.order] ? state.inputs[props.order].sink : [])"
                :translatable="get_translatable(props.order)"
                :translate-through-hlang="get_use_hlang(props.order)"
                :fieldValue="get_field('value', state.inputs[props.order] ? state.inputs[props.order].entity : null)"
                :fieldLabel="get_field('label', state.inputs[props.order] ? state.inputs[props.order].entity : null)"
                :ajax="get_ajax('ajax', state.inputs[props.order])"
                :ajax-url="get_ajax('ajax-url', state.inputs[props.order])"
                :ajax-value-url="get_ajax('ajax-value-url', state.inputs[props.order])"
                :prefetch-in-ajax="get_ajax('ajax', state.inputs[props.order])"
                :search-fields="get_ajax('search-fields', state.inputs[props.order])"
                :flatten-list="true"
                class="has-small-bottom-margin"
                :search-size="get_select_size(state.inputs[props.order])"
                @value-change="(val) => update(val, props.order)"
                @select-change="(val) => update(val, props.order)"
            >
                <template slot="left-input-addons">
                  <div
                      v-if="props.order === 0"
                      class="small-select"
                  />
                  <fselect
                      v-if="props.order > 0"
                      label=""
                      placeholder=""
                      :name="`${state.variadic_name}.${props.order}.__bool`"
                      :form="sink"
                      :options="bool_options"
                      :is-addon="true"
                      :key="`${props.id}.bool`"
                      class="small-select fix-selected-tag"
                      :select-first-value="true"
                  />
                  <fselect
                      label=""
                      :placeholder="lang(selectPlaceholder)"
                      :name="`${props.order}.select`"
                      :form="state.sinks.creations.dummy"
                      :options="options"
                      :is-addon="true"
                      :key="`${props.order}.select`"
                      :default-value="state.inputs[props.order] ? state.inputs[props.order].selected : null"
                      @select-change="(val) => select(val, props.order)"
                      class="fix-selected-tag"
                    />
                </template>
                <template slot="input-addons">
                    <div class="control">
                        <a class="button is-info" @click.prevent="props.add">+</a>
                    </div>
                    <div class="control">
                        <a class="button is-info" @click.prevent="props.remove(props.id, props.order)">-</a>
                    </div>
                </template>
                <template slot="search-addons">
                  <div class="control" v-if="props.order === props.total - 1">
                    <a class="button is-medium has-text-red swap" :alt="lang('f_search')" :title="lang('f_search')" @click.prevent="search">
                      <i class="fa fa-search"></i>
                    </a>
                  </div>
                  <div class="control" v-if="props.order === props.total - 1">
                    <a class="button is-medium has-text-red swap" :alt="lang('f_reset')" :title="lang('f_reset')" @click.prevent="reset">
                      <i class="fa fa-trash"></i>
                    </a>
                  </div>
                </template>
            </component>
        </template>
    </fvariadic-element>
</div>
</template>

<script>
    module.exports = require('./AggregateForm');
</script>

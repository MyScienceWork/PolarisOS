<template>
<div>
    <fvariadic-element class="field" name="state.variadic_name" :form="state.sinks.creations.aggregate" :single="true" :default-size="3">
    <template slot="variadic" slot-scope="props">
            <component
                :is="select_component(props.order)"
                :label="lang(label)"
                :name="`${state.inputs[props.order] ? state.inputs[props.order].name : ''}`"
                :placeholder="lang(placeholder)"
                type="text"
                :form="sink"
                :has-addons="true"
                :key="`${props.id}.input`"
                :multi="state.inputs[props.id] ? state.inputs[props.order].element === 'multi-select' : false"
                :options="get_options(props.id, state.inputs[props.order] ? state.inputs[props.id].sink : null)"
                :translatable="get_translatable(props.id)"
                :translate-through-hlang="get_use_hlang(props.id)"
                :fieldValue="get_field('value', state.inputs[props.order] ? state.inputs[props.id].entity : null)"
                :fieldLabel="get_field('label', state.inputs[props.order] ? state.inputs[props.id].entity : null)"
                class="has-small-bottom-margin"
            >
                <template slot="left-input-addons">
                    <fselect 
                        label=""
                        placeholder=""
                        :name="`${state.variadic_name}.${props.order}.__bool`"
                        :form="sink"
                        :options="bool_options"
                        :is-addon="true"
                        :key="`${props.id}.bool`"
                        class="fix-selected-tag"
                        :select-first-value="true"
                    />
                </template>
                <template slot="input-addons">
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
                    <div class="control">
                        <a class="button is-info" @click.prevent="props.add">+</a>
                    </div>
                    <div class="control">
                        <a class="button is-info" @click.prevent="props.remove(props.id)">-</a>
                    </div>
                    <div class="control" v-if="props.order === props.total - 1">
                        <a class="button has-text-red swap" :alt="lang('f_search')" :title="lang('f_search')" @click.prevent="search">
                            <i class="fa fa-search"></i>
                        </a>
                    </div>
                    <div class="control" v-if="props.order === props.total - 1">
                        <a class="button has-text-red swap" :alt="lang('f_reset')" :title="lang('f_reset')" @click.prevent="reset">
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

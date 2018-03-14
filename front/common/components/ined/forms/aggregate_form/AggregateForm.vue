<template>
<div>
    <fvariadic-element class="field" name="state.variadic_name" :form="state.sinks.creations.aggregate" :single="true">
    <template slot="variadic" slot-scope="props">
            <component
                :is="select_component(props.id)"
                :label="lang(label)"
                :name="`${state.inputs[props.id] ? state.inputs[props.id].name : ''}`"
                :placeholder="lang(placeholder)"
                type="text"
                :form="sink"
                :has-addons="true"
                :key="`${props.id}.input`"
                :multi="state.inputs[props.id] ? state.inputs[props.id].element === 'multi-select' : false"
                :options="get_options(props.id, state.inputs[props.id] ? state.inputs[props.id].sink : null)"
                :fieldValue="get_field('value', state.inputs[props.id] ? state.inputs[props.id].entity : null)"
                :fieldLabel="get_field('label', state.inputs[props.id] ? state.inputs[props.id].entity : null)"
                class="has-small-bottom-margin"
            >
                <template slot="input-addons">
                    <fselect 
                    label=""
                    :placeholder="lang(selectPlaceholder)"
                    :name="`${props.id}.select`"
                    :form="state.sinks.creations.dummy"
                    :options="options"
                    :is-addon="true"
                    :key="`${props.id}.select`"
                    :default-value="state.inputs[props.id] ? state.inputs[props.id].selected : null"
                    @select-change="(val) => select(val, props.id)"
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
                </template> 
            </component>
        </template>
    </fvariadic-element>
</div>
</template>

<script>
    module.exports = require('./AggregateForm');
</script>

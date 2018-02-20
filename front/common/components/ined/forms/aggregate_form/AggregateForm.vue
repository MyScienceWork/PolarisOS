<template>
<div>
    <fvariadic-element class="field" name="" :form="state.sinks.creations.aggregate" :single="true">
    <template slot="variadic" slot-scope="props">
            <component
                :is="select_component(props.id)"
                :label="lang(label)"
                :name="`${state.inputs[props.id] ? state.inputs[props.id].name : 'dummy_name'}`"
                :placeholder="lang(placeholder)"
                type="text"
                :form="state.sinks.creations.aggregate"
                :has-addons="true"
                :key="`${props.id}.input`"
                :multi="state.inputs[props.id] ? state.inputs[props.id].element === 'multi-select' : false"
                :options="[]"
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
                    />
                    <div class="control">
                        <a class="button is-info" @click.prevent="props.add">+</a>
                    </div>
                    <div class="control">
                        <a class="button is-info" @click.prevent="props.remove(props.id)">-</a>
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

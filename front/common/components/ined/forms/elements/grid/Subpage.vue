<template>
    <tabber :tabs="['Texts', 'Variables']" v-if="widget">
        <template slot="body" slot-scope="props">
            <tabber key="texts" :variadic="true" v-show="texts.length > 0 && props.id === 0" :tabs="texts.map(i => i.name)"> 
                <template slot="body" slot-scope="vprops">
                    <finput
                        :key="`${prefix}.texts.${vprops.id}.content`"
                        :name="`${prefix}.texts.${vprops.id}.content`"
                        :label="`Content`" 
                        :is-required="true"
                        placeholder="Text's content" 
                        type="text" 
                        :form="form"
                        :unregister="false"
                    />
                </template>
            </tabber>
            <tabber key="variables" :variadic="true" v-show="variables.length > 0 && props.id === 1" :tabs="variables.map(i => i.name)"> 
                <template slot="body" slot-scope="vprops">
                    <finput 
                        :key="`${prefix}.variables.${vprops.id}.value`"
                        :name="`${prefix}.variables.${vprops.id}.value`"
                        label="Value" 
                        placeholder="Value" 
                        type="text" 
                        :form="form"
                        :unregister="false"
                    />
                </template>
            </tabber>
        </template>
    </tabber>
</template>

<script>
    module.exports = require('./Subpage');
</script>

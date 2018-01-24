<template>
    <tabs :tabs="['Texts', 'Variables']" v-if="widget">
        <template slot="body" slot-scope="props">
            <tabs key="texts" :variadic="true" v-show="texts.length > 0 && props.id === 0" :tabs="texts.map(i => i.name)" :is-vertical="true"> 
                <template slot="body" slot-scope="vprops">
                    <finput
                        :key="`${widgetType}.texts.${vprops.id}.content`"
                        :name="`${widgetType}.texts.${vprops.id}.content`"
                        :label="`Content`" 
                        :is-required="true"
                        placeholder="Text's content" 
                        type="text" 
                        :form="form"
                        :unregister="false"
                    />
                </template>
            </tabs>
            <tabs key="variables" :variadic="true" v-show="variables.length > 0 && props.id === 1" :tabs="variables.map(i => i.name)" :is-vertical="true"> 
                <template slot="body" slot-scope="vprops">
                    <finput 
                        :key="`${widgetType}.variables.${vprops.id}.value`"
                        :name="`${widgetType}.variables.${vprops.id}.value`"
                        label="Value" 
                        placeholder="Value" 
                        type="text" 
                        :form="form"
                        :unregister="false"
                    />
                </template>
            </tabs>
        </template>
    </tabs>
</template>

<script>
    module.exports = require('./Subpage');
</script>

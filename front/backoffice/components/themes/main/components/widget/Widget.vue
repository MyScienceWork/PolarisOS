<template>
<div class="smart-widget" v-if="state.show">
    <div class="smart-widget-header">
        <slot name="title">
            Slot title is required
        </slot>
        <span v-if="hasOptions" class="smart-widget-option">
            <a v-if="isCollapsable" class="widget-collapse-option" @click="onCollapse" href="#">
                <i v-if="state.collapsed" class="fa fa-chevron-down"></i>
                <i v-else class="fa fa-chevron-up"></i>
            </a> 
            <a v-if="isRefreshable" class="widget-refresh-option" href="#" @click="onRefresh"><i class="fa fa-refresh"></i></a> 
            <a v-if="isRemovable" class="widget-remove-option" href="#" @click="onRemove"><i class="fa fa-times"></i></a> 
        </span>
    </div>
    <transition name="widget-slide">
        <div v-if="!state.collapsed" class="smart-widget-inner">
            <div class="smart-widget-body">
                <slot name="body">
                Slot body is required
                </slot>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
   module.exports = require('./Widget'); 
</script>

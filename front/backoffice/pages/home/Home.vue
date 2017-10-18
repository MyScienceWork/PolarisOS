<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <div class="smart-widget">
                    <div class="smart-widget-header">
                        Title
                        <span class="smart-widget-option">
                            <span class="refresh-icon-animated" ref="spinIcon" style="display: 'none'">
                                <i class="fa fa-circle-o-notch fa-spin"></i>
                            </span>
                            <a class="widget-toggle-hidden-option" href="#"><i class="fa fa-cog"></i></a> 
                            <a class="widget-collapse-option" data-toggle="collapse" href="#" ref="collapseOption"><i class="fa fa-chevron-up" /></a> 
                            <a class="widget-refresh-option" href="#"><i class="fa fa-refresh" ref="refreshOption" /></a> 
                            <a class="widget-remove-option" href="#" onClick={this.props.onClickRemove} ref="removeOption"><i class="fa fa-times" /></a> 
                        </span>
                    </div>
                    <div class="smart-widget-inner">
                        <div class="smart-widget-body">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Home');
</script>

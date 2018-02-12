<template>
<div class="menu">
    <ul class="menu-list">
        <li>
            <div class="field has-addons">
                <p class="control">
                <button class="button">
                    <span class="icon">
                        <i class="fa fa-arrow-left"></i>
                    </span>
                </button>
                </p>
                <p class="control">
                <button class="button">
                    <span class="icon">
                        <i class="fa fa-arrow-right"></i>
                    </span>
                </button>
                </p>
                <p class="control">
                <span class="select">
                    <select name="test">
                        <option>$</option>
                        <option>£</option>
                        <option>€</option>
                    </select>
                </span>
                </p>
                <p class="control">
                <input class="input" name="test" value="test" />
                </p>
                <p class="control">
                <button class="button" @click="add_element('', $event)">
                    <span class="icon">
                        <i class="fa fa-plus"></i>
                    </span>
                </button>
                </p>
                <p class="control">
                <button class="button" @click="remove_element('0', $event)">
                    <span class="icon">
                        <i class="fa fa-times"></i>
                    </span>
                </button>
                </p>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
    module.exports = require('./HierarchicalStructure');
</script>

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { faker } from '@faker-js/faker';
import axios from "axios";

export const useStore = defineStore('counter', () => {
    const api = {};
    api.base = import.meta.env.VITE_API_BASE;
    api.contacts_list = import.meta.env.VITE_API_CONTACTS_LIST;
    api.contacts_view = (id) => import.meta.env.VITE_API_CONTACTS_VIEW.replace(":id", id);

    const _axi = axios.create({});
    const axi = computed(() => _axi);

    function ask(title, content, callback) {
        $.modal({
            title: title,
            class: 'mini basic',
            content: content,
            actions: [{
                text: 'Proceed',
                class: 'green',
                click: () => callback(true)
            }, {
                text: 'Cancel',
                class: 'red',
                click: () => callback(false)
            }],
            closable: false
        }).modal('show');
    }

    return {
        api,
        axi,
        ask
    };
});
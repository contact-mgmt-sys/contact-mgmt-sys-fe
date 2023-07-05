import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { faker } from '@faker-js/faker';
import axios from "axios";

export const useStore = defineStore('counter', () => {
    const api = {};
    api.base = "http://127.0.0.1:8000/";
    api.contacts_list = `${api.base}contacts/`;
    api.contacts_view = (id) => `${api.contacts_list}${id}/`;

    const _axi = axios.create({});
    const axi = computed(() => _axi);

    return {
        api,
        axi
    };
});
<script setup>
import { ref, computed, onMounted, onActivated } from 'vue';
import { useStore } from "./../stores/store.js";

const store = useStore();

const query = ref("");
const contacts = ref([]);
const isearch = ref();

function search(str) {
    query.value = str ?? "";
    list({search: query.value});
}

async function remove(id) {
    await store.axi.delete(store.api.contacts_view(id));
    list();
}

function list(params) {
    params = params ?? {};
    store.axi.get(store.api.contacts_list, {params: params})
        .then((response) => {
            contacts.value = response.data.results;
        })
        .catch((error) => {
        });
}

list();
</script>

<template>
<table>
    <thead>
        <tr>
            <th colspan="6">
                <h1>Contacts</h1>
            </th>
        </tr>
        <tr>
            <th colspan="6">
                <input type="text" name="query" ref="isearch" @keyup.enter="search(isearch.value);">
                <button @click="search(isearch.value);">Search</button>
            </th>
        </tr>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="contact, idx in contacts" v-bind:key="contact.id">
            <td><router-link :to="{name: 'read', params: {id: contact.id}}">{{ idx + 1 }}</router-link></td>
            <td><router-link :to="{name: 'read', params: {id: contact.id}}">{{ contact.name }}</router-link></td>
            <td><router-link :to="{name: 'read', params: {id: contact.id}}">{{ contact.address }}</router-link></td>
            <td><router-link :to="{name: 'read', params: {id: contact.id}}">{{ contact.email }}</router-link></td>
            <td><router-link :to="{name: 'read', params: {id: contact.id}}">{{ `${contact.mobile ? '+' : ''}${contact.mobile}` }}</router-link></td>
            <td>
                <button @click="this.$router.push({name: 'update', params: {id: contact.id}});">Update</button>
                <!-- <form class="hidden" action="" method="post"> -->
                    <!-- <input type="submit" value="Delete"> -->
                <button @click="remove(contact.id);">Delete</button>
                <!-- </form> -->
            </td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th colspan="6">
                <!-- <button onClick="window.location.href='';">Create</button> -->
                <button @click="this.$router.push({name: 'create'});">Create</button>
            </th>
        </tr>
    </tfoot>
</table>
</template>
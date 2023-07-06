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

function askRemove(id) {
    store.ask("Contact Deletion", "Are you sure you want to delete this contact?", (val) => {
        if(val) remove(id);
    });
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
<h2 class="ui center aligned icon header">
    <i class="circular users icon"></i>
    Contacts
</h2>
<div class="ui icon fluid input">
    <input type="text" placeholder="Search..." ref="isearch" @keyup.enter="search(isearch.value);">
    <i class="inverted circular search link icon"></i>
</div>
<div class="ui stacked very padded segment" v-if="contacts.length > 0">
    <div class="ui ordered relaxed large selection divided list">
        <div class="item" v-for="contact, idx in contacts" :key="contact.id">
            <div class="ui labels right floated">
                <router-link :to="{name: 'read', params: {id: contact.id}}" class="ui label">View</router-link>
                <router-link :to="{name: 'update', params: {id: contact.id}}" class="ui label">Update</router-link>
                <a class="ui label" href="javascript:void(0)" @click="askRemove(contact.id);">
                    Delete
                </a>
            </div>
            <div class="content">
                <div class="header">{{ contact.name }}</div>
            </div>
        </div>
    </div>
</div>
<div class="ui center aligned basic message" v-else>
    <div class="content">
        <div class="header">
            Nothing to display!
        </div>
        <p>No contacts were found.</p>
    </div>
</div>
<router-link :to="{name: 'create'}" class="ui bottom attached centered huge label">Create</router-link>

<!-- <table>
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
                <button @click="remove(contact.id);">Delete</button>
            </td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th colspan="6">
                <button @click="this.$router.push({name: 'create'});">Create</button>
            </th>
        </tr>
    </tfoot>
</table> -->
</template>
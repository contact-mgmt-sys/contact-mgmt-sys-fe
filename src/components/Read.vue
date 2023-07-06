<script setup>
import { ref } from 'vue';
import { useStore } from "./../stores/store.js";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const contact = ref();

function askRemove(id) {
    store.ask("Contact Deletion", "Are you sure you want to delete this contact?", (val) => {
        if(val) remove(id);
    });
}

function view(id) {
    store.axi.get(store.api.contacts_view(id))
        .then((response) => {
            contact.value = response.data;
        })
        .catch((error) => {
        });
}

async function remove(id) {
    await store.axi.delete(store.api.contacts_view(id));
    router.push({name: "index"});
}

view(route.params.id);
</script>

<template>

<template v-if="contact">
<router-link to="/" class="ui label">Back</router-link>
<h2 class="ui header">
    <i class="eye icon"></i>
    <div class="content">
        View Contact
    </div>
</h2>

<div class="ui stacked very padded segment">
    <div class="ui form">
        <div class="field">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" placeholder="" :value="contact.name" disabled>
        </div>
        <div class="field">
            <label for="address">Address</label>
            <input type="text" name="address" id="address" placeholder="" :value="contact.address" disabled>
        </div>
        <div class="two fields">
            <div class="field">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="" :value="contact.email" disabled>
            </div>
            <div class="field">
                <label for="mobile">Mobile</label>
                <div class="ui labeled input">
                    <div class="ui label">
                        +
                    </div>
                    <input type="text" name="mobile" id="mobile" placeholder="" :value="contact.mobile" disabled>
                </div>
            </div>
        </div>
    </div>
    
    <div class="ui stackable fluid spaced large buttons">
        <button class="ui button" @click="this.$router.push({name: 'update', params: {id: contact.id}});">Update</button>
        <button class="ui button" @click="askRemove(contact.id);">Delete</button>
    </div>
</div>
</template>

<!-- <template v-if="contact">
    <router-link to="/">Back</router-link>
    <h1>View Contact</h1>
    <div>
        <label for="name">Name</label><br>
        <input type="text" name="name" id="name" :value="contact.name" disabled>
    </div>
    <div>
        <label for="address">Address</label><br>
        <input type="text" name="address" id="address" :value="contact.address" disabled>
    </div>
    <div>
        <label for="email">Email</label><br>
        <input type="email" name="email" id="email" :value="contact.email" disabled>
    </div>
    <div>
        <label for="mobile">Mobile</label><br>
        <input type="text" name="mobile" id="mobile" :value="'+' + contact.mobile" disabled>
    </div>
    <br>
    <button @click="this.$router.push({name: 'update', params: {id: contact.id}});">Update</button>
    <button @click="remove(contact.id);">Delete</button>
</template> -->
</template>
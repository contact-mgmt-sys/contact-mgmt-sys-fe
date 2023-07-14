<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from "./../stores/store.js";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();
const contact = ref();

const name = ref("");
const address = ref("");
const email = ref("");
const mobile = ref("");

let submitted = false;

function view(id) {
    store.axi.get(store.api.contacts_view(id))
        .then((response) => {
            contact.value = response.data;
            name.value = contact.value.name;
            address.value = contact.value.address;
            email.value = contact.value.email;
            mobile.value = contact.value.mobile;
        })
        .catch((error) => {
        });
}

function update(id) {
    submitted = true;
    const con = {
        name: name.value,
        address: address.value,
        email: email.value,
        mobile: mobile.value,
    };
    store.axi.put(store.api.contacts_view(id), con)
        .then((response) => {
            router.push({name: "index"});
        })
        .catch((error) => {
            submitted = false;
        });
}

view(route.params.id);

onMounted(() => {
    $('.ui.form')
    .form({
            fields: {
                name: ['empty', 'maxLength[250]'],
                address: ['empty', 'maxLength[500]'],
                email: ['email', 'maxLength[250]'],
                mobile: ['integer', 'exactLength[12]'],
            },
            inline: false,
            onSuccess: function(submitEvent, fields) {
                update(contact.value.id);
                return false;
            },
    })
    ;
});
</script>

<template>
<div v-show="contact">
<router-link to="/" class="ui label">Back</router-link>
<h2 class="ui header">
    <i class="pen icon"></i>
    <div class="content">
        Update Contact
    </div>
</h2>

<div class="ui stacked very padded segment">
    <form class="ui form">
        <div class="field">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" placeholder="" v-model="name">
        </div>
        <div class="field">
            <label for="address">Address</label>
            <input type="text" name="address" id="address" placeholder="" v-model="address">
        </div>
        <div class="two fields">
            <div class="field">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="" v-model="email">
            </div>
            <div class="field">
                <label for="mobile">Mobile</label>
                <div class="ui labeled input">
                    <div class="ui label">
                        +
                    </div>
                    <input type="text" name="mobile" id="mobile" placeholder="" v-model="mobile">
                </div>
            </div>
        </div>
        <button type="submit" class="fluid ui button large" :disabled="submitted">Submit</button>
        <div class="ui error message"></div>
    </form>
</div>
</div>

<!-- <template v-if="contact">
    <router-link to="/">Back</router-link>
    <h1>Update Contact</h1>
        <div>
            <label for="name">Name</label><br>
            <input type="text" name="name" id="name" v-model="name">
        </div>
        <div>
            <label for="address">Address</label><br>
            <input type="text" name="address" id="address" v-model="address">
        </div>
        <div>
            <label for="email">Email</label><br>
            <input type="email" name="email" id="email" v-model="email">
        </div>
        <div>
            <label for="mobile">Mobile</label><br>
            +<input type="text" name="mobile" id="mobile" v-model="mobile">
        </div>
        <br>
        <button @click="update(contact.id);" :disabled="submitted">Submit</button>
</template> -->
</template>
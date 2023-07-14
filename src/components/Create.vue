<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from "./../stores/store.js";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const name = ref("");
const address = ref("");
const email = ref("");
const mobile = ref("");

let submitted = false;

function create() {
    submitted = true;
    const con = {
        name: name.value,
        address: address.value,
        email: email.value,
        mobile: mobile.value,
    };
    store.axi.post(store.api.contacts_list, con)
        .then((response) => {;
            router.push({name: "index"});
        })
        .catch((error) => {
            submitted = false;
        });
}

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
            onSuccess: function() {
                create();
                return false;
            }
    })
    ;
    console.log($(".ui.form"));
});

</script>

<template>
<router-link to="/" class="ui label">Back</router-link>
<h2 class="ui header">
    <i class="plus icon"></i>
    <div class="content">
        Create Contact
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

<!-- <router-link to="/">Back</router-link>
<h1>Create Contact</h1>
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
    <button @click="create();" :disabled="submitted">Submit</button> -->
</template>
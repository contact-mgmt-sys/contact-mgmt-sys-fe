<script setup>
import { ref } from 'vue';
import { useStore } from "./../stores/store.js";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const name = ref("");
const address = ref("");
const email = ref("");
const mobile = ref("");

function createContact() {
    store.createContact(name.value, address.value, email.value, mobile.value);
    console.log("Created:", name.value, address.value, email.value, mobile.value);
    router.push('/');
}

</script>

<template>
<router-link to="/">Back</router-link>
<h1>Create Contact</h1>
<!-- <form action="" method="post"> -->
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
    <!-- <input type="submit" value="Submit"> -->
    <button @click="createContact();">Submit</button>
<!-- </form> -->
</template>
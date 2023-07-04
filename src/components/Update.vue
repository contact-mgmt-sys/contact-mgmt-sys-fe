<script setup>
import { ref } from 'vue';
import { useStore } from "./../stores/store.js";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();
const contact = store.readContact(route.params.id);

const name = ref(contact.name);
const address = ref(contact.address);
const email = ref(contact.email);
const mobile = ref(contact.mobile);

function updateContact() {
    store.updateContact(contact.id, name.value, address.value, email.value, mobile.value);
    console.log("Updated:",
        contact.name, contact.address, contact.email, contact.mobile, "->",
        name.value, address.value, email.value, mobile.value);
    router.push({name: "index"});
}

</script>

<template>
<router-link to="/">Back</router-link>
<h1>Update Contact</h1>
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
    <button @click="updateContact();">Submit</button>
<!-- </form> -->
</template>
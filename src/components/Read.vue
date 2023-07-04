<script setup>
import { ref } from 'vue';
import { useStore } from "./../stores/store.js";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const contact = store.readContact(route.params.id);

function deleteContact() {
    store.deleteContact(contact.id);
    console.log("Deleted:", contact.name, contact.address, contact.email, contact.mobile);
    router.push({name: "index"});
}

if(route.query.delete) deleteContact();
</script>

<template>
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
<!-- <form class="hidden" action="{% url 'contacts:delete' contact.id %}" method="post"> -->
    <input type="submit" value="Delete">
<!-- </form> -->
</template>
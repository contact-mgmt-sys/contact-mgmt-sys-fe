<script setup>
import { ref } from 'vue';
import { useStore } from "./../stores/store.js";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const contact = ref();

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
    <button @click="remove(contact.id);">Delete</button>
    <!-- </form> -->
</template>
</template>
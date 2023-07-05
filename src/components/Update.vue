<script setup>
import { ref } from 'vue';
import { useStore } from "./../stores/store.js";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();
const contact = ref();

const name = ref(contact.name);
const address = ref(contact.address);
const email = ref(contact.email);
const mobile = ref(contact.mobile);

let submitted = false;

function view(id) {
    store.axi.get(store.api.contacts_view(id))
        .then((response) => {
            console.log(response);
            contact.value = response.data;
            name.value = contact.value.name;
            address.value = contact.value.address;
            email.value = contact.value.email;
            mobile.value = contact.value.mobile;
            console.log("[view]", "succeeded", "got", contact.value);
        })
        .catch((error) => {
            console.log("[view]", "failed", error);
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
            console.log("[update]", "succeeded", "updated", con);
            router.push({name: "index"});
        })
        .catch((error) => {
            console.log("[update]", "failed", error);
            submitted = false;
        });
}

view(route.params.id);
</script>

<template>
<template v-if="contact">
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
        <button @click="update(contact.id);" :disabled="submitted">Submit</button>
    <!-- </form> -->
</template>
</template>
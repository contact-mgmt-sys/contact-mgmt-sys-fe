import { ref } from 'vue';
import { defineStore } from 'pinia';
import { faker } from '@faker-js/faker';

export const useStore = defineStore('counter', () => {
    const contacts = ref([]);

    function createContact(name, address, email, mobile) {
        contacts.value.push({
            id: faker.string.uuid(),
            name: name ?? faker.person.fullName(),
            address: address ?? faker.location.streetAddress(),
            email: email ?? faker.internet.email(),
            mobile: mobile ?? faker.phone.number("############"),
        });
    }

    function readContact(id) {
        return contacts.value.find(contact => contact.id === id);
    }

    function updateContact(id, name, address, email, mobile) {
        const contact = readContact(id);
        if(contact) {
            contact.name = name ?? contact.name;
            contact.address = address ?? contact.address;
            contact.email = email ?? contact.email;
            contact.mobile = mobile ?? contact.mobile;
        }
    }

    function deleteContact(id) {
        const index = contacts.value.findIndex(contact => contact.id === id);
        if(index > -1) contacts.value.splice(index, 1);
    }

    function searchContact(query) {
        if(query) return contacts.value.filter(
            (contact) => contact.name.toLowerCase().includes(
                query.toLowerCase()));
        return contacts.value;
    }

    for(let i = 0; i < 10; i++) createContact();

    return {
        contacts, 
        createContact,
        readContact,
        updateContact,
        deleteContact,
        searchContact,
    };
});
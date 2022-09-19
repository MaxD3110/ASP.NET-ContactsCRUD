Vue.config.devtools = true;
var app = new Vue({
    el: '#app',
    data: {
        loading: false,
        selectedContact: null,
        objectIndex: 0,
        contactModel: {
            id: 0,
            name: " ",
            mobilePhone: " ",
            jobTitle: " ",
            birthDate: " ",
        },
        
        contacts: [],
    },
    mounted() {
        this.getContacts();
    },
    methods: {

        getContact(id) {
            this.loading = true;
            var contact
            axios.get('/contacts/' + id)
                .then(res => {
                    contact = res.data;
                    this.contactModel = {
                        id: contact.id,
                        name: contact.name,
                        mobilePhone: contact.mobilePhone,
                        jobTitle: contact.jobTitle,
                        birthDate: contact.birthDate,
                    };
                    this.selectContact(contact);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => { 
                    this.loading = false;
                });
        },

        getContacts() {
            this.loading = true;
            axios.get('/contacts')
                .then(res => {
                    this.contacts = res.data;
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {

                    this.loading = false;
                });
        },

        createContact() {

            this.loading = true;
            var formData = new FormData();
            formData.append('request.id', this.contactModel.id);
            formData.append('request.name', this.contactModel.name);
            formData.append('request.mobilePhone', this.contactModel.mobilePhone);
            formData.append('request.jobTitle', this.contactModel.jobTitle);
            formData.append('request.birthDate', this.contactModel.birthDate);
            axios.post('/contacts', formData)
                .then(res => {
                    console.log(res.data);
                    this.contacts.push(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() =>
                {
                    this.loading = false;
                })
        },

        updateContact() {

            this.loading = true;
            var formData = new FormData();
            formData.append('request.id', this.contactModel.id);
            formData.append('request.name', this.contactModel.name);
            formData.append('request.mobilePhone', this.contactModel.mobilePhone);
            formData.append('request.jobTitle', this.contactModel.jobTitle);
            formData.append('request.birthDate', this.contactModel.birthDate);
            axios.put('/contacts', formData)
                .then(res => {
                    this.contacts.splice(this.objectIndex, 1, res.data);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                })
        },

        deleteContact(id) {
            this.loading = true;
            axios.delete('/contacts/' + id)
                .then(res => {
                    this.contacts.splice(this.objectIndex, 1);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                    this.cancel();
                });
        },

        isValidData(isValid) {

            if (isValid !== true) {
                return false;
            }

            this.contactModel.birthDate = document.getElementById("BDay").value;

            if (this.selectedContact !== null) {
                this.updateContact();
            }
            else {
                this.createContact();
            }

            window.location.href = '#!';
        },

        removeIndicators() {
            document.getElementById('name').classList.remove('error');
            document.getElementById('name').classList.remove('success');
            document.getElementById('mPhone').classList.remove('error');
            document.getElementById('mPhone').classList.remove('success');
            document.getElementById('jTitle').classList.remove('error');
            document.getElementById('jTitle').classList.remove('success');
            document.getElementById('BDay').classList.remove('error');
            document.getElementById('BDay').classList.remove('success');
        },

        editContact(id, index) {
            this.objectIndex = index;
            this.getContact(id); 
            this.removeIndicators();
        },
        newContact() {
            this.contactModel.id = 0;
            this.contactModel.name = "";
            this.contactModel.mobilePhone = "";
            this.contactModel.jobTitle = "";
            this.contactModel.birthDate = "";
            this.removeIndicators();
            this.cancel();
        },
        cancel() {
            this.selectedContact = null;
            this.objectIndex = 0;
        },
        selectContact(contact) {
            this.selectedContact = contact;
        },
    },

    computed:
    {

    }
});

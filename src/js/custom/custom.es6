let app4 = new Vue({
    el: '#app-4',

    components: {
        Multiselect: window.VueMultiselect.default,
        VPaginator: VuePaginator
    },

    data: {

        search: '',

        filters: [
            {
                name: 'position',
                value: null,
                placeholder: 'Select position',
                options: []
            },

            {
                name: 'office',
                value: null,
                placeholder: 'Select office',
                options: []
            },

            {
                name: 'services',
                value: null,
                placeholder: 'Select services',
                options: []
            }
        ],


        filter_letter: '',


        alphabet_filter_arr: [],


        filtered_users: [],
        paginate: ['users'],


        users: [
            {
                fname: 'Tiriaq',
                lname: 'Kawacatoose',
                office: {
                    name: 'Office 1',
                    slug: 'office-1'
                },
                position: {
                    name: 'Position 1',
                    slug: 'position-1'
                },
                services: {
                    name: 'Service 1',
                    slug: 'service-1'
                }
            },
            {
                fname: 'Qillaq',
                lname: 'Hiawatha',
                office: {
                    name: 'Office 2',
                    slug: 'office-2'
                },
                position: {
                    name: 'Position 2',
                    slug: 'position-2'
                },
                services: {
                    name: 'Service 2',
                    slug: 'service-2'
                }

            },
            {
                fname: 'Muscowequan',
                lname: 'Tecumseh',
                office: {
                    name: 'Office 1',
                    slug: 'office-1'
                },
                position: {
                    name: 'Position 1',
                    slug: 'position-1'
                },
                services: {
                    name: 'Service 1',
                    slug: 'service-1'
                }
            },
            {
                fname: 'Kawacatoose',
                lname: 'Malik',
                office: {
                    name: 'Office 3',
                    slug: 'office-3'
                },
                position: {
                    name: 'Position 2',
                    slug: 'position-2'
                },
                services: {
                    name: 'Service 3',
                    slug: 'service-3'
                }

            },
            {
                fname: 'Aputsiaq',
                lname: 'Wickaninnish',
                office: {
                    name: 'Office 1',
                    slug: 'office-1'
                },
                position: {
                    name: 'Position 3',
                    slug: 'position-3'
                },
                services: {
                    name: 'Service 2',
                    slug: 'service-2'
                }
            },
            {
                fname: 'Nanook',
                lname: 'Antiman',
                office: {
                    name: 'Office 1',
                    slug: 'office-1'
                },
                position: {
                    name: 'Position 3',
                    slug: 'position-3'
                },
                services: {
                    name: 'Service 1',
                    slug: 'service-1'
                }
            },
            {
                fname: 'Raymond',
                lname: 'Ross',
                office: {
                    name: 'Office 3',
                    slug: 'office-3'
                },
                position: {
                    name: 'Position 4',
                    slug: 'position-4'
                },
                services: {
                    name: 'Service 6',
                    slug: 'service-6'
                }
            },
            {
                fname: 'Annette',
                lname: 'Reed',
                office: {
                    name: 'Office 4',
                    slug: 'office-4'
                },
                position: {
                    name: 'Position 2',
                    slug: 'position-2'
                },
                services: {
                    name: 'Service 4',
                    slug: 'service-4'
                }
            }
        ]

    },
    methods: {


        filteredOptions: function (filters, filtered_users) {

            let self = this;

            filters.forEach(function (filter) {

                let distinct_filter_options = [{
                    slug: 'all',
                    name: 'All'
                }];

                let uniq_values_arr_helper = [];

                for (let i = 0; i < filtered_users.length; i++) {

                    if (uniq_values_arr_helper.indexOf(filtered_users[i][filter.name]['slug']) === -1) {

                        uniq_values_arr_helper.push(filtered_users[i][filter.name]['slug']);

                        distinct_filter_options.push({
                            name: filtered_users[i][filter.name]['name'],
                            slug: filtered_users[i][filter.name]['slug']
                        })
                    }
                }


                filter.options = distinct_filter_options;

            })

        },


        alphabet_filter: function (filtered_users) {
            let self = this;


            //get unique letters
            let filtered_users_letters = [];

            filtered_users.forEach(function (user) {
                if (filtered_users_letters.indexOf(user.lname.charAt(0).toLowerCase()) === -1) {
                    filtered_users_letters.push(user.lname.charAt(0).toLowerCase())
                }
            });

            //generate alphabet
            let alphabet_array = [],
                i = 'a'.charCodeAt(0),
                j = 'z'.charCodeAt(0);

            for (; i <= j; ++i) {
                alphabet_array.push(
                    {
                        letter: String.fromCharCode(i),
                        active: false
                    }
                );
            }

            //set active letters
            alphabet_array.forEach(function (letter) {
                if (filtered_users_letters.indexOf(letter.letter) > -1) {

                    letter.active = true;
                }
            });


            self.alphabet_filter_arr = alphabet_array;

        },

        setLetter: function (letter) {
            this.filter_letter = letter;

        },

        clearFilters: function(){
            let self = this;

            self.filter_letter = '';


            self.filters.forEach(function(filter){
                filter.value = {};
            })


            self.search = '';

        }

    },

    computed: {

        filteredCustomers: function () {
            let self = this;

            self.filtered_users = self.users;


            //search by fname || lname
            self.filtered_users = self.filtered_users.filter(function (user) {
                return (user.fname.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 || user.lname.toLowerCase().indexOf(self.search.toLowerCase()) >= 0);
            });


            //meta filter
            self.filters.forEach(function (filter) {

                if (filter.value == null) return;

                if (filter.value.hasOwnProperty('slug') && filter.value.slug != 'all') {
                    self.filtered_users = self.filtered_users.filter(function (user) {

                        return (user[filter.name]['slug'].indexOf(filter.value.slug) >= 0);
                    });
                }

            });

            //update alphabet filter
            self.alphabet_filter(self.filtered_users);

            //letter filter
            if (self.filter_letter) {
                self.filtered_users = self.filtered_users.filter(function (user) {
                    return (user.lname.charAt(0).toLowerCase() == self.filter_letter);
                });
            }


            //update meta filter options
            self.filteredOptions(self.filters, self.filtered_users);



            return self.filtered_users;
        }


    }

});

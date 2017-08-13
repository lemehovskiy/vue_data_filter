let app4 = new Vue({
    el: '#app-4',

    components: {
        Multiselect: window.VueMultiselect.default
    },

    data: {

        search: '',

        filters: [
            {
                name: 'position',
                value: {},
                placeholder: 'Select position',
                options: []
            },

            {
                name: 'office',
                value: {},
                placeholder: 'Select office',
                options: []
            },

            {
                name: 'services',
                value: {},
                placeholder: 'Select services',
                options: []
            }
        ],


        filtered_users: [],


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
            }
        ]

    },
    methods: {
        filteredOptions: function (filters, filtered_users) {

            let self = this;

            // console.log(filters);


            filters.forEach(function(filter){

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

        }
    },

    computed: {

        filteredCustomers: function () {
            let self = this;

            // self.filteredOptions();

            self.filtered_users = this.users;

            //search by fname || lname
            self.filtered_users = self.filtered_users.filter(function (user) {
                return (user.fname.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 || user.lname.toLowerCase().indexOf(self.search.toLowerCase()) >= 0);
            });


            //user filter
            self.filters.forEach(function (filter) {

                if (filter.value.hasOwnProperty('slug') && filter.value.slug != 'all') {
                    self.filtered_users = self.filtered_users.filter(function (user) {

                        return (user[filter.name]['slug'].indexOf(filter.value.slug) >= 0);
                    });
                }

            });

            //options filter

            self.filteredOptions(self.filters, self.filtered_users);



            return self.filtered_users;
        }


        // filteredOptions: function () {
        //     console.log("1111");

            // let distinct_filter_options = []
            //
            // for (var i = 0; i < this.filtered_users.length; i++) {
            //
            //     if (this.filtered_users[i].slug in distinct_filter_options) {
            //
            //         distinct_filter_options.push(this.filtered_users[i].slug)
            //     }
            // }

            // console.log(distinct_filter_options);

        // }


    }

})

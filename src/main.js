import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from "vue-resource";

import moment from "moment-timezone";
moment.tz.setDefault("UTC");
// $root is this same component, where I added a data.moment, getting it from there
let momentGetter = { get() { return this.$root.moment } };
Object.defineProperty(Vue.prototype, '$moment', momentGetter);

import { checkFilter } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

Vue.use(VueResource);

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    methods: {
    },
    components: {
        MovieList,
        MovieFilter
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.body;
        });
        this.$bus.$on('check-filter', checkFilter.bind(this));
    }
})

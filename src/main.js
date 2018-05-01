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

Vue.use(VueResource);

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment()
    },
    methods: {
        checkFilter(category, title, checked) {

            let titleIndex = this[category].indexOf(title);

            let removeCategoryOfNull = titleIndex >= 0
                ? this[category].splice(titleIndex, 1)
                : null;

            checked
                ? this[category].push(title)
                : removeCategoryOfNull;
        }
    },
    components: {
        MovieList,
        MovieFilter
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.body;
        })
    }
})

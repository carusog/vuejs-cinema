import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from "vue-resource";

Vue.use(VueResource);

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: []
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

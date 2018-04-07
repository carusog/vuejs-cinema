import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: []
    },
    methods: {
        checkFilter(category, title, checked) {
            console.log(category, title, checked);
            checked ?
                this[category].push(title) :
                this[category].indexOf(title) >= 0 ?
                    this[category].splice(this[category].indexOf(title), 1) :
                    null;
        }
    },
    components: {
        'movie-list': {
            template: `
                <div id="movie-list">
                    <div v-for="movie in filteredMovies" class="movie">
                        {{movie.title}}
                    </div>
                </div>
            `,
            data() {
                return {
                    movies: [
                        { title: 'Pulp Fiction', genre: genres.CRIME },
                        { title: 'Home Alone', genre: genres.COMEDY },
                        { title: 'Austin Powers', genre: genres.COMEDY }
                    ]
                }
            },
            props: [ 'genre', 'time' ],
            methods: {
                moviePassesGenreFilter(movie) {
                    return this.genre.length ?
                        this.genre.find(genre => movie.genre === genre) :
                        true;
                }
            },
            computed: {
                filteredMovies() {
                    return this.movies.filter(this.moviePassesGenreFilter);
                }
            }
        },
        'movie-filter': {
            data() {
                return {
                    genres
                }
            },
            methods: {
                checkFilter(category, title, checked) {
                    this.$emit('check-filter', category, title, checked);
                }
            },
            template: `
                <div id="movie-filter">
                    <h2>Filter results</h2>
                    <div class="filter-group">
                        <check-filter
                            v-for="genre in genres"
                            v-bind:title="genre"
                            v-on:check-filter="checkFilter"
                        ></check-filter>
                    </div>
                </div>
            `,
            components: {
                'check-filter': {
                    template: `
                        <div
                            v-bind:class="{ 'check-filter': true, active: checked }"
                            v-on:click="checkFilter"
                        >
                            <span class="checkbox"></span>
                            <span class="check-filter-title">{{ title }}</span>
                        </div>
                    `,
                    props: ['title'],
                    data() {
                        return {
                            checked: false
                        }
                    },
                    methods: {
                        checkFilter() {
                            this.checked = !this.checked;
                            this.$emit('check-filter', 'genre', this.title, this.checked);
                        }
                    }
                }
            }
        }
    }
})

<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item class="movie"
                v-for="movieObject in filteredMovies"
                :key="movieObject.id"
                :movie="movieObject.movie"
                :sessions="movieObject.sessions"
                :day="day"
                :time="time"
            ></movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            {{noResults}}
        </div>
        <div v-else class="no-results">
            Loading...
        </div>
    </div>
</template>
<script>

import genres from '../util/genres.js';
import times from '../util/times.js';
import MovieItem from './MovieItem.vue';

export default {
    components: {
        MovieItem
    },
    props: [
        'selectedGenres',
        'time',
        'movies',
        'day'
    ],
    methods: {
        moviePassesGenreFilter(movie) {
            if (!this.selectedGenres.length) {
                return true;
            } else {
                let movieGenres = movie.movie.Genre.split(',').map(genre => genre.trim());
                let matched = true;

                this.selectedGenres.forEach(genre => {
                    if (!movieGenres.includes(genre)) {
                        matched = false;
                    };
                });
                return matched;
            }
        },
        sessionPassesTimeFilter(session) {
            if (!this.day.isSame(this.$moment(session.time), 'day')) {
                return false;
            } else if (this.time.length === 0 || this.time.length === 2) {
                return true;
            } else if (this.time[0] === times.AFTER_6PM) {
                return this.$moment(session.time).hour() >= 18;
            } else {
                return this.$moment(session.time).hour() < 18;
            }
        }
    },
    computed: {
        filteredMovies() {
            return this.movies
                .filter(this.moviePassesGenreFilter)
                .filter(movie => movie.sessions.find(
                    this.sessionPassesTimeFilter
                ));
        },
        noResults() {
            let times = this.time.join(', ');
            let genres = this.selectedGenres.join(', ');
            return `No results for: ${times}${times.length ? ',' : ''} ${genres}`;
        }
    },
    created() {
        setTimeout(() => {
            console.log('movies')
            console.log(this.movies);
            console.log('selected genres')
            console.log(this.selectedGenres);
            console.log('moment')
            console.log(this.$moment);
        }, 3000);
    }
};
</script>


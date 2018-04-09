<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item class="movie"
                v-for="movieObject in filteredMovies"
                :key="movieObject.id"
                :movie="movieObject.movie"
            ></movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            No results
        </div>
        <div v-else class="no-results">
            Loading...
        </div>
    </div>
</template>
<script>

import genres from '../util/genres.js';
import MovieItem from './MovieItem.vue';

export default {
    components: {
        MovieItem
    },
    props: [
        'selectedGenres',
        'time',
        'movies'
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
        }
    },
    computed: {
        filteredMovies() {
            return this.movies.filter(this.moviePassesGenreFilter);
        }
    },
    created() {
        console.log(this.movies);
        console.log(this.selectedGenres);

    }
};
</script>


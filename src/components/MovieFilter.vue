<template>
    <div id="movie-filter">
        <h2>Filter results</h2>
        <div class="filter-group">
            <h3>By time of day</h3>
            <check-filter
                v-for="time in times"
                :key="time.title"
                :title="time"
                :category="'time'"
            ></check-filter>
            <h3>By Genre</h3>
            <check-filter
                v-for="genre in genres"
                :key="genre.title"
                :title="genre"
                :category="'genre'"
            ></check-filter>
        </div>
    </div>
</template>

<script>

import genres from '../util/genres';
import times from '../util/times';
import CheckFilter from "./CheckFilter.vue";

export default {
    data() {
        return {
            genres,
            times
        }
    },
    components: {
        CheckFilter
    }
};
</script>

<style>

</style>

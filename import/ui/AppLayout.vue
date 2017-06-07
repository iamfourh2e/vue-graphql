<template>
    <div>
        <p>Hello From AppLayout</p>
        {{posts}}
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    export default {
        data() {
            return {
                posts: []
            }
        },
        apollo: {
            posts: gql`{posts{title}}`
        }
    }
</script>
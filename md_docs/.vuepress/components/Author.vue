<template>
    <p v-if='name && links[name] != null' style="text-align:right" class="author">
    Written by 📝 <a :href='links[name]'>{{name}}</a>
    </p>
</template>

<script>
    export default {
        name: 'Author',
        props: ['name', 'link'],
        data() {
            return {
                links: {
                    Hidekuma: 'https://github.com/hidekuma',
                    Juunone: 'https://github.com/juunone',
                    Taekbari: 'https://github.com/taekbari',
                    Tesilio: 'https://github.com/tesilio',
                    Wabi: 'https://github.com/DeveloperYB'

                }
            }
        }
    }
</script>

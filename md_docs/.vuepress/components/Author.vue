<template>
    <div v-if="$page.frontmatter.customauthor">
        <div v-for="value in $page.frontmatter.customauthor">
            <p style="text-align:right" class="author" v-if="value.name">
				Written by📝{{value.name}}
				<span v-if="value.email"> / {{value.email}}</span></p>
        </div>
		<!-- <img :src="$withBase('/authors/lombok-error.png')" alt="lombok-error"> -->
    </div>
</template>


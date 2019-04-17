module.exports = {
    title: `HIDIKI`,
    description: `DEV WIKI`,
    base: "/",
    dest: 'docs',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
	configureWebpack: {
		resolve: {
		  alias: {
			'@alias': 'path/to/some/dir'
		  }
		}
	},
    plugins: [
        '@vuepress/medium-zoom',
        '@vuepress/back-to-top',
        '@vuepress/active-header-links',
        '@vuepress/last-updated',
        '@vuepress/nprogress',
        '@vuepress/blog',
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-138204111-1'
            }
        ],
        [
            'sitemap',
            {
                hostname: 'https://hidiki.github.io/'
            }
        ]
    ],
    themeConfig: {
        sidebar: [
            {
                title: 'Pythonic',
                children: [
                    '/pythonic/pep8',
                    '/pythonic/generator',
                    '/pythonic/raise-error'
                ]
            },
            {
                title: 'Java',
                children: [
                    '/java/start-spring-boot',
                    '/java/sts-with-lombok',
                    '/java/bean-vs-component'
                ]
            },
            {
                title: 'Docker',
                children: [
                    '/docker/window-install',
                    '/docker/extend-services-in-compose'
                ]
            },
            {
                title: 'Vim',
                children: [
                    '/vim/vimrc'
                ]
            },
            {
                title: 'Database',
                children: [
                    'database/mysql-storage-engine'
                ]
            },
            {
                title: 'Javascript',
                children: [
                    '/javascript/webassembly'
                ]
            },
            {
                title: 'Else',
                children: [
                    '/else/framework-and-library'
                ]
            },
            {
                title: 'React',
                children: [
                    '/react/why-choose-react'
                ]
            }
        ],
        nav: [
          {
            text: 'ABOUT',
            items:[
                { text: 'Github', link: 'https://github.com/HiDIKI/hidiki.github.io.build/' }
            ]
          }
        ]
    },
}


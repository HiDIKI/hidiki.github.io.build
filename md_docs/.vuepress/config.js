module.exports = {
    title: `H!DIKI`,
    description: `Hidekuma\'s DEV logs and Wiki`,
    base: "/HiDIKI/",
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
                title: 'Else',
                children: [
                    '/else/framework-and-library'
                ]
            }
        ],
        nav: [
          {
            text: 'ABOUT',
            items:[
              { text: 'Github', link: 'https://github.com/hidekuma/' },
                        { text: 'Blog', link: 'https://hidekuma.github.io/' }
            ]
          }
        ]
    },
}


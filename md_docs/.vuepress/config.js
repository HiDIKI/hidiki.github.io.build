module.exports = {
    title: `HIDIKI`,
    description: `📖 다소 식상하지만, 모두가 Hi! 할 만큼 반가울 정도의 DEV WIKI를 꿈꾼다. 하이디키 혹은 히디키, 발음은 아무렴 어때.`,
    base: "/",
    dest: 'docs',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    plugins: [
        '@vuepress/medium-zoom',
        '@vuepress/back-to-top',
        '@vuepress/active-header-links',
        '@vuepress/last-updated',
        '@vuepress/nprogress',
        '@vuepress/blog',
        ['@vuepress/google-analytics', {ga: 'UA-138204111-1'}],
        ['sitemap',{hostname: 'https://hidiki.github.io/'}]
    ],
    themeConfig: {
        sidebar: [
            {
                title: 'Pythonic',
                children: [
                    '/pythonic/pep8',
                    '/pythonic/generator',
                    '/pythonic/raise-error',
                    '/pythonic/closure',
                    '/pythonic/feature-of-iterator'
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
                    '/javascript/webassembly',
                    '/javascript/code-optimization'
                ]
            },
            {
                title: 'React',
                children: [
                    '/react/why-choose-react'
                ]
            },
            {
                title: 'Else',
                children: [
                    '/else/framework-and-library'
                ]
            },
        ],
        nav: [
          {
            text: 'ABOUT',
            items:[
                { text: 'Github', link: 'https://github.com/HiDIKI/hidiki.github.io.build/' },
                { text: 'Contributing', link: 'https://github.com/HiDIKI/hidiki.github.io.build/blob/master/CONTRIBUTING.md' }
            ]
          },
        ]
    },
}


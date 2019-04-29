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
        ['@vuepress/register-components', {componentsDir: 'custom_components/'}],
        ['@vuepress/google-analytics', {ga: 'UA-138204111-1'}],
        ['sitemap',{hostname: 'https://hidiki.github.io/'}]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        sidebar: [
            {
                title: 'Pythonic',
                children: [
                    '/pythonic/pep8',
                    '/pythonic/generator',
                    '/pythonic/raise-error',
                    '/pythonic/closure',
                    '/pythonic/feature-of-iterator',
                    '/pythonic/star-args'
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
                    '/docker/kali-install',
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
                title: 'Algorithm',
                children: [
                    '/algorithm/binary-search',
                ]
            },
            {
                title: 'Javascript',
                children: [
                    '/javascript/webassembly',
                    '/javascript/code-optimization',
                    '/javascript/pure-function',
                    '/javascript/promise-resolve-order',
                    '/javascript/arrow-function',
                ]
            },
            {
                title: 'React',
                children: [
                    '/react/why-choose-react',
                    '/react/react-redux',
                    '/react/immutable-js',
                    '/react/redux-thunk'
                ]
            },
            {
                title: 'Else',
                children: [
                    '/else/terms-of-start-up',
                    '/else/framework-and-library',
                    '/else/atomic-design'
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

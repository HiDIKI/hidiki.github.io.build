module.exports = {
    title: `H!DIKI`,
    description: `Hidekuma\'s DEV logs and Wiki`,
    base: "/HiDIKI/",
    dest: 'docs',
    ga: 'UA-138204111-1',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    themeConfig: {
        sidebar: [
            {title: 'Docker', children: ['/Docker/window-install']}
        ],
        nav: [
            { text: 'GitHub', link: 'https://github.com/hidekuma/' }, { text: 'Blog', link: 'https://hidekuma.github.io/' }
        ]
    },
}


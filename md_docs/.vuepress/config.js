module.exports = {
    title: `HiDIKI :: Hidekuma\'s WIKI`,
    description: `Hidekuma\'s DEV logs`,
    base: "/HiDIKI/",
    dest: 'docs',
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


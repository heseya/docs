import path from 'path'

export default {
  title: 'Heseya documentation',

  head: [
    ['link', { rel: 'icon', href: '/favicon-32x32.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600&display=swap',
      },
    ],
  ],

  locales: {
    '/': {
      lang: 'en-US',
      description: 'Lorem ipsum',
    },
  },

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    logo: '/heseya-logo.svg',
    logoDark: '/heseya-logo-dark.svg',

    lastUpdated: false,
    contributors: false,

    navbar: [
      {
        text: 'Docs',
        link: '/introduction',
      },
      {
        text: 'Heseya',
        link: 'https://heseya.com',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/heseya',
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsible: true,
        children: [
          '/introduction/index.md',
          '/introduction/versioning.md',
        ],
      },
      {
        text: 'Developer',
        collapsible: true,
        children: [
          '/developer/index.md',
          '/developer/rest-api.md',
          '/developer/authorization.md',
          '/developer/apps.md',
          '/developer/webhooks.md',
          '/developer/microfrontends.md',
        ],
      },
      {
        text: 'Javascript SDK',
        collapsible: true,
        children: [
          '/developer/js-sdk/index.md',
          '/developer/js-sdk/config.md',
          '/developer/js-sdk/api-service.md',
          '/developer/js-sdk/auth-axios.md',
          '/developer/js-sdk/event-bus.md',
          '/developer/js-sdk/type-definitions.md',
          '/developer/js-sdk/utils.md',
        ],
      },
    ],
  },

  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
        },
      },
    ],
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ],

  alias: {
    '@assets': path.resolve(__dirname, '../assets'),
    '@images': path.resolve(__dirname, '../assets/images'),
  },
}

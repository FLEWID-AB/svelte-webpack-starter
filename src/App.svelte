<script>
  import Router from './Router'
  import Home from './views/Home.svelte'
  import page from 'page'
  import '@/assets/scss/app.scss'

  let routes = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      asyncComponent: () => import(/* webpackChunkName: "about", webpackPrefetch: true */ './views/About.svelte'),
      metadata: {
        key: 'value'
      }
    },
    {
      path: '/dynamic/:slug',
      asyncComponent: () => import(/* webpackChunkName: "dynamic", webpackPrefetch: true  */ './views/DynamicRoute.svelte'),
      middleware: (ctx, next) => {
        ctx.state.slug = ctx.params.slug
        ctx.save()
        next()
      }
    }
  ]

</script>

<h1>Welcome Svelte!</h1>
<a href="/">Home</a>
<a href="/about">About</a>
<a href="/dynamic/foo">Dynamic (foo)</a>
<Router routes="{routes}"></Router>
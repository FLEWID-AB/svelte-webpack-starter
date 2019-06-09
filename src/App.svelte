<script>
  import Router from './Router'
  import Home from './views/Home.svelte'
  import page from 'page'
  export let name

  let routes = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      asyncComponent: () => import(/* webpackChunkName: "about" */ './views/About.svelte'),
      metadata: {
        key: 'value'
      }
    },
    {
      path: '/dynamic/:slug',
      asyncComponent: () => import(/* webpackChunkName: "dynamic" */ './views/DynamicRoute.svelte'),
      middleware: (ctx, next) => {
        ctx.state.slug = ctx.params.slug
        ctx.save()
        next()
      }
    }
  ]

</script>

<h1>Hello {name}!</h1>
<a href="/">Home</a>
<a href="/about">About</a>
<a href="/dynamic/foo">Dynamic (foo)</a>
<Router routes="{routes}"></Router>
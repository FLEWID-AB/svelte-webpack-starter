<script>
  import Router from './Router'
  export let name

  let routes = [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.svelte')
    },
    {
      path: '/about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.svelte')
    }
  ]
</script>

<h1>Hello {name}!</h1>
<a href="/">Home</a>
<a href="/about">About</a>
<Router routes="{routes}"></Router>
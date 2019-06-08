<script>
  import Router from './Router'
  import Home from './views/Home.svelte'
  export let name

  let routes = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      asyncComponent: () => import(/* webpackChunkName: "about" */ './views/About.svelte')
    }
  ]
</script>

<h1>Hello {name}!</h1>
<a href="/">Home</a>
<a href="/about">About</a>
<Router routes="{routes}"></Router>
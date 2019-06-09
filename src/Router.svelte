<script context="module">
  export let currentRoute
</script>

<script>
  import { setContext, getContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import page from 'page'
  page.base('')

  // Keeps track of the new route
  let routeStore = writable(null)

  export let routes

  /**
   * Set a custom Middleware function that is run before each route
   * If you change the context, ensure to call ctx.save() before calling next()
   * Also ensure that you have to call next() as the final function 
   */
  export let middlewares = []

  const setMetadata = (route) => (ctx, next) => {
    let metadata = route.metadata || {}
    ctx.metadata = metadata
    ctx.save()
    next()
  }

  const setRoute = (route) => (ctx, next) => {
    routeStore.set({ctx, route})
    next()
  }

  const registerRoute = (route) => {
    if (route.middleware) {
      // we have a custom route based middleware, so let's add it after the default
      middlewares.push(route.middleware)
    }
    page(
      route.path,
      setMetadata(route),
      ...middlewares,
      setRoute(route)
    )
  }

  routes.forEach(route => {
    registerRoute(route)
  })

  let currentComponent
  let asyncComponent

  onMount(() => {
    page()
    routeStore.subscribe(selected => {
      if (!selected) {
        return
      }
      currentRoute = selected.ctx
      if (selected.route.asyncComponent) {
        asyncComponent = selected.route.asyncComponent()
        asyncComponent.then(
          ({default: component}) => {
            currentComponent = component
            return component
          }
        )
      } else {
        currentComponent = selected.route.component
      }
    })
  })
</script>

{#if currentComponent || asyncComponent}
  {#if asyncComponent}
    {#await asyncComponent}
      <p>Loading...</p>
    {:then value}
      {@debug value}
    {:catch error}
      <p>Something went wrong: {error.message}</p>
    {/await}
  {/if}
  {#if currentComponent}
    <svelte:component this="{currentComponent}"></svelte:component>
  {/if}
{/if}

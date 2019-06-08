<script context="module">
  export const SvelteRouter = {}
</script>

<script>
  import { setContext, getContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'

  import page from 'page'
  export let routes

  let currentRoute = writable(null)

  const registerRoute = (route) => {
    page(
      route.path,
      (ctx, next) => {
        currentRoute.set({ctx, route})
        next()
      }
    )
  }

  routes.forEach(route => {
    registerRoute(route)
  })

  setContext(SvelteRouter, {
    currentRoute
  })

  let currentComponent
  let asyncComponent
  let target

  onMount(() => {
    page({hashbang: false})
    currentRoute.subscribe(selected => {
      if (!selected) {
        return
      }
      
      if (selected.route.asyncComponent) {
        asyncComponent = selected.route.asyncComponent()
        asyncComponent.then(
          ({default: component}) => {
            return new component({
              target
            })
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
    <div bind:this="{target}" ></div>
  {:else if currentComponent}
     <svelte:component this="{currentComponent}"></svelte:component>
  {/if}
{/if}

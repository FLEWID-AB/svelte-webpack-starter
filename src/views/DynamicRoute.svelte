<script>
  import { currentRoute} from '@/Router.svelte'
  
  // we did set the state.slug in middleware
  let slug = currentRoute.state.slug
</script>
<h1>Dynamic ({slug})</h1>
<script>
  import { SeriesService } from './series.svelte'
  import { navigateTo } from 'svelte-router-spa'
  import Search from './Search.svelte'

  const seriesService = new SeriesService()
  
  let allSeries = []

  refreshSeries()

  function refreshSeries() {
    allSeries = seriesService.findAll().sort((a, b) => a.name.localeCompare(b.name))
  }
</script>

<style>

</style>

<div class="ui container">
  <Search added={refreshSeries}/>
  <table class="ui celled striped table">
  <tbody>
    {#each allSeries as series}
    <tr>
      <td class="collapsing" on:click="{() => navigateTo("/series/" + series.id)}">
        <img src="{series.image.medium}" class="ui small image" alt="">
      </td>
      <td>
        <div class="">{series.name}</div>
        <div>{series.rating.average}</div>
        <div>Summary: <br />{@html series.summary}</div>
      </td>
    </tr>
    {/each}
  </tbody>
  </table>
</div>

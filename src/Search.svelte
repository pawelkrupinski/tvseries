<script>
  import { SeriesService } from './series.svelte'

  const service = new SeriesService()

	let search = ''
  let results = []

  $: if (search) {
    fetch('https://api.tvmaze.com/search/shows?q=' + search)
      .then(response => response.json())
      .then(json => {
        results = json.map(series => series.show)
      }, alert)
  } else {
    results = []
  }

  function imgUrl(series) {
    if (series.image) {
      return series.image.medium
    } else return ""
  }

  async function selected(series) {
    if (!service.byId(series.id).length) {
      const episodes = await fetchEpisodes(series.id)
      series.episodes = episodes
      service.add(series)
    }
    search = ''
    results = []
  }

  function fetchEpisodes(id, callback) {
    return fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then(response => response.json())
  }
</script>

<style>
img {
  height: 100px;
  width: auto
 }
</style>

<main>

  <div class="ui main text container">
  <input bind:value={search} />
    {#if results.length > 0}
    <table class="attached ui celled selectable table">
    <tbody>
    {#each results as series}
      <tr on:click="{selected(series)}">
        <td><img src="{imgUrl(series)}" alt="" /></td>
        <td>{series.name}</td>
      </tr>
    {/each}
    </tbody>
    </table>
    {/if}
  </div>
</main>

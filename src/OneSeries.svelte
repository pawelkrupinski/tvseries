<script>
import { navigateTo } from 'svelte-router-spa';
import { SeriesService } from './series.svelte'

const service = new SeriesService()

export let currentRoute

const id = parseInt(currentRoute.namedParams.id)
const series = service.byId(id)[0]

function sanitizeSummary(summary) {
  if (summary == null) {
    return ""
  } else {
    return summary
  }
}

function enrichEpisode(episode) {
  episode.seriesAndNumber = seriesAndNumber(episode) 
  episode.summary = sanitizeSummary(episode.summary)
  return episode
}

function seriesAndNumber(episode) {
  return "S" + episode.season.toString().padStart(2, "0") + 
      "E" + episode.number.toString().padStart(2, "0")
}

function compare(a, b) {
  if (!b) {
    return 1
  }
  return a.seriesAndNumber.localeCompare(b.seriesAndNumber)
}

function greaterThan(a, b) {
  return compare(a, b) > 0
}

const episodes = series.episodes.map(enrichEpisode).sort(compare)
let lastWatched
$: {
  lastWatched = episodes.find(e => series.lastWatched == e.id)
  updateChecked()
}

function updateChecked() {
  episodes.forEach(element => {
    element.checked = isChecked(element)
  })
}

function previousId(episode) {
  const index = episodes.findIndex(e => e.id == episode.id)
  if (index == 0) {
    return undefined
  }
  return episodes[index - 1].id
}

function clicked(episode) {
  if (greaterThan(episode, lastWatched)) {
    series.lastWatched = episode.id
  } else {
    series.lastWatched = previousId(episode)
  } 
  service.updateLastWatched(series)
}

function isChecked(episode) {
  return !greaterThan(episode, lastWatched)
}

function deleteSeries() {
  service.delete(id)
  navigateTo("/")
}

</script>

<div class="ui two column grid container">
<div class="column" style="width: 20%">
  <img src="{series.image.medium}" class="ui small image" alt="">
</div>
<div class="column">
  <h3>{series.name}</h3>
  <div>Type: {series.type}</div>
  <div>Rating: {series.rating.average}</div>
  <div>
    Summary:
    <div>{@html series.summary}</div>
  </div>
  <button on:click={deleteSeries}>Delete</button>
</div>
<div class="row">
<table>
  <tbody>
    {#each episodes as episode}
    <tr>
      <td>{episode.seriesAndNumber}</td>
      <td>{episode.name}</td>
      <td>{episode.airdate}</td>
      <td>{@html episode.summary}</td>
      <td><input type="checkbox" on:click={() => clicked(episode)} bind:checked={episode.checked} /></td>
    </tr>
    {/each}
  </tbody>
</table>
</div>
</div>

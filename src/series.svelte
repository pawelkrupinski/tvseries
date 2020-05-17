<script context="module">
  import { MiniDb } from '@pawelkrupinski/mini-db';

  const seriesDb = new MiniDb()
  seriesDb.store('series')

  export class SeriesService {
    findAll() {
      return seriesDb.get()
    }

    byId(id) {
      return seriesDb.select({ id: id }).get()
    }

    add(series) {
      seriesDb.insert(series)
    }

    delete(id) {
      seriesDb.select({ id: id }).delete()
    }

    updateLastWatched(series) {
      seriesDb.select({ id: series.id }).update({ lastWatched: series.lastWatched })
    }

    removeDuplicates() {
      const allSeries = seriesDb.get()
      allSeries.forEach(series => {
        seriesDb({ id: series.id }).start(2).remove()  
      });  
    }
  }
</script>

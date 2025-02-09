<script lang="ts">
  let count: number = 0;
</script>

<button class="px-4 py-2 bg-green-500 text-white rounded" on:click={() => count++}>
  Clicks: {count}
</button>

<button class="btn btn-primary" on:click={() => count++}>
  Clicks: {count}
</button>
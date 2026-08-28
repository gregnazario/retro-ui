<script lang="ts">
  let { color, title }: { color: string; title?: string } = $props();
</script>

<span class="retro-swatch" title={title ?? color} style={`background: ${color}`}></span>

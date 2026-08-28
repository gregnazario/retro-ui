<script lang="ts">
  let { value, label }: { value: number; label?: string } = $props();

  const clamped = $derived(Math.max(0, Math.min(100, value)));
</script>

<div
  class="retro-progress"
  role="progressbar"
  aria-valuenow={clamped}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={label}
>
  <div class="retro-progress-bar" style={`width: ${clamped}%`}></div>
</div>

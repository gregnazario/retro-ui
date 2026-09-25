<script lang="ts">
  let {
    label,
    checked,
    disabled = false,
    onChange,
  }: {
    label?: string;
    checked: boolean;
    disabled?: boolean;
    onChange?: (next: boolean) => void;
  } = $props();
</script>

<label class="retro-toggle">
  <button
    type="button"
    role="switch"
    class="retro-toggle-track"
    aria-checked={checked}
    aria-label={label}
    {disabled}
    onclick={() => onChange?.(!checked)}
  >
    <span class="retro-toggle-thumb"></span>
  </button>
  {#if label}<span>{label}</span>{/if}
</label>

<script lang="ts">
	import './styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Capsule — say it now, read it later</title>
</svelte:head>

{@render children?.()}

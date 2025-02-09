<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200">
	{@render children()}
</div>

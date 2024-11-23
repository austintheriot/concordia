<script>
  export let data;
  const { post } = data;
</script>

<article>
  <h1>{post.slug}</h1>
  {@html post.html}
</article>

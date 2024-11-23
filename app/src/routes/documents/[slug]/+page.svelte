<script>
  export let data;
  const { posts } = data;
</script>

<div class="blog-list">
  {#each posts as post}
    <article>
      <h2>{post.slug}</h2>
      {@html post.html}
    </article>
  {/each}
</div>

<style>
  .blog-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  article {
    margin-bottom: 40px;
  }
</style>

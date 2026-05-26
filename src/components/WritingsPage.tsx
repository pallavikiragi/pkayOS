export function WritingsPage() {
  const posts = [
    { title: 'The Future of Interaction', date: '24.05.2024', summary: 'How generative systems are changing the way we perceive software metaphors.' },
    { title: 'Brutalism in UI', date: '12.03.2024', summary: 'A study on high-contrast, grid-aligned interface systems.' },
  ];

  return (
    <div className="writings-page">
      {posts.map((post) => (
        <article key={post.title} className="blog-post">
          <header className="blog-post__header">
            <span className="blog-post__date">{post.date}</span>
            <h3 className="blog-post__title">{post.title.toUpperCase()}</h3>
          </header>
          <p className="blog-post__summary">{post.summary}</p>
          <button className="blog-post__read">[ READ_MORE ]</button>
        </article>
      ))}
    </div>
  );
}

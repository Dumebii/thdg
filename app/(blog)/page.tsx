import { client } from '@/sanity/lib/client';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-16">
        <h1 className="text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
          Engineering Insights
        </h1>
        <p className="text-xl text-slate-600">Deep dives into full-stack architecture.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

{posts.map((post: any) => (
  <Link key={post._id} href={`/post/${post.slug}`} className="group flex flex-col">
    <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg bg-gray-100">
      {/* SAFETY CHECK: 
         Only attempt to render Image if post.image exists. 
         This prevents the "src" error.
      */}
      {post.image ? (
        <Image
          src={urlFor(post.image).width(800).url()}
          alt={post.title || "Blog Post"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        /* Optional: Fallback for posts without images */
        <div className="flex h-full items-center justify-center text-gray-400">
          <span className="text-sm">No Image Available</span>
        </div>
      )}
    </div>
    <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
      {post.title}
    </h2>
    <div className="mt-2 flex items-center text-sm text-slate-500">
      <span>{post.authorName || "Anonymous"}</span>
      <span className="mx-2">•</span>
      <span>
        {post.publishedAt 
          ? new Date(post.publishedAt).toLocaleDateString() 
          : "Draft"}
      </span>
    </div>
  </Link>
))}
      </div>
    </main>
  );
}
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { POST_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { RichText } from '@/sanity/lib/RichText';

// Define the Props type for Next.js 16 (params is a Promise)
type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * 1. Dynamic SEO (Metadata)
 * Fetches the specific post data to populate meta tags for Social Media sharing.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // Await the params
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const ogImage = post.image
    ? urlFor(post.image).width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: `Read full article: ${post.title} by ${post.author?.name || 'the team'}.`,
    openGraph: {
      title: post.title,
      description: `Read full article: ${post.title}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'Anonymous'],
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
}

/**
 * 2. The Page Component
 * Renders the article content with proper typography and layout.
 */
export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Article Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-center space-x-4 text-slate-600">
          {post.author?.image && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200">
              <Image
                src={urlFor(post.author.image).width(100).height(100).url()}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="text-left">
            <p className="font-semibold text-slate-900">{post.author?.name || 'Unknown Author'}</p>
            <p className="text-sm">
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {post.image && (
        <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={urlFor(post.image).width(1200).height(675).url()}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
      )}

      {/* Rich Text Body */}
      {/* We wrap the content in a div with explicit typography styles 
         since we aren't using the @tailwindcss/typography plugin yet.
      */}
      <div className="prose max-w-none text-lg text-slate-800 leading-relaxed">
        <RichText content={post.body} />
      </div>
    </article>
  );
}
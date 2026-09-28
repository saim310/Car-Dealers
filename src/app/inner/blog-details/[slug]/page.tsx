import { getBlogBySlugServer } from "@/lib/supabase/blogs.server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BlogSideBar from "@/sections/blog/BlogSideBar";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlugServer(decodeURIComponent(slug));
  if (!blog) return { title: "Blog Not Found" };
  
  return {
    title: blog.seo_title || blog.title,
    description: blog.meta_description || "",
    alternates: {
      canonical: `https://ukajapan.com.au/inner/blog-details/${slug}`,
    },
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.meta_description || "",
      images: [blog.image],
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlugServer(decodeURIComponent(slug));

  if (!blog) return notFound();

  // JSON-LD Schema Object
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://ukajapan.com.au/inner/blog-details/daihatsu-hijet-for-sale-japanese#article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://ukajapan.com.au/inner/blog-details/daihatsu-hijet-for-sale-japanese"
        },
        "headline": "Daihatsu Hijet for Sale in Australia: Find the Right Japanese Mini Truck",
        "description": "If you are searching for a Daihatsu Hijet for sale, explore this guide to Japanese mini trucks, vans, specifications, buying considerations and availability in Australia.",
        "image": "https://dmkjmgalpsqnaywvnxsy.supabase.co/storage/v1/object/public/blog-images/1788581390429-4u4x9x8iw38.png",
        "author": {
          "@type": "Person",
          "name": "Admin"
        },
        "publisher": {
          "@type": "Organization",
          "name": "UKA Japan Motors",
          "url": "https://ukajapan.com.au/"
        },
        "datePublished": "2026-09-05",
        "dateModified": "2026-09-05",
        "inLanguage": "en-AU",
        "keywords": [
          "Daihatsu Hijet for Sale",
          "Daihatsu Hijet Australia",
          "Japanese Mini Trucks Australia",
          "Japanese Used Cars Australia"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://ukajapan.com.au/inner/blog-details/daihatsu-hijet-for-sale-japanese#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is the Daihatsu Hijet available in Australia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Daihatsu Hijet vehicles can be available in Australia through the Japanese import market. Availability varies according to model, year, specification and stock."
            }
          },
          {
            "@type": "Question",
            "name": "Is the Daihatsu Hijet a good mini truck?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Hijet can be a practical option for buyers who need a compact commercial vehicle. Its suitability depends on the vehicle's condition, configuration and intended use."
            }
          },
          {
            "@type": "Question",
            "name": "Can I buy a Daihatsu Hijet in Australia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Japanese-import dealerships and specialist importers may have Daihatsu Hijet vehicles available. Buyers should check registration, compliance and import requirements for their state or territory."
            }
          },
          {
            "@type": "Question",
            "name": "Is the Daihatsu Hijet available as a van?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The Hijet has been produced in different configurations, including van and mini truck versions. Availability depends on the specific generation and imported stock."
            }
          },
          {
            "@type": "Question",
            "name": "What should I check before buying a Daihatsu Hijet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Check the engine, transmission, suspension, brakes, tyres, body, service history and import documentation. It is also important to confirm compliance and registration requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I find a Daihatsu Hijet for sale?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can check Japanese-import dealerships and specialist used-car dealers for current Daihatsu Hijet stock. Always compare the vehicle's specifications, condition, history and price before purchasing."
            }
          },
          {
            "@type": "Question",
            "name": "What is a Daihatsu Hijet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Daihatsu Hijet is a compact Japanese commercial vehicle available in mini truck and van configurations. It is designed for practical transportation, small businesses and work-related use."
            }
          },
          {
            "@type": "Question",
            "name": "Is the Daihatsu Hijet available for sale in Australia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Daihatsu Hijet models can be available through Japanese import dealers and specialist used-car dealerships in Australia. Availability depends on current stock, model year and specifications."
            }
          },
          {
            "@type": "Question",
            "name": "Is the Daihatsu Hijet good for business use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Its compact size and practical cargo area can make it suitable for small deliveries, gardening, landscaping, maintenance and other business applications."
            }
          },
          {
            "@type": "Question",
            "name": "Is the Daihatsu Hijet a mini truck?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Some Daihatsu Hijet models are mini trucks with an open cargo tray. Other versions are vans with enclosed cargo space, so buyers can choose a configuration based on their requirements."
            }
          },
          {
            "@type": "Question",
            "name": "What should I check when buying a Daihatsu Hijet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Check the engine, transmission, brakes, suspension, tyres, body condition, service history, kilometres and import documentation. You should also confirm applicable registration and compliance requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Are Daihatsu Hijet vehicles economical?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Hijet's compact design and small-engine configuration can make it an attractive option for buyers looking for a practical vehicle with potentially lower running costs than a larger commercial vehicle."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use a Daihatsu Hijet for daily driving?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It can be suitable for daily driving depending on the model, condition and intended use. Buyers should consider factors such as travel distance, road conditions, passenger requirements and cargo needs."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I find a Daihatsu Hijet for sale?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can search Japanese import dealerships and specialist used-car dealers for available Daihatsu Hijet models. Always compare condition, specifications, history and pricing before purchasing."
            }
          },
          {
            "@type": "Question",
            "name": "Are Daihatsu Hijet parts available in Australia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Parts availability depends on the specific Hijet generation and component required. Before purchasing an imported model, it is worth checking parts and servicing options for your particular vehicle."
            }
          },
          {
            "@type": "Question",
            "name": "Is the Daihatsu Hijet available with 4WD?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Some Daihatsu Hijet variants have been offered with four-wheel drive. Availability depends on the model year and specific Japanese-market configuration."
            }
          },
          {
            "@type": "Question",
            "name": "Can I buy a used Daihatsu Hijet in Australia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Used Daihatsu Hijet vehicles may be available through Japanese importers and specialist dealerships. Vehicle availability changes regularly depending on imported stock."
            }
          },
          {
            "@type": "Question",
            "name": "Why choose a Japanese imported Daihatsu Hijet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Japanese imported Hijet can offer a compact and practical alternative to larger commercial vehicles. It may be particularly useful for buyers who need a small vehicle for work, deliveries or transporting equipment."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Schema Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="blog-details">
        <div className="container">
          <nav aria-label="breadcrumb" style={{ padding: "20px 0" }}>
            <Link href="/">Home</Link> / <Link href="/inner/blog">Blog</Link> / <span>{blog.title}</span>
          </nav>
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="blog-details__left">
                <div className="blog-details__img">
                  <Image src={blog.image} width={850} height={509} alt={blog.image_alt || blog.title} priority />
                  <div className="blog-details__date"><p>{blog.day}<br />{blog.month}</p></div>
                </div>
                <div className="blog-details__content">
                  <p><span className="icon-user"></span>By {blog.author}</p>
                  <h1 style={{ fontSize: "32px", fontWeight: 700, margin: "20px 0" }}>{blog.title}</h1>
                  <div
                    style={{
                      lineHeight: 1.8,
                      color: "#475569",
                      fontSize: "16px",
                      maxWidth: "100%",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                      overflow: "hidden",
                    }}
                  >
                    {blog.content ? (
                      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    ) : blog.content_blocks ? (
                      blog.content_blocks.map((block: any, idx: number) => {
                        if (block.type === "paragraph") return <p key={idx}>{block.text}</p>;
                        if (block.type === "heading") return <h3 key={idx}>{block.text}</h3>;
                        if (block.type === "quote") return <blockquote key={idx}>&ldquo;{block.text}&rdquo; — {block.author}</blockquote>;
                        return null;
                      })
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <BlogSideBar mainWrapper="col-xl-4 col-lg-5" wrapper="sidebar" />
          </div>
        </div>
      </section>
    </>
  );
}

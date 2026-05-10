import { Head } from "@inertiajs/react";

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
};

const siteName = "Green Star Island Tour & Safari";

const absoluteUrl = (value?: string) => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}${value.startsWith("/") ? value : `/${value}`}`;
};

export const SEO = ({ title, description, path, image = "/favicon.png", noindex = false, schema }: SEOProps) => {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const canonical = absoluteUrl(path || (typeof window !== "undefined" ? window.location.pathname : "/"));
  const ogImage = absoluteUrl(image);

  return (
    <Head title={fullTitle}>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
      {schema
        ? (Array.isArray(schema) ? schema : [schema]).map((item, index) => (
            <script
              key={`schema-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
            />
          ))
        : null}
    </Head>
  );
};

export const siteUrl = (path = "/") => absoluteUrl(path) || path;
export const siteImage = (image = "/favicon.png") => absoluteUrl(image) || image;

import { Helmet } from 'react-helmet';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
}

export function SEO({
    title = 'Frontend Web Developer | React & Tailwind CSS Expert',
    description = 'Hire a skilled frontend web developer specializing in React, Tailwind CSS, and responsive web design. Creating modern, high-performance websites that drive results.',
    keywords = 'frontend web developer, freelance website developer, responsive web design, HTML CSS JavaScript expert, hire frontend developer, React developer, Tailwind CSS, modern web design, custom website development, responsive websites',
    image = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    url = 'https://devportfolio.com',
    type = 'website',
}: SEOProps) {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Additional Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <meta name="author" content="Frontend Web Developer" />

            {/* Favicon */}
            <link rel="icon" href="/Mr-RockeY-logo.ico" />
        </Helmet>
    );
}

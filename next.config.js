/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for Vercel deployment
  // output: 'export',
  trailingSlash: false,
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  async redirects() {
    // Send root to login page so users land on login by default
    return [
      { source: '/', destination: '/login', permanent: false },
    ]
  },
  async rewrites() {
    // Map pretty routes to static HTML in `public/` to avoid 404s
    return [
      { source: '/login', destination: '/login.html' },
      { source: '/login-new', destination: '/login-new.html' },
      { source: '/dashboard', destination: '/dashboard.html' },
      { source: '/dashboard-simple', destination: '/dashboard-simple.html' },
      { source: '/profile', destination: '/profile.html' },
      { source: '/courses', destination: '/courses.html' },
      { source: '/idp', destination: '/idp.html' },
      { source: '/employee-idp-generator', destination: '/employee-idp-generator.html' },
      { source: '/hr-idp-generator', destination: '/hr-idp-generator.html' },
      { source: '/manager-idp', destination: '/manager-idp.html' },
      { source: '/manager-idp-generator', destination: '/manager-idp-generator.html' },
      { source: '/manager-dashboard', destination: '/manager-dashboard.html' },
      { source: '/manager-development', destination: '/manager-development.html' },
      { source: '/manager-analytics', destination: '/manager-analytics.html' },
      { source: '/hr-dashboard', destination: '/hr-dashboard.html' },
      { source: '/hr-learning', destination: '/hr-learning.html' },
      { source: '/hr-analytics', destination: '/hr-analytics.html' },
      { source: '/hr-compliance', destination: '/hr-compliance.html' },
      { source: '/hr-employees', destination: '/hr-employees.html' },
      { source: '/intelligent-idp', destination: '/intelligent-idp.html' },
      { source: '/career-games', destination: '/career-games.html' },
      { source: '/career-maze-simple', destination: '/career-maze-simple.html' },
      { source: '/career-maze-pro', destination: '/career-maze-pro.html' },
      { source: '/best-career-maze', destination: '/best-career-maze.html' },
      { source: '/wellness', destination: '/wellness.html' },
      { source: '/wellness_working', destination: '/wellness_working.html' },
      { source: '/wellness_backup', destination: '/wellness_backup.html' },
      { source: '/focus', destination: '/focus.html' },
      { source: '/analytics', destination: '/analytics.html' },
      // Keep these last as a catch-all for direct .html access if needed
      { source: '/:slug', destination: '/:slug.html' },
    ]
  }
}

module.exports = nextConfig
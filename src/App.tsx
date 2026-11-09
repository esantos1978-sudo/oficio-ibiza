import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { categories } from '@/data/categories'
import { BlogPage } from '@/pages/BlogPage'
import { BlogPostPage } from '@/pages/BlogPostPage'
import { CategoryPage } from '@/pages/CategoryPage'
import { FontaneriaPage } from '@/pages/FontaneriaPage'
import { ForProfessionalsPage } from '@/pages/ForProfessionalsPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfessionalPage } from '@/pages/ProfessionalPage'

function LegacyFontaneriaRedirect() {
  const location = useLocation()
  return <Navigate to={`/servicios/fontaneria${location.search}`} replace />
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/fontaneros-ibiza" element={<LegacyFontaneriaRedirect />} />
        <Route path="/servicios/fontaneria" element={<FontaneriaPage />} />
        {categories
          .filter((category) => category.slug !== 'fontaneros')
          .map((category) => (
            <Route
              key={category.slug}
              path={category.path}
              element={<CategoryPage key={category.slug} category={category} />}
            />
          ))}
        <Route path="/profesional/:slug" element={<ProfessionalPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/profesionales" element={<ForProfessionalsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

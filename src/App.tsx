import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { categories } from '@/data/categories'
import { CategoryPage } from '@/pages/CategoryPage'
import { ForProfessionalsPage } from '@/pages/ForProfessionalsPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfessionalPage } from '@/pages/ProfessionalPage'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {categories.map((category) => (
          <Route
            key={category.slug}
            path={category.path}
            element={<CategoryPage key={category.slug} category={category} />}
          />
        ))}
        <Route path="/profesional/:slug" element={<ProfessionalPage />} />
        <Route path="/profesionales" element={<ForProfessionalsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

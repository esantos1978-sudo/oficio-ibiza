import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Layout } from '@/components/layout/Layout'
import { AuthProvider } from '@/context/AuthContext'
import { categories } from '@/data/categories'
import { AdminProfessionalFormPage } from '@/pages/admin/AdminProfessionalFormPage'
import { AdminProfessionalsPage } from '@/pages/admin/AdminProfessionalsPage'
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage'
import { BlogPage } from '@/pages/BlogPage'
import { BlogPostPage } from '@/pages/BlogPostPage'
import { CategoryPage } from '@/pages/CategoryPage'
import { FontaneriaPage } from '@/pages/FontaneriaPage'
import { ForProfessionalsPage } from '@/pages/ForProfessionalsPage'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfessionalPage } from '@/pages/ProfessionalPage'

function LegacyFontaneriaRedirect() {
  const location = useLocation()
  return <Navigate to={`/servicios/fontaneria${location.search}`} replace />
}

export function App() {
  return (
    <AuthProvider>
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

        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminProfessionalsPage mode="dashboard" />} />
            <Route
              path="profesionales"
              element={<AdminProfessionalsPage mode="list" />}
            />
            <Route
              path="profesionales/nuevo"
              element={<AdminProfessionalFormPage />}
            />
            <Route
              path="profesionales/:id/editar"
              element={<AdminProfessionalFormPage />}
            />
            <Route path="ajustes" element={<AdminSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

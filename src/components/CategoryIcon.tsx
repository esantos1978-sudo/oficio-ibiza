import {
  Droplets,
  Hammer,
  Leaf,
  Sparkles,
  Waves,
  Zap,
  type LucideProps,
} from 'lucide-react'
import type { CategoryIcon as CategoryIconName } from '@/data/categories'

const icons = {
  droplets: Droplets,
  zap: Zap,
  waves: Waves,
  leaf: Leaf,
  sparkles: Sparkles,
  hammer: Hammer,
} satisfies Record<CategoryIconName, React.ComponentType<LucideProps>>

interface CategoryIconProps extends LucideProps {
  name: CategoryIconName
}

export function CategoryIcon({ name, ...props }: CategoryIconProps) {
  const Icon = icons[name]
  return <Icon {...props} aria-hidden="true" />
}

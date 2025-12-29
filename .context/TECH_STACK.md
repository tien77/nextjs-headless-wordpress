# Tech Stack & Dependencies

## Frontend Framework
- **Core**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5.x

## Styling & UI
- **CSS Engine**: Tailwind CSS v4 (Alpha/Beta version via `@tailwindcss/postcss`) - *Lưu ý: Cấu hình CSS-first, khác với v3.*
- **Component Primitives**: Radix UI (`@radix-ui/react-separator`, `@radix-ui/react-slot`)
- **Icons**: Lucide React
- **Utils**: `clsx`, `tailwind-merge`, `class-variance-authority` (CVA)
- **Typography**: `@tailwindcss/typography` (cho nội dung bài viết WordPress)

## Backend & Data
- **CMS**: WordPress (Headless Mode)
- **API**: GraphQL (WPGraphQL)
- **Client**: Native Fetch API (đã được bọc trong `wordpressApi.ts`)
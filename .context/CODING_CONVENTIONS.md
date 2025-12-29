# Coding Standards & Best Practices

## 1. Next.js & React 19
- **Server Components**: Ưu tiên sử dụng React Server Components (RSC) cho việc fetch data.
- **Client Components**: Chỉ sử dụng `'use client'` khi cần tương tác (state, hooks, event listeners).
- **Data Fetching**: 
  - KHÔNG sử dụng `useEffect` để fetch data.
  - Gọi trực tiếp các hàm từ `@/lib/wordpressApi` trong Server Components.
- **Async/Await**: React 19 hỗ trợ `use` hook, nhưng ưu tiên `async/await` trong Server Components.

## 2. Styling (Tailwind v4)
- Sử dụng utility classes trực tiếp.
- Kết hợp class động bằng hàm `cn()` (sử dụng `clsx` và `tailwind-merge`).
- Ví dụ: `className={cn("text-lg font-bold", className)}`.
- Sử dụng `prose` (Tailwind Typography) để render nội dung HTML từ WordPress (`content`).

## 3. WordPress Data Handling
- **Structure**: Dữ liệu trả về từ WPGraphQL thường lồng nhau (`edges` -> `node`).
- **Abstraction**: Luôn sử dụng các hàm helper trong `lib/wordpressApi.ts` để lấy dữ liệu sạch (đã loại bỏ bớt lớp nesting nếu có thể), không gọi `fetchAPI` trực tiếp trong component.
- **Images**: Sử dụng `next/image`. Luôn lấy `sourceUrl` và `altText` từ `featuredImage.node`.

## 4. TypeScript
- Định nghĩa interface rõ ràng cho các Node (Post, Category, Tag).
- Không dùng `any`, tận dụng Type Inference.
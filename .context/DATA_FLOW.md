# Data Flow & API Architecture

## API Configuration
- **Source**: `lib/wordpressApi.ts`
- **Endpoint**: Biến môi trường `WORDPRESS_API_URL`
- **Method**: POST request tới GraphQL endpoint.
- **Caching**: 
  - Mặc định `revalidate: 60` (ISR - Incremental Static Regeneration) cho danh sách bài viết.
  - Dữ liệu được cache ở phía Next.js Data Cache.

## Available Data Getters
Agent hãy sử dụng các hàm có sẵn sau đây thay vì viết query mới trừ khi được yêu cầu:

1. `getAllPosts()`: Lấy 20 bài viết mới nhất (có phân trang, sort theo DATE DESC).
2. `getPostBySlug(slug)`: Lấy chi tiết bài viết, tác giả, category.
3. `getPostsByCategory(categorySlug)`: Lấy bài theo danh mục.
4. `getPostsByTag(tagSlug)`: Lấy bài theo thẻ.
5. `getPostsBySearch(searchTerm)`: Tìm kiếm bài viết.
6. `getAllCategories()` & `getAllTags()`: Lấy danh sách taxonomy (chỉ lấy non-empty).

## Query Structure
- Các query hiện tại đang lấy các trường: `title`, `excerpt`, `slug`, `date`, `featuredImage`, `author`, `categories`.
- Nếu cần thêm trường (ví dụ: `content` cho trang chi tiết), hãy kiểm tra hàm `getPostBySlug` đã include chưa.
import BlogForm from '@/components/admin/BlogForm';
import AdminGuard from '@/components/admin/AdminGuard';

function AddBlogContent() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 0 60px 0' }}>
      <div className="container">
        <BlogForm />
      </div>
    </div>
  );
}

export default function AddBlogPage() {
  return (
    <AdminGuard>
      <AddBlogContent />
    </AdminGuard>
  );
}
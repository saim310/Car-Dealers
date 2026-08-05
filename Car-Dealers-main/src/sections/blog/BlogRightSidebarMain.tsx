import React from 'react'; 
import BlogSideBar from './BlogSideBar';
import BlogContent from './BlogContent';
const BlogRightSidebarMain: React.FC = () => {

    return (
        <section className="blog-right-sidebar">
            <div className="container">
                <div className="row">
                    <BlogContent />
                    <BlogSideBar mainWrapper='col-xl-4' wrapper='sidebar sidebar--two' />
                </div>
            </div>
        </section>
    );
};
export default BlogRightSidebarMain;
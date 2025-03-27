
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-light pt-16">
      <div className="page-container text-center py-16">
        <div className="max-w-lg mx-auto">
          <div className="text-gold text-8xl font-serif mb-4 animate-float">404</div>
          <h1 className="text-3xl font-serif mb-6">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We can't seem to find the page you're looking for. The page may have been moved, deleted, or never existed.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              to="/"
              className="px-8 py-3 bg-gold hover:bg-gold-dark text-white rounded-md transition-all text-sm font-medium"
            >
              Return to Home
            </Link>
            <Link
              to="/listings"
              className="px-8 py-3 bg-white hover:bg-stone-light text-foreground border border-border rounded-md transition-all text-sm font-medium"
            >
              Browse Accommodations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

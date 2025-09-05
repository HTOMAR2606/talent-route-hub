import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <a 
          href="/" 
          className={cn(
            "inline-flex items-center px-4 py-2 rounded-md",
            "bg-primary text-primary-foreground hover:bg-primary-hover",
            "transition-smooth font-medium"
          )}
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

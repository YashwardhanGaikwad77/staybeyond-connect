
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AuthNavItems = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <Link to="/auth" className="text-sm font-medium text-foreground hover:text-gold transition-colors">
        Log In / Sign Up
      </Link>
    );
  }

  return (
    <div className="dropdown-trigger relative group z-10">
      <button className="text-sm font-medium text-foreground hover:text-gold transition-colors">
        My Account
      </button>
      
      <div className="absolute right-0 transform translate-y-2 w-64 p-3 mt-1 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 border border-border">
        <div className="pb-2 mb-2 border-b border-border">
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <p className="font-medium truncate">{user.email}</p>
        </div>
        
        <ul className="space-y-1">
          <li>
            <Link
              to="/profile"
              className="block px-3 py-2 text-sm rounded-md hover:bg-stone-light transition-colors"
            >
              Profile Settings
            </Link>
          </li>
          <li>
            <Link
              to="/bookings"
              className="block px-3 py-2 text-sm rounded-md hover:bg-stone-light transition-colors"
            >
              Your Stay Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/transport-bookings"
              className="block px-3 py-2 text-sm rounded-md hover:bg-stone-light transition-colors"
            >
              Your Transport Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/my-listings"
              className="block px-3 py-2 text-sm rounded-md hover:bg-stone-light transition-colors"
            >
              Your Listings
            </Link>
          </li>
          <li>
            <button
              onClick={signOut}
              className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-stone-light transition-colors text-red-600"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthNavItems;

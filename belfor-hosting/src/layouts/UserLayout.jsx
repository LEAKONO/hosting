// src/layouts/UserLayout.jsx
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="user-layout">
      {/* User dashboard layout (sidebar, header, etc. will go here later) */}
      <Outlet />
    </div>
  );
}

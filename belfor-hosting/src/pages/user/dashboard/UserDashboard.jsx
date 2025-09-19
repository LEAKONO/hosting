import Overview from './Overview';
import QuickActions from './QuickActions';
import Services from './Services';

export default function UserDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <Overview />
      <QuickActions />
      <Services />
    </div>
  );
}

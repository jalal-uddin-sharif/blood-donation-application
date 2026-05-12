const content = {
  reports: {
    title: "Reports",
    text: "Review donation status, user role, and blood group demand charts from the dashboard overview.",
  },
  categories: {
    title: "Categories",
    text: "Blood request categories are organized by the eight supported blood groups and searchable request metadata.",
  },
  settings: {
    title: "Settings",
    text: "Operational settings are managed through environment variables, CORS origins, and role-based permissions.",
  },
};

const DashboardInfoPage = ({ type }) => {
  const page = content[type] || content.reports;

  return (
    <section className="page-shell">
      <div className="brand-section p-6 sm:p-8">
        <p className="section-kicker">Dashboard</p>
        <h1 className="section-title mt-2">{page.title}</h1>
        <p className="section-copy">{page.text}</p>
      </div>
    </section>
  );
};

export default DashboardInfoPage;

const copy = {
  privacy: {
    title: "Privacy Policy",
    items: [
      "RedLove stores account details, donor location, blood group, donation requests, and contact messages only for platform operations.",
      "Authentication is protected by Firebase and API access is controlled by JWT authorization.",
      "Admins can manage operational records, but public pages expose only request details needed for donor coordination.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    items: [
      "Users must provide accurate donor and request information so urgent blood coordination remains reliable.",
      "Admins may block accounts, change request status, or remove content that harms platform safety.",
      "Donors should confirm availability before accepting a request and follow hospital or medical guidance.",
    ],
  },
};

const LegalPage = ({ type }) => {
  const page = copy[type] || copy.privacy;

  return (
    <section className="page-shell min-h">
      <div className="brand-section p-6 sm:p-8 lg:p-10">
        <p className="section-kicker">RedLove policy</p>
        <h1 className="section-title mt-2">{page.title}</h1>
        <div className="mt-8 grid gap-4">
          {page.items.map((item, index) => (
            <article key={item} className="rounded-2xl border border-rose-100 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm font-black uppercase text-pink-600">Section {index + 1}</p>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegalPage;

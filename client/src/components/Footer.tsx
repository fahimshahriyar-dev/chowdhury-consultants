import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#FEFEFE] px-4 md:px-12 pt-2 pb-4 md:pb-6">
      <div className="w-full bg-[#F5F5F7] rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[320px]">
        {/* Top & Middle Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Top Left Logo */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-black uppercase">
                Chowdhury Consultants
              </span>
            </Link>
            <p className="mt-3 text-xs md:text-sm text-zinc-600 leading-relaxed max-w-xs">
              Trusted tax, legal & corporate advisory services. Building long-term
              trust with clients across Bangladesh and beyond for over 25 years.
            </p>
          </div>

          {/* Quick Links Sections in Middle/Right */}
          <div className="md:col-span-8 flex flex-wrap justify-end gap-10 lg:gap-16">
            {/* 1. COMPANY */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-wider text-black uppercase mb-1">
                COMPANY
              </h3>
              <Link
                to="/about"
                className="text-xs md:text-sm text-zinc-600 hover:text-black transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/team"
                className="text-xs md:text-sm text-zinc-600 hover:text-black transition-colors"
              >
                Our Team
              </Link>
              <Link
                to="/clients"
                className="text-xs md:text-sm text-zinc-600 hover:text-black transition-colors"
              >
                Our Clients
              </Link>
            </div>

            {/* 2. LEGAL */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-wider text-black uppercase mb-1">
                LEGAL
              </h3>
              <Link
                to="/terms"
                className="text-xs md:text-sm text-zinc-600 hover:text-black transition-colors"
              >
                Terms and conditions
              </Link>
              <Link
                to="/privacy"
                className="text-xs md:text-sm text-zinc-600 hover:text-black transition-colors"
              >
                Privacy policy
              </Link>
            </div>

            {/* 3. CONTACT US */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-wider text-black uppercase mb-1">
                CONTACT US
              </h3>
              <div className="flex flex-col gap-1 text-xs md:text-sm text-zinc-600">
                <a
                  href="mailto:chowdhury_con@yahoo.com"
                  className="hover:text-black transition-colors"
                >
                  chowdhury_con@yahoo.com
                </a>
                <a
                  href="mailto:shahidul.chowdhury7@gmail.com"
                  className="hover:text-black transition-colors"
                >
                  shahidul.chowdhury7@gmail.com
                </a>
              </div>

              <div className="flex flex-col gap-1 text-xs md:text-sm text-zinc-600 mt-2">
                <a href="tel:01711426173" className="hover:text-black transition-colors">
                  01711-426173
                </a>
                <a href="tel:01971426173" className="hover:text-black transition-colors">
                  01971-426173
                </a>
                <a href="tel:01917929066" className="hover:text-black transition-colors">
                  01917-929066
                </a>
                <a href="tel:01911803111" className="hover:text-black transition-colors">
                  0191-1803111
                </a>
              </div>

              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed mt-2">
                Eastern Mansion, Room # 3/7 (3<sup>rd</sup> Floor),
                <br />
                67/9 Pioneer Road, Kakrail, Dhaka-1000
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Left Copyright */}
        <div className="pt-12 mt-8 border-t border-zinc-200/60 flex items-center justify-between text-xs text-zinc-500">
          <p>© 2026 Chowdhury Consultants. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

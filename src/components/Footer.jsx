import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background px-6 pt-20 text-sm text-muted-foreground border-t border-border">
      <div className="">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-foreground text-xl font-semibold">
             <img 
              src="/logo.png" 
              alt="Buildbot Logo" 
              className="h-8 w-auto object-contain"
            />
            </div>

            <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
              Software Development & product development; we're your tech
              partners, crafting modern digital solutions for next-gen
              excellence!
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">

              Buildbot Technologies Private Limited <br />
              4th floor, Lalitha Nivas, Rd Number 2, Veterinary Colony, <br />
              Vijayawada, Andhra Pradesh 520008, India
            </p>


           
          </div>

          {/* Navigation */}
          <div>
            <ul className="space-y-4">
              <li className="flex items-center justify-between border-b border-border pb-2">
                <span><a href="/" className="hover:text-foreground transition">Home</a></span>
                <span>›</span>
              </li>
              <li className="flex items-center justify-between border-b border-border pb-2">
                <span><a href="/#services" className="hover:text-foreground transition">Services</a></span>
                <span>›</span>
              </li>
              <li className="flex items-center justify-between border-b border-border pb-2">
                <span><a href="/#horizontal" className="hover:text-foreground transition">Products</a></span>
                <span>›</span>
              </li>
            
              <li className="flex items-center justify-between border-b border-border pb-2">
                <span><a href="/#insights" className="hover:text-foreground transition">Insights</a></span>
                <span>›</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <ul className="space-y-4">
              {/* <li className="flex items-center justify-between border-b border-border pb-2">
                <span>AI</span>
                <span>›</span>
              </li> */}
              {/* <li className="flex items-center justify-between border-b border-border pb-2">
                <span>MVP</span>
                <span>›</span>
              </li> */}
              {/* <li className="flex items-center justify-between border-b border-border pb-2">
                <span>SaaS</span>
                <span>›</span>
              </li> */}
              {/* <li className="flex items-center justify-between border-b border-border pb-2">
                <span>E-commerce</span>
                <span>›</span>
              </li> */}
                 <li className="flex items-center justify-between border-b border-border pb-2">
                <span><a href="/#leadership" className="hover:text-foreground transition">Leadership</a></span>
                <span>›</span>
              </li>
             <li className="flex items-center justify-between pt-2 font-semibold text-foreground">
                <span> <a href="#careers">Join the Team</a></span>
                <span>›</span>
              </li>
               <li className="flex items-center justify-between pt-2 font-semibold text-accent">
                <span  ><a href="#cta">Work with us</a></span>
                <span>›</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Contact</h4>
               <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/buildbot-technologies-private-limited/"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
             <Linkedin size={16} />
              </a>
             
            </div>
             <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-accent">☎</span>
                <a
                  href="tel:+13153080901"
                  className="hover:text-foreground transition"
                >
                  +91 7416677365

                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-accent">✉</span>
                <a
                  href="mailto:sales@chromezy.com"
                  className="hover:text-foreground transition"
                >
                  info@buildbot.tech
                </a>
              </div>
            </div>

         
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-border" />

        {/* Bottom bar */}
        <div className="flex-1 flex flex-row items-center  justify-center gap-4 py-6 text-xs md:flex-row">
         

         
          <div className="flex items-center gap-4">
             <p>© 2026 Buildbot. All rights reserved.</p>
          </div>
             <div className="flex gap-4 text-xs">
              <a href="#" className="hover:text-foreground transition">
                Terms
              </a>
              <span>|</span>
              <a href="#" className="hover:text-foreground transition">
                Privacy
              </a>
            </div>
        </div>
      </div>
    </footer>
  );
}

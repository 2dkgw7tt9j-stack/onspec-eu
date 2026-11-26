"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_CARDS = [
  {
    index: 0,
    title: "01 Ready Businesses",
    subtitle: "Turnkey commercial business models in Cyprus & EU",
    href: "/businesses",
    image: "/images/perfume-station.jpg",
  },
  {
    index: 1,
    title: "02 AI & Websites",
    subtitle: "Autonomous AI agents & custom web platforms",
    href: "/ai-web",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
  },
  {
    index: 2,
    title: "03 Services We Offer",
    subtitle: "End to end venture engineering & legal network",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  },
];

const PRIMARY_LINKS = [
  { label: "Ready Businesses", href: "/businesses" },
  { label: "AI & Websites", href: "/ai-web" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// 2-column grid in .c-menu_secondary_list
const SECONDARY_LINKS = [
  { label: "About Onspec", href: "/about" },
  { label: "Ready Businesses", href: "/businesses" },
  { label: "Services Portfolio", href: "/services" },
  { label: "AI & Automation", href: "/ai-web" },
  { label: "Customer Journey", href: "/about#customer-journey" },
  { label: "Direct Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Only the home page has a dark full-bleed image hero where the header is transparent at scrollY=0
  const hasDarkHero = pathname === "/";

  const updateHeaderClipping = useCallback(
    (open: boolean, progress: number) => {
      const el = headerRef.current;
      if (!el) return;

      const headerWidth = el.clientWidth || window.innerWidth - 16;
      const computedCompact =
        parseInt(
          window
            .getComputedStyle(el)
            .getPropertyValue("--header-compact-width") || "1100",
          10
        ) || 1100;

      const isDesktop = window.innerWidth >= 1000;
      const maxClipX = isDesktop
        ? Math.max((headerWidth - computedCompact) / 2, 0)
        : 0;

      // Ease clip X with scroll progress when menu is closed; 0 when menu is open
      const easedClip = 1 - Math.pow(1 - progress, 3);
      const clipX = open ? 0 : Math.round(easedClip * maxClipX);

      // Vertical clip: 72px bar when closed, full header height when menu is open
      const menuHeight = menuRef.current?.scrollHeight || window.innerHeight;
      const clipY = open ? Math.max(el.clientHeight, menuHeight + 50) : 72;

      el.style.setProperty("--clip-x", `${clipX}px`);
      el.style.setProperty("--clip-y", `${clipY}px`);
      el.style.setProperty(
        "--header-scroll-progress",
        open ? "0" : String(easedClip)
      );
    },
    []
  );

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    document.documentElement.classList.remove("has-menu-open");
  }, [pathname]);

  // Toggle html.has-menu-open and recompute clipping
  useEffect(() => {
    const html = document.documentElement;
    if (menuOpen) {
      html.classList.add("has-menu-open");
    } else {
      html.classList.remove("has-menu-open");
    }
    updateHeaderClipping(menuOpen, scrollProgress);
  }, [menuOpen, scrollProgress, updateHeaderClipping]);

  // Scroll & resize listener matching Lightship's 800px scroll distance
  useEffect(() => {
    const handleScrollAndResize = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const rawProgress = Math.min(Math.max(y / 420, 0), 1);
      setIsScrolled(y > 16);
      setScrollProgress(rawProgress);
      updateHeaderClipping(menuOpen, rawProgress);
    };

    handleScrollAndResize();
    window.addEventListener("scroll", handleScrollAndResize, { passive: true });
    window.addEventListener("resize", handleScrollAndResize);
    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, [menuOpen, updateHeaderClipping]);

  // Escape key closes mega-drawer
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isTransparent = hasDarkHero && !isScrolled && !menuOpen;
  const collapseWordmark = isScrolled && !menuOpen;

  return (
    <div
      ref={headerRef}
      className={`c-header ${isTransparent ? "is-transparent" : ""} ${
        isScrolled ? "is-scrolled" : ""
      }`}
      data-header-transparent={hasDarkHero ? "" : undefined}
      onClick={(e) => {
        // Clicking the dimmed backdrop closes the menu
        if (menuOpen && e.target === headerRef.current) {
          setMenuOpen(false);
        }
      }}
    >
      <header className="c-header_container" data-container>
        <div className="c-header_inner">
          <div className="c-header_bar">
            {/* Far Left: 2-line minimalist hamburger button + Left nav links */}
            <div className="c-header_left">
              <button
                type="button"
                className="c-header_menu cursor-pointer"
                data-menu-toggler
                aria-expanded={menuOpen}
                aria-label="Open / Close menu"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <span className="sr-only">Open / Close menu</span>
                <span className="c-header_menu_icon -open">
                  <span className="c-header_menu_line" />
                  <span className="c-header_menu_line" />
                </span>
                <span className="c-header_menu_icon -close">
                  <span className="c-header_menu_line" />
                  <span className="c-header_menu_line" />
                </span>
              </button>

              <ul className="c-header_nav">
                <li className="c-header_item max-md:hidden">
                  <Link href="/businesses" className="c-header_link hover-parent">
                    <span className="text-sm hover-underline">Businesses</span>
                  </Link>
                </li>
                <li className="c-header_item max-md:hidden">
                  <Link href="/ai-web" className="c-header_link hover-parent">
                    <span className="text-sm hover-underline">AI &amp; Web</span>
                  </Link>
                </li>
                <li className="c-header_item max-md:hidden">
                  <Link href="/services" className="c-header_link hover-parent">
                    <span className="text-sm hover-underline">Services</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Center Logo: ONSPEC wordmark & emblem */}
            <div className="c-header_logo">
              <Link
                href="/"
                className="c-header_logo_link"
                aria-label="ONSPEC Homepage"
              >
                <span className="sr-only">ONSPEC Homepage</span>
                <div
                  className="c-header_logo_lottie flex items-center justify-center transition-all duration-300 py-0.5"
                  data-header-logo
                >
                  <img 
                    src="/onspec_logo_transparent.png" 
                    alt="OnSpec / Engineered to Operate" 
                    className="h-9 sm:h-11 md:h-12 lg:h-[48px] w-auto max-h-[48px] object-contain transition-all duration-300 drop-shadow-sm" 
                  />
                </div>
              </Link>
            </div>

            {/* Right nav links: About + Contact */}
            <div className="c-header_right">
              <ul className="c-header_nav">
                <li className="c-header_item max-md:hidden">
                  <Link href="/about" className="c-header_link hover-parent">
                    <span className="text-sm hover-underline">About</span>
                  </Link>
                </li>
                <li className="c-header_item">
                  <Link href="/contact" className="c-header_link hover-parent">
                    <span className="text-sm font-semibold underline underline-offset-4 decoration-current/70 hover:decoration-black">
                      Contact
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Full-width Lightship Mega-Drawer (.c-menu) */}
          <div
            ref={menuRef}
            className="c-menu"
            data-header-menu
            data-lenis-prevent
          >
            <div
              className="c-menu_inner"
              style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 80px)",
              }}
            >
              {/* Right side on desktop: 4 oversized primary links + 2-column secondary link list */}
              <div className="c-menu_navigations">
                <nav className="c-menu_primary" aria-label="Primary menu">
                  <ul
                    className="c-menu_primary_list"
                    style={
                      {
                        "--extra-delay": "0.1s",
                        "--stagger": "0.07s",
                      } as React.CSSProperties
                    }
                  >
                    {PRIMARY_LINKS.map((item, idx) => (
                      <li
                        key={item.label}
                        className="c-menu_primary_item"
                        style={{ "--index": idx } as React.CSSProperties}
                      >
                        <Link
                          href={item.href}
                          className="c-menu_primary_link hover-parent"
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="c-menu_primary_label hover-underline max-md:text-heading-sm md:text-heading-md">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <nav className="c-menu_secondary" aria-label="Secondary menu">
                  <ul
                    className="c-menu_secondary_list"
                    style={
                      {
                        "--extra-delay": "0.4s",
                        "--stagger": "0.05s",
                      } as React.CSSProperties
                    }
                  >
                    {SECONDARY_LINKS.map((item, idx) => (
                      <li
                        key={item.label}
                        className="c-menu_secondary_item"
                        style={{ "--index": idx } as React.CSSProperties}
                      >
                        <Link
                          href={item.href}
                          className="c-menu_secondary_link text-sm hover-underline"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Left side on desktop: 3 large rounded photo cards */}
              <nav className="c-menu_cards" aria-label="Featured pillars">
                <ul
                  className="c-menu_cards_grid"
                  style={{ "--extra-delay": "0.1s" } as React.CSSProperties}
                >
                  {MENU_CARDS.map((card) => (
                    <li
                      key={card.title}
                      className="c-menu_cards_item group"
                      style={{ "--index": card.index } as React.CSSProperties}
                    >
                      <div className="c-image c-menu_cards_image -cover -overlay -lazy-load is-loaded">
                        <picture className="c-image_inner transition-transform duration-500 group-hover:scale-105">
                          <img
                            className="c-image_img is-loaded"
                            alt={card.title}
                            width={1200}
                            height={1200}
                            src={card.image}
                            loading="lazy"
                          />
                        </picture>
                      </div>
                      <Link
                        href={card.href}
                        className="c-menu_cards_link text-lg font-bold"
                        onClick={() => setMenuOpen(false)}
                      >
                        {card.title}
                      </Link>
                      <span className="text-sm md:text-lg opacity-80">
                        {card.subtitle}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;

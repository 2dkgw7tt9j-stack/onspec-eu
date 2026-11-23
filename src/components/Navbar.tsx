"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_CARDS = [
  {
    index: 0,
    title: "01 Launch Ventures",
    subtitle: "Turnkey commercial business models in Cyprus & EU",
    href: "/launch",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
  },
  {
    index: 1,
    title: "02 AI & Automation",
    subtitle: "Autonomous AI agents, WhatsApp & CRM architecture",
    href: "/automate",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
  },
  {
    index: 2,
    title: "03 Custom Execution",
    subtitle: "Submit your idea for a free preliminary proposal",
    href: "/innovate",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  },
];

const PRIMARY_LINKS = [
  { label: "Launch a Business", href: "/launch" },
  { label: "AI & Automation", href: "/automate" },
  { label: "Legal & Connect", href: "/connect" },
  { label: "Submit Your Idea", href: "/innovate" },
];

// 2-column grid in .c-menu_secondary_list (Col 1: About Onspec, Customer Journey, Cyprus Network | Col 2: Vending Specs, Contact, Proposal Engine)
const SECONDARY_LINKS = [
  { label: "About Onspec", href: "/about" },
  { label: "Vending Specs", href: "/launch#vending-blueprint" },
  { label: "Customer Journey", href: "/about#customer-journey" },
  { label: "Contact", href: "/contact" },
  { label: "Cyprus Network", href: "/connect" },
  { label: "Proposal Engine", href: "/innovate" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Pages that start with a dark full-bleed hero where header is transparent at scrollY=0
  const hasDarkHero =
    pathname === "/" || pathname === "/launch" || pathname === "/automate";

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

      // Vertical clip: 50px bar when closed, full header height when menu is open
      const menuHeight = menuRef.current?.scrollHeight || window.innerHeight;
      const clipY = open ? Math.max(el.clientHeight, menuHeight + 50) : 50;

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
                <li className="c-header_item">
                  <Link href="/launch" className="c-header_link hover-parent">
                    <span className="text-sm hover-underline">Launch</span>
                  </Link>
                </li>
                <li className="c-header_item max-sm:hidden">
                  <Link href="/automate" className="c-header_link hover-parent">
                    <span className="text-sm hover-underline">Automate</span>
                  </Link>
                </li>
                <li className="c-header_item max-sm:hidden">
                  <Link href="/innovate" className="c-header_link hover-parent">
                    <span className="text-sm hover-underline">Specs</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Center Logo: Single twin four-point star SVG emblem + ONSPEC wordmark (collapsing cleanly to 1 twin-star pair on scroll) */}
            <div className="c-header_logo">
              <Link
                href="/"
                className="c-header_logo_link"
                aria-label="ONSPEC Homepage"
              >
                <span className="sr-only">ONSPEC Homepage</span>
                <div
                  className="c-header_logo_lottie flex items-center justify-center transition-all duration-300"
                  style={{ gap: collapseWordmark ? "0px" : "0.625rem" }}
                  data-header-logo
                >
                  <span className="c-icon inline-flex items-center justify-center shrink-0">
                    <svg
                      className="svg-symbol-double"
                      viewBox="0 0 28 13"
                      focusable="false"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="m7.1.4.7 2.3c.4 1.2 1.3 2.2 2.5 2.5l2.3.9c.4.1.4.7 0 .8l-2.3.9c-1.1.4-2.1 1.3-2.5 2.5l-.7 2.3c-.1.4-.7.4-.8 0l-.8-2.3c-.3-1.2-1.3-2.1-2.4-2.5L.8 7c-.4-.1-.4-.7 0-.8l2.3-.8C4.2 4.9 5.2 4 5.5 2.7L6.2.4c.2-.4.8-.4.9 0zm14.6 0c-.1-.4-.7-.4-.8 0l-.7 2.3c-.4 1.2-1.3 2.2-2.5 2.5l-2.3.9c-.4.1-.4.7 0 .8l2.2.8c1.2.4 2.1 1.3 2.5 2.5l.7 2.3c.1.4.7.4.8 0l.7-2.3c.4-1.2 1.3-2.2 2.5-2.5l2.3-.7c.5-.1.5-.7.1-.8l-2.3-.8c-1.2-.4-2.1-1.3-2.5-2.5L21.7.4z"
                      />
                    </svg>
                  </span>
                  <span
                    className="font-bold tracking-[0.18em] text-sm uppercase transition-all duration-300 overflow-hidden whitespace-nowrap"
                    style={{
                      maxWidth: collapseWordmark ? "0px" : "110px",
                      opacity: collapseWordmark ? 0 : 1,
                    }}
                  >
                    ONSPEC
                  </span>
                </div>
              </Link>
            </div>

            {/* Right nav links: Connect + Build yours */}
            <div className="c-header_right">
              <ul className="c-header_nav">
                <li className="c-header_item max-sm:hidden">
                  <Link href="/connect" className="c-header_link hover-parent">
                    <span className="text-sm hover-underline">Connect</span>
                  </Link>
                </li>
                <li className="c-header_item">
                  <Link href="/innovate" className="c-header_link hover-parent">
                    <span className="text-sm underline underline-offset-4 decoration-current/70 hover:decoration-[#27B58A]">
                      Build yours
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

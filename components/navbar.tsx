"use client"

import React from "react"

import { ResponsiveAside } from "@/components/responsive-aside"
import { siteConfig } from "@/resources/config/site"
import { LayoutGroup } from "framer-motion"
import {
  IconBrandAdobe,
  IconBrandGithub,
  IconBrandJustd,
  IconBrandTailwindcss,
  IconBrandX,
  IconChevronLgDown,
  IconColorPalette,
  IconColors,
  IconCube,
  IconDeviceDesktop,
  IconHome,
  IconMoon,
  IconSearch,
  IconSun
} from "justd-icons"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { Collection } from "react-aria-components"
import { Button, buttonStyles, Link, Menu, Separator, useMediaQuery } from "ui"

import { CommandPalette } from "./command-palette"
import { NavLink } from "./nav-item"
import { TakeCurrentUrl } from "./take-current-url"
import { ThemeSwitcher } from "./theme-switcher"

const menuItems = [
  { id: 1, label: "Home", url: "/" },
  { id: 2, label: "Components", url: "/docs/getting-started/introduction" }
]

export function Navbar() {
  const id = React.useId()
  const pathname = usePathname()

  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  return (
    <>
      <CommandPalette setOpen={setOpen} openCmd={open} />
      <LayoutGroup id={`navigation-${id}`}>
        <div className="sticky xnw2 top-0 z-30 hidden overflow-hidden pb-0 lg:block">
          <nav className="border-b bg-bg/95 py-2 backdrop-blur-lg supports-[backdrop-filter]:bg-bg/60">
            <div className="mx-auto max-w-screen-2xl px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-6">
                  <NavbarDropdown />
                  <Separator orientation="vertical" className="h-6" />
                  <Collection items={menuItems}>
                    <NavLink isNextLink isActive={pathname === "/"} href="/">
                      Home
                    </NavLink>
                    <NavLink
                      isNextLink
                      isActive={
                        pathname?.startsWith("/docs") && !pathname?.includes("/docs/components")
                      }
                      href="/docs/getting-started/introduction"
                    >
                      Docs
                    </NavLink>
                    <NavLink
                      isNextLink
                      isActive={
                        pathname?.startsWith("/docs/components") || pathname === "/components"
                      }
                      href="/components"
                    >
                      Components
                    </NavLink>
                    <NavLink isNextLink isActive={pathname === "/colors"} href="/colors">
                      Colors
                    </NavLink>
                    <NavLink isActive={pathname === "/icons"} href="/icons">
                      Icons
                    </NavLink>
                    <NavLink isActive={pathname === "/themes"} href="/themes">
                      Themes
                    </NavLink>
                  </Collection>
                </div>

                <div className="flex items-center gap-x-1">
                  <>
                    <Button
                      onPress={() => setOpen((open: boolean) => !open)}
                      size="small"
                      appearance="outline"
                      className="h-9"
                      aria-label="Open command palette"
                    >
                      <IconSearch />

                      <span className="text-muted-fg">Search..</span>

                      <Menu.Keyboard className="-mr-2" keys="⌘K" />
                    </Button>
                    <TakeCurrentUrl />
                    <ThemeSwitcher />

                    <Separator orientation="vertical" className="h-7 mx-2" />

                    <Link
                      aria-label="Github Repository"
                      className={buttonStyles({
                        appearance: "outline",
                        size: "square-petite",
                        className: "[&_[data-slot=icon]]:text-fg"
                      })}
                      target="_blank"
                      href={siteConfig.repo}
                    >
                      <IconBrandGithub />
                    </Link>
                    <Link
                      aria-label="Follow Update on X"
                      className={buttonStyles({
                        appearance: "outline",
                        size: "square-petite",
                        className: "[&_[data-slot=icon]]:text-fg"
                      })}
                      target="_blank"
                      href="https://x.com/irsyadadl"
                    >
                      <IconBrandX />
                    </Link>
                  </>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </LayoutGroup>
      {!isDesktop && <ResponsiveAside openCmd={open} setOpenCmd={setOpen} />}
    </>
  )
}

export function NavbarDropdown() {
  const { theme, setTheme } = useTheme()
  return (
    <Menu>
      <Button aria-label="Menu." appearance="plain" className="group -ml-1">
        <span className="flex items-center gap-x-2">
          <IconBrandJustd className="-ml-1 size-5" />
          <span className="font-mono text-base tracking-tight sm:text-sm">{siteConfig.name}</span>
          <IconChevronLgDown className="-mr-1 ml-3 size-3.5 text-muted-fg transition duration-300 group-hover:text-fg group-pressed:rotate-180 group-pressed:text-fg" />
          <span className="sr-only">Open menu</span>
        </span>
      </Button>
      <Menu.Content placement="bottom" className="sm:min-w-64">
        <Menu.Item href="/">
          <IconHome />
          Home
        </Menu.Item>
        <Menu.Item href="/components">
          <IconCube />
          Components
        </Menu.Item>
        <Menu.Item href="/colors">
          <IconColors />
          Colors
        </Menu.Item>
        <Menu.Item href="/icons">
          <IconBrandJustd />
          Icons
        </Menu.Item>
        <Menu.Item href="/themes">
          <IconColorPalette />
          Themes
        </Menu.Item>
        <Menu.Section title="Refs">
          <Menu.Item href="https://x.com/intent/follow?screen_name=getjustd" target="_blank">
            <IconBrandX />X / Twitter
          </Menu.Item>
          <Menu.Item href="https://github.com/justdlabs" target="_blank">
            <IconBrandGithub />
            Github
          </Menu.Item>
          <Menu.Item
            href="https://react-spectrum.adobe.com/react-aria/components.html"
            target="_blank"
          >
            <IconBrandAdobe />
            RAC
          </Menu.Item>
          <Menu.Item href="https://tailwindcss.com" target="_blank">
            <IconBrandTailwindcss />
            Tailwind CSS
          </Menu.Item>
        </Menu.Section>
        <Menu.Section title="Preferences">
          <Menu.Submenu>
            <Menu.Item>
              {theme === "system" ? (
                <IconDeviceDesktop />
              ) : theme === "dark" ? (
                <IconMoon />
              ) : (
                <IconSun />
              )}
              <span>Switch Theme</span>
            </Menu.Item>
            <Menu.Content>
              <Menu.Item onAction={() => setTheme("system")}>
                <IconDeviceDesktop />
                <span>System</span>
              </Menu.Item>
              <Menu.Item onAction={() => setTheme("dark")}>
                <IconMoon />
                <span>Dark</span>
              </Menu.Item>
              <Menu.Item onAction={() => setTheme("light")}>
                <IconSun />
                <span>Light</span>
              </Menu.Item>
            </Menu.Content>
          </Menu.Submenu>
        </Menu.Section>
      </Menu.Content>
    </Menu>
  )
}

export interface NavLink {
  href: string;
  label: string;
  /** Shown in the header's desktop nav; every link still shows in the mobile menu and footer. */
  primary?: boolean;
}

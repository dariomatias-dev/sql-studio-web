export interface NavLink {
  href: string;
  /** Key into the "Nav" message namespace. */
  labelKey: string;
  /** Shown in the header's desktop nav; every link still shows in the mobile menu and footer. */
  primary?: boolean;
}

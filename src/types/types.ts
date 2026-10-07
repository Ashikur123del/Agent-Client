

export interface LinkItem {
  title: string;
  href: string;
}

export interface NestedItem {
  title: string;
  href?: string;         
  nestedItems: LinkItem[]; 
}

export type SubItemType = LinkItem | NestedItem;

export interface ServiceItem {
  title: string;
  href?: string;
  subItems?: SubItemType[];
}

export function isNestedItem(sub: SubItemType): sub is NestedItem {
  return "nestedItems" in sub;
}







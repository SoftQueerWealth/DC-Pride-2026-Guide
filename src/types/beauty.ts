export interface BeautyField {
  key: string;
  label: string;
  value: string;
  href?: string;
}

export interface BeautyItem {
  id: string;
  name: string;
  businessType: string;
  fields: BeautyField[];
  primaryHref?: string;
}

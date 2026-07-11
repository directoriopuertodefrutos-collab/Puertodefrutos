export interface Business {
  id: string;
  name: string;
  slug: string;
  category: Category["id"];
  subcategory?: string;
  description: string;
  shortDescription: string;
  story: string;
  image: string;
  images: string[];
  logo?: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  premium: boolean;
  schedule: Schedule;
  contact: Contact;
  location: Location;
  products: Product[];
  tags: string[];
  established?: number;
  social: Social;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  businessCount: number;
}

export interface Schedule {
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
}

export interface DaySchedule {
  open: string;
  close: string;
  closed?: boolean;
}

export interface Contact {
  phone: string;
  email?: string;
  website?: string;
  whatsapp: string;
}

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
  mapUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price?: string;
  image: string;
  category: string;
}

export interface Social {
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  business?: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Statistic {
  value: number;
  suffix?: string;
  label: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export type Theme = "light" | "dark";
export type FilterOption = "all" | "featured" | "premium" | "open";
export type SortOption = "name" | "rating" | "newest";

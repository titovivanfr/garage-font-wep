import {
  ArrowRight,
  Calendar,
  Car,
  Check,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Moon,
  Sun,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-vue-next";

export const appIcons = {
  arrowRight: ArrowRight,
  calendar: Calendar,
  car: Car,
  check: Check,
  creditCard: CreditCard,
  eye: Eye,
  eyeOff: EyeOff,
  lock: Lock,
  mail: Mail,
  moon: Moon,
  sun: Sun,
  user: User,
  wrench: Wrench,
} as const satisfies Record<string, LucideIcon>;

export type AppIconName = keyof typeof appIcons;

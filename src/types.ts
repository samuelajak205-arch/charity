export interface UpdateItem {
  id: string;
  timeAgo: string;
  message: string;
  category: 'relief' | 'education' | 'water' | 'milestone';
  photoUrl?: string;
}

export interface DonationOption {
  id: string;
  amount: number;
  title: string;
  description: string;
  illustration: string;
  color: 'emerald' | 'sky' | 'amber';
}

export interface CharityState {
  totalGoal: number;
  totalRaised: number;
  mealsServed: number;
  donorsCount: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  createdAt: string;
  totalDonated: number;
}

export interface DonationRecord {
  id: string;
  amount: number;
  name: string;
  email: string;
  date: string;
  paymentMethod: string;
  impact: string;
}

export interface GalleryPhotoItem {
  id: string;
  image: string;
  title: string;
  tag: string;
  desc: string;
  createdAt: string;
}

export interface DonorTestimonial {
  id: string;
  name: string;
  quote: string;
  location: string;
  frequency: string; // e.g., 'Monthly Guardian', 'Weekly Advocate'
  amountDetails: string; // e.g., '$45 USD/mo', '$100 USD/mo'
  avatar: string;
}

export interface PlatformVideoLink {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'platform';
  platformName: string; // e.g. 'YouTube', 'GoFundMe', 'Patreon', 'JustGiving', 'Just Giving'
  description: string;
  thumbnailUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  rank: number; // For clean sorting - Admin controls (from 1 = CEO, to 10 = Intern/Volunteer)
  email?: string;
}

export interface AdminAlert {
  id: string;
  type: 'donation' | 'contact';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  meta: {
    name: string;
    email: string;
    amount?: number;
    message?: string;
  };
}

export interface CEOProfile {
  name: string;
  role: string;
  avatar: string;
  storyTitle: string;
  storyIntro: string;
  verse1Text: string;
  verse1Ref: string;
  turningPoint: string;
  verse2Text: string;
  verse2Ref: string;
  academicHistory: string;
  verse3Text: string;
  verse3Ref: string;
  accomplishments: string;
  verse4Text: string;
  verse4Ref: string;
  notAHero: string;
  verse5Text: string;
  verse5Ref: string;
  cannotDoAlone: string;
  verse6Text: string;
  verse6Ref: string;
  callToAction: string;
  verse7Text: string;
  verse7Ref: string;
  closingPrayer: string;
}




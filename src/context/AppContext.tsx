import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, DonationRecord, UpdateItem, GalleryPhotoItem, CharityState, DonorTestimonial, PlatformVideoLink, TeamMember, AdminAlert, CEOProfile } from '../types';

// Pre-import template images for backward-compatibility & visual richness
import blanketsPic from '../assets/images/gallery_blankets_1779610930363.png';
import schoolPic from '../assets/images/gallery_school_1779610948341.png';

interface AppContextType {
  accounts: UserAccount[];
  currentUser: UserAccount | null;
  donations: DonationRecord[];
  updates: UpdateItem[];
  galleryPhotos: GalleryPhotoItem[];
  charityState: CharityState;
  
  // Custom states from user requests
  testimonials: DonorTestimonial[];
  platformVideoLinks: PlatformVideoLink[];
  teamMembers: TeamMember[];
  
  // CEO Profile information
  ceoProfile: CEOProfile;
  updateCEOProfile: (updated: Partial<CEOProfile>) => void;
  
  // Admin Alerts state from user requests
  adminAlerts: AdminAlert[];
  addAdminAlert: (type: 'donation' | 'contact', title: string, message: string, meta: any) => void;
  deleteAdminAlert: (id: string) => void;
  markAlertAsRead: (id: string) => void;
  submitContactForm: (name: string, email: string, message: string) => void;
  
  // Auth methods
  signUp: (name: string, email: string, password: string, role?: 'user' | 'admin') => { success: boolean; message: string };
  signIn: (email: string, password: string) => { success: boolean; message: string; user?: UserAccount };
  signOut: () => void;
  deleteAccount: (id: string) => void;
  
  // Donation methods
  submitDonation: (amount: number, name: string, email: string) => void;
  deleteDonation: (id: string) => void;
  
  // Content publishing
  publishFieldUpdate: (message: string, category: 'relief' | 'education' | 'water' | 'milestone', photoUrl?: string) => void;
  publishGalleryPhoto: (title: string, tag: string, desc: string, imageUrl?: string) => void;
  updateGalleryPhoto: (id: string, updated: Partial<GalleryPhotoItem>) => void;
  
  // Specific uploads/testimonial/team administration
  addTestimonial: (testimonial: Omit<DonorTestimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  addPlatformVideoLink: (link: Omit<PlatformVideoLink, 'id'>) => void;
  deletePlatformVideoLink: (id: string) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, updated: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  
  // Metrics monitoring & override
  saveMetrics: (goal: number, raised: number, meals: number, donors: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  // 1. Initial Accounts Seed
  const defaultAccounts: UserAccount[] = [
    {
      id: 'acc_admin',
      name: 'Samuel Ajak Admin',
      email: 'Samuelajak205@gmail.com',
      password: 'Namuganzaritah#1',
      role: 'admin',
      createdAt: new Date('2026-05-18T10:00:00Z').toDateString(),
      totalDonated: 1500,
    },
    {
      id: 'acc_dev',
      name: 'Samuel Developer',
      email: 'developer@charity.org',
      password: 'admin',
      role: 'user',
      createdAt: new Date('2026-05-18T10:00:00Z').toDateString(),
      totalDonated: 1500,
    },
    {
      id: 'acc_user1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      password: 'password',
      role: 'user',
      createdAt: new Date('2026-05-20T14:30:00Z').toDateString(),
      totalDonated: 250,
    },
    {
      id: 'acc_user2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password',
      role: 'user',
      createdAt: new Date('2026-05-22T08:15:00Z').toDateString(),
      totalDonated: 75,
    }
  ];

  // 2. Initial Donation Logs Seed
  const defaultDonations: DonationRecord[] = [
    {
      id: 'don_1',
      amount: 1500,
      name: 'Samuel Developer Admin',
      email: 'developer@charity.org',
      date: new Date('2026-05-18T11:20:00Z').toUTCString(),
      paymentMethod: 'Visa Ending In 4242',
      impact: 'Water Well infrastructure co-sponsorship',
    },
    {
      id: 'don_2',
      amount: 250,
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      date: new Date('2026-05-20T15:05:00Z').toUTCString(),
      paymentMethod: 'Amex Ending In 1004',
      impact: '10 General Warm Winter relief kits',
    },
    {
      id: 'don_3',
      amount: 75,
      name: 'Jane Doe',
      email: 'jane@example.com',
      date: new Date('2026-05-22T09:00:00Z').toUTCString(),
      paymentMethod: 'Mastercard Ending In 8812',
      impact: 'Restore Amina\'s Future child support bundle',
    },
    {
      id: 'don_4',
      amount: 50,
      name: 'Anonymous Supporter',
      email: 'donor.anon@yahoo.com',
      date: new Date('2026-05-23T18:40:00Z').toUTCString(),
      paymentMethod: 'Google Pay',
      impact: 'Nutritious school grain support pack',
    }
  ];

  // 3. Initial Updates Feed Seed
  const defaultUpdates: UpdateItem[] = [
    {
      id: 'update_1',
      timeAgo: '2 hours ago',
      message: 'Warm woolen blankets and heavy windproof coats delivered to 30 young orphans sleeping in the high altitude northern border huts.',
      category: 'relief',
    },
    {
      id: 'update_2',
      timeAgo: 'Yesterday',
      message: 'Clean water well drill finalized at the Eastern block sanctuary. Sponsoring safe clean hydration for 120 students.',
      category: 'water',
    },
    {
      id: 'update_3',
      timeAgo: '4 days ago',
      message: 'Ramadan food cargo completed! $10,500 in customized grains, milk formula, and dry dates fully sorted and loaded into local pantry modules.',
      category: 'milestone',
    },
    {
      id: 'update_4',
      timeAgo: 'Last week',
      message: 'School registration completed for 12 girls from regional modules, equipping them with fresh study notebooks and canvas uniforms.',
      category: 'education',
    },
    {
      id: 'update_5',
      timeAgo: '2 weeks ago',
      message: 'Concluded basic dental and medical safety camp. Sponsoring general clinical cards for 45 newly arrived children.',
      category: 'relief',
    }
  ];

  // 4. Initial Gallery Photos Seed
  const defaultGalleryPhotos: GalleryPhotoItem[] = [
    {
      id: 'gal_1',
      image: blanketsPic,
      title: 'Blanket Distribution',
      tag: 'Winter relief',
      desc: 'Warm cozy coats and protective heavy-duty blankets given to 50 vulnerable families in extreme freezing elements.',
      createdAt: new Date('2026-05-10T12:00:00Z').toDateString()
    },
    {
      id: 'gal_2',
      image: schoolPic,
      title: 'Back-to-School kits',
      tag: 'Education Sponsorship',
      desc: 'Fulfilling protective bags, school manuals, exercise booklets, uniforms, and shoes given in direct local modules.',
      createdAt: new Date('2026-05-15T12:00:00Z').toDateString()
    }
  ];

  // 5. Initial Charity Metrics state
  const defaultMetrics: CharityState = {
    totalGoal: 50000,
    totalRaised: 32450,
    mealsServed: 6210,
    donorsCount: 1214,
  };

  // 6. Initial Donor Testimonials seed
  const defaultTestimonials: DonorTestimonial[] = [
    {
      id: 'test_1',
      name: 'Marcus Vance',
      quote: 'Knowing exactly where my monthly sponsorship goes makes all the difference. The real-time verified reports on school kit delivery are incredible.',
      location: 'Chicago, IL',
      frequency: 'Monthly Guardian',
      amountDetails: '$100 USD/mo',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 'test_2',
      name: 'Elena Rostova',
      quote: 'Good Samaritan for Children is transforming emergency relief. The direct conveyance system is exactly how modern charity should operate.',
      location: 'Berlin, DE',
      frequency: 'Weekly Advocate',
      amountDetails: '$45 USD/mo',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 'test_3',
      name: 'Dr. Clara Mensah',
      quote: 'Direct food and clinical kit updates keep me profoundly connected. I have registered three recurring support logs for orphanages.',
      location: 'Accra, GH',
      frequency: 'Monthly Guardian',
      amountDetails: '$150 USD/mo',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120'
    }
  ];

  // 7. Initial Uploaded platforms and video links seed
  const defaultPlatformVideoLinks: PlatformVideoLink[] = [
    {
      id: 'res_1',
      title: 'Our Official GoFundMe Rescue Drive',
      url: 'https://gofundme.com',
      type: 'platform',
      platformName: 'GoFundMe',
      description: 'Immediate backup relief fund where regional campaign coordinators share verified milestones.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'res_2',
      title: 'Sister Sarah on Camp Procurement & Meals',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'video',
      platformName: 'YouTube',
      description: 'A ground video dispatch proving real-time delivery of cozy coats, clinical support, and fresh grains.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'res_3',
      title: 'Join Our Recurring Patreon Guardian Circle',
      url: 'https://patreon.com',
      type: 'platform',
      platformName: 'Patreon',
      description: 'Stable monthly pipeline of medical supplies. Subscribe to keep emergency shelters fully stocked.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600'
    }
  ];

  // 8. Initial sorted team structure from smallest rank to CEO
  const defaultTeamMembers: TeamMember[] = [
    {
      id: 'team_5',
      name: 'Peter Chen',
      role: 'Logistics Support Intern',
      bio: 'Assisting with grain packet sorting, stock ledger box packing, and printing child school kits. Our dedicated young ground assistant.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      rank: 5,
      email: 'pchen@charity.org'
    },
    {
      id: 'team_4',
      name: 'Amara Okafor',
      role: 'Volunteer Camp Caregiver',
      bio: 'Coordinates food truck handoffs, distributes blankets to kids, and registers new girls for uniforms in direct supervisor modules.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120',
      rank: 4,
      email: 'amara@charity.org'
    },
    {
      id: 'team_3',
      name: 'Bashir Al-Hassan',
      role: 'Cargo Dispatch & Logistics Rider',
      bio: 'High-speed pilot delivering nutritious formula and hot soup cooking modules safely across severe checkpoints.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      rank: 3,
      email: 'bashir@charity.org'
    },
    {
      id: 'team_2',
      name: 'Sister Sarah',
      role: 'Lead Caretaker & Field Supervisor',
      bio: 'In charge of regional kitchen inventory, medical kit clearances, and verified photography reporting. Living inside child hubs.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
      rank: 2,
      email: 'sarah.field@charity.org'
    },
    {
      id: 'team_1',
      name: 'Ivan Mulindwa',
      role: 'Founder & CEO',
      bio: "I slept on a mud floor at age 7. Now keeping my promise to help children who are alone, following God's calling.",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      rank: 1,
      email: 'ivan@samaritan.org'
    }
  ];

  const defaultCEOProfile: CEOProfile = {
    name: 'Ivan Mulindwa',
    role: 'Founder & CEO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    storyTitle: '"I Was That Hungry Child Once"',
    storyIntro: 'At age 7, I slept on a mud floor. I remember the pain of watching my younger sister cry from hunger — and having nothing to give her. Not a single coin. Not a piece of bread.\n\nThat night, I cried myself to sleep and whispered to God:\n"Do You see us? Do You care?"\n\nAnd then I made a promise: "If God ever lifts me out of this pit, I will never let another child feel this alone."',
    verse1Text: 'The Lord hears the cry of the poor.',
    verse1Ref: 'Psalm 34:6',
    turningPoint: 'A stranger came. Just one person. She paid for my school fees. One meal. One uniform. One act of kindness.\n\nShe told me: "God did not forget you. He sent me."\n\nThat day, I learned something I will never forget:',
    verse2Text: 'Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress.',
    verse2Ref: 'James 1:27',
    academicHistory: "I went from sleeping on dirt to graduating with a degree. But every night, I still saw my sister's face. Every meal I ate felt like a betrayal to the children who had nothing.\n\nSo I gave up my corporate job. My family called me crazy. My friends said: \"You'll be poor again.\"\n\nBut I opened my Bible and read:",
    verse3Text: 'If you pour yourself out for the hungry and satisfy the desire of the afflicted, then shall your light rise in the darkness.',
    verse3Ref: 'Isaiah 58:10',
    accomplishments: '• Fed 6,210+ hungry children\n• Sent 240+ orphans to school\n• Held the hands of mothers who cry the same tears my mother cried',
    verse4Text: 'Whoever is generous to the poor lends to the Lord, and He will repay him for his deed.',
    verse4Ref: 'Proverbs 19:17',
    notAHero: 'I am just a man who kept his promise to a 7-year-old boy — and to a God who never forgot him.',
    verse5Text: 'Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.',
    verse5Ref: 'Matthew 19:14',
    cannotDoAlone: 'Tonight, a child is sleeping hungry. Another is crying for their mother. Another is asking the same question I asked at 7: "God, do You see me?"\n\nYou are the answer to that prayer.',
    verse6Text: 'Do not neglect to do good and to share what you have, for such sacrifices are pleasing to God.',
    verse6Ref: 'Hebrews 13:16',
    callToAction: 'Every $5 you give is a meal.\nEvery $25 is a school uniform.\nEvery $50 is a blanket and a Bible for a child who has nothing.',
    verse7Text: 'Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.',
    verse7Ref: 'Matthew 25:40',
    closingPrayer: 'Lord, You saw me when I was that hungry child. You sent a stranger to save me. Now send Your people to save them. Use these words to move hearts. In Jesus\' name, Amen.'
  };

  // State Declarations loading from local storage
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('hon_accounts');
    return saved ? JSON.parse(saved) : defaultAccounts;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('hon_currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem('hon_donations');
    return saved ? JSON.parse(saved) : defaultDonations;
  });

  const [updates, setUpdates] = useState<UpdateItem[]>(() => {
    const saved = localStorage.getItem('hon_updates');
    return saved ? JSON.parse(saved) : defaultUpdates;
  });

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotoItem[]>(() => {
    const saved = localStorage.getItem('hon_gallery');
    return saved ? JSON.parse(saved) : defaultGalleryPhotos;
  });

  const [charityState, setCharityState] = useState<CharityState>(() => {
    const saved = localStorage.getItem('hon_metrics');
    return saved ? JSON.parse(saved) : defaultMetrics;
  });

  const [testimonials, setTestimonials] = useState<DonorTestimonial[]>(() => {
    const saved = localStorage.getItem('hon_testimonials');
    return saved ? JSON.parse(saved) : defaultTestimonials;
  });

  const [platformVideoLinks, setPlatformVideoLinks] = useState<PlatformVideoLink[]>(() => {
    const saved = localStorage.getItem('hon_resources');
    return saved ? JSON.parse(saved) : defaultPlatformVideoLinks;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('hon_teammembers');
    return saved ? JSON.parse(saved) : defaultTeamMembers;
  });

  const [ceoProfile, setCEOProfile] = useState<CEOProfile>(() => {
    const saved = localStorage.getItem('hon_ceoprofile');
    return saved ? JSON.parse(saved) : defaultCEOProfile;
  });

  const [adminAlerts, setAdminAlerts] = useState<AdminAlert[]>(() => {
    const saved = localStorage.getItem('hon_admin_alerts');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep localStorage synchronised with state updates
  useEffect(() => {
    localStorage.setItem('hon_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('hon_currentUser', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('hon_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('hon_updates', JSON.stringify(updates));
  }, [updates]);

  useEffect(() => {
    localStorage.setItem('hon_gallery', JSON.stringify(galleryPhotos));
  }, [galleryPhotos]);

  useEffect(() => {
    localStorage.setItem('hon_metrics', JSON.stringify(charityState));
  }, [charityState]);

  useEffect(() => {
    localStorage.setItem('hon_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('hon_resources', JSON.stringify(platformVideoLinks));
  }, [platformVideoLinks]);

  useEffect(() => {
    localStorage.setItem('hon_teammembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('hon_admin_alerts', JSON.stringify(adminAlerts));
  }, [adminAlerts]);

  useEffect(() => {
    localStorage.setItem('hon_ceoprofile', JSON.stringify(ceoProfile));
  }, [ceoProfile]);

  const updateCEOProfile = (updated: Partial<CEOProfile>) => {
    setCEOProfile(prev => ({ ...prev, ...updated }));
  };

  // Admin alert actions
  const addAdminAlert = (type: 'donation' | 'contact', title: string, message: string, meta: any) => {
    const newAlert: AdminAlert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      type,
      title,
      message,
      timestamp: new Date().toUTCString(),
      read: false,
      meta
    };
    setAdminAlerts(prev => [newAlert, ...prev]);

    // Dispatch a custom window event for the live notification toast
    const event = new CustomEvent('admin-alert-toast', { detail: newAlert });
    window.dispatchEvent(event);
  };

  const deleteAdminAlert = (id: string) => {
    setAdminAlerts(prev => prev.filter(al => al.id !== id));
  };

  const markAlertAsRead = (id: string) => {
    setAdminAlerts(prev => prev.map(al => al.id === id ? { ...al, read: true } : al));
  };

  const submitContactForm = (name: string, email: string, message: string) => {
    addAdminAlert(
      'contact',
      'New Inquiry Received',
      `Message from ${name} (${email}): "${message.substring(0, 60)}${message.length > 60 ? '...' : ''}"`,
      { name, email, message }
    );
  };

  // Implement authentications: Signup
  const signUp = (name: string, email: string, password: string, role: 'user' | 'admin' = 'user') => {
    const alreadyExists = accounts.some(acc => acc.email.toLowerCase() === email.toLowerCase());
    if (alreadyExists) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newAcc: UserAccount = {
      id: `acc_${Date.now()}`,
      name,
      email,
      password,
      role,
      createdAt: new Date().toDateString(),
      totalDonated: 0
    };

    setAccounts(prev => [...prev, newAcc]);
    setCurrentUser(newAcc);
    return { success: true, message: `Account created successfully. Welcome, ${name}!`, user: newAcc };
  };

  // Implement authentication: Signin
  const signIn = (email: string, password: string) => {
    const user = accounts.find(
      acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    );

    if (!user) {
      return { success: false, message: 'Invalid email address or incorrect password.' };
    }

    setCurrentUser(user);
    return { success: true, message: `Successfully authenticated. Welcome back, ${user.name}!`, user };
  };

  // Sign out
  const signOut = () => {
    setCurrentUser(null);
  };

  // Admin delete account control
  const deleteAccount = (id: string) => {
    if (id === 'acc_admin') return; // Cannot delete primary developer admin account
    setAccounts(prev => prev.filter(acc => acc.id !== id));
    if (currentUser?.id === id) {
      setCurrentUser(null);
    }
  };

  // Submit secure donation simulation (updates metrics and links donations history)
  const submitDonation = (amount: number, name: string, email: string) => {
    const isAnonymous = !name && !email;
    const finalName = isAnonymous ? 'Anonymous Supporter' : (name || 'Sponsor');
    const finalEmail = isAnonymous ? 'anonymous@ledger.org' : (email || 'donor@email.com');
    
    // Choose specific impact tags based on size
    let donationImpact = 'General community nourishment and kitchen assistance';
    if (amount >= 250) {
      donationImpact = 'Clean safety assets and primary water well drills';
    } else if (amount >= 100) {
      donationImpact = '10 Warm coats and sleeping modules for extreme colds';
    } else if (amount >= 50) {
      donationImpact = 'Comprehensive Back-to-school backpack & exercise kits';
    } else if (amount >= 25) {
      donationImpact = 'Amina\'s dedicated study, shelter, and milk sponsorships';
    }

    const newDonation: DonationRecord = {
      id: `don_${Date.now()}`,
      amount,
      name: finalName,
      email: finalEmail,
      date: new Date().toUTCString(),
      paymentMethod: 'Pre-Authorized Card Handoff',
      impact: donationImpact
    };

    // Log donation item
    setDonations(prev => [newDonation, ...prev]);

    // Apply contribution update to corresponding account if verified
    setAccounts(prev => prev.map(acc => {
      if (acc.email.toLowerCase() === finalEmail.toLowerCase()) {
        return { ...acc, totalDonated: acc.totalDonated + amount };
      }
      return acc;
    }));

    // Update current session stats as well if active
    if (currentUser && currentUser.email.toLowerCase() === finalEmail.toLowerCase()) {
      setCurrentUser(prev => prev ? { ...prev, totalDonated: prev.totalDonated + amount } : null);
    }

    // Recalculate global metrics increments
    const mealInc = Math.round(amount * 0.95);
    setCharityState(prev => ({
      ...prev,
      totalRaised: prev.totalRaised + amount,
      mealsServed: prev.mealsServed + (mealInc > 0 ? mealInc : 1),
      donorsCount: prev.donorsCount + 1,
    }));

    // Trigger admin alert if a donation is >= $100
    if (amount >= 100) {
      addAdminAlert(
        'donation',
        'Large Donation Alert! 🎉',
        `A high-value contribution of $${amount} was received from ${finalName} (${finalEmail}).`,
        { name: finalName, email: finalEmail, amount }
      );
    }
  };

  // Delete/refund a logged donation
  const deleteDonation = (id: string) => {
    const target = donations.find(d => d.id === id);
    if (!target) return;

    setDonations(prev => prev.filter(d => d.id !== id));

    // Deduct total raised and count
    setCharityState(prev => ({
      ...prev,
      totalRaised: Math.max(0, prev.totalRaised - target.amount),
      mealsServed: Math.max(0, prev.mealsServed - Math.round(target.amount * 0.95)),
      donorsCount: Math.max(0, prev.donorsCount - 1)
    }));

    // Revert user's personal donation counters
    setAccounts(prev => prev.map(acc => {
      if (acc.email.toLowerCase() === target.email.toLowerCase()) {
        return { ...acc, totalDonated: Math.max(0, acc.totalDonated - target.amount) };
      }
      return acc;
    }));

    if (currentUser && currentUser.email.toLowerCase() === target.email.toLowerCase()) {
      setCurrentUser(prev => prev ? { ...prev, totalDonated: Math.max(0, prev.totalDonated - target.amount) } : null);
    }
  };

  // Publish a live report log directly into Updates component
  const publishFieldUpdate = (message: string, category: 'relief' | 'education' | 'water' | 'milestone', photoUrl?: string) => {
    const newUpdate: UpdateItem = {
      id: `update_${Date.now()}`,
      timeAgo: 'Just now',
      message,
      category,
      photoUrl
    };

    setUpdates(prev => [newUpdate, ...prev]);
  };

  // Add photo log with description elements to image gallery
  const publishGalleryPhoto = (title: string, tag: string, desc: string, imageUrl?: string) => {
    const finalImage = imageUrl || blanketsPic; // Default fallback to blanket deliveries photo
    const newPic: GalleryPhotoItem = {
      id: `gal_${Date.now()}`,
      image: finalImage,
      title,
      tag,
      desc,
      createdAt: new Date().toDateString()
    };

    setGalleryPhotos(prev => [newPic, ...prev]);
  };

  const updateGalleryPhoto = (id: string, updated: Partial<GalleryPhotoItem>) => {
    setGalleryPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  // Admin manually override general metrics values
  const saveMetrics = (goal: number, raised: number, meals: number, donors: number) => {
    setCharityState({
      totalGoal: goal,
      totalRaised: raised,
      mealsServed: meals,
      donorsCount: donors
    });
  };

  // 9. Methods for dynamic user-requested modules
  const addTestimonial = (test: Omit<DonorTestimonial, 'id'>) => {
    const newItem: DonorTestimonial = {
      ...test,
      id: `test_${Date.now()}`
    };
    setTestimonials(prev => [newItem, ...prev]);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const addPlatformVideoLink = (link: Omit<PlatformVideoLink, 'id'>) => {
    const newItem: PlatformVideoLink = {
      ...link,
      id: `res_${Date.now()}`
    };
    setPlatformVideoLinks(prev => [newItem, ...prev]);
  };

  const deletePlatformVideoLink = (id: string) => {
    setPlatformVideoLinks(prev => prev.filter(p => p.id !== id));
  };

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newItem: TeamMember = {
      ...member,
      id: `team_${Date.now()}`
    };
    setTeamMembers(prev => [...prev, newItem].sort((a,b) => a.rank - b.rank));
  };

  const updateTeamMember = (id: string, updated: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, ...updated };
      }
      return m;
    }).sort((a,b) => a.rank - b.rank));
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <AppContext.Provider value={{
      accounts,
      currentUser,
      donations,
      updates,
      galleryPhotos,
      charityState,
      testimonials,
      platformVideoLinks,
      teamMembers,
      ceoProfile,
      updateCEOProfile,
      adminAlerts,
      addAdminAlert,
      deleteAdminAlert,
      markAlertAsRead,
      submitContactForm,
      signUp,
      signIn,
      signOut,
      deleteAccount,
      submitDonation,
      deleteDonation,
      publishFieldUpdate,
      publishGalleryPhoto,
      updateGalleryPhoto,
      addTestimonial,
      deleteTestimonial,
      addPlatformVideoLink,
      deletePlatformVideoLink,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      saveMetrics
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used inside the AppStateProvider context wrapper.');
  }
  return context;
}

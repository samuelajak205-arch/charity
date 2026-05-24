import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { 
  ShieldAlert, Users, Heart, Sparkles, Plus, Image, BarChart3, 
  Trash2, Send, Database, Lock, Check, CheckCircle2, RotateCcw, 
  Eye, FileText, MessageSquare, Video, Award, Sliders, ArrowUpDown, ChevronUp, ChevronDown, Bell, Inbox,
  UploadCloud, FileImage, Clipboard
} from 'lucide-react';
import { motion } from 'motion/react';
import { ImageFileOrUrlSelector } from './ImageFileOrUrlSelector';
import { GalleryManager } from './GalleryManager';

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const {
    accounts,
    donations,
    charityState,
    deleteAccount,
    deleteDonation,
    publishFieldUpdate,
    publishGalleryPhoto,
    saveMetrics,
    testimonials,
    addTestimonial,
    deleteTestimonial,
    platformVideoLinks,
    addPlatformVideoLink,
    deletePlatformVideoLink,
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    adminAlerts,
    deleteAdminAlert,
    markAlertAsRead,
    ceoProfile,
    updateCEOProfile
  } = useAppState();

  const [activeTab, setActiveTab] = useState<'metrics' | 'accounts' | 'donations' | 'publisher' | 'testimonials' | 'platforms' | 'team' | 'alerts' | 'ceo'>('metrics');

  // --- Dynamic Form States ---
  // H. CEO/Creator Spiritual Profile & Photos
  const [ceoNameForm, setCeoNameForm] = useState(ceoProfile.name);
  const [ceoRoleForm, setCeoRoleForm] = useState(ceoProfile.role);
  const [ceoAvatarForm, setCeoAvatarForm] = useState(ceoProfile.avatar);
  const [ceoStoryTitleForm, setCeoStoryTitleForm] = useState(ceoProfile.storyTitle);
  const [ceoStoryIntroForm, setCeoStoryIntroForm] = useState(ceoProfile.storyIntro);
  const [ceoVerse1TextForm, setCeoVerse1TextForm] = useState(ceoProfile.verse1Text);
  const [ceoVerse1RefForm, setCeoVerse1RefForm] = useState(ceoProfile.verse1Ref);
  const [ceoTurningPointForm, setCeoTurningPointForm] = useState(ceoProfile.turningPoint);
  const [ceoVerse2TextForm, setCeoVerse2TextForm] = useState(ceoProfile.verse2Text);
  const [ceoVerse2RefForm, setCeoVerse2RefForm] = useState(ceoProfile.verse2Ref);
  const [ceoAcademicHistoryForm, setCeoAcademicHistoryForm] = useState(ceoProfile.academicHistory);
  const [ceoVerse3TextForm, setCeoVerse3TextForm] = useState(ceoProfile.verse3Text);
  const [ceoVerse3RefForm, setCeoVerse3RefForm] = useState(ceoProfile.verse3Ref);
  const [ceoAccomplishmentsForm, setCeoAccomplishmentsForm] = useState(ceoProfile.accomplishments);
  const [ceoVerse4TextForm, setCeoVerse4TextForm] = useState(ceoProfile.verse4Text);
  const [ceoVerse4RefForm, setCeoVerse4RefForm] = useState(ceoProfile.verse4Ref);
  const [ceoNotAHeroForm, setCeoNotAHeroForm] = useState(ceoProfile.notAHero);
  const [ceoVerse5TextForm, setCeoVerse5TextForm] = useState(ceoProfile.verse5Text);
  const [ceoVerse5RefForm, setCeoVerse5RefForm] = useState(ceoProfile.verse5Ref);
  const [ceoCannotDoAloneForm, setCeoCannotDoAloneForm] = useState(ceoProfile.cannotDoAlone);
  const [ceoVerse6TextForm, setCeoVerse6TextForm] = useState(ceoProfile.verse6Text);
  const [ceoVerse6RefForm, setCeoVerse6RefForm] = useState(ceoProfile.verse6Ref);
  const [ceoCallToActionForm, setCeoCallToActionForm] = useState(ceoProfile.callToAction);
  const [ceoVerse7TextForm, setCeoVerse7TextForm] = useState(ceoProfile.verse7Text);
  const [ceoVerse7RefForm, setCeoVerse7RefForm] = useState(ceoProfile.verse7Ref);
  const [ceoClosingPrayerForm, setCeoClosingPrayerForm] = useState(ceoProfile.closingPrayer);
  const [ceoFormFeedback, setCeoFormFeedback] = useState('');

  // A. Metrics forms
  const [goal, setGoal] = useState(charityState.totalGoal);
  const [raised, setRaised] = useState(charityState.totalRaised);
  const [meals, setMeals] = useState(charityState.mealsServed);
  const [donors, setDonors] = useState(charityState.donorsCount);
  const [metricsFeedback, setMetricsFeedback] = useState('');

  // B. Field Report Generator
  const [updateMsg, setUpdateMsg] = useState('');
  const [updateCat, setUpdateCat] = useState<'relief' | 'education' | 'water' | 'milestone'>('relief');
  const [customPhotoInput, setCustomPhotoInput] = useState('');
  const [selectedPhotoPreset, setSelectedPhotoPreset] = useState('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600');
  const [publishFeedback, setPublishFeedback] = useState('');

  // Preset Unsplash links for easy choice with gorgeous, safety-compliant images
  const photoPresets = [
    { title: 'Nourishment Support', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600' },
    { title: 'Fresh Water Well Completed', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600' },
    { title: 'Tents & Shelter distribution', url: 'https://images.unsplash.com/photo-1504224494697-a87a270b7f08?auto=format&fit=crop&q=80&w=600' },
    { title: 'Education Sponsor kits', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600' },
    { title: 'Cozy Medical Care Handoff', url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600' }
  ];

  // C. Gallery Photo forms moved to GalleryManager component

  // Handle saving overriden metrics
  const handleSaveMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    saveMetrics(Number(goal), Number(raised), Number(meals), Number(donors));
    setMetricsFeedback('Transparency metrics modified successfully! Changes are propagated across dashboard elements.');
    setTimeout(() => setMetricsFeedback(''), 4000);
  };

  const handleSaveCEOProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCEOProfile({
      name: ceoNameForm,
      role: ceoRoleForm,
      avatar: ceoAvatarForm,
      storyTitle: ceoStoryTitleForm,
      storyIntro: ceoStoryIntroForm,
      verse1Text: ceoVerse1TextForm,
      verse1Ref: ceoVerse1RefForm,
      turningPoint: ceoTurningPointForm,
      verse2Text: ceoVerse2TextForm,
      verse2Ref: ceoVerse2RefForm,
      academicHistory: ceoAcademicHistoryForm,
      verse3Text: ceoVerse3TextForm,
      verse3Ref: ceoVerse3RefForm,
      accomplishments: ceoAccomplishmentsForm,
      verse4Text: ceoVerse4TextForm,
      verse4Ref: ceoVerse4RefForm,
      notAHero: ceoNotAHeroForm,
      verse5Text: ceoVerse5TextForm,
      verse5Ref: ceoVerse5RefForm,
      cannotDoAlone: ceoCannotDoAloneForm,
      verse6Text: ceoVerse6TextForm,
      verse6Ref: ceoVerse6RefForm,
      callToAction: ceoCallToActionForm,
      verse7Text: ceoVerse7TextForm,
      verse7Ref: ceoVerse7RefForm,
      closingPrayer: ceoClosingPrayerForm,
    });
    setCeoFormFeedback('Ivan Mulindwa’s Spiritual Profile & Photo successfully updated across all modules!');
    setTimeout(() => setCeoFormFeedback(''), 4050);
  };

  // Handle publishing Field update item
  const handlePublishUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateMsg.trim()) return;

    const finalPhoto = customPhotoInput.trim() || selectedPhotoPreset;
    publishFieldUpdate(updateMsg, updateCat, finalPhoto);
    setPublishFeedback('Field report published successfully to timeline! Category badge active.');
    
    // Clear
    setUpdateMsg('');
    setCustomPhotoInput('');
    setTimeout(() => setPublishFeedback(''), 4000);
  };

  // D. Testimonials Form States
  const [testQuote, setTestQuote] = useState('');
  const [testName, setTestName] = useState('');
  const [testLocation, setTestLocation] = useState('');
  const [testFrequency, setTestFrequency] = useState('Monthly Guardian');
  const [testAmountDetails, setTestAmountDetails] = useState('$30/mo');
  const [testAvatar, setTestAvatar] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120');
  const [testimonialFeedback, setTestimonialFeedback] = useState('');

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuote.trim() || !testName.trim() || !testLocation.trim()) return;
    addTestimonial(testQuote, testName, testLocation, testFrequency, testAmountDetails, testAvatar);
    setTestimonialFeedback('Verified continuous donor quote added successfully!');
    setTestQuote('');
    setTestName('');
    setTestLocation('');
    setTimeout(() => setTestimonialFeedback(''), 4000);
  };

  // E. Platforms & Video Resources Form States
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkPlatformName, setLinkPlatformName] = useState('YouTube Live stream');
  const [linkThumbnailUrl, setLinkThumbnailUrl] = useState('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600');
  const [linkType, setLinkType] = useState<'video' | 'link'>('link');
  const [linkDescription, setLinkDescription] = useState('');
  const [platformFeedback, setPlatformFeedback] = useState('');

  const handleAddPlatformLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkTitle.trim() || !linkUrl.trim()) return;
    addPlatformVideoLink(linkTitle, linkUrl, linkPlatformName, linkThumbnailUrl, linkType, linkDescription);
    setPlatformFeedback('Dynamic campaign resource node uploaded successfully!');
    setLinkTitle('');
    setLinkUrl('');
    setLinkDescription('');
    setTimeout(() => setPlatformFeedback(''), 4000);
  };

  // F. Team Member Form States
  const [teamName, setTeamName] = useState('');
  const [teamRole, setTeamRole] = useState('');
  const [teamBio, setTeamBio] = useState('');
  const [teamRank, setTeamRank] = useState(5); // 1 = CEO, 5 = Intern
  const [teamAvatar, setTeamAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120');
  const [teamEmail, setTeamEmail] = useState('');
  const [teamFeedback, setTeamFeedback] = useState('');

  const handleAddTeamMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !teamRole.trim() || !teamBio.trim()) return;
    addTeamMember(teamName, teamRole, teamBio, teamRank, teamAvatar, teamEmail);
    setTeamFeedback(`Successfully onboarded team member "${teamName}" at position-level Rank ${teamRank}!`);
    setTeamName('');
    setTeamRole('');
    setTeamBio('');
    setTeamEmail('');
    setTimeout(() => setTeamFeedback(''), 4000);
  };

  const handleUpdateRank = (id: string, newRank: number) => {
    const member = teamMembers.find(t => t.id === id);
    if (!member) return;
    const clampedRank = Math.max(1, Math.min(5, newRank));
    updateTeamMember(id, { rank: clampedRank });
    setTeamFeedback(`Updated ${member.name}'s position level to Rank ${clampedRank}!`);
    setTimeout(() => setTeamFeedback(''), 4000);
  };


  return (
    <div id="admin-panel-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        id="admin-dashboard-frame"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        className="bg-white border border-sky-100 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[80vh]"
      >
        
        {/* SIDEBAR NAVIGATION */}
        <div className="w-full md:w-64 bg-slate-950 text-slate-200 p-6 flex flex-col justify-between shrink-0 border-r border-slate-900/40">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="p-1.5 bg-amber-500 rounded-lg text-slate-950">
                <ShieldAlert className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="font-display font-black text-sm tracking-tight block">ADMIN CONSOLE</span>
                <span className="text-[9px] font-mono font-bold text-amber-400 tracking-widest uppercase">Developer Suite</span>
              </div>
            </div>

            {/* Account scope credentials */}
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl mb-6 text-left">
              <span className="text-[9px] text-slate-405 uppercase tracking-widest font-mono font-bold block">ACTIVE OPERATOR</span>
              <span className="text-xs font-bold text-white block mt-0.5">Samuel Ajak</span>
              <span className="text-[10px] text-sky-400 font-mono block">developer@charity.org</span>
            </div>

            {/* Nav List */}
            <ul className="space-y-1.5 text-left text-xs font-semibold">
              <li>
                <button
                  id="tab-btn-metrics"
                  onClick={() => setActiveTab('metrics')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'metrics'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 shrink-0" />
                  <span>Metrics Oversight</span>
                </button>
              </li>
              <li>
                <button
                  id="tab-btn-donations"
                  onClick={() => setActiveTab('donations')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'donations'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <Heart className="w-4 h-4 shrink-0" />
                  <span>Donations Ledger ({donations.length})</span>
                </button>
              </li>
              <li>
                <button
                  id="tab-btn-accounts"
                  onClick={() => setActiveTab('accounts')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'accounts'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <Users className="w-4 h-4 shrink-0" />
                  <span>User Account Audit ({accounts.length})</span>
                </button>
              </li>
              <li>
                <button
                  id="tab-btn-publisher"
                  onClick={() => setActiveTab('publisher')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'publisher'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span>Cargo Publisher</span>
                </button>
              </li>
              <li>
                <button
                  id="tab-btn-testimonials"
                  onClick={() => setActiveTab('testimonials')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'testimonials'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Recurring Quotes ({testimonials.length})</span>
                </button>
              </li>
              <li>
                <button
                  id="tab-btn-platforms"
                  onClick={() => setActiveTab('platforms')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'platforms'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <Video className="w-4 h-4 shrink-0" />
                  <span>Platform Links ({platformVideoLinks.length})</span>
                </button>
              </li>
              <li>
                <button
                  id="tab-btn-team"
                  onClick={() => setActiveTab('team')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'team'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <Sliders className="w-4 h-4 shrink-0" />
                  <span>Team Structure ({teamMembers.length})</span>
                </button>
              </li>
              <li>
                <button
                  id="tab-btn-alerts"
                  onClick={() => setActiveTab('alerts')}
                  className={`w-full flex items-center justify-between gap-1.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'alerts'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Bell className="w-4 h-4 shrink-0" />
                    <span className="truncate">Notification Alerts</span>
                  </div>
                  {adminAlerts.filter(al => !al.read).length > 0 && (
                    <span id="alerts-unread-badge" className="text-[10px] px-2 py-0.5 bg-rose-600 text-white font-extrabold rounded-full animate-pulse-ring shrink-0">
                      {adminAlerts.filter(al => !al.read).length}
                    </span>
                  )}
                </button>
              </li>
              <li>
                <button
                  id="tab-btn-ceo"
                  onClick={() => setActiveTab('ceo')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'ceo'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-500 fill-amber-500" />
                  <span>CEO Spiritual Profile</span>
                </button>
              </li>
            </ul>
          </div>

          <button
            id="admin-exit-btn"
            onClick={onClose}
            className="mt-6 py-2.5 w-full bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-white transition-all font-bold text-xs rounded-xl cursor-pointer"
          >
            Exit Developer Session
          </button>
        </div>

        {/* CONTENTS VIEWPORT */}
        <div className="flex-grow flex flex-col overflow-y-auto bg-slate-50 text-slate-800">
          
          <div className="p-6 sm:p-8 flex-grow">
            
            {/* Tab header title */}
            <div className="border-b border-slate-200 pb-5 mb-6 text-left flex items-center justify-between gap-4">
            <div className="flex-grow">
              <span className="text-[10px] text-sky-600 font-mono font-bold uppercase tracking-wider">
                Logged securely in Sandbox State
              </span>
              <h2 className="text-2xl font-black font-display tracking-tight text-slate-950 mt-0.5">
                {activeTab === 'metrics' && 'Override Transparency Metrics'}
                {activeTab === 'accounts' && 'Account database Auditor'}
                {activeTab === 'donations' && 'Live Donation transaction Logs'}
                {activeTab === 'publisher' && 'Cargo Publication Room'}
                {activeTab === 'testimonials' && 'Verified Donor Monthly Quotes'}
                {activeTab === 'platforms' && 'Crowdfunding Photo/Video Links'}
                {activeTab === 'team' && 'Organizational Post Hierarchy & Ranks'}
                {activeTab === 'alerts' && 'Admin Notification Alerts Hub'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors shrink-0 text-xs font-bold"
            >
              Back
            </button>

            {/* TAB VIEW 1: OVERRIDE METRICS */}
            {activeTab === 'metrics' && (
              <div id="panel-view-metrics" className="space-y-6 text-left max-w-2xl">
                {metricsFeedback && (
                  <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-850 rounded-xl text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{metricsFeedback}</span>
                  </div>
                )}

                <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3.5 mb-2">
                  <Database className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">Live Override Caution</h4>
                    <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                      Altering these values directly influences the primary counter trackers on the homepage. Live donors see goals, raised values, meals indices, and subscriber counts updated instantly in their browsers.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveMetrics} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 font-mono">
                        Financial Funding Target ($ USD)
                      </label>
                      <input
                        type="number"
                        placeholder="Target Goal"
                        value={goal}
                        onChange={(e) => setGoal(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 font-mono">
                        Simulated Total Raised ($ USD)
                      </label>
                      <input
                        type="number"
                        placeholder="Total Raised"
                        value={raised}
                        onChange={(e) => setRaised(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 font-mono">
                        Live Meals Served Index
                      </label>
                      <input
                        type="number"
                        placeholder="Meals count"
                        value={meals}
                        onChange={(e) => setMeals(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 font-mono">
                        Active Verified Donors Count
                      </label>
                      <input
                        type="number"
                        placeholder="Donors count"
                        value={donors}
                        onChange={(e) => setDonors(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                      />
                    </div>
                  </div>

                  <button
                    id="save-metrics-btn"
                    type="submit"
                    className="mt-4 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Override Tracker Metrics</span>
                    <Database className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB VIEW 2: DONATIONS LEDGER */}
            {activeTab === 'donations' && (
              <div id="panel-view-donations" className="space-y-4 text-left">
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed mb-4">
                  These records correspond to standard card, Google Pay, and preset gift transactions logged by testers or real participants. You can remove/refund any item to automatically correct global scores.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs text-slate-705">
                    <thead className="bg-slate-50 font-mono text-[10px] uppercase font-bold text-slate-500">
                      <tr>
                        <th className="px-5 py-4">Sponsor Details</th>
                        <th className="px-5 py-4">Date</th>
                        <th className="px-5 py-4">Pledge Amount</th>
                        <th className="px-5 py-4">Assigned Impact Outcome</th>
                        <th className="px-5 py-4 text-right">Refund Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {donations.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-10 text-slate-400 font-mono">
                            No donations transaction logged in this sandbox environment.
                          </td>
                        </tr>
                      ) : (
                        donations.map((d) => (
                          <tr key={d.id} className="hover:bg-slate-50/50">
                            <td className="px-5 py-4">
                              <span className="block font-bold text-slate-900">{d.name}</span>
                              <span className="block text-[10px] text-slate-500 mt-0.5">{d.email}</span>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{d.date}</td>
                            <td className="px-5 py-4 font-mono font-bold text-sky-600 text-sm">
                              ${d.amount.toLocaleString()}
                            </td>
                            <td className="px-5 py-4">
                              <span className="inline-block max-w-xs truncate text-[11px] text-slate-600" title={d.impact}>
                                {d.impact}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                id={`refund-donation-${d.id}`}
                                onClick={() => deleteDonation(d.id)}
                                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Refund transaction contribution"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB VIEW 3: USER ACCOUNT AUDIT */}
            {activeTab === 'accounts' && (
              <div id="panel-view-accounts" className="space-y-4 text-left">
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed mb-4">
                  Auditor grid displaying registered emails, enrollment dates, and financial counters for active accounts logged inside this browser's isolated local database storage modules.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                    <thead className="bg-slate-50 font-mono text-[10px] uppercase font-bold text-slate-505">
                      <tr>
                        <th className="px-5 py-4">Account Profile</th>
                        <th className="px-5 py-4">Privilege Role</th>
                        <th className="px-5 py-4">Joined On</th>
                        <th className="px-5 py-4">Personal Sponsor Size</th>
                        <th className="px-5 py-4 text-right">Delete Account</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {accounts.map((acc) => (
                        <tr key={acc.id} className="hover:bg-slate-50/50">
                          <td className="px-5 py-4">
                            <span className="block font-bold text-slate-900">{acc.name}</span>
                            <span className="block text-[10px] text-slate-500 mt-0.5">{acc.email}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase rounded-md font-mono ${
                              acc.role === 'admin' 
                                ? 'bg-amber-100 text-amber-805 border border-amber-200/50' 
                                : 'bg-sky-100 text-sky-805 border border-sky-200/50'
                            }`}>
                              {acc.role === 'admin' ? 'Developer (Admin)' : 'Sponsor User'}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-slate-600">{acc.createdAt}</td>
                          <td className="px-5 py-4 font-mono font-bold text-slate-900">
                            ${(acc.totalDonated || 0).toLocaleString()}
                          </td>
                          <td className="px-5 py-4 text-right">
                            {acc.id === 'acc_admin' ? (
                              <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase pr-2">PROTECTED</span>
                            ) : (
                              <button
                                id={`delete-account-${acc.id}`}
                                onClick={() => deleteAccount(acc.id)}
                                className="p-2 text-rose-550 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete user credentials"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB VIEW 4: DYNAMIC PUBLISHER */}
            {activeTab === 'publisher' && (
              <div id="panel-view-publisher" className="space-y-8 text-left max-w-3xl">
                
                {/* PART A: PUBLISH FIELD REPORT LOG */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 px-1.5 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-display">1. Push Dynamic Field Report Log</h3>
                      <p className="text-[11px] text-slate-500">Adds an item immediately inside the home screen's &ldquo;FIELD REPORT LOGS&rdquo; flow.</p>
                    </div>
                  </div>

                  {publishFeedback && (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-850 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{publishFeedback}</span>
                    </div>
                  )}

                  <form onSubmit={handlePublishUpdate} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-650 uppercase tracking-widest mb-1.5 font-mono">
                        Verification Category
                      </label>
                      <select
                        value={updateCat}
                        onChange={(e) => setUpdateCat(e.target.value as any)}
                        className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      >
                        <option value="relief">Emergency Relief</option>
                        <option value="water">Water Wells</option>
                        <option value="education">Education sponsorships</option>
                        <option value="milestone">Success Milestones</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-650 uppercase tracking-widest mb-1.5 font-mono">
                        Cargo/Update message content
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Dispatched a safe cargo trucks block holding fresh clinical nutrition cards to the Damascus valley caretakers..."
                        value={updateMsg}
                        onChange={(e) => setUpdateMsg(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      ></textarea>
                    </div>

                    {/* Choose high-quality safety preset photo or upload file */}
                    <ImageFileOrUrlSelector
                      idPrefix="panel-field-report"
                      imgUrl={customPhotoInput || selectedPhotoPreset}
                      onUrlChange={(url) => {
                        if (url.startsWith('data:')) {
                          setCustomPhotoInput(url);
                        } else {
                          // Check if chosen url exists as preset
                          const matched = photoPresets.find(p => p.url === url);
                          if (matched) {
                            setSelectedPhotoPreset(url);
                            setCustomPhotoInput('');
                          } else {
                            setCustomPhotoInput(url);
                          }
                        }
                      }}
                      presets={photoPresets}
                      label="Select or Upload Verification Photo"
                    />

                    <button
                      id="publish-update-submit"
                      type="submit"
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow"
                    >
                      <span>Publish Report Log</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </form>
                </div>

                {/* PART B: GALLERY MANAGEMENT */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 px-1.5 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center font-bold">
                      <Image className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-display">2. Archives Photo to Stories Gallery</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Post standard illustrations of resilience directly into the main stories galleries.</p>
                    </div>
                  </div>

                  <GalleryManager />
                </div>

              </div>
            )}

            {/* TAB VIEW 5: VERIFIED DONOR TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div id="panel-view-testimonials" className="space-y-6 text-left max-w-4xl">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 px-1.5 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center font-bold">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-display">Manage Verified Donor Testimonials</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Highlight direct quotes from verified recurring monthly guardians on the primary homepage corridor.</p>
                    </div>
                  </div>

                  {testimonialFeedback && (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-855 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{testimonialFeedback}</span>
                    </div>
                  )}

                  <form onSubmit={handleAddTestimonial} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-650 uppercase tracking-widest mb-1.5 font-mono">
                          Donor Full name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Elena Rostova"
                          value={testName}
                          onChange={(e) => setTestName(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-650 uppercase tracking-widest mb-1.5 font-mono">
                          Sponsor Location
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Zurich, Switzerland"
                          value={testLocation}
                          onChange={(e) => setTestLocation(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                          Giving Frequency
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Monthly Guardian, Core Sponsor"
                          value={testFrequency}
                          onChange={(e) => setTestFrequency(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                          Amount details
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. $45/mo, $300/mo"
                          value={testAmountDetails}
                          onChange={(e) => setTestAmountDetails(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                        Quote Content
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="e.g. Knowing that 100% of my monthly milk formulas sponsorship actually reaches the Damascus valley distribution truck gives our family absolute transparency peace of mind."
                        value={testQuote}
                        onChange={(e) => setTestQuote(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-655 tracking-widest uppercase mb-1.5 font-mono">
                        Select Donor Silhouette Avatar
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                        {[
                          { title: 'Female 1', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120' },
                          { title: 'Male 1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120' },
                          { title: 'Female 2', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120' },
                          { title: 'Male 2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120' }
                        ].map((av) => (
                          <button
                            id={`avatar-preset-${av.title.toLowerCase().replace(/\s+/g, '-')}`}
                            key={av.url}
                            type="button"
                            onClick={() => setTestAvatar(av.url)}
                            className={`p-2 border rounded-xl flex items-center gap-1.5 cursor-pointer text-left transition-all ${
                              testAvatar === av.url ? 'border-sky-500 bg-sky-50/50 text-sky-700' : 'border-slate-200 text-slate-650 hover:bg-slate-50'
                            }`}
                          >
                            <img src={av.url} className="w-8 h-8 rounded-full object-cover" alt="" referrerPolicy="no-referrer" />
                            <span className="text-[10px] font-semibold truncate">{av.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      id="submit-testimonial-btn"
                      type="submit"
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow animate-hover"
                    >
                      <span>Add Verified Donor Quote</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                {/* Testimonial Records Deck */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 font-display mb-4 font-black">Active Sponsoring Witnesses ({testimonials.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((test) => (
                      <div key={test.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start justify-between gap-3 text-left">
                        <div className="flex gap-2.5">
                          <img src={test.avatar} className="w-10 h-10 rounded-full object-cover border" alt="" referrerPolicy="no-referrer" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-905">{test.name}</h4>
                            <span className="text-[9px] text-slate-400 font-mono block mt-0.5">{test.location} • {test.frequency} ({test.amountDetails})</span>
                            <p className="text-[11px] text-slate-600 italic mt-1.5">&ldquo;{test.quote}&rdquo;</p>
                          </div>
                        </div>
                        <button
                          id={`delete-testimonial-${test.id}`}
                          onClick={() => deleteTestimonial(test.id)}
                          className="text-rose-600 hover:text-rose-850 p-1 hover:bg-rose-50 rounded-lg cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB VIEW 6: PLATFORM & RESOURCE LINKS */}
            {activeTab === 'platforms' && (
              <div id="panel-view-platforms" className="space-y-6 text-left max-w-4xl">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 px-1.5 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center font-bold">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-display">Sponsor & Crowdfund Platform Linkages</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Upload photo folders or direct video reports from other channels (GoFundMe, Patreon, YouTube, etc.) to expand impact visibility.</p>
                    </div>
                  </div>

                  {platformFeedback && (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-850 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{platformFeedback}</span>
                    </div>
                  )}

                  <form onSubmit={handleAddPlatformLink} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                          Campaign resource Title
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Field Operations Documentary"
                          value={linkTitle}
                          onChange={(e) => setLinkTitle(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                          Destination resource URL
                        </label>
                        <input
                          type="url"
                          required
                          placeholder="https://youtube.com/watch?v=..."
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                          Source platform Name
                        </label>
                        <select
                          value={linkPlatformName}
                          onChange={(e) => setLinkPlatformName(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-850 font-medium"
                        >
                          <option value="GoFundMe Tracker">GoFundMe Tracker</option>
                          <option value="YouTube Streams">YouTube Streams</option>
                          <option value="Patreon Circle">Patreon Circle</option>
                          <option value="JustGiving Field">JustGiving Field</option>
                          <option value="Interactive Drive">Interactive Drive File</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                          Media Entry type
                        </label>
                        <select
                          value={linkType}
                          onChange={(e) => setLinkType(e.target.value as any)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-850 font-medium"
                        >
                          <option value="link">Interactive Website Link</option>
                          <option value="video">Playable Video / Vlog Log</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                        Brief platform Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Watch the Damascus convoy dispatch drivers load local baby medicine packs on the dashboard livestream."
                        value={linkDescription}
                        onChange={(e) => setLinkDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      ></textarea>
                    </div>

                    {/* Preselected beautiful thumbnail presets */}
                    <div>
                      <label className="block text-xs font-bold text-slate-655 tracking-widest uppercase mb-1.5 font-mono">
                        Choose visual Thumbnail Preset
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                        {[
                          { title: 'Convoy trucks', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600' },
                          { title: 'Class desk', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600' },
                          { title: 'Tcaretaker tents', url: 'https://images.unsplash.com/photo-1504224494697-a87a270b7f08?auto=format&fit=crop&q=80&w=600' }
                        ].map((tn) => (
                          <button
                            id={`thumb-preset-${tn.title.toLowerCase().replace(/\s+/g, '-')}`}
                            key={tn.url}
                            type="button"
                            onClick={() => setLinkThumbnailUrl(tn.url)}
                            className={`p-1.5 border rounded-lg flex items-center gap-1.5 cursor-pointer text-left transition-all ${
                              linkThumbnailUrl === tn.url ? 'border-sky-550 bg-sky-50 text-sky-750' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <img src={tn.url} className="w-8 h-8 rounded object-cover" alt="" referrerPolicy="no-referrer" />
                            <span className="text-[10px] font-semibold truncate">{tn.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      id="submit-platform-link-btn"
                      type="submit"
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow"
                    >
                      <span>Upload Alternative Platform Link</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                {/* Uploaded Platform nodes deck */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 font-display mb-4">Uploaded Platform Linkages ({platformVideoLinks.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {platformVideoLinks.map((link) => (
                      <div key={link.id} className="rounded-xl border border-slate-100 bg-slate-50 overflow-hidden flex flex-col justify-between text-left">
                        <div className="p-3">
                          <img src={link.thumbnailUrl} className="w-full h-24 object-cover rounded-lg border" alt="" referrerPolicy="no-referrer" />
                          <h4 className="text-xs font-bold text-slate-900 mt-2.5 flex items-center gap-1">
                            {link.type === 'video' ? <Video className="w-3.5 h-3.5 text-sky-600 shrink-0" /> : <Plus className="w-3.5 h-3.5 text-indigo-505 shrink-0" />}
                            {link.title}
                          </h4>
                          <span className="text-[9px] font-semibold bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded mt-1 inline-block font-mono">
                            {link.platformName} • {link.type}
                          </span>
                          <p className="text-[10px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{link.description}</p>
                        </div>
                        <div className="p-3 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <span className="text-[9px] text-slate-400 font-mono truncate max-w-[120px]" title={link.url}>{link.url}</span>
                          <button
                            id={`delete-platform-${link.id}`}
                            onClick={() => deletePlatformVideoLink(link.id)}
                            className="p-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB VIEW 7: TEAM STRUCTURE MANAGER */}
            {activeTab === 'team' && (
              <div id="panel-view-team" className="space-y-6 text-left max-w-4xl font-sans">
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 px-1.5 bg-amber-100 text-amber-805 rounded-lg flex items-center justify-center font-bold">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-905 font-display">Organizational Post Hierarchy & Rank Assign</h3>
                      <p className="text-[11px] text-slate-500">Add team members or re-assign level ranks sequentially from largest posts (Ranks 4-5) up to CEOs (Ranks 1-2).</p>
                    </div>
                  </div>

                  {teamFeedback && (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-850 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{teamFeedback}</span>
                    </div>
                  )}

                  <form onSubmit={handleAddTeamMemberSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-650 uppercase tracking-widest mb-1.5 font-mono">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Samuel Ajak"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                          Assign Role Title
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Lead Logistics Dispatch"
                          value={teamRole}
                          onChange={(e) => setTeamRole(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                          Hierarchy Rank (1=CEO, 5=Intern)
                        </label>
                        <select
                          value={teamRank}
                          onChange={(e) => setTeamRank(Number(e.target.value))}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                        >
                          <option value="1">Rank 1: Chief Executive Officer (CEO)</option>
                          <option value="2">Rank 2: Director/Caretaker President</option>
                          <option value="3">Rank 3: Lead Regional Coordinator</option>
                          <option value="4">Rank 4: Field Convoy Manager</option>
                          <option value="5">Rank 5: Dispatch Intern / Volunteer</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                          Public Contact Email
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. dispatch@charity.org"
                          value={teamEmail}
                          onChange={(e) => setTeamEmail(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <ImageFileOrUrlSelector
                          idPrefix="team-member"
                          imgUrl={teamAvatar}
                          onUrlChange={setTeamAvatar}
                          presets={[
                            { title: 'Male Profile 1 (Default)', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120' },
                            { title: 'Female Profile 1', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120' },
                            { title: 'Male Profile 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120' },
                            { title: 'Female Profile 2', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120' }
                          ]}
                          label="Select or Upload Team Member Photo"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-655 uppercase tracking-widest mb-1.5 font-mono">
                        Short Biography & Field Experience
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="e.g. Coordinates physical warehouses storing relief food pallets and distributes hot dinners with local Syrian supervisors since 2021."
                        value={teamBio}
                        onChange={(e) => setTeamBio(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      ></textarea>
                    </div>

                    <button
                      id="onboard-team-submit-btn"
                      type="submit"
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow"
                    >
                      <span>Onboard New Colleague</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                {/* Team Ranks list visual deck */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-905 font-display mb-4 font-black">Assign & Audit Team Hierarchy ({teamMembers.length})</h3>
                  <p className="text-xs text-slate-400 mb-4 leading-normal">
                    Admins can promote/demote colleagues using the Rank controls and assign organizational coordinates instantly.
                  </p>
                  
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="p-3 sm:p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                        <div className="flex items-center gap-3">
                          <img src={member.avatar} className="w-10 h-10 rounded-xl object-cover border" alt="" referrerPolicy="no-referrer" />
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-display flex flex-wrap items-center gap-1.5 leading-none">
                              {member.name}
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded font-bold bg-amber-100 text-amber-900 border">Rank {member.rank}</span>
                            </h4>
                            <span className="text-[10px] text-sky-650 font-bold block mt-1">{member.role}</span>
                            <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2 max-w-xl">{member.bio}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <span className="text-[9px] font-mono uppercase font-bold text-slate-400">Shift Rank:</span>
                          <button
                            id={`promote-team-${member.id}`}
                            onClick={() => handleUpdateRank(member.id, member.rank - 1)}
                            disabled={member.rank <= 1}
                            className="p-1 px-1.5 bg-white border border-slate-200 text-slate-705 hover:border-sky-300 rounded disabled:opacity-50 cursor-pointer"
                            title="Promote level"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            id={`demote-team-${member.id}`}
                            onClick={() => handleUpdateRank(member.id, member.rank + 1)}
                            disabled={member.rank >= 5}
                            className="p-1 px-1.5 bg-white border border-slate-200 text-slate-750 hover:border-sky-305 rounded disabled:opacity-50 cursor-pointer"
                            title="Demote level"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>

                          <div className="w-px h-6 bg-slate-200 mx-1"></div>

                          <button
                            id={`delete-team-${member.id}`}
                            onClick={() => deleteTeamMember(member.id)}
                            className="text-rose-600 hover:text-rose-850 p-2 hover:bg-rose-50 rounded-lg cursor-pointer"
                            title="De-assign post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB VIEW 8: NOTIFICATION ALERTS */}
            {activeTab === 'alerts' && (
              <div id="panel-view-alerts" className="space-y-6 text-left">
                {/* Statistics and summary cards for alerts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-left">
                    <span className="text-[10px] text-amber-800 font-mono font-bold uppercase tracking-wider block">Unread Alerts</span>
                    <span id="stat-unread-count" className="text-3xl font-black text-amber-955 mt-1 block">
                      {adminAlerts.filter(al => !al.read).length}
                    </span>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left">
                    <span className="text-[10px] text-emerald-800 font-mono font-bold uppercase tracking-wider block">High-Value Donations</span>
                    <span className="text-3xl font-black text-emerald-955 mt-1 block">
                      {adminAlerts.filter(al => al.type === 'donation').length}
                    </span>
                  </div>
                  <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 text-left">
                    <span className="text-[10px] text-sky-800 font-mono font-bold uppercase tracking-wider block">Inquiries Received</span>
                    <span className="text-3xl font-black text-sky-955 mt-1 block">
                      {adminAlerts.filter(al => al.type === 'contact').length}
                    </span>
                  </div>
                </div>

                {/* Operations bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 text-left">
                  <span className="text-xs text-slate-500 font-semibold">
                    Total of <strong className="text-slate-900">{adminAlerts.length}</strong> logged developer system entries.
                  </span>
                  {adminAlerts.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        id="alerts-bulk-read-btn"
                        onClick={() => {
                          adminAlerts.forEach(al => {
                            if (!al.read) markAlertAsRead(al.id);
                          });
                        }}
                        className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:text-slate-950 transition-all text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Mark All Read
                      </button>
                      <button
                        id="alerts-bulk-clear-btn"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete all alert history?')) {
                            adminAlerts.forEach(al => deleteAdminAlert(al.id));
                          }
                        }}
                        className="py-1.5 px-3 bg-rose-50 border border-rose-100 text-rose-700 hover:bg-rose-105 transition-all text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Clear Alerts logs
                      </button>
                    </div>
                  )}
                </div>

                {/* Alert Items List */}
                {adminAlerts.length === 0 ? (
                  <div id="alerts-empty-state" className="bg-white rounded-3xl p-12 border border-slate-200 text-center max-w-lg mx-auto my-6">
                    <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Inbox className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">System Logs Clear</h3>
                    <p className="text-slate-500 text-xs mt-1.5 max-w-xs mx-auto">
                      No high-value donations or contact inquiries have been logged yet. Test this by making a donation of $100+ or submitting an inquiry!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-3xl">
                    {adminAlerts.map((alert) => (
                      <div
                        id={`alert-card-${alert.id}`}
                        key={alert.id}
                        className={`p-5 rounded-2xl bg-white border transition-all ${
                          alert.read 
                            ? 'border-slate-200 drop-shadow-sm opacity-90' 
                            : 'border-amber-350 ring-1 ring-amber-300/30 shadow-md bg-amber-50/5'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
                          <div className="flex items-center gap-2.5">
                            {/* Type Icon Badge */}
                            <div className={`p-2 rounded-xl shrink-0 ${
                              alert.type === 'donation' 
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                : 'bg-sky-50 text-sky-600 border border-sky-100'
                            }`}>
                              {alert.type === 'donation' ? <Heart className="w-4 h-4 fill-current text-emerald-500" /> : <MessageSquare className="w-4 h-4" />}
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] uppercase tracking-widest font-mono font-bold ${
                                  alert.type === 'donation' ? 'text-emerald-700' : 'text-sky-700'
                                }`}>
                                  {alert.type === 'donation' ? 'High-Value Donation' : 'Contact Submission'}
                                </span>
                                {!alert.read && (
                                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Unacknowledged Alert"></span>
                                )}
                              </div>
                              <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">{alert.title}</h4>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 self-end sm:self-center text-xs text-slate-500 font-mono">
                            <span>{alert.timestamp}</span>
                          </div>
                        </div>

                        <p className="text-slate-700 text-xs font-semibold leading-relaxed mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-left">
                          {alert.message}
                        </p>

                        {/* Metadata grid summary details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/60 p-3.5 rounded-xl border border-slate-100/50 text-xs mb-4 text-left">
                          <div>
                            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Contact Name</span>
                            <span className="font-bold text-slate-800">{alert.meta.name}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Associated Email</span>
                            <span className="font-semibold text-slate-650 font-mono">{alert.meta.email}</span>
                          </div>
                          {alert.type === 'donation' && alert.meta.amount && (
                            <div className="sm:col-span-2">
                              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Contribution Amount</span>
                              <span className="font-extrabold text-emerald-700 font-mono text-sm">+${alert.meta.amount}.00 USD (Pre-Authorized)</span>
                            </div>
                          )}
                          {alert.type === 'contact' && alert.meta.message && (
                            <div className="sm:col-span-2">
                              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Full Inquiry Message</span>
                              <blockquote className="border-l-2 border-slate-300 pl-2.5 py-1 text-slate-600 italic mt-1 font-medium bg-white/60 rounded p-2">
                                "{alert.meta.message}"
                              </blockquote>
                            </div>
                          )}
                        </div>

                        {/* Actions row */}
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                          {!alert.read && (
                            <button
                              id={`alert-ack-btn-${alert.id}`}
                              onClick={() => markAlertAsRead(alert.id)}
                              className="py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 hover:text-black transition-all text-xs font-extrabold rounded-lg cursor-pointer flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Acknowledge Alert
                            </button>
                          )}
                          <button
                            id={`alert-del-btn-${alert.id}`}
                            onClick={() => deleteAdminAlert(alert.id)}
                            className="p-1.5 border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs"
                            title="Delete log"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CEO SPIRITUAL PROFILE TAB */}
            {activeTab === 'ceo' && (
              <div id="tab-content-ceo" className="space-y-6">
                <div className="text-left">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-bold uppercase tracking-widest font-mono mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    CEO Profile & Faith Journey Editor
                  </span>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    Configure Ivan Mulindwa's deeply moving spiritual story, photos, and each of the seven Bible verses displayed in the interactive CEO Profile view.
                  </p>
                </div>

                {ceoFormFeedback && (
                  <div className="p-4 bg-amber-50 border border-amber-250 text-amber-900 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-left animate-slide-in">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>{ceoFormFeedback}</span>
                  </div>
                )}

                <form onSubmit={handleSaveCEOProfile} className="space-y-6 max-w-4xl text-left bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
                  
                  {/* Part 1: General Core Profile Details */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 space-y-4">
                    <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
                      <span className="w-2 h-2 rounded bg-amber-500"></span>
                      1. Core Identity & Profile Photo
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider font-mono">
                          CEO's Name
                        </label>
                        <input
                          type="text"
                          value={ceoNameForm}
                          onChange={(e) => setCeoNameForm(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-hidden transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider font-mono">
                          CEO's Official Title / Role
                        </label>
                        <input
                          type="text"
                          value={ceoRoleForm}
                          onChange={(e) => setCeoRoleForm(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-hidden transition-colors"
                          required
                        />
                      </div>
                      <div className="md:col-span-2 text-slate-800">
                        <ImageFileOrUrlSelector
                          idPrefix="ceo-portrait"
                          imgUrl={ceoAvatarForm}
                          onUrlChange={setCeoAvatarForm}
                          presets={[
                            { title: 'Ivan Mulindwa (Default)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300' },
                            { title: 'Alternative Portrait', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300' }
                          ]}
                          label="Select or Upload CEO's Profile Portrait"
                          detailsLabel="CEO Portrait Caption / Alt text"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Part 2: Moving sister Cry & Call */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 space-y-4">
                    <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
                      <span className="w-2 h-2 rounded bg-amber-500"></span>
                      2. Primary Story Motivation
                    </h3>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider font-mono">
                        Story View Heading
                      </label>
                      <input
                        type="text"
                        value={ceoStoryTitleForm}
                        onChange={(e) => setCeoStoryTitleForm(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-hidden transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider font-mono">
                        Story Narrative Intro (Childhood Memories)
                      </label>
                      <textarea
                        value={ceoStoryIntroForm}
                        onChange={(e) => setCeoStoryIntroForm(e.target.value)}
                        rows={4}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-hidden transition-colors font-sans"
                        required
                      />
                    </div>
                  </div>

                  {/* Part 3: The Bible Verses & References (Verses 1, 2, 3) */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 space-y-4">
                    <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
                      <span className="w-2 h-2 rounded bg-amber-500"></span>
                      3. Spiritual Foundation (Bible Verses 1 - 3)
                    </h3>

                    <div className="space-y-4 border-b border-slate-800 pb-4">
                      <span className="text-[10px] text-amber-500 font-bold font-mono tracking-widest block"> BIBLE VERSE #1 </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Verse Text</label>
                          <input
                            type="text"
                            value={ceoVerse1TextForm}
                            onChange={(e) => setCeoVerse1TextForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Scripture Reference</label>
                          <input
                            type="text"
                            value={ceoVerse1RefForm}
                            onChange={(e) => setCeoVerse1RefForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 border-b border-slate-800 pb-4 mt-2">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider font-mono">
                        "The Turning Point" Supporting Narrative text
                      </label>
                      <textarea
                        value={ceoTurningPointForm}
                        onChange={(e) => setCeoTurningPointForm(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white font-sans"
                        required
                      />
                    </div>

                    <div className="space-y-4 border-b border-slate-800 pb-4 mt-2">
                      <span className="text-[10px] text-sky-400 font-bold font-mono tracking-widest block"> BIBLE VERSE #2 </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Verse Text</label>
                          <input
                            type="text"
                            value={ceoVerse2TextForm}
                            onChange={(e) => setCeoVerse2TextForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Scripture Reference</label>
                          <input
                            type="text"
                            value={ceoVerse2RefForm}
                            onChange={(e) => setCeoVerse2RefForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 border-b border-slate-800 pb-4 mt-2">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider font-mono">
                        "From Mud Floor to University" Supporting Narrative text
                      </label>
                      <textarea
                        value={ceoAcademicHistoryForm}
                        onChange={(e) => setCeoAcademicHistoryForm(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white"
                        required
                      />
                    </div>

                    <div className="space-y-4 mt-2">
                      <span className="text-[10px] text-emerald-400 font-bold font-mono tracking-widest block"> BIBLE VERSE #3 </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Verse Text</label>
                          <input
                            type="text"
                            value={ceoVerse3TextForm}
                            onChange={(e) => setCeoVerse3TextForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Scripture Reference</label>
                          <input
                            type="text"
                            value={ceoVerse3RefForm}
                            onChange={(e) => setCeoVerse3RefForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Part 4: The Impact details & Verses (Verses 4, 5, 6, 7) */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 space-y-4">
                    <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
                      <span className="w-2 h-2 rounded bg-amber-500"></span>
                      4. Achievements & Spiritual Calling (Bible Verses 4 - 7)
                    </h3>

                    <div className="space-y-4 border-b border-slate-800 pb-4">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider font-mono">
                        Good Samaritan Accomplishments List
                      </label>
                      <textarea
                        value={ceoAccomplishmentsForm}
                        onChange={(e) => setCeoAccomplishmentsForm(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white"
                        required
                      />
                    </div>

                    <div className="space-y-4 border-b border-slate-800 pb-4 mt-2">
                      <span className="text-[10px] text-amber-500 font-bold font-mono tracking-widest block"> BIBLE VERSE #4 </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Verse Text</label>
                          <input
                            type="text"
                            value={ceoVerse4TextForm}
                            onChange={(e) => setCeoVerse4TextForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Scripture Reference</label>
                          <input
                            type="text"
                            value={ceoVerse4RefForm}
                            onChange={(e) => setCeoVerse4RefForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 border-b border-slate-800 pb-4 mt-2">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider font-mono">
                        "I Am Not a Hero" Supporting Narrative text
                      </label>
                      <textarea
                        value={ceoNotAHeroForm}
                        onChange={(e) => setCeoNotAHeroForm(e.target.value)}
                        rows={2}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white"
                        required
                      />
                    </div>

                    <div className="space-y-4 border-b border-slate-800 pb-4 mt-2">
                      <span className="text-[10px] text-indigo-400 font-bold font-mono tracking-widest block"> BIBLE VERSE #5 </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Verse Text</label>
                          <input
                            type="text"
                            value={ceoVerse5TextForm}
                            onChange={(e) => setCeoVerse5TextForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Scripture Reference</label>
                          <input
                            type="text"
                            value={ceoVerse5RefForm}
                            onChange={(e) => setCeoVerse5RefForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 border-b border-slate-800 pb-4 mt-2">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider font-mono">
                        "Cannot Do This Alone" Supporting Narrative text
                      </label>
                      <textarea
                        value={ceoCannotDoAloneForm}
                        onChange={(e) => setCeoCannotDoAloneForm(e.target.value)}
                        rows={2}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white"
                        required
                      />
                    </div>

                    <div className="space-y-4 border-b border-slate-800 pb-4 mt-2">
                      <span className="text-[10px] text-rose-400 font-bold font-mono tracking-widest block"> BIBLE VERSE #6 </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Verse Text</label>
                          <input
                            type="text"
                            value={ceoVerse6TextForm}
                            onChange={(e) => setCeoVerse6TextForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Scripture Reference</label>
                          <input
                            type="text"
                            value={ceoVerse6RefForm}
                            onChange={(e) => setCeoVerse6RefForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 border-b border-slate-800 pb-4 mt-2">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider font-mono">
                        Call to Action Details (Pledge values)
                      </label>
                      <textarea
                        value={ceoCallToActionForm}
                        onChange={(e) => setCeoCallToActionForm(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white"
                        required
                      />
                    </div>

                    <div className="space-y-4 border-b border-slate-800 pb-4 mt-2">
                      <span className="text-[10px] text-amber-500 font-bold font-mono tracking-widest block"> BIBLE VERSE #7 </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Verse Text</label>
                          <input
                            type="text"
                            value={ceoVerse7TextForm}
                            onChange={(e) => setCeoVerse7TextForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase font-mono">Scripture Reference</label>
                          <input
                            type="text"
                            value={ceoVerse7RefForm}
                            onChange={(e) => setCeoVerse7RefForm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mt-2">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider font-mono">
                        Closing Faith Prayer
                      </label>
                      <textarea
                        value={ceoClosingPrayerForm}
                        onChange={(e) => setCeoClosingPrayerForm(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white font-sans"
                        required
                      />
                    </div>
                  </div>

                  {/* Submission triggers */}
                  <div className="flex gap-3 justify-end pt-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('metrics')}
                      className="py-2 px-4 bg-slate-800 hover:bg-slate-705 text-slate-350 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-6 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Save CEO Spiritual calling
                    </button>
                  </div>

                </form>
              </div>
            )}


          </div>

          <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>DATABASE ENGINES: localStorage Live Cache</span>
            <span>SECURE SANDBOX ROOT ACCESS</span>
          </div>

        </div>
        </div>

      </motion.div>
    </div>
  );
}

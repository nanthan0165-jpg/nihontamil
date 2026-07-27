import React, { useState } from 'react';
import { useStore } from '../store';
import { 
  PlayCircle, Book, Type, List, ArrowBigUp, ArrowBigDown, 
  MessageSquare, Share2, Sparkles, Flame, Search, Award, 
  Info, Volume2, Heart, ChevronRight, Eye, Video, Users, 
  Hash, ExternalLink, BookmarkCheck, LayoutGrid, Calendar
} from 'lucide-react';
import { cn } from '../lib/utils';
import { LearningRoadmap } from '../components/LearningRoadmap';

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
  avatarColor: string;
}

interface FeedPost {
  id: string;
  type: 'youtube' | 'reddit_text' | 'reddit_image';
  subreddit: string;
  author: string;
  time: string;
  title: string;
  content: string;
  japaneseText?: string;
  hiragana?: string;
  tamilPronunciation?: string;
  level: string;
  upvotes: number;
  userVote: 'up' | 'down' | null;
  commentsCount: number;
  comments: Comment[];
  category: 'lessons' | 'grammar' | 'vocabulary' | 'kanji' | 'culture';
  videoDuration?: string;
  videoViews?: string;
}

export function HomeView({ setTab }: { setTab: (tab: string) => void }) {
  const { theme, progress, playAudio } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'lessons' | 'grammar' | 'vocabulary' | 'kanji' | 'culture'>('all');
  const [sortMethod, setSortMethod] = useState<'hot' | 'new' | 'top'>('hot');
  
  // Interactive UI States
  const [posts, setPosts] = useState<FeedPost[]>([
    {
      id: "post_l1",
      type: "youtube",
      subreddit: "c/NihonTamilLessons",
      author: "Tamilarasan_Sensei",
      time: "2 hours ago",
      title: "ஜப்பானிய வாழ்த்துக்கள் | பாடம் 1 (Greetings in Japanese via Tamil)",
      content: "ஜப்பானிய மொழியின் மிக முக்கியமான ஆரம்ப கட்ட வாழ்த்துக்களை தமிழின் எளிய உதாரணங்களுடன் கற்கலாம். கொன்னிச்சிவா (வணக்கம்), ஒஹாயோ கோசாய்மாஸ் (காலை வணக்கம்), கொம்பன்வா (மாலை வணக்கம்) ஆகியவற்றின் சரியான உச்சரிப்பு மற்றும் பின்னணி தகவல்களை விளக்கும் சிறப்பு காணொளி வடிவிலான பாடம்.",
      japaneseText: "こんにちは",
      hiragana: "こんにちは",
      tamilPronunciation: "கொன்னிச்சிவா",
      level: "N5",
      upvotes: 245,
      userVote: null,
      commentsCount: 3,
      comments: [
        { id: "c1_1", author: "Karthik_99", text: "உச்சரிப்புகள் மிகவும் துல்லியமாக உள்ளன! நன்றி ஐயா.", time: "1 hour ago", avatarColor: "bg-blue-500" },
        { id: "c1_2", author: "Deepa_Ram", text: "வார்த்தைகளின் பின்னணி விளக்கியது அருமை.", time: "45 mins ago", avatarColor: "bg-purple-500" },
        { id: "c1_3", author: "Selva_JP", text: "ஜப்பானிய எழுத்துக்களையும் சேர்த்து விளக்கியது பயனுள்ளதாக இருக்கிறது.", time: "10 mins ago", avatarColor: "bg-emerald-500" }
      ],
      category: "lessons",
      videoDuration: "4:15",
      videoViews: "1.4k views"
    },
    {
      id: "post_g1",
      type: "reddit_text",
      subreddit: "r/GrammarHacks",
      author: "JP_Grammar_Master",
      time: "5 hours ago",
      title: "Why is 'は' (wa) written as 'ha' but pronounced as 'wa' in particles? 🧐",
      content: "பல ஆரம்ப நிலை ஜப்பானிய மாணவர்கள் கேட்கும் கேள்வி: வாக்கியங்களில் 'は' என்ற எழுத்தை 'wa' என உச்சரிக்கிறோம், ஆனால் எழுதும்போது 'ha' என எழுதுகிறோம். ஏன்?\n\nகாரணம்: 1946-ஆம் ஆண்டுக்கு முந்தைய வரலாற்று ரீதியான எழுத்து முறை சீர்திருத்தங்கள். பழைய ஜப்பானிய மொழியில் பல எழுத்துக்கள் வெவ்வேறு உச்சரிப்புகளைக் கொண்டிருந்தன. சீர்திருத்தத்திற்குப் பிறகு, 'வாக்கிய இணைப்பு' (Topic Particle) ஆகப் பயன்படுத்தப்படும் போது மட்டும் 'は' என்ற எழுத்தை 'wa' என்று உச்சரிக்க வேண்டும் என்ற விதிமுறை நிலைபெற்றது.",
      japaneseText: "これは本です",
      hiragana: "これはほんです",
      tamilPronunciation: "கொரே வா ஹொன் தெஸ்",
      level: "N5",
      upvotes: 412,
      userVote: null,
      commentsCount: 2,
      comments: [
        { id: "c2_1", author: "TamilNihon_Learner", text: "இது எனக்கு நீண்ட நாட்களாக இருந்த சந்தேகம். தெளிவான விளக்கத்திற்கு நன்றி!", time: "3 hours ago", avatarColor: "bg-amber-500" },
        { id: "c2_2", author: "Arun_Kumar", text: "இலக்கண குறிப்புகள் மிகவும் எளிமையாக உள்ளன.", time: "2 hours ago", avatarColor: "bg-rose-500" }
      ],
      category: "grammar"
    },
    {
      id: "post_k1",
      type: "reddit_image",
      subreddit: "r/KanjiHacks",
      author: "Anbu_Sensei",
      time: "1 day ago",
      title: "மரம் ➔ தோப்பு ➔ காடு: படக் குறியீடுகள் மூலம் கஞ்சியை எளிதாக நினைவில் வையுங்கள்! 🌳",
      content: "ஜப்பானிய மொழியின் கஞ்சி (Kanji) எழுத்துக்கள் அனைத்தும் சித்திரக் குறியீடுகளிலிருந்து உருவானவை. இதோ ஒரு அருமையான உதாரணம்:\n\n1. 木 (Ki) = ஒரு மரம் (Tree)\n2. 林 (Hayashi) = இரண்டு மரங்கள் சேர்ந்தால் 'தோப்பு' (Grove)\n3. 森 (Mori) = மூன்று மரங்கள் சேர்ந்தால் 'காடு' (Forest)\n\nஇதுபோன்ற சுவாரசியமான தொடர்புகளைக் கவனித்தால் கஞ்சி மிக எளிதாக உங்கள் மனதில் பதியும்!",
      japaneseText: "木 林 森",
      hiragana: "き • はやし • もり",
      tamilPronunciation: "கி • ஹயாஷி • மொரி",
      level: "N5",
      upvotes: 567,
      userVote: null,
      commentsCount: 2,
      comments: [
        { id: "c3_1", author: "Vicky_Tamil", text: "Wow, super connection! கஞ்சி கற்கும் ஆர்வம் இப்போது அதிகரித்துள்ளது.", time: "18 hours ago", avatarColor: "bg-pink-500" },
        { id: "c3_2", author: "Nirmala_S", text: "மூன்று மரங்கள் காடு, மிக அருமையான தர்க்கம்!", time: "12 hours ago", avatarColor: "bg-teal-500" }
      ],
      category: "kanji"
    },
    {
      id: "post_v1",
      type: "youtube",
      subreddit: "c/NihonTamilShorts",
      author: "Suji_Sensei",
      time: "18 hours ago",
      title: "ஜப்பானிய மொழியில் நன்றி கூறுவது எப்படி? | Casual 'ありがとう' vs Polite 'ありがとうございます'",
      content: "ஜப்பானிய கலாச்சாரத்தில் மரியாதை மிக முக்கியம். உங்கள் நண்பர்களிடம் பேசும்போது 'அரிகத்தோ' (ありがとう) என்று கூறலாம். ஆனால் ஆசிரியர்கள், பெரியவர்கள் அல்லது புதியவர்களிடம் பேசும்போது எப்போதும் 'அரிகத்தோ கோசாய்மாஸ்' (ありがとうございます) என்றே கூற வேண்டும்.",
      japaneseText: "ありがとうございます",
      hiragana: "ありがとうございます",
      tamilPronunciation: "அரிகத்தோ கோசாய்மாஸ்",
      level: "N5",
      upvotes: 189,
      userVote: null,
      commentsCount: 1,
      comments: [
        { id: "c4_1", author: "Senthil_V", text: "அலுவலகங்களில் எதை உபயோகிக்க வேண்டும்?", time: "15 hours ago", avatarColor: "bg-indigo-500" }
      ],
      category: "vocabulary",
      videoDuration: "0:59",
      videoViews: "3.1k views"
    },
    {
      id: "post_c1",
      type: "reddit_text",
      subreddit: "r/JapanCulture",
      author: "Meena_Tokyo",
      time: "2 days ago",
      title: "ஜப்பானிய கலாச்சாரத்தில் ஓஜிகி (தலைவணங்குதல்) முறைகள் 🙇‍♂️",
      content: "ஜப்பானியர்கள் ஒருவரையொருவர் சந்திக்கும் போது தலைவணங்குவது (ஓஜிகி) வழக்கமாகும். வணங்கும் கோணத்தைப் பொருத்து மரியாதையின் அளவு மாறுபடும்:\n\n• 15 டிகிரி (Eshaku): நண்பர்கள் அல்லது சக ஊழியர்களிடம் எளிய வாழ்த்துக்களைப் பகிர.\n• 30 டிகிரி (Keirei): வாடிக்கையாளர்கள், மேலாளர்கள் அல்லது பெரியவர்களுக்கு மரியாதை செலுத்த.\n• 45 டிகிரி (Saikeirei): மிக உயர்ந்த மரியாதை அல்லது தீவிர மன்னிப்புக் கேட்க.",
      level: "General",
      upvotes: 311,
      userVote: null,
      commentsCount: 1,
      comments: [
        { id: "c5_1", author: "Ravi_JP", text: "இதை ஜப்பானிய நாடகங்களில் நிறைய பார்த்துள்ளேன். இப்போதுதான் சரியான பொருள் தெரிந்தது.", time: "1 day ago", avatarColor: "bg-cyan-500" }
      ],
      category: "culture"
    }
  ]);

  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // Filter Categories list
  const categories = [
    { id: 'all', label: 'முழுவதும் (All)', icon: <LayoutGrid size={15} /> },
    { id: 'lessons', label: 'பாடங்கள் (Lessons)', icon: <PlayCircle size={15} /> },
    { id: 'grammar', label: 'இலக்கணம் (Grammar)', icon: <Book size={15} /> },
    { id: 'vocabulary', label: 'சொற்கள் (Vocabulary)', icon: <List size={15} /> },
    { id: 'kanji', label: 'கஞ்சி (Kanji)', icon: <Type size={15} /> },
    { id: 'culture', label: 'கலாச்சாரம் (Culture)', icon: <Users size={15} /> },
  ] as const;

  // Handle upvoting/downvoting
  const handleVote = (postId: string, direction: 'up' | 'down') => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      
      let upvoteDiff = 0;
      let newVote: 'up' | 'down' | null = null;

      if (direction === 'up') {
        if (post.userVote === 'up') {
          upvoteDiff = -1;
          newVote = null;
        } else if (post.userVote === 'down') {
          upvoteDiff = 2;
          newVote = 'up';
        } else {
          upvoteDiff = 1;
          newVote = 'up';
        }
      } else {
        if (post.userVote === 'down') {
          upvoteDiff = 1;
          newVote = null;
        } else if (post.userVote === 'up') {
          upvoteDiff = -2;
          newVote = 'down';
        } else {
          upvoteDiff = -1;
          newVote = 'down';
        }
      }

      return {
        ...post,
        upvotes: post.upvotes + upvoteDiff,
        userVote: newVote
      };
    }));
  };

  // Add Comment
  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;

    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      const newComment: Comment = {
        id: `c_user_${Date.now()}`,
        author: "You (உங்களை)",
        text: commentText,
        time: "Just now",
        avatarColor: "bg-red-600"
      };
      return {
        ...post,
        commentsCount: post.commentsCount + 1,
        comments: [...post.comments, newComment]
      };
    }));

    setCommentText('');
  };

  // Copy Post Link mock
  const handleShare = (postId: string) => {
    setCopiedPostId(postId);
    navigator.clipboard?.writeText?.(`${window.location.origin}/#post-${postId}`);
    setTimeout(() => {
      setCopiedPostId(null);
    }, 2000);
  };

  // Filter and sort mechanism
  const filteredPosts = posts
    .filter(post => {
      const matchQuery = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subreddit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.japaneseText && post.japaneseText.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCategory = activeFilter === 'all' || post.category === activeFilter;
      return matchQuery && matchCategory;
    })
    .sort((a, b) => {
      if (sortMethod === 'new') return 1; // simulation
      if (sortMethod === 'top') return b.upvotes - a.upvotes;
      return b.upvotes - a.upvotes; // default hot
    });

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
      {/* Top Welcome Card with Streaks */}
      <div className={cn(
        "p-5 sm:p-6 rounded-2xl border mb-6 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-5 transition-all duration-300 w-full",
        theme === 'dark' 
          ? "bg-gradient-to-r from-[#18181b] to-[#272727] border-gray-800" 
          : "bg-gradient-to-r from-gray-50 to-white border-gray-200 shadow-sm"
      )}>
        <div className="w-full md:w-auto flex flex-col justify-center">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 flex-wrap">
            மீண்டும் வருக! <Sparkles className="text-amber-500 animate-pulse shrink-0" size={20} />
          </h1>
          <p className={cn("text-xs sm:text-sm mt-1.5 leading-relaxed", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
            தமிழ் வழியாக ஜப்பானிய மொழியைக் கற்கும் தனித்துவமான கூட்டு சமூக மேடை.
          </p>
        </div>
        <div className="grid grid-cols-2 md:flex items-center gap-3 w-full md:w-auto shrink-0">
          <div className="flex items-center gap-3 p-3.5 sm:px-4 sm:py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl w-full">
            <Flame className="text-amber-500 animate-bounce shrink-0" size={20} />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] sm:text-xs text-amber-500 font-bold uppercase tracking-wider leading-tight">செயல்பாட்டு நாட்கள்</div>
              <div className="text-sm sm:text-base font-extrabold mt-0.5">{progress.streak} நாட்கள்</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 sm:px-4 sm:py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl w-full">
            <Award className="text-emerald-500 shrink-0" size={20} />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] sm:text-xs text-emerald-500 font-bold uppercase tracking-wider leading-tight">கற்ற சொற்கள்</div>
              <div className="text-sm sm:text-base font-extrabold mt-0.5">{progress.masteredVocab.length} வார்த்தைகள்</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Roadmap Guide Section */}
      <LearningRoadmap setTab={setTab} />

      {/* Reddit & YouTube Style Feed Layout wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Reddit style Search and Tab filters */}
          <div className={cn(
            "p-4 sm:p-5 rounded-xl border flex flex-col gap-3.5",
            theme === 'dark' ? "bg-[#18181b] border-gray-800" : "bg-white border-gray-200 shadow-sm"
          )}>
            <div className="relative flex items-center">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="தேடுக... (Search lessons, vocab, kanji)"
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 rounded-lg text-sm transition-all border outline-none",
                  theme === 'dark' 
                    ? "bg-[#0f0f0f] border-gray-800 text-white focus:border-red-600" 
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-red-600 focus:bg-white"
                )}
              />
            </div>

            {/* Sort Filter Bar (Hot, New, Top) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t pt-3.5 border-gray-200 dark:border-gray-800 gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1">
                <button
                  onClick={() => setSortMethod('hot')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 shrink-0",
                    sortMethod === 'hot'
                      ? "bg-red-600 text-white"
                      : (theme === 'dark' ? "text-gray-400 hover:bg-[#272727] hover:text-white" : "text-gray-600 hover:bg-gray-100")
                  )}
                >
                  🔥 <span>Hot</span><span className="text-[10px] opacity-80 sm:inline hidden font-medium"> (பிரபலமானவை)</span>
                </button>
                <button
                  onClick={() => setSortMethod('new')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 shrink-0",
                    sortMethod === 'new'
                      ? "bg-red-600 text-white"
                      : (theme === 'dark' ? "text-gray-400 hover:bg-[#272727] hover:text-white" : "text-gray-600 hover:bg-gray-100")
                  )}
                >
                  ✨ <span>New</span><span className="text-[10px] opacity-80 sm:inline hidden font-medium"> (புதியவை)</span>
                </button>
                <button
                  onClick={() => setSortMethod('top')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 shrink-0",
                    sortMethod === 'top'
                      ? "bg-red-600 text-white"
                      : (theme === 'dark' ? "text-gray-400 hover:bg-[#272727] hover:text-white" : "text-gray-600 hover:bg-gray-100")
                  )}
                >
                  🏆 <span>Top</span><span className="text-[10px] opacity-80 sm:inline hidden font-medium"> (முதன்மை)</span>
                </button>
              </div>

              <div className="text-xs text-gray-400 font-semibold text-right sm:text-left">
                {filteredPosts.length} இடுகைகள் கண்டறியப்பட்டன
              </div>
            </div>
          </div>

          {/* Subreddit Filter Category Chips (Absolutely no horizontal scroll bar wrapper) */}
          <div className="flex flex-wrap gap-2 py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-all shadow-xs",
                  activeFilter === cat.id
                    ? (theme === 'dark' ? "bg-white text-black border-white" : "bg-black text-white border-black")
                    : (theme === 'dark' ? "bg-[#18181b] border-zinc-800 text-gray-400 hover:text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50")
                )}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Post Feed stream */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className={cn(
                "p-12 text-center rounded-2xl border",
                theme === 'dark' ? "bg-[#18181b] border-gray-800" : "bg-white border-gray-200"
              )}>
                <Info size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500 font-medium">தேடலுக்குப் பொருத்தமான இடுகைகள் எதுவும் இல்லை.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveFilter('all'); }} 
                  className="text-xs text-red-600 font-bold mt-2 hover:underline"
                >
                  வடிகட்டிகளை மீட்டமைக்க (Clear filters)
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isExpanded = expandedPostId === post.id;
                
                return (
                  <div
                    key={post.id}
                    className={cn(
                      "rounded-xl border transition-all duration-200 overflow-hidden flex",
                      theme === 'dark' ? "bg-[#18181b] border-gray-800" : "bg-white border-gray-200 shadow-sm hover:shadow-md"
                    )}
                  >
                    {/* Reddit style Upvote Column (Hidden on Mobile) */}
                    <div className={cn(
                      "hidden sm:flex flex-col items-center justify-start p-2.5 w-12 border-r transition-colors",
                      theme === 'dark' ? "bg-zinc-900/30 border-gray-800" : "bg-gray-50/50 border-gray-200"
                    )}>
                      <button
                        onClick={() => handleVote(post.id, 'up')}
                        className={cn(
                          "p-1 rounded hover:bg-gray-200/50 dark:hover:bg-zinc-800 transition-all",
                          post.userVote === 'up' ? "text-orange-500 scale-110" : "text-gray-400"
                        )}
                        title="Upvote"
                      >
                        <ArrowBigUp size={24} className={post.userVote === 'up' ? "fill-orange-500" : ""} />
                      </button>
                      <span className={cn(
                        "text-xs font-extrabold my-1",
                        post.userVote === 'up' ? "text-orange-500" : post.userVote === 'down' ? "text-blue-500" : "text-gray-500"
                      )}>
                        {post.upvotes}
                      </span>
                      <button
                        onClick={() => handleVote(post.id, 'down')}
                        className={cn(
                          "p-1 rounded hover:bg-gray-200/50 dark:hover:bg-zinc-800 transition-all",
                          post.userVote === 'down' ? "text-blue-500 scale-110" : "text-gray-400"
                        )}
                        title="Downvote"
                      >
                        <ArrowBigDown size={24} className={post.userVote === 'down' ? "fill-blue-500" : ""} />
                      </button>
                    </div>

                    {/* Post Content Area */}
                    <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                      {/* Post Header Meta Info */}
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-2 text-xs">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={cn(
                            "px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider",
                            post.type === 'youtube' 
                              ? "bg-red-600/10 text-red-500 border border-red-500/25" 
                              : "bg-blue-600/10 text-blue-500 border border-blue-500/25"
                          )}>
                            {post.subreddit}
                          </span>
                          <span className="text-gray-400">posted by</span>
                          <span className={cn("font-semibold", theme === 'dark' ? "text-gray-300" : "text-gray-700")}>
                            u/{post.author}
                          </span>
                          <span className="text-gray-400">• {post.time}</span>
                        </div>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                          post.level === 'General' 
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-500" 
                            : "bg-amber-500/15 border-amber-500/30 text-amber-500"
                        )}>
                          {post.level}
                        </span>
                      </div>

                      {/* Main Title & Description */}
                      <h2 className="text-lg font-bold leading-snug mb-2 hover:text-red-500 cursor-pointer transition-colors"
                          onClick={() => setExpandedPostId(isExpanded ? null : post.id)}>
                        {post.title}
                      </h2>
                      <p className={cn(
                        "text-sm mb-4 leading-relaxed whitespace-pre-wrap max-w-[68ch]",
                        theme === 'dark' ? "text-gray-300" : "text-gray-700"
                      )}>
                        {post.content}
                      </p>

                      {/* Video Player Box Mockup for Youtube types */}
                      {post.type === 'youtube' && (
                        <div 
                          onClick={() => {
                            if (post.japaneseText) {
                              playAudio(post.japaneseText, post.hiragana);
                            } else {
                              setTab('lessons');
                            }
                          }}
                          className={cn(
                            "relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 group cursor-pointer border flex flex-col justify-between p-4 transition-transform active:scale-[0.99]",
                            theme === 'dark'
                              ? "bg-gradient-to-br from-[#2c1313] via-[#0f0f0f] to-[#121212] border-red-950/40"
                              : "bg-gradient-to-br from-red-50 via-gray-100 to-gray-200 border-red-100 shadow-inner"
                          )}
                        >
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-0" />
                          
                          {/* Live Video watermark */}
                          <div className="z-10 flex justify-between items-center">
                            <span className="px-2 py-1 bg-red-600 text-white font-extrabold text-[10px] rounded flex items-center gap-1 uppercase tracking-widest">
                              <Video size={11} /> VIDEO LESSON
                            </span>
                            <span className="text-xs font-semibold bg-black/60 text-white px-2 py-0.5 rounded">
                              {post.videoDuration}
                            </span>
                          </div>

                          {/* Center Big Word play button area */}
                          <div className="z-10 flex flex-col items-center justify-center py-2 text-center">
                            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform mb-3">
                              <PlayCircle size={32} className="fill-white text-red-600" />
                            </div>
                            <h3 className="text-3xl font-extrabold tracking-wide text-white drop-shadow-md">
                              {post.japaneseText}
                            </h3>
                            <p className="text-xs font-bold text-gray-300 mt-1 drop-shadow-sm">
                              {post.hiragana} • {post.tamilPronunciation}
                            </p>
                          </div>

                          {/* Seeker / Controls strip */}
                          <div className="z-10 flex justify-between items-center text-[10px] text-gray-400 font-semibold pt-1 border-t border-white/5">
                            <span>{post.videoViews}</span>
                            <span className="text-red-500 animate-pulse flex items-center gap-1">
                              <Volume2 size={10} /> தட்டவும் (Tap to play audio)
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Japanese Word bubble if exists for reddit items */}
                      {post.type !== 'youtube' && post.japaneseText && (
                        <div className={cn(
                          "p-4 rounded-xl mb-4 border flex items-center justify-between gap-3",
                          theme === 'dark' ? "bg-[#0f0f0f] border-zinc-800" : "bg-red-50/30 border-red-100"
                        )}>
                          <div>
                            <span className="text-[10px] font-extrabold uppercase text-red-600 tracking-wider">வார்த்தை / வாக்கியம்</span>
                            <div className="text-xl font-bold mt-0.5">{post.japaneseText}</div>
                            {post.hiragana && (
                              <div className={cn("text-xs mt-0.5", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
                                {post.hiragana} {post.tamilPronunciation ? `• ${post.tamilPronunciation}` : ''}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => playAudio(post.japaneseText || '', post.hiragana || '')}
                            className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center shadow transition-all shrink-0"
                            title="கேட்க (Listen)"
                          >
                            <Volume2 size={18} />
                          </button>
                        </div>
                      )}

                      {/* Post Interactive Footer (Reddit and YouTube styling) */}
                      <div className="flex items-center justify-between border-t pt-3 border-gray-100 dark:border-zinc-800/80 flex-wrap gap-2 text-xs">
                        
                        {/* Vote area for Mobile (Horizontal inline) */}
                        <div className="flex sm:hidden items-center gap-1.5 bg-gray-100 dark:bg-zinc-800 rounded-lg p-1">
                          <button
                            onClick={() => handleVote(post.id, 'up')}
                            className={cn(
                              "p-1 rounded transition-all",
                              post.userVote === 'up' ? "text-orange-500 scale-110" : "text-gray-400"
                            )}
                          >
                            <ArrowBigUp size={20} className={post.userVote === 'up' ? "fill-orange-500" : ""} />
                          </button>
                          <span className={cn(
                            "text-xs font-bold px-1 min-w-[16px] text-center",
                            post.userVote === 'up' ? "text-orange-500" : post.userVote === 'down' ? "text-blue-500" : "text-gray-500"
                          )}>
                            {post.upvotes}
                          </span>
                          <button
                            onClick={() => handleVote(post.id, 'down')}
                            className={cn(
                              "p-1 rounded transition-all",
                              post.userVote === 'down' ? "text-blue-500 scale-110" : "text-gray-400"
                            )}
                          >
                            <ArrowBigDown size={20} className={post.userVote === 'down' ? "fill-blue-500" : ""} />
                          </button>
                        </div>

                        <div className="flex gap-4 items-center">
                          {/* Comments Trigger button */}
                          <button
                            onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                            className={cn(
                              "flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors font-bold",
                              isExpanded 
                                ? "bg-red-600/10 text-red-500" 
                                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
                            )}
                          >
                            <MessageSquare size={16} />
                            <span>{post.commentsCount} கருத்தெழுத்துக்கள்</span>
                          </button>

                          {/* Share button */}
                          <button
                            onClick={() => handleShare(post.id)}
                            className="flex items-center gap-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 py-1 px-2.5 rounded-lg transition-colors font-bold"
                          >
                            <Share2 size={16} />
                            <span>{copiedPostId === post.id ? "லிங்க் நகலெடுக்கப்பட்டது!" : "பகிர்"}</span>
                          </button>
                        </div>

                        {/* Interactive Go to view shortcuts */}
                        <button
                          onClick={() => {
                            if (post.category === 'lessons') setTab('lessons');
                            else if (post.category === 'grammar') setTab('grammar');
                            else if (post.category === 'vocabulary') setTab('vocabulary');
                            else if (post.category === 'kanji') setTab('kanji');
                            else if (post.category === 'culture') setTab('culture');
                          }}
                          className="text-red-500 hover:text-red-600 font-bold flex items-center gap-0.5 hover:underline"
                        >
                          {post.type === 'youtube' ? "பாடத்திற்குச் செல்" : "விவரம் காண்"} <ChevronRight size={14} />
                        </button>
                      </div>

                      {/* Embedded, Animated inline Comments section */}
                      {isExpanded && (
                        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-zinc-850 animate-fadeIn">
                          <h3 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider mb-3 flex items-center gap-1">
                            <MessageSquare size={12} /> விவாதங்கள் (Comments Feed)
                          </h3>
                          
                          {/* Feed comments items list */}
                          <div className="space-y-3 mb-4">
                            {post.comments.map(comment => (
                              <div key={comment.id} className="flex gap-2.5 items-start text-xs">
                                <div className={cn("w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white", comment.avatarColor)}>
                                  {comment.author.substring(0, 2).toUpperCase()}
                                </div>
                                <div className={cn(
                                  "p-2.5 rounded-xl flex-1",
                                  theme === 'dark' ? "bg-zinc-900/60" : "bg-gray-50 border border-gray-100"
                                )}>
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="font-bold text-red-500">{comment.author}</span>
                                    <span className="text-gray-400 text-[10px]">{comment.time}</span>
                                  </div>
                                  <p className={theme === 'dark' ? "text-gray-300" : "text-gray-700"}>{comment.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Comment Input action box */}
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="உங்கள் கருத்தைப் பதிவு செய்க... (Type comment)"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddComment(post.id);
                              }}
                              className={cn(
                                "flex-1 px-3 py-1.5 rounded-lg text-xs border outline-none transition-all",
                                theme === 'dark' 
                                  ? "bg-[#0f0f0f] border-zinc-800 text-white focus:border-red-600" 
                                  : "bg-white border-gray-200 text-gray-900 focus:border-red-600"
                              )}
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shrink-0 active:scale-95"
                            >
                              சமர்ப்பி
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Sidebar Column (Reddit style sidebar) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* About r/NihonTamil Community info box */}
          <div className={cn(
            "p-5 rounded-xl border",
            theme === 'dark' ? "bg-[#18181b] border-gray-800" : "bg-white border-gray-200 shadow-sm"
          )}>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
              <h2 className="font-bold text-sm flex items-center gap-2">
                <Users size={16} className="text-red-500" /> சமூகம் பற்றி (About Community)
              </h2>
              <span className="text-[10px] bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded">r/NihonTamil</span>
            </div>
            
            <p className={cn("text-xs leading-relaxed mb-4", theme === 'dark' ? "text-gray-300" : "text-gray-650")}>
              ஜப்பானிய மொழியை தமிழ் வழியாக எளிமையாகக் கற்க உதவும் முதன்மையான கூட்டு கற்றல் மேடை. இங்கு எளிய உரையாடல்கள், இலக்கணக் குறிப்புகள் மற்றும் கஞ்சி உத்திகள் தினமும் பகிரப்படுகின்றன.
            </p>

            <div className="grid grid-cols-2 gap-3 text-center mb-4">
              <div className="p-2 bg-gray-50 dark:bg-zinc-900/40 rounded-lg border border-gray-150 dark:border-zinc-800/60">
                <div className="text-lg font-bold">24,512</div>
                <div className="text-[9px] text-gray-400 font-bold uppercase">மாணவர்கள்</div>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-zinc-900/40 rounded-lg border border-gray-150 dark:border-zinc-800/60">
                <div className="text-lg font-bold flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>142</span>
                </div>
                <div className="text-[9px] text-gray-400 font-bold uppercase">ஆன்லைனில்</div>
              </div>
            </div>

            {/* Quick Community Guidelines */}
            <h3 className="text-xs font-bold mb-2 uppercase tracking-wider text-gray-400">கட்டுப்பாடுகள் (Rules)</h3>
            <ul className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 pl-1 list-decimal list-inside mb-4">
              <li>மரியாதையுடன் கருத்துக்களைப் பகிரவும்</li>
              <li>கற்றல் சார்ந்த பதிவுகளை மட்டுமே இடவும்</li>
              <li>உச்சரிப்பு கேள்விகளை விவாதிக்கவும்</li>
            </ul>

            <button
              onClick={() => setTab('progress')}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Award size={14} /> உங்கள் முன்னேற்றம் (My Progress)
            </button>
          </div>

          {/* Daily Quick Targets Practice Navigation */}
          <div className={cn(
            "p-5 rounded-xl border",
            theme === 'dark' ? "bg-[#18181b] border-gray-800" : "bg-white border-gray-200 shadow-sm"
          )}>
            <h2 className="font-bold text-sm flex items-center gap-2 mb-4">
              <Calendar size={16} className="text-red-500" /> வழக்கமான பயிற்சிகள் (Daily Targets)
            </h2>

            <div className="space-y-3">
              <div 
                onClick={() => setTab('kana')}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all hover:-translate-y-0.5 flex items-center justify-between group",
                  theme === 'dark' ? "bg-zinc-900/40 border-zinc-800 hover:bg-zinc-850" : "bg-purple-50/20 border-purple-100 hover:bg-purple-50/40"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <Type size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold">எழுத்துக்கள் (Kana Practice)</div>
                    <div className="text-[10px] text-gray-400">ஹிரகானா & கடகானா</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-400 group-hover:text-purple-500 transition-colors" />
              </div>

              <div 
                onClick={() => setTab('kanji')}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all hover:-translate-y-0.5 flex items-center justify-between group",
                  theme === 'dark' ? "bg-zinc-900/40 border-zinc-800 hover:bg-zinc-850" : "bg-red-50/20 border-red-100 hover:bg-red-50/40"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
                    <Type size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold">கஞ்சி (Kanji Training)</div>
                    <div className="text-[10px] text-gray-400">சித்திர எழுத்துக்கள் அறிவோம்</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-400 group-hover:text-red-500 transition-colors" />
              </div>

              <div 
                onClick={() => setTab('vocabulary')}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all hover:-translate-y-0.5 flex items-center justify-between group",
                  theme === 'dark' ? "bg-zinc-900/40 border-zinc-800 hover:bg-zinc-850" : "bg-blue-50/20 border-blue-100 hover:bg-blue-50/40"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <List size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold">சொற்களஞ்சியம் (Shorts / List)</div>
                    <div className="text-[10px] text-gray-400">புதிய சொற்கள் பயிற்சி</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>

              <div 
                onClick={() => setTab('grammar')}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all hover:-translate-y-0.5 flex items-center justify-between group",
                  theme === 'dark' ? "bg-zinc-900/40 border-zinc-800 hover:bg-zinc-850" : "bg-emerald-50/20 border-emerald-100 hover:bg-emerald-50/40"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Book size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold">இலக்கணம் (Grammar Hub)</div>
                    <div className="text-[10px] text-gray-400">வாக்கியங்களின் கட்டமைப்புகள்</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
              </div>
            </div>
          </div>

          {/* Daily Quick Word tip widget */}
          <div className={cn(
            "p-5 rounded-xl border bg-gradient-to-br",
            theme === 'dark' 
              ? "from-[#1c1c1e] to-black border-gray-800" 
              : "from-red-50/50 to-white border-gray-200 shadow-sm"
          )}>
            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles size={14} /> இன்றைய ஜப்பானிய குறிப்பு (Daily Tip)
            </div>
            <h4 className="text-sm font-bold mb-1">உடன்படிக்கை வினைச்சொற்கள்: ~ます</h4>
            <p className={cn("text-xs leading-relaxed mb-3", theme === 'dark' ? "text-gray-300" : "text-gray-600")}>
              வினைச்சொல்லின் இறுதியில் '~ます' (masu) சேர்த்தால் அது மரியாதையான வடிவமாக மாறும். 
              உதாரணம்: たべる (taberu - சாதாரண) ➔ たべます (tabemasu - மரியாதையான).
            </p>
            <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold">
              <span>வகை: இலக்கண விதிமுறை</span>
              <button 
                onClick={() => {
                  playAudio("たべます", "சாப்பிடுகிறேன் (மரியாதை)");
                }}
                className="text-red-500 hover:underline flex items-center gap-0.5"
              >
                <Volume2 size={11} /> உச்சரிப்பைக் கேட்க
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}


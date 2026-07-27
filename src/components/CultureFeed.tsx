import React, { useState } from "react";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Volume2, 
  CheckCircle,
  Share2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "../store";
import { cn } from "../lib/utils";
import { cultureData } from "../data/culture";

export interface KeyVocabulary {
  jp: string;
  ta_pronunciation: string;
  ta_meaning: string;
}

export interface CulturePost {
  id: string;
  category: string;
  author_name: string;
  image_search_term: string;
  likes: number;
  title: {
    ta: string;
  };
  content: {
    ta: string;
  };
  hashtags: string[];
  key_vocabulary: KeyVocabulary[];
}

interface CultureFeedProps {
  posts?: CulturePost[];
}

// Curated high-quality reliable Unsplash image mappings to fall back if source.unsplash.com fails
const FALLBACK_IMAGES: Record<string, string> = {
  sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80",
  onsen: "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?w=800&auto=format&fit=crop&q=80",
  bowing: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80",
  sakura: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&auto=format&fit=crop&q=80",
  general: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80"
};

export function CultureFeed({ posts = cultureData }: CultureFeedProps) {
  const { theme, playAudio } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("அனைத்து");
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    const initial: Record<string, { count: number; liked: boolean }> = {};
    posts.forEach(p => {
      initial[p.id] = { count: p.likes, liked: false };
    });
    return initial;
  });
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [showHeartToast, setShowHeartToast] = useState<string | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // Story filters mapping
  const stories = [
    { id: "அனைத்து", label: "அனைத்து", icon: "🌸" },
    { id: "வாழ்க்கை முறை", label: "வாழ்க்கை முறை", icon: "🏮" },
    { id: "பண்பாடு", label: "பண்பாடு", icon: "🙇" },
    { id: "உணவு", label: "உணவு", icon: "🍣" },
    { id: "பருவகால நிகழ்வுகள்", label: "பருவகால நிகழ்வுகள்", icon: "🌸" },
  ];

  // Handle Double Tap / Double Click on image to like
  const lastTapRef = React.useRef<Record<string, number>>({});
  const handleImageClick = (postId: string) => {
    const now = Date.now();
    const lastTap = lastTapRef.current[postId] || 0;
    if (now - lastTap < 300) {
      handleLikeToggle(postId, true);
    }
    lastTapRef.current[postId] = now;
  };

  const handleLikeToggle = (postId: string, forceLike = false) => {
    setLikesState(prev => {
      const current = prev[postId] || { count: 0, liked: false };
      if (forceLike && current.liked) {
        // Already liked, just trigger animation
        setShowHeartToast(postId);
        setTimeout(() => setShowHeartToast(null), 800);
        return prev;
      }
      
      const newLiked = forceLike ? true : !current.liked;
      const diff = newLiked ? (current.liked ? 0 : 1) : -1;
      
      if (newLiked) {
        setShowHeartToast(postId);
        setTimeout(() => setShowHeartToast(null), 800);
      }
      
      return {
        ...prev,
        [postId]: {
          count: current.count + diff,
          liked: newLiked
        }
      };
    });
  };

  const handleSaveToggle = (postId: string) => {
    setSavedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleShare = (postId: string) => {
    setCopiedPostId(postId);
    navigator.clipboard.writeText(`${window.location.origin}/culture#post-${postId}`).catch(() => {});
    setTimeout(() => {
      setCopiedPostId(null);
    }, 2000);
  };

  // Filter posts based on selected category story
  const filteredPosts = selectedCategory === "அனைத்து" 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  // Handle broken Unsplash source.unsplash.com URLs by using direct CDN fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, searchTerm: string) => {
    const target = e.target as HTMLImageElement;
    const fallback = FALLBACK_IMAGES[searchTerm.toLowerCase()] || FALLBACK_IMAGES.general;
    if (target.src !== fallback) {
      target.src = fallback;
    }
  };

  return (
    <div id="culture-feed-root" className={cn(
      "w-full max-w-lg mx-auto py-4 px-2 sm:px-4 min-h-screen pb-24 transition-colors duration-300",
      theme === "dark" ? "bg-[#0F0F0F] text-white" : "bg-[#fafafa] text-gray-900"
    )}>
      {/* Horizontally scrollable stories row */}
      <div id="stories-section" className="mb-6 overflow-x-auto scrollbar-none flex items-center gap-4 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
        {stories.map((story) => {
          const isActive = selectedCategory === story.id;
          return (
            <button
              key={story.id}
              onClick={() => setSelectedCategory(story.id)}
              className="flex flex-col items-center flex-shrink-0 focus:outline-none group"
            >
              <div className="relative">
                {/* Story rings */}
                <div className={cn(
                  "w-16 h-16 rounded-full p-[3px] transition-all duration-300 flex items-center justify-center",
                  isActive 
                    ? "bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-500 scale-105" 
                    : "bg-gray-200 dark:bg-gray-800 group-hover:scale-102"
                )}>
                  <div className={cn(
                    "w-full h-full rounded-full flex items-center justify-center text-2xl bg-white dark:bg-[#1C1C1E] border border-transparent"
                  )}>
                    {story.icon}
                  </div>
                </div>
                {/* Active category dot */}
                {isActive && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-pink-500 border-2 border-white dark:border-[#0F0F0F] rounded-full" />
                )}
              </div>
              <span className={cn(
                "text-xs mt-1.5 font-medium max-w-[76px] truncate text-center",
                isActive ? "text-pink-500 font-bold" : "text-gray-500 dark:text-gray-400"
              )}>
                {story.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feed Cards */}
      <div id="feed-container" className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-gray-500 dark:text-gray-400"
            >
              <p className="text-lg">இந்தப் பிரிவில் பதிவுகள் எதுவும் இல்லை.</p>
              <button 
                onClick={() => setSelectedCategory("அனைத்து")}
                className="mt-3 text-sm text-pink-500 underline"
              >
                அனைத்து பதிவுகளையும் காட்டு
              </button>
            </motion.div>
          ) : (
            filteredPosts.map((post) => {
              const { count = post.likes, liked = false } = likesState[post.id] || {};
              const isSaved = !!savedPosts[post.id];
              const isCopied = copiedPostId === post.id;
              
              // We follow the requested url template: https://source.unsplash.com/random/800x800/?[image_search_term]
              const requestUrl = `https://source.unsplash.com/random/800x800/?${post.image_search_term}`;

              return (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={cn(
                    "rounded-xl border overflow-hidden transition-all duration-300 shadow-sm",
                    theme === "dark" 
                      ? "bg-[#1C1C1E] border-gray-800" 
                      : "bg-white border-gray-200"
                  )}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between p-3.5 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2.5">
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-500 to-orange-400 flex items-center justify-center font-bold text-white text-sm select-none shadow-inner shadow-black/10">
                        NT
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-sm tracking-tight">{post.author_name}</span>
                          <CheckCircle size={14} className="text-blue-500 fill-blue-500 dark:fill-none" />
                        </div>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">ஜப்பான்</span>
                      </div>
                    </div>
                    
                    {/* Category Label */}
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-100 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400">
                      {post.category}
                    </span>
                  </div>

                  {/* Post Image Container */}
                  <div 
                    className="relative aspect-square w-full bg-gray-100 dark:bg-[#121212] overflow-hidden cursor-pointer select-none"
                    onClick={() => handleImageClick(post.id)}
                  >
                    <img 
                      src={requestUrl}
                      alt={post.title.ta}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                      onError={(e) => handleImageError(e, post.image_search_term)}
                    />

                    {/* Double Tap Heart Animation Overlay */}
                    <AnimatePresence>
                      {showHeartToast === post.id && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.3 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.5 }}
                          transition={{ type: "spring", damping: 12 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none"
                        >
                          <Heart size={80} className="text-white fill-white drop-shadow-lg" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between p-3.5 pb-2">
                    <div className="flex items-center gap-4">
                      {/* Interactive Heart */}
                      <button 
                        onClick={() => handleLikeToggle(post.id)}
                        className="transition-transform active:scale-125 focus:outline-none"
                        aria-label="Like post"
                      >
                        <Heart 
                          size={24} 
                          className={cn(
                            "transition-colors duration-200",
                            liked 
                              ? "fill-red-500 text-red-500 scale-110" 
                              : "text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500"
                          )} 
                        />
                      </button>

                      {/* Comment Indicator */}
                      <button 
                        className="text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors focus:outline-none"
                        aria-label="Comment"
                      >
                        <MessageCircle size={24} />
                      </button>

                      {/* Share Button */}
                      <button 
                        onClick={() => handleShare(post.id)}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors focus:outline-none relative"
                        aria-label="Share"
                      >
                        <Send size={24} />
                        {isCopied && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-2 py-0.5 rounded shadow whitespace-nowrap">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Bookmark */}
                    <button 
                      onClick={() => handleSaveToggle(post.id)}
                      className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-colors focus:outline-none"
                      aria-label="Save post"
                    >
                      <Bookmark 
                        size={24} 
                        className={isSaved ? "fill-yellow-500 text-yellow-500" : ""} 
                      />
                    </button>
                  </div>

                  {/* Likes Count */}
                  <div className="px-3.5 pb-1 font-bold text-sm">
                    {count.toLocaleString()} விருப்பங்கள் (Likes)
                  </div>

                  {/* Caption & Content */}
                  <div className="px-3.5 pb-4 space-y-2">
                    <h2 className="font-bold text-base leading-tight mt-1">
                      {post.title.ta}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                      {post.content.ta}
                    </p>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.hashtags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs font-semibold text-blue-500 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          {tag.startsWith("#") ? tag : `#${tag}`}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Vocabulary Box - Moved out of the box */}
                    {post.key_vocabulary && post.key_vocabulary.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <h3 className="text-xs font-bold text-pink-500 dark:text-pink-400 mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
                          <span>சொற்களஞ்சியம் (Key Vocabulary)</span>
                        </h3>
                        <div className="space-y-2.5">
                          {post.key_vocabulary.map((vocab, vIdx) => (
                            <div 
                              key={vIdx} 
                              className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800/50 pb-2 last:border-0 last:pb-0 group/vocab"
                            >
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-base tracking-wide text-gray-900 dark:text-white">
                                    {vocab.jp}
                                  </span>
                                  <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
                                    ({vocab.ta_pronunciation})
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {vocab.ta_meaning}
                                </p>
                              </div>
                              
                              {/* Audio Pronunciation Button */}
                              <button
                                onClick={() => playAudio(vocab.jp)}
                                className={cn(
                                  "p-1.5 rounded-lg transition-colors flex items-center justify-center",
                                  theme === "dark" 
                                    ? "bg-gray-800/80 text-gray-300 hover:bg-pink-900/30 hover:text-pink-400" 
                                    : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                                )}
                                title="உச்சரிப்பைக் கேள் (Listen)"
                              >
                                <Volume2 size={15} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

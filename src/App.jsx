import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

// SearchResultsComponent.jsx
// React + Tailwind implementation that matches the provided screenshot layout.
// Drop this file into your project (e.g. src/components/) and render <SearchResults />.

const SAMPLE = new Array(6).fill(0).map((_, i) => ({
  id: i + 1,
  date: "Apr 30, 2024",
  title: "Website Design and Front-End Development",
  projectType: "Fixed Price Project",
  price: "$1,200-$1,400",
  description:
    "In this role, you will be responsible for conducting comprehensive SEO audits and implementing strategies to optimize websites. You will collaborate with cross-functional teams...",
  badges: ["Remote", "Senior level", "2 Freelancer"],
  tags: ["App Design", "Art Generation", "Illustration"],
  postedBy: "Eamman Olio",
}));

export default function SearchResults({ data = SAMPLE }) {
  // we'll mark the middle card as "featured" to mimic the screenshot
  const featuredIndex = Math.floor(data.length / 2);

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">{data.length} search result(s) found</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {data.map((item, idx) => {
            const featured = idx === featuredIndex;

            return (
              <article
                key={item.id}
                className={`relative bg-white rounded-2xl p-6 border border-gray-100 transition-transform duration-300 ease-out ${
                  featured
                    ? "-mt-6 transform scale-[1.03] shadow-[0_30px_50px_rgba(0,0,0,0.12)] z-20"
                    : "shadow-sm hover:shadow-md"
                }`}
              >
                {/* Date */}
                <div className="text-xs text-gray-400 mb-3">{item.date}</div>

                {/* Title + price badge */}
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-md font-semibold text-gray-800 leading-tight">{item.title}</h4>

                  <div className="flex-shrink-0 text-right">
                    <div className="text-xs text-gray-500 mb-2">{item.projectType}</div>
                    <div className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">{item.price}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-4 mb-4 line-clamp-3" style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {item.description}
                </p>

                {/* small badges row */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {item.badges.map((b, i) => (
                    <span
                      key={i}
                      className={`text-[11px] px-2 py-1 rounded-full whitespace-nowrap ${
                        i === 0
                          ? "bg-purple-50 text-purple-600"
                          : i === 1
                          ? "bg-pink-50 text-pink-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((t, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">{t}</span>
                  ))}
                  <span className="text-xs text-gray-500">+5 more</span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex items-center justify-between gap-4">
                  <div className="text-xs text-gray-500">Posted by <span className="text-gray-800 font-medium">{item.postedBy}</span></div>

                  <div className="flex items-center gap-3">
                    <button className={`px-4 py-2 rounded-full text-sm font-medium transition ${featured ? 'bg-green-500 text-white shadow-md' : 'bg-gray-900 text-white'}`}>
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* subtle focus ring to mimic the center card glow */}
                {featured && (
                  <div className="pointer-events-none absolute inset-0 rounded-2xl -z-10" aria-hidden>
                    <div className="w-full h-full rounded-2xl" style={{ boxShadow: '0 60px 100px rgba(0,0,0,0.06)' }} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/*
  NOTES & USAGE
  - Requires Tailwind CSS in your project.
  - For multi-line truncation the component uses a small inline style with -webkit-line-clamp.
    If you prefer the `line-clamp` plugin, enable the Tailwind line-clamp plugin and replace the inline styles with `line-clamp-3`.
  - Place this file in your components folder and import it:
      import SearchResults from './components/SearchResultsComponent';
      <SearchResults />
*/
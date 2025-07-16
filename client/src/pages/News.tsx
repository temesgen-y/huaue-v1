import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function News() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    setEmail("");

    setTimeout(() => setSubscribed(false), 5000); // remove message after 5 seconds
  };
  const featuredArticle = {
    date: "January 15, 2024",
    title: "HUAYUE PLASTICS INDUSTRY Expands Manufacturing Capacity in Ethiopia",
    excerpt: "We're proud to announce the successful expansion of our manufacturing facility in Kombolcha, Ethiopia. This major investment increases our production capacity by 40% and creates 200 new jobs in the region, reinforcing our commitment to sustainable industrial growth in Ethiopia.",
    image: "/showroom-display.jpg",
    tags: ["Expansion", "Manufacturing"]
  };

  const articles = [
    {
      date: "December 20, 2023",
      title: "HUAYUE PLASTICS INDUSTRY Achieves ISO 14001 Environmental Certification",
      excerpt: "Our commitment to environmental stewardship has been recognized with ISO 14001 certification, demonstrating our dedication to sustainable manufacturing practices.",
      image: "/pipe-inventory-white.jpg",
      tag: "Certification"
    },
    {
      date: "November 28, 2023",
      title: "Advanced Plastic Recycling Technology Implemented",
      excerpt: "New recycling technology allows us to process 95% of plastic waste, contributing to circular economy principles in Ethiopia.",
      image: "/warehouse-storage.jpg",
      tag: "Innovation"
    },
    {
      date: "November 15, 2023",
      title: "Partnership with Ethiopian Universities for Research Development",
      excerpt: "Collaborative research programs with leading Ethiopian universities will advance plastic technology and create opportunities for students.",
      image: "/warehouse-overview.jpg",
      tag: "Partnership"
    },
    {
      date: "October 22, 2023",
      title: "HUAYUE PLASTICS Wins Excellence Award at African Manufacturing Summit",
      excerpt: "Recognition for outstanding contribution to sustainable manufacturing and job creation in the Horn of Africa region.",
      image: "/green-pipes-closeup.jpg",
      tag: "Award"
    },
    {
      date: "October 8, 2023",
      title: "Quality Assurance Laboratory Opens in Kombolcha Facility",
      excerpt: "State-of-the-art testing laboratory ensures all products meet international quality standards before distribution.",
      image: "/green-pipes-branded.jpg",
      tag: "Quality"
    },
    {
      date: "September 25, 2023",
      title: "Community Skills Development Program Launches",
      excerpt: "Training program for local youth in plastic manufacturing skills, supporting community development and employment opportunities.",
      image: "/green-fittings-collection.jpg",
      tag: "Community"
    }
  ];

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      "Certification": "bg-emerald-100 text-emerald-800",
      "Innovation": "bg-blue-100 text-blue-800",
      "Partnership": "bg-purple-100 text-purple-800",
      "Award": "bg-yellow-100 text-yellow-800",
      "Quality": "bg-green-100 text-green-800",
      "Community": "bg-indigo-100 text-indigo-800",
      "Expansion": "bg-primary text-white",
      "Manufacturing": "bg-primary text-white"
    };
    return colors[tag] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="py-16 lg:py-24 bg-pipe-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">Latest News</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Stay updated with the latest developments, innovations, and industry insights from Pipe Factory.
          </p>
        </div>

        {/* Featured Article */}
        <Card className="overflow-hidden mb-12 shadow-xl">
          <div className="lg:grid lg:grid-cols-2">
            <img 
              src={featuredArticle.image} 
              alt="Major infrastructure project completion" 
              className="w-full h-64 lg:h-full object-cover"
            />
            <CardContent className="p-8 lg:p-12">
              <div className="text-accent font-medium mb-2">{featuredArticle.date}</div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                {featuredArticle.title}
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredArticle.tags.map((tag, index) => (
                  <Badge key={index} className={getTagColor(tag)}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="ghost" className="text-primary hover:text-blue-800 font-medium p-0">
                Read Full Article →
              </Button>
            </CardContent>
          </div>
        </Card>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {articles.map((article, index) => (
            <Card key={index} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={getTagColor(article.tag)}>
                    {article.tag}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 sm:p-6">
                <div className="text-primary font-medium text-sm mb-2">{article.date}</div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <Button variant="ghost" className="text-primary hover:text-green-600 font-medium p-0 group-hover:translate-x-1 transition-transform text-sm">
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-primary text-white p-8 lg:p-12 text-center">
          <CardContent className="p-0">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest news, product updates, and industry insights directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg text-slate-800 placeholder-slate-500"
                />
                <Button 
                  type="submit"
                  className="bg-accent hover:bg-yellow-500 text-white font-semibold px-6 py-3 h-auto transition"
                >
                  Subscribe
                </Button>
              </div>
              {subscribed && (
                <p className="text-green-300 font-medium transition-opacity duration-500 bg-green-800 bg-opacity-30 rounded-lg py-2 px-4">
                  Thank you for subscribing to us
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

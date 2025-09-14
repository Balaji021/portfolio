
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import FloatingShape from './FloatingShape';

const CodingProfilesSection = () => {
  const codingPlatforms = [
    {
      name: 'LeetCode',
      username: 'Balaji_Selvaraj_S',
      url: 'https://leetcode.com/u/Balaji_Selvaraj_S/',
      problemsSolved: 212,
      color: '#FFA116',
      bgGradient: 'from-orange-400 to-yellow-500'
    },
    {
      name: 'GeeksforGeeks',
      username: 'balajiselvaraj12',
      url: 'https://www.geeksforgeeks.org/user/balajiselvaraj12/',
      problemsSolved: 40,
      color: '#2F8D46',
      bgGradient: 'from-green-500 to-emerald-600'
    },
    {
      name: 'HackerRank',
      username: 'balajiselvaraj12',
      url: 'https://www.hackerrank.com/profile/balajiselvaraj12',
      Hackos: 41130,
      color: '#00EA64',
      bgGradient: 'from-green-400 to-teal-500'
    }
  ];

  return (
    <section id="coding-profiles" className="relative py-16 md:py-20">
      <ParticleBackground id="codingParticles" config="default" />
      {/* 3D Floating Shapes */}
      <div className="absolute top-20 left-16 w-20 h-20 opacity-25"><FloatingShape /></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 opacity-25"><FloatingShape /></div>
      <div className="absolute top-1/3 right-8 w-16 h-16 opacity-20"><FloatingShape /></div>

      <div className="container mx-auto px-4 sm:px-6 z-10 max-w-full">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">Coding Profiles</h2>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-muted-foreground">My competitive programming journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {codingPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ amount: 0.2 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              {/* Minimal glass card */}
              <div
                className="rounded-2xl glass overflow-hidden border transition-shadow duration-300 hover:shadow-glow-primary"
                style={{ borderColor: `${platform.color}22` }}
              >
                {/* Header */}
                <div className="p-5 flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold truncate">{platform.name}</h3>
                    <p className="text-muted-foreground text-xs truncate">@{platform.username}</p>
                  </div>
                  <button
                    aria-label="Open profile"
                    onClick={() => window.open(platform.url, '_blank')}
                    className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-transparent hover:bg-white/10 transition-colors border"
                    style={{ borderColor: `${platform.color}66`, color: platform.color }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                {/* Metrics: Hackos for HackerRank; Problems Solved for others if available */}
                <div className="px-5 pb-5">
                  <div className="flex items-center justify-center">
                    {platform.name === 'HackerRank' ? (
                      <div
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: `${platform.color}1a`, color: platform.color, border: `1px solid ${platform.color}33` }}
                      >
                        Hackos: {(platform as any).Hackos ?? (platform as any).hackos ?? (platform as any).problemsSolved}
                      </div>
                    ) : (typeof (platform as any).problemsSolved !== 'undefined' && (
                      <div
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: `${platform.color}1a`, color: platform.color, border: `1px solid ${platform.color}33` }}
                      >
                        {(platform as any).problemsSolved} Problems Solved
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfilesSection;

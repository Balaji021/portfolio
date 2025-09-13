import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Code2, 
  Trophy, 
  Star, 
  TrendingUp, 
  ExternalLink, 
  Calendar,
  Clock,
  Target,
  Zap,
  Award,
  BarChart3,
  CheckCircle
} from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import FloatingShape from './FloatingShape';

const CodingProfilesSection = () => {
  const codingPlatforms = [
    {
      name: 'LeetCode',
      username: 'balaji_coder',
      url: 'https://leetcode.com/balaji_coder',
      color: '#FFA116',
      bgColor: 'from-orange-500/10 to-yellow-500/10',
      borderColor: 'border-orange-500/30',
      stats: {
        problemsSolved: 450,
        ranking: 'Top 5%',
        streak: 120,
        contests: 25
      },
      achievements: [
        { name: 'Solved 400+ Problems', icon: CheckCircle, color: 'text-green-500' },
        { name: 'Contest Rating 1800+', icon: Trophy, color: 'text-yellow-500' },
        { name: '120 Day Streak', icon: Zap, color: 'text-blue-500' }
      ]
    },
    {
      name: 'GeeksforGeeks',
      username: 'balaji_geeks',
      url: 'https://auth.geeksforgeeks.org/user/balaji_geeks',
      color: '#2F8D46',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-500/30',
      stats: {
        problemsSolved: 380,
        ranking: 'Top 3%',
        streak: 95,
        contests: 18
      },
      achievements: [
        { name: 'Solved 350+ Problems', icon: CheckCircle, color: 'text-green-500' },
        { name: 'Institute Rank #1', icon: Award, color: 'text-purple-500' },
        { name: '95 Day Streak', icon: Zap, color: 'text-blue-500' }
      ]
    },
    {
      name: 'CodeChef',
      username: 'balaji_chef',
      url: 'https://www.codechef.com/users/balaji_chef',
      color: '#7C7C7C',
      bgColor: 'from-gray-500/10 to-slate-500/10',
      borderColor: 'border-gray-500/30',
      stats: {
        problemsSolved: 320,
        ranking: '4 Star',
        streak: 80,
        contests: 30
      },
      achievements: [
        { name: '4 Star Coder', icon: Star, color: 'text-yellow-500' },
        { name: 'Solved 300+ Problems', icon: CheckCircle, color: 'text-green-500' },
        { name: '80 Day Streak', icon: Zap, color: 'text-blue-500' }
      ]
    },
    {
      name: 'HackerRank',
      username: 'balaji_hacker',
      url: 'https://www.hackerrank.com/balaji_hacker',
      color: '#00EA64',
      bgColor: 'from-green-400/10 to-teal-500/10',
      borderColor: 'border-green-400/30',
      stats: {
        problemsSolved: 280,
        ranking: 'Gold Badge',
        streak: 60,
        contests: 15
      },
      achievements: [
        { name: 'Gold Badge Holder', icon: Award, color: 'text-yellow-500' },
        { name: 'Solved 250+ Problems', icon: CheckCircle, color: 'text-green-500' },
        { name: '60 Day Streak', icon: Zap, color: 'text-blue-500' }
      ]
    }
  ];

  const overallStats = [
    { label: 'Total Problems Solved', value: '1430+', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Coding Streak', value: '120 Days', icon: Zap, color: 'text-blue-500' },
    { label: 'Contests Participated', value: '88+', icon: Trophy, color: 'text-yellow-500' },
    { label: 'Average Rating', value: '1800+', icon: TrendingUp, color: 'text-purple-500' }
  ];

  const recentAchievements = [
    { title: 'LeetCode Weekly Contest', description: 'Ranked in top 10%', date: '2 days ago', platform: 'LeetCode' },
    { title: 'GeeksforGeeks Challenge', description: 'Solved all problems', date: '1 week ago', platform: 'GeeksforGeeks' },
    { title: 'CodeChef Long Challenge', description: '4-star rating achieved', date: '2 weeks ago', platform: 'CodeChef' },
    { title: 'HackerRank Contest', description: 'Gold badge earned', date: '3 weeks ago', platform: 'HackerRank' }
  ];

  return (
    <section id="coding-profiles" className="relative min-h-screen py-20">
      <ParticleBackground id="codingParticles" config="minimal" />
      
      {/* 3D Floating Shapes */}
      <div className="absolute top-20 left-20 w-28 h-28 opacity-25">
        <FloatingShape />
      </div>
      <div className="absolute bottom-20 right-20 w-24 h-24 opacity-30">
        <FloatingShape />
      </div>
      <div className="absolute top-1/3 left-10 w-20 h-20 opacity-20">
        <FloatingShape />
      </div>
      <div className="absolute bottom-1/3 right-10 w-16 h-16 opacity-25">
        <FloatingShape />
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">Coding Profiles</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey through competitive programming and problem-solving across various platforms
          </p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {overallStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="glass p-6 text-center rounded-lg hover:shadow-glow-primary transition-all duration-300"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <IconComponent className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Coding Platforms */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {codingPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`glass p-8 hover:shadow-glow-primary transition-all duration-500 border-2 ${platform.borderColor} hover:border-opacity-60`}>
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${platform.bgColor}`}>
                        <Code2 className="w-6 h-6" style={{ color: platform.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold gradient-text">{platform.name}</h3>
                        <p className="text-sm text-muted-foreground">@{platform.username}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass border-primary/30 hover:border-primary hover:shadow-glow-primary"
                      onClick={() => window.open(platform.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit
                    </Button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold gradient-text">{platform.stats.problemsSolved}</div>
                      <div className="text-xs text-muted-foreground">Problems Solved</div>
                    </div>
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold gradient-text">{platform.stats.ranking}</div>
                      <div className="text-xs text-muted-foreground">Ranking</div>
                    </div>
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold gradient-text">{platform.stats.streak}</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold gradient-text">{platform.stats.contests}</div>
                      <div className="text-xs text-muted-foreground">Contests</div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3">Recent Achievements</h4>
                    {platform.achievements.map((achievement, achievementIndex) => {
                      const IconComponent = achievement.icon;
                      return (
                        <motion.div
                          key={achievement.name}
                          className="flex items-center space-x-3 p-2 rounded-lg glass hover:shadow-glow-secondary transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 + achievementIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <IconComponent className={`w-4 h-4 ${achievement.color}`} />
                          <span className="text-sm">{achievement.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Achievements Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="glass p-8 hover:shadow-glow-accent transition-all duration-500">
            <CardContent className="p-0">
              <div className="flex items-center space-x-3 mb-8">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h3 className="text-2xl font-bold gradient-text">Recent Achievements</h3>
              </div>
              
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    className="flex items-center space-x-4 p-4 rounded-lg glass hover:shadow-glow-primary transition-all duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 rounded-full bg-primary/20">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">{achievement.platform}</Badge>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {achievement.date}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfilesSection;

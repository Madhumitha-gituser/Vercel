'use client'

import React, { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Users, 
  Award, 
  Brain,
  MessageCircle,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Search,
  Filter,
  Play,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Heart,
  Smile,
  Frown,
  Meh,
  Coffee,
  Gamepad2,
  Trophy,
  Gift,
  ArrowRight,
  ChevronRight,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react'

// Sample Data
const sampleEmployee = {
  id: '1',
  name: 'Madhumitha M',
  email: 'madhumitha.m@powergrid.co.in',
  role: 'Senior Engineer',
  department: 'Engineering',
  avatar: '',  // Removed avatar URL
  skills: {
    leadership: 75,
    technical: 88,
    communication: 65,
    projectManagement: 70,
    strategicThinking: 60
  },
  totalPoints: 2840,
  level: 7,
  streak: 15,
  completedCourses: 12,
  currentIDP: {
    title: 'Leadership Excellence Track',
    progress: 68,
    nextDeadline: '2024-11-15',
    activities: 8,
    completed: 5
  }
}

const organizationStats = {
  totalEmployees: 1247,
  activeIDPs: 892,
  completedCourses: 3456,
  avgSkillImprovement: 23,
  engagementRate: 87,
  wellnessScore: 79
}

const featuredCourses = [
  {
    id: '1',
    title: 'Advanced Leadership Strategies',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
    duration: '4 weeks',
    difficulty: 'Advanced',
    rating: 4.8,
    enrolled: 234,
    category: 'Leadership',
    progress: 45
  },
  {
    id: '2',
    title: 'Power Grid Safety Protocols',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
    duration: '2 weeks',
    difficulty: 'Intermediate',
    rating: 4.9,
    enrolled: 567,
    category: 'Safety',
    progress: 0
  },
  {
    id: '3',
    title: 'Effective Communication Skills',
    thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop',
    duration: '3 weeks',
    difficulty: 'Beginner',
    rating: 4.7,
    enrolled: 423,
    category: 'Communication',
    progress: 100
  },
  {
    id: '4',
    title: 'Project Management Excellence',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop',
    duration: '6 weeks',
    difficulty: 'Advanced',
    rating: 4.6,
    enrolled: 189,
    category: 'Management',
    progress: 20
  }
]

const recentActivities = [
  {
    id: '1',
    type: 'course_completion',
    title: 'Completed "Safety Protocol Training"',
    time: '2 hours ago',
    points: 150,
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    id: '2',
    type: 'skill_assessment',
    title: 'Technical Skills Assessment',
    time: '1 day ago',
    points: 75,
    icon: Target,
    color: 'text-blue-600'
  },
  {
    id: '3',
    type: 'wellness_checkin',
    title: 'Daily Wellness Check-in',
    time: '2 days ago',
    points: 25,
    icon: Heart,
    color: 'text-pink-600'
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Earned "Communication Expert" badge',
    time: '3 days ago',
    points: 200,
    icon: Award,
    color: 'text-yellow-600'
  }
]

const recommendations = [
  {
    id: '1',
    title: 'Leadership Mentoring Program',
    description: 'Pair with senior leaders for guidance and development',
    priority: 'High' as const,
    skillArea: 'Leadership',
    duration: '3 months',
    type: 'Mentoring',
    impact: 'High'
  },
  {
    id: '2',
    title: 'Technical Certification Course',
    description: 'Advanced power systems certification program',
    priority: 'Medium' as const,
    skillArea: 'Technical',
    duration: '6 weeks',
    type: 'Training',
    impact: 'Medium'
  },
  {
    id: '3',
    title: 'Cross-functional Project Assignment',
    description: 'Lead a project across multiple departments',
    priority: 'High' as const,
    skillArea: 'Project Management',
    duration: '4 months',
    type: 'Project',
    impact: 'High'
  },
  {
    id: '4',
    title: 'Communication Workshop Series',
    description: 'Weekly workshops on effective communication',
    priority: 'Medium' as const,
    skillArea: 'Communication',
    duration: '8 weeks',
    type: 'Workshop',
    impact: 'Medium'
  }
]

const wellnessData = {
  currentMood: 'good',
  stressLevel: 'medium',
  weeklyTrend: [7, 6, 8, 5, 7, 8, 7],
  lastCheckIn: '2024-10-02T09:30:00Z'
}

// Components
const StatCard = ({ icon: Icon, title, value, subtitle, trend }: any) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
        <Icon size={24} />
      </div>
      {trend && (
        <div className="text-green-600 text-sm font-medium">
          +{trend}%
        </div>
      )}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-gray-600 text-sm">{title}</p>
    {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
  </div>
)

const CourseCard = ({ course }: any) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
    <div className="relative">
      <img 
        src={course.thumbnail} 
        alt={course.title}
        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
        {course.category}
      </div>
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        {course.rating}
      </div>
      {course.progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
          <div className="bg-white rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <p className="text-white text-xs mt-1">{course.progress}% complete</p>
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {course.duration}
        </span>
        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
          {course.difficulty}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{course.enrolled} enrolled</span>
        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
          {course.progress === 100 ? 'Review' : course.progress > 0 ? 'Continue' : 'Start'}
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  </div>
)

const ActivityItem = ({ activity }: any) => (
  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
    <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
      <activity.icon size={16} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-gray-900 text-sm truncate">{activity.title}</p>
      <p className="text-gray-500 text-xs">{activity.time}</p>
    </div>
    <div className="text-sm font-semibold text-blue-600">
      +{activity.points}
    </div>
  </div>
)

const RecommendationCard = ({ rec }: any) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border border-red-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border border-green-200'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{rec.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
          {rec.priority}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4">{rec.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {rec.skillArea}
        </span>
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
          {rec.type}
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
          {rec.duration}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Impact: {rec.impact}</span>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Add to IDP
        </button>
      </div>
    </div>
  )
}

const SkillRadar = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h3 className="font-semibold text-gray-900 mb-4">Skills Overview</h3>
    <div className="space-y-4">
      {Object.entries(sampleEmployee.skills).map(([skill, level]) => (
        <div key={skill} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="capitalize font-medium">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="text-gray-600">{level}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
)

const WellnessWidget = () => {
  const [mood, setMood] = useState(wellnessData.currentMood)
  const [showBuddy, setShowBuddy] = useState(false)

  const moodEmojis = {
    excellent: { emoji: '😊', label: 'Excellent' },
    good: { emoji: '🙂', label: 'Good' },
    neutral: { emoji: '😐', label: 'Neutral' },
    low: { emoji: '😔', label: 'Low' },
    stressed: { emoji: '😰', label: 'Stressed' }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Wellness Check-in</h3>
        <button 
          onClick={() => setShowBuddy(true)}
          className="p-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors"
        >
          <MessageCircle size={16} />
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-3">How are you feeling today?</p>
        <div className="flex justify-between">
          {Object.entries(moodEmojis).map(([key, { emoji, label }]) => (
            <button
              key={key}
              onClick={() => setMood(key)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                mood === key 
                  ? 'bg-pink-100 ring-2 ring-pink-300 scale-110' 
                  : 'hover:bg-gray-100'
              }`}
              title={label}
            >
              <span className="text-2xl">{emoji}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-pink-500" />
          <span className="text-sm font-medium">Wellness Score</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
              style={{ width: `${wellnessData.stressLevel === 'low' ? 85 : wellnessData.stressLevel === 'medium' ? 65 : 40}%` }}
            />
          </div>
          <span className="text-sm font-semibold">
            {wellnessData.stressLevel === 'low' ? '85%' : wellnessData.stressLevel === 'medium' ? '65%' : '40%'}
          </span>
        </div>
      </div>

      <button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
        Play Relaxation Game
      </button>
    </div>
  )
}

const Header = () => {
  const [showProfile, setShowProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">POWERGRID IDP Intelligence</h1>
              <p className="text-sm text-gray-600">AI-Powered Development Platform</p>
            </div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Dashboard</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">My Profile</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Courses</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Wellness</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Analytics</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input 
              type="search" 
              placeholder="Search courses, skills..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <img 
                src={sampleEmployee.avatar} 
                alt={sampleEmployee.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{sampleEmployee.name}</p>
                <p className="text-xs text-gray-600">{sampleEmployee.role}</p>
              </div>
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-medium text-gray-900">{sampleEmployee.name}</p>
                  <p className="text-sm text-gray-600">{sampleEmployee.email}</p>
                </div>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                  <User size={16} />
                  View Profile
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                  <Settings size={16} />
                  Settings
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {sampleEmployee.name}! 👋</h1>
                <p className="text-blue-100 mb-4">Continue your learning journey and achieve your career goals</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span>Level {sampleEmployee.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span>{sampleEmployee.totalPoints} Points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    <span>{sampleEmployee.streak} Day Streak</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <img 
                    src={sampleEmployee.avatar} 
                    alt={sampleEmployee.name}
                    className="w-24 h-24 rounded-full border-4 border-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Users} 
            title="Total Employees" 
            value={organizationStats.totalEmployees.toLocaleString()}
            trend={5}
          />
          <StatCard 
            icon={Target} 
            title="Active IDPs" 
            value={organizationStats.activeIDPs.toLocaleString()}
            trend={12}
          />
          <StatCard 
            icon={BookOpen} 
            title="Completed Courses" 
            value={organizationStats.completedCourses.toLocaleString()}
            trend={18}
          />
          <StatCard 
            icon={TrendingUp} 
            title="Avg Skill Improvement" 
            value={`${organizationStats.avgSkillImprovement}%`}
            trend={8}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-3 hover:scale-105">
            <Target className="w-6 h-6" />
            <span className="font-medium">Generate My IDP</span>
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-3 hover:scale-105">
            <BookOpen className="w-6 h-6" />
            <span className="font-medium">Browse Courses</span>
          </button>
          <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 flex items-center gap-3 hover:scale-105">
            <Heart className="w-6 h-6" />
            <span className="font-medium">Wellness Check</span>
          </button>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-3 hover:scale-105">
            <BarChart3 className="w-6 h-6" />
            <span className="font-medium">View Progress</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current IDP Progress */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Current IDP Progress</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                  View Details <ChevronRight size={16} />
                </button>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">{sampleEmployee.currentIDP.title}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-semibold">{sampleEmployee.currentIDP.progress}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 mb-4">
                  <div 
                    className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${sampleEmployee.currentIDP.progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Activities: </span>
                    <span className="font-semibold">{sampleEmployee.currentIDP.completed}/{sampleEmployee.currentIDP.activities}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Next Deadline: </span>
                    <span className="font-semibold">Nov 15, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Courses */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Featured Courses</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">AI Recommendations</h2>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.slice(0, 4).map(rec => (
                  <RecommendationCard key={rec.id} rec={rec} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills Overview */}
            <SkillRadar />
            
            {/* Wellness Widget */}
            <WellnessWidget />

            {/* Recent Activities */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Recent Activities</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-1">
                {recentActivities.map(activity => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Fast Learner', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
                  { name: 'Team Player', icon: '🤝', color: 'from-blue-400 to-purple-500' },
                  { name: 'Safety First', icon: '🛡️', color: 'from-green-400 to-blue-500' },
                  { name: 'Leader', icon: '👑', color: 'from-purple-400 to-pink-500' }
                ].map((badge, index) => (
                  <div key={index} className={`bg-gradient-to-r ${badge.color} p-3 rounded-lg text-white text-center hover:scale-105 transition-transform cursor-pointer`}>
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium">{badge.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
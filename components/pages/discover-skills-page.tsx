'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Clock, X, ChevronDown, Star, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { SkillCard } from '@/components/ui/skill-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { useAppContext } from '@/contexts/app-context';
import type { UserProfile } from '@/types';

export function DiscoverSkillsPage() {
  const {
    searchQuery,
    setSearchQuery,
    availabilityFilter,
    setAvailabilityFilter,
    skillFilter,
    setSkillFilter,
    currentUser,
    users,
  } = useAppContext();

  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [selectedSkillCategories, setSelectedSkillCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState('grid');
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [experienceFilter, setExperienceFilter] = useState<string>('');
  const [formatFilter, setFormatFilter] = useState<string>('');

  const skillCategories = [
    'Programming',
    'Design',
    'Languages',
    'Music',
    'Cooking',
    'Sports',
    'Business',
    'Academic',
  ];

  const availabilityOptions = ['Weekdays', 'Weekends', 'Mornings', 'Evenings', 'Flexible'];

  const ratingOptions = [
    { label: 'Any Rating', value: 0 },
    { label: '4+ Stars', value: 4 },
    { label: '3+ Stars', value: 3 },
    { label: '2+ Stars', value: 2 },
  ];

  const categoryOptions = [
    'Technology',
    'Arts & Crafts',
    'Languages',
    'Music',
    'Cooking',
    'Business',
    'Academic',
    'Sports & Fitness',
    'Professional Skills',
  ];

  const experienceOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const formatOptions = ['One-on-One', 'Group Sessions', 'Online', 'In-Person'];

  useEffect(() => {
    // Filter users based on search query and filters
    let filtered = [...users];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.skillsOffered.some((skill: string) => skill.toLowerCase().includes(query)) ||
          user.skillsWanted.some((skill: string) => skill.toLowerCase().includes(query))
      );
    }

    if (skillFilter) {
      filtered = filtered.filter((user) =>
        user.skillsOffered.some((skill: string) =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )
      );
    }

    if (availabilityFilter) {
      filtered = filtered.filter((user) =>
        user.availability.toLowerCase().includes(availabilityFilter.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((user) =>
        user.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (selectedSkillCategories.length > 0) {
      filtered = filtered.filter((user) =>
        user.skillsOffered.some((skill: string) =>
          selectedSkillCategories.some((category) =>
            skill.toLowerCase().includes(category.toLowerCase())
          )
        )
      );
    }

    if (ratingFilter > 0) {
      filtered = filtered.filter((user) => (user.rating || 0) >= ratingFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter((user) =>
        // Handle based on skills offered since skillCategories might not exist
        user.skillsOffered.some((skill: string) =>
          skill.toLowerCase().includes(categoryFilter.toLowerCase())
        )
      );
    }

    if (experienceFilter) {
      // Filter by experience level if available, otherwise assume all match
      filtered = filtered.filter(
        (user) =>
          // For now, since experienceLevel doesn't exist on UserProfile, we'll treat all as matches
          // In a real implementation, this would check user.experienceLevel if it existed
          true
      );
    }

    if (formatFilter) {
      // Filter by teaching format if available, otherwise assume all match
      filtered = filtered.filter(
        (user) =>
          // For now, since teachingFormat doesn't exist on UserProfile, we'll treat all as matches
          // In a real implementation, this would check user.teachingFormat if it existed
          true
      );
    }

    // Remove current user from results
    if (currentUser) {
      filtered = filtered.filter((user) => user.id !== currentUser.id);
    }

    setFilteredUsers(filtered);
  }, [
    searchQuery,
    skillFilter,
    availabilityFilter,
    locationFilter,
    selectedSkillCategories,
    ratingFilter,
    categoryFilter,
    experienceFilter,
    formatFilter,
    users,
    currentUser,
  ]);

  const handleRequestSwap = (userId: string, skillName: string) => {
    // Handle swap request
    console.log(`Requesting to swap for ${skillName} with user ${userId}`);
    // Implement the actual request logic
  };

  const toggleSkillCategory = (category: string) => {
    setSelectedSkillCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSkillFilter('');
    setAvailabilityFilter('');
    setLocationFilter('');
    setSelectedSkillCategories([]);
    setRatingFilter(0);
    setCategoryFilter('');
    setExperienceFilter('');
    setFormatFilter('');
  };

  const resetFilters = () => {
    clearFilters();
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-blue-600">
          Discover{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Skills
          </span>
        </h1>
        <p className="text-xl text-purple-700 leading-relaxed max-w-3xl">
          Find users offering the skills you want to learn and connect for knowledge exchange
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search skills or users..."
              className="pl-12 py-6 text-base shadow-sm border-2 border-gray-100 focus-visible:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-2 border-gray-200 py-6 px-5 text-base"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
              <span className="font-medium">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </Button>
          </motion.div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto"
                >
                  <Button
                    variant="outline"
                    className={`flex items-center gap-2 border-2 py-6 px-5 text-base w-full md:w-auto ${
                      availabilityFilter
                        ? 'border-blue-200 bg-blue-50 text-blue-600'
                        : 'border-gray-200'
                    }`}
                  >
                    <Clock className={`h-5 w-5 ${availabilityFilter ? 'text-blue-600' : ''}`} />
                    <span className="font-medium">{availabilityFilter || 'Availability'}</span>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52">
                {availabilityOptions.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option}
                    checked={availabilityFilter === option}
                    onCheckedChange={() =>
                      availabilityFilter === option
                        ? setAvailabilityFilter('')
                        : setAvailabilityFilter(option)
                    }
                    className="py-2"
                  >
                    {option}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto"
                >
                  <Button
                    variant="outline"
                    className={`flex items-center gap-2 border-2 py-6 px-5 text-base w-full md:w-auto ${
                      locationFilter
                        ? 'border-blue-200 bg-blue-50 text-blue-600'
                        : 'border-gray-200'
                    }`}
                  >
                    <MapPin className={`h-5 w-5 ${locationFilter ? 'text-blue-600' : ''}`} />
                    <span className="font-medium truncate max-w-[100px]">
                      {locationFilter || 'Location'}
                    </span>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-3">
                <Input
                  placeholder="Enter city or region..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="mb-1"
                />
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto"
                >
                  <Button
                    variant="outline"
                    className={`flex items-center gap-2 border-2 py-6 px-5 text-base w-full md:w-auto ${
                      ratingFilter > 0
                        ? 'border-blue-200 bg-blue-50 text-blue-600'
                        : 'border-gray-200'
                    }`}
                  >
                    <Star
                      className={`h-5 w-5 ${
                        ratingFilter > 0 ? 'text-blue-600 fill-blue-500' : 'fill-none'
                      }`}
                    />
                    <span className="font-medium">
                      {ratingFilter > 0 ? `${ratingFilter}+ Stars` : 'Rating'}
                    </span>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {ratingOptions.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={ratingFilter === option.value}
                    onCheckedChange={() =>
                      ratingFilter === option.value
                        ? setRatingFilter(0)
                        : setRatingFilter(option.value)
                    }
                    className="py-2"
                  >
                    <span className="flex items-center">
                      {option.label}
                      {option.value > 0 && (
                        <span className="flex ml-2">
                          {[...Array(option.value)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </span>
                      )}
                    </span>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Tabs
              defaultValue="grid"
              className="hidden md:flex ml-2"
              onValueChange={(value) => setView(value)}
            >
              <TabsList className="border-2 border-gray-200">
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 font-medium px-4"
                >
                  Grid
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 font-medium px-4"
                >
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="mb-4 overflow-hidden border-2 border-gray-100 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-semibold text-purple-700">
                      Filter by Skill Categories
                    </h3>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="text-base mt-2 md:mt-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear All Filters
                      </Button>
                    </motion.div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-2">
                    {skillCategories.map((category) => (
                      <motion.div
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant={
                            selectedSkillCategories.includes(category) ? 'default' : 'outline'
                          }
                          className={`cursor-pointer px-4 py-1.5 text-base font-medium ${
                            selectedSkillCategories.includes(category)
                              ? 'bg-blue-500 hover:bg-blue-600 text-white'
                              : 'border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                          }`}
                          onClick={() => toggleSkillCategory(category)}
                        >
                          {category}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Applied Filters */}
        {(searchQuery ||
          availabilityFilter ||
          locationFilter ||
          selectedSkillCategories.length > 0) && (
          <div className="p-4 bg-gray-50 rounded-lg mb-5 border border-gray-100">
            <div className="flex flex-wrap gap-2">
              <div className="text-base font-semibold text-gray-700 mr-2 flex items-center mb-2 md:mb-0">
                <Filter className="h-4 w-4 mr-2" /> Active Filters:
              </div>

              {searchQuery && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-blue-50 border border-blue-200 text-blue-700 flex items-center gap-1 py-1.5 px-3 text-sm font-medium"
                  >
                    <Search className="h-3 w-3 mr-1" />
                    Search: {searchQuery}
                    <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                      <X
                        className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-red-500"
                        onClick={() => setSearchQuery('')}
                      />
                    </motion.div>
                  </Badge>
                </motion.div>
              )}

              {availabilityFilter && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-green-50 border border-green-200 text-green-700 flex items-center gap-1 py-1.5 px-3 text-sm font-medium"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Available: {availabilityFilter}
                    <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                      <X
                        className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-red-500"
                        onClick={() => setAvailabilityFilter('')}
                      />
                    </motion.div>
                  </Badge>
                </motion.div>
              )}

              {locationFilter && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-purple-50 border border-purple-200 text-purple-700 flex items-center gap-1 py-1.5 px-3 text-sm font-medium"
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    Location: {locationFilter}
                    <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                      <X
                        className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-red-500"
                        onClick={() => setLocationFilter('')}
                      />
                    </motion.div>
                  </Badge>
                </motion.div>
              )}

              {selectedSkillCategories.map((category) => (
                <motion.div
                  key={category}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-amber-50 border border-amber-200 text-amber-700 flex items-center gap-1 py-1.5 px-3 text-sm font-medium"
                  >
                    {category}
                    <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                      <X
                        className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-red-500"
                        onClick={() => toggleSkillCategory(category)}
                      />
                    </motion.div>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-200 pb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-blue-600">
              <span className="text-blue-600">{filteredUsers.length}</span>{' '}
              {filteredUsers.length === 1 ? 'Result' : 'Results'} Found
            </h2>
            <p className="text-gray-600 mt-1">Discover users with skills matching your interests</p>
          </motion.div>

          <div className="flex items-center mt-3 md:mt-0">
            <div className="bg-gray-100 rounded-md px-4 py-2 text-gray-700 font-medium flex items-center">
              <span>Showing </span>
              <span className="mx-1 px-2 py-0.5 bg-white rounded text-blue-600 font-bold">
                {Math.min(filteredUsers.length, 12)}
              </span>
              <span>of </span>
              <span className="mx-1 px-2 py-0.5 bg-white rounded text-blue-600 font-bold">
                {filteredUsers.length}
              </span>
            </div>

            <Tabs
              defaultValue="grid"
              className="ml-3 hidden md:flex"
              onValueChange={(value) => setView(value)}
            >
              <TabsList className="border-2 border-gray-200">
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 font-medium"
                >
                  Grid
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 font-medium"
                >
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-200">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto p-6"
            >
              <div className="bg-white p-6 rounded-full w-28 h-28 mx-auto mb-6 flex items-center justify-center shadow-md border-4 border-gray-100">
                <Search className="h-14 w-14 text-gray-300" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-purple-700">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  No results found
                </span>
              </h3>
              <p className="text-gray-600 mb-6 text-xl leading-relaxed">
                We couldn't find any users matching your current filters. Try adjusting your search
                criteria.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={clearFilters}
                  size="lg"
                  className="font-medium text-lg px-6 py-6 h-auto bg-blue-600 hover:bg-blue-700 shadow-lg"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset All Filters
                </Button>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <div
            className={
              view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'
            }
          >
            {filteredUsers.slice(0, 12).map((user) => (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SkillCard
                  user={user}
                  skillOffered={user.skillsOffered[0]}
                  direction={view === 'list' ? 'horizontal' : 'vertical'}
                  onRequestSwap={handleRequestSwap}
                  className="bg-white"
                />
              </motion.div>
            ))}
          </div>
        )}

        {filteredUsers.length > 12 && (
          <motion.div
            className="flex justify-center mt-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 font-medium border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            >
              Load More Results
              <ChevronDown className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

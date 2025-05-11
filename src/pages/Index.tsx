"use client"

import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import FilterBar from '@/components/FilterBar';
import EmptyState from '@/components/EmptyState';
import { searchRepositories, getLanguages, getTopics } from '@/services/githubService';
import { adaptGitHubRepo } from '@/utils/githubAdapter';
import { Project } from '@/data/projects';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2, Github, Code2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('stars');
  const [showGoodFirstIssues, setShowGoodFirstIssues] = useState(false);
  const [page, setPage] = useState(1);
  const [languages, setLanguages] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]); // Store all fetched projects

  // Fetch available languages and topics
  useEffect(() => {
    const loadFilters = async () => {
      const fetchedLanguages = await getLanguages();
      const fetchedTopics = await getTopics();
      setLanguages(fetchedLanguages);
      setTopics(fetchedTopics);
    };
    
    loadFilters();
  }, []);

  // Fetch repositories based on filters
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['repositories', searchTerm, selectedLanguage, sortBy, page, showGoodFirstIssues],
    queryFn: async () => {
      const result = await searchRepositories(
        searchTerm,
        selectedLanguage,
        sortBy,
        page,
        9,  // Number of items per page
        showGoodFirstIssues
      );
      
      // Adapt GitHub repos to our Project format
      const projects: Project[] = result.data.map(adaptGitHubRepo);
      
      // Store all projects for client-side filtering
      setAllProjects(prevProjects => {
        // If we're on page 1, replace all projects
        if (page === 1) {
          return projects;
        }
        // Otherwise, append new projects to existing ones
        const newProjects = [...prevProjects, ...projects];
        // Remove duplicates based on id
        return Array.from(new Map(newProjects.map(p => [p.id, p])).values());
      });
      
      return { projects, totalCount: result.totalCount };
    },
    enabled: true, // Enable the query by default
  });

  const filteredProjects = data?.projects || [];
  const totalCount = data?.totalCount || 0;

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('all');
    setSelectedTags([]);
    setSortBy('stars');
    setShowGoodFirstIssues(false);
    setPage(1);
    setAllProjects([]);
  };

  // Apply tag filtering on the client side
  const tagFilteredProjects = selectedTags.length > 0
    ? allProjects.filter(project => 
        selectedTags.some(tag => project.tags.includes(tag))
      )
    : filteredProjects;

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-background"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl"></div>
        
        {/* Animated code symbols */}
        <div className="absolute top-[10%] left-[5%] text-primary/5 text-6xl">{'<>'}</div>
        <div className="absolute top-[30%] right-[10%] text-primary/5 text-4xl">{'{ }'}</div>
        <div className="absolute bottom-[20%] left-[15%] text-primary/5 text-5xl">{'( )'}</div>
        <div className="absolute bottom-[40%] right-[5%] text-primary/5 text-7xl">{'/'}</div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.02]"></div>
      </div>

      <main className="flex-1 container py-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-block relative">
            <motion.div 
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 via-primary/40 to-secondary/20 blur-xl opacity-70"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "linear" 
              }}
            />
            <h1 className="relative text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent px-4 py-2">
              Find Open Source Projects
            </h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover open source projects that match your interests and skill level,
              and start making meaningful contributions today.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center gap-4 pt-4"
          >
            <Button className="group" size="lg">
              <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="group">
              <Code2 className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              Learn More
            </Button>
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="sticky top-4">
              <FilterBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                sortBy={sortBy}
                setSortBy={setSortBy}
                showGoodFirstIssues={showGoodFirstIssues}
                setShowGoodFirstIssues={setShowGoodFirstIssues}
                languages={languages}
                topics={topics}
              />
              <Button 
                variant="outline" 
                className="w-full mt-4 hover:bg-secondary/80 transition-colors group"
                onClick={() => {
                  resetFilters();
                  refetch();
                }}
              >
                <motion.span 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="opacity-0 group-hover:opacity-100 absolute"
                >
                  ↺
                </motion.span>
                <span className="group-hover:opacity-0">Reset Filters</span>
                <span className="opacity-0 group-hover:opacity-100 absolute">Reset Filters</span>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {isLoading && page === 1 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col justify-center items-center h-64"
              >
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-muted-foreground"
                >
                  Discovering amazing projects...
                </motion.span>
              </motion.div>
            ) : isError ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-12 border border-dashed border-destructive/30 rounded-xl bg-destructive/5"
              >
                <p className="text-destructive mb-4 text-lg">Error loading repositories.</p>
                <Button onClick={() => refetch()} className="group">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    className="inline-block mr-2"
                  >
                    ↻
                  </motion.span>
                  Try Again
                </Button>
              </motion.div>
            ) : tagFilteredProjects.length > 0 ? (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-between items-center mb-6 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50"
                >
                  <p className="text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{allProjects.length}</span> of{" "}
                    <span className="font-medium text-foreground">{totalCount.toLocaleString()}</span> projects
                  </p>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Sorted by {sortBy}</span>
                  </div>
                </motion.div>
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`${selectedLanguage}-${sortBy}-${selectedTags.join()}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {tagFilteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.1 * Math.min(index, 5), // Cap the delay for better UX
                          ease: "easeOut" 
                        }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
                
                {filteredProjects.length < totalCount && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="mt-12 text-center"
                  >
                    <Button 
                      onClick={handleLoadMore} 
                      disabled={isLoading}
                      size="lg"
                      className="relative overflow-hidden group"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100"
                        animate={{ 
                          x: ['-100%', '100%'],
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: "linear" 
                        }}
                      />
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Discover More Projects"
                      )}
                    </Button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <EmptyState onReset={resetFilters} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="border-t border-border/50 py-8 mt-16 backdrop-blur-sm bg-background/30 relative z-10"
      >
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Github className="h-5 w-5 text-primary" />
              <p className="font-medium text-foreground">OpenSourceFinder</p>
            </motion.div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} OpenSourceFinder. Find the perfect open source project to contribute to.
            </p>
            
            <div className="flex gap-4">
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </motion.a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;

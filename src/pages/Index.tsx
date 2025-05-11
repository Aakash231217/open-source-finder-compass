import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import FilterBar from '@/components/FilterBar';
import EmptyState from '@/components/EmptyState';
import { searchRepositories, getLanguages, getTopics } from '@/services/githubService';
import { adaptGitHubRepo } from '@/utils/githubAdapter';
import { Project } from '@/data/projects';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Find Open Source Projects to Contribute
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover open source projects that match your interests and skill level,
            and start making meaningful contributions today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-4">
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
                className="w-full mt-4 hover:bg-secondary/80 transition-colors"
                onClick={() => {
                  resetFilters();
                  refetch();
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {isLoading && page === 1 ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading repositories...</span>
              </div>
            ) : isError ? (
              <div className="text-center p-8">
                <p className="text-red-500 mb-4">Error loading repositories.</p>
                <Button onClick={() => refetch()}>Try Again</Button>
              </div>
            ) : tagFilteredProjects.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{allProjects.length}</span> of{" "}
                    <span className="font-medium text-foreground">{totalCount.toLocaleString()}</span> projects
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {tagFilteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
                
                {filteredProjects.length < totalCount && (
                  <div className="mt-8 text-center">
                    <Button onClick={handleLoadMore} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Load More"
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <EmptyState onReset={resetFilters} />
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border/50 py-8 mt-16 bg-muted/5">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} OpenSourceFinder. Find the perfect open source project to contribute to.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

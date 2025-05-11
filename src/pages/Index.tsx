
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import FilterBar from '@/components/FilterBar';
import EmptyState from '@/components/EmptyState';
import { projects } from '@/data/projects';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('stars');
  const [showGoodFirstIssues, setShowGoodFirstIssues] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        // Filter by search term
        if (searchTerm && !project.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
            !project.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        
        // Filter by language
        if (selectedLanguage !== 'all' && project.language !== selectedLanguage) {
          return false;
        }
        
        // Filter by tags
        if (selectedTags.length > 0 && !selectedTags.some(tag => project.tags.includes(tag))) {
          return false;
        }
        
        // Filter by good first issues
        if (showGoodFirstIssues && project.goodFirstIssues <= 0) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'stars':
            return b.stars - a.stars;
          case 'updated':
            return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
          case 'issues':
            return b.issues - a.issues;
          case 'goodFirstIssues':
            return b.goodFirstIssues - a.goodFirstIssues;
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedLanguage, selectedTags, sortBy, showGoodFirstIssues]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('all');
    setSelectedTags([]);
    setSortBy('stars');
    setShowGoodFirstIssues(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Find Open Source Projects to Contribute</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover open source projects that match your interests and skill level,
            and start making meaningful contributions today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
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
            />
          </div>
          
          <div className="lg:col-span-3">
            {filteredProjects.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{filteredProjects.length}</span> projects
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState onReset={resetFilters} />
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 mt-12">
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

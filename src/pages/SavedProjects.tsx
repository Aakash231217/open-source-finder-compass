import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { savedProjectsService } from '@/services/savedProjectsService';
import { Project } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import { projectEvents } from '@/events/projectEvents';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/EmptyState';

const SavedProjects: React.FC = () => {
  const navigate = useNavigate();
  const [savedProjects, setSavedProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load initial saved projects
    setSavedProjects(savedProjectsService.getSavedProjects());

    // Subscribe to project save/unsave events
    const unsubscribe = projectEvents.subscribe(() => {
      setSavedProjects(savedProjectsService.getSavedProjects());
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Saved Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your collection of interesting open source projects.
          </p>
        </div>

        {savedProjects.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                You have saved <span className="font-medium text-foreground">{savedProjects.length}</span> projects
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState 
            title="No saved projects yet"
            description="Start exploring and save projects that interest you."
            action={
              <Button 
                onClick={() => navigate('/')} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
              >
                Explore Projects
              </Button>
            }
          />
        )}
      </main>

      <footer className="border-t border-border/50 py-8 mt-16 bg-muted/5">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} OpenSourceFinder. Find the perfect open source project to contribute to.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SavedProjects;

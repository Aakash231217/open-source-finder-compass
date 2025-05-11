
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, GitFork, AlertCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import { Project } from '@/data/projects';
import { savedProjectsService } from '@/services/savedProjectsService';
import { projectEvents } from '@/events/projectEvents';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    setIsSaved(savedProjectsService.isProjectSaved(project.id));
  }, [project.id]);

  const handleSave = () => {
    if (isSaved) {
      savedProjectsService.removeProject(project.id);
      setIsSaved(false);
    } else {
      savedProjectsService.saveProject(project);
      setIsSaved(true);
    }
    projectEvents.emit();
  };

  return (
    <Card className="group h-full overflow-hidden transition-all duration-200 hover:shadow-lg dark:hover:shadow-primary/5 animate-fade-in bg-card hover:bg-accent/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img 
              src={project.owner.avatar} 
              alt={project.owner.name} 
              className="w-8 h-8 rounded-full ring-2 ring-background"
            />
            <span className="text-sm text-muted-foreground font-medium">{project.owner.name}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            title={isSaved ? 'Remove from saved projects' : 'Save project'}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block mt-2 group-hover:text-primary transition-colors"
        >
          <h3 className="font-bold text-xl">{project.name}</h3>
        </a>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2 h-12">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge 
            variant="outline" 
            className="bg-primary/5 hover:bg-primary/10 transition-colors border-primary/10"
          >
            {project.language}
          </Badge>
          
          {project.tags.slice(0, 2).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs hover:bg-secondary/80 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 border-border/50">
        <div className="flex justify-between items-center w-full text-sm">
          <div className="flex gap-6">
            <div 
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors" 
              title="Stars"
            >
              <Star size={16} className="text-yellow-500" />
              <span>{project.stars.toLocaleString()}</span>
            </div>
            <div 
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors" 
              title="Forks"
            >
              <GitFork size={16} />
              <span>{project.forks.toLocaleString()}</span>
            </div>
          </div>
          
          <div 
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors" 
            title="Open Issues"
          >
            <AlertCircle size={16} />
            <span>{project.issues.toLocaleString()}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

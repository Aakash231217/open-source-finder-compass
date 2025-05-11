
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Star, GitFork, AlertCircle } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <img 
            src={project.owner.avatar} 
            alt={project.owner.name} 
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">{project.owner.name}</span>
        </div>
        <Link to={`/project/${project.id}`} className="hover:underline">
          <h3 className="font-bold text-xl mt-2">{project.name}</h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2 h-12">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-secondary">
            {project.language}
          </Badge>
          
          {project.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between items-center w-full text-sm">
          <div className="flex gap-4">
            <div className="flex items-center gap-1" title="Stars">
              <Star size={16} className="text-yellow-500" />
              <span>{project.stars.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1" title="Forks">
              <GitFork size={16} className="text-muted-foreground" />
              <span>{project.forks.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1" title="Open Issues">
            <AlertCircle size={16} className="text-primary" />
            <span>{project.issues.toLocaleString()}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

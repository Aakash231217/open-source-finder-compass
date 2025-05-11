
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { 
  ArrowLeft, Star, GitFork, AlertCircle, 
  Clock, FileText, Github 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRepositoryDetails, getGoodFirstIssues } from '@/services/githubService';
import { adaptGitHubRepo } from '@/utils/githubAdapter';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Project } from '@/data/projects';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: project, isLoading, isError } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      // Extract owner and repo name from the URL if the id contains a URL
      let owner, repo;
      
      if (id && id.includes('/')) {
        [owner, repo] = id.split('/');
      } else {
        // If we only have the id, we need to look up the repository details
        const repoDetails = await getRepositoryDetails('', '', Number(id));
        if (repoDetails) {
          const adaptedRepo = adaptGitHubRepo(repoDetails);
          const url = adaptedRepo.repositoryUrl;
          const urlParts = url.replace('https://github.com/', '').split('/');
          owner = urlParts[0];
          repo = urlParts[1];
        }
      }
      
      if (!owner || !repo) {
        throw new Error('Invalid repository details');
      }
      
      // Get repository details
      const repoDetails = await getRepositoryDetails(owner, repo);
      if (!repoDetails) {
        throw new Error('Repository not found');
      }
      
      // Adapt to our Project format
      const project = adaptGitHubRepo(repoDetails);
      
      // Get additional data like good first issues count
      const goodFirstIssuesCount = await getGoodFirstIssues(owner, repo);
      project.goodFirstIssues = goodFirstIssuesCount;
      
      return project;
    },
    enabled: !!id,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-12 flex flex-col items-center justify-center flex-1">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-12 flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the project you're looking for.
          </p>
          <Link to="/">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container py-8 flex-1">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to projects
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={project.owner.avatar} 
                  alt={project.owner.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{project.owner.name}</h4>
                  <Badge variant="outline">{project.language}</Badge>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                  <Star className="text-yellow-500 mb-1" size={20} />
                  <span className="font-bold">{project.stars.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">Stars</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                  <GitFork className="text-primary mb-1" size={20} />
                  <span className="font-bold">{project.forks.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">Forks</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                  <AlertCircle className="text-orange-500 mb-1" size={20} />
                  <span className="font-bold">{project.issues.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">Issues</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                  <Clock className="text-blue-500 mb-1" size={20} />
                  <span className="font-bold">{new Date(project.lastUpdated).toLocaleDateString()}</span>
                  <span className="text-xs text-muted-foreground">Last Updated</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Why Contribute to {project.name}?</h2>
              <p className="text-muted-foreground mb-4">
                Contributing to {project.name} is a great opportunity to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Work on a widely-used project with {project.stars.toLocaleString()} stars</li>
                <li>Learn from experienced developers in the {project.language} ecosystem</li>
                <li>Improve your skills with a production-grade codebase</li>
                <li>Make an impact on a project used by many developers worldwide</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" asChild>
                  <a 
                    href={project.repositoryUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Github size={18} />
                    View Repository
                  </a>
                </Button>
                
                <div className="py-4 border-t border-b">
                  <h4 className="font-medium mb-2">License</h4>
                  <Badge variant="outline">{project.license}</Badge>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Beginner Friendly Issues</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Good First Issues</span>
                      <Badge>{project.goodFirstIssues}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Help Wanted</span>
                      <Badge>{project.helpWantedIssues}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contribution Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="bg-secondary rounded-full p-1.5 h-min">
                      <FileText size={16} className="text-primary" />
                    </div>
                    <p className="text-sm">Read the contribution guidelines before starting</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-secondary rounded-full p-1.5 h-min">
                      <FileText size={16} className="text-primary" />
                    </div>
                    <p className="text-sm">Look for issues labeled "good first issue" or "help wanted"</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-secondary rounded-full p-1.5 h-min">
                      <FileText size={16} className="text-primary" />
                    </div>
                    <p className="text-sm">Introduce yourself in the issue comments before working on it</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-secondary rounded-full p-1.5 h-min">
                      <FileText size={16} className="text-primary" />
                    </div>
                    <p className="text-sm">Follow the project's code style and conventions</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 mt-auto">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} OpenSourceFinder. Find the perfect open source project to contribute to.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetails;

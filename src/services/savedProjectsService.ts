import { Project } from '@/data/projects';

class SavedProjectsService {
  private readonly STORAGE_KEY = 'saved_projects';

  getSavedProjects(): Project[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  saveProject(project: Project): void {
    const savedProjects = this.getSavedProjects();
    if (!savedProjects.some(p => p.id === project.id)) {
      savedProjects.push(project);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(savedProjects));
    }
  }

  removeProject(projectId: string): void {
    const savedProjects = this.getSavedProjects();
    const filtered = savedProjects.filter(p => p.id !== projectId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  isProjectSaved(projectId: string): boolean {
    const savedProjects = this.getSavedProjects();
    return savedProjects.some(p => p.id === projectId);
  }
}

export const savedProjectsService = new SavedProjectsService();

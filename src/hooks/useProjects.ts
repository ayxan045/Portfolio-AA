import { useState, useCallback } from 'react';
import type { PortfolioItem } from '../types';
import { portfolioItems as initialItems } from '../data/portfolioData';

const STORAGE_KEY = 'portfolio_projects';

function loadFromStorage(): PortfolioItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PortfolioItem[]) : initialItems;
  } catch {
    return initialItems;
  }
}

function saveToStorage(items: PortfolioItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    console.error('LocalStorage error');
  }
}

export function useProjects() {
  const [projects, setProjects] = useState<PortfolioItem[]>(loadFromStorage);

  const addProject = useCallback((project: Omit<PortfolioItem, 'id'>) => {
    const newProject: PortfolioItem = {
      ...project,
      id: crypto.randomUUID(),
    };
    setProjects((prev) => {
      const updated = [...prev, newProject];
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const updateProject = useCallback((id: string, data: Omit<PortfolioItem, 'id'>) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...data, id } : p));
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  return { projects, addProject, updateProject, deleteProject };
}
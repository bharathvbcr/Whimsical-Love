import React from 'react';

export interface StoryCardProps {
  title: string;
  text: string;
  delay?: number;
  rotation?: number;
  icon?: React.ReactNode;
}

export interface FloatingElementProps {
  delay: number;
  duration: number;
  left: string;
  top: string;
  scale: number;
  children: React.ReactNode;
}
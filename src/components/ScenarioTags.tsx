import { Badge } from '@mantine/core';

interface ScenarioTagsProps {
  tags: string[];
  activeTag?: string;
  onTagSelect: (tag: string) => void;
}

export function ScenarioTags({ tags, activeTag, onTagSelect }: ScenarioTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={activeTag === tag ? 'filled' : 'light'}
          color={activeTag === tag ? 'gray' : 'gray'}
          onClick={() => onTagSelect(tag)}
          className={`cursor-pointer font-normal rounded-full px-3 text-sm lowercase ${
            activeTag === tag 
              ? 'bg-gray-800 text-white' 
              : 'bg-[#f3f4f6] text-gray-800 hover:bg-gray-200'
          }`}
          size="md"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
} 
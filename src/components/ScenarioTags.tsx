import { Badge, Group, Text } from '@mantine/core';

interface ScenarioTagsProps {
  tags: string[];
  activeTag?: string;
  onTagSelect: (tag: string) => void;
}

export function ScenarioTags({ tags, activeTag, onTagSelect }: ScenarioTagsProps) {
  return (
    <Group gap="sm" wrap="wrap">
      {tags.map((tag) => (
        <Badge
          key={tag}
          onClick={() => onTagSelect(activeTag === tag ? undefined : tag)}
          radius="sm"
          classNames={{
            root: `cursor-pointer font-normal transition-all duration-200 ${
              activeTag === tag 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`
          }}
        >
          {tag}
        </Badge>
      ))}
      {tags.length === 0 && (
        <Text size="sm" color="dimmed" className="italic">
          No tags available
        </Text>
      )}
    </Group>
  );
} 
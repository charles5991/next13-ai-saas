import { ToolCard } from "@/components/tool-card";
import { Heading } from "@/components/heading";

export default function HomePage() {
  const tools = [
    {
      label: 'Email Writer',
      description: 'Create your best email yet.',
      icon: '/mail.png',
      href: '/email',
      premium: false,
    },
    {
      label: 'Chat',
      description: 'Chat with an AI Assistant.',
      icon: '/chat.png',
      href: '/',
      premium: true,
    },
    {
      label: 'Photo Generator',
      description: 'Generate AI Photos',
      icon: '/photo.png',
      href: '/photo',
      premium: true,
    },
    {
      label: 'Blog Writer',
      description: 'Create your best blog post yet.',
      icon: '/blog.png',
      href: '/blog',
      premium: true,
    },
  ]

  return (
    <div>
      <Heading
        title="Welcome Back!"
        description="How can Genius help you today?"
        src="/home.png"
      />
      <div className="px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <ToolCard
            key={tool.href}
            href={tool.href}
            title={tool.label}
            description={tool.description}
            src={tool.icon}
            premium={tool.premium}
          />
        ))}
      </div>
    </div>
  );
}

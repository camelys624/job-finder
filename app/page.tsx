import Link from "next/link";
import {
  ArrowRight,
  Database,
  Shield,
  Zap,
  Code2,
  FileCheck,
  Calendar,
} from "lucide-react";

export default function Home() {
  const techStack = [
    {
      category: "Frontend",
      technologies: [
        { name: "Next.js 15", description: "React框架，支持SSR和SSG" },
        { name: "React 19", description: "最新版本UI库" },
        { name: "TypeScript", description: "类型安全的JavaScript" },
        { name: "Tailwind CSS", description: "实用优先的CSS框架" },
      ],
    },
    {
      category: "UI Components",
      technologies: [
        { name: "Radix UI", description: "无样式可访问组件库" },
        { name: "Lucide React", description: "精美的图标库" },
        { name: "Sonner", description: "优雅的Toast通知" },
        { name: "Next Themes", description: "主题切换支持" },
      ],
    },
    {
      category: "Backend & Database",
      technologies: [
        { name: "Prisma", description: "现代化ORM工具" },
        { name: "NextAuth.js", description: "完整的认证解决方案" },
        { name: "Zod", description: "TypeScript优先的模式验证" },
        { name: "React Hook Form", description: "高性能表单库" },
      ],
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "高性能架构",
      description: "基于Next.js 15和React 19，提供极致的用户体验和开发效率",
    },
    {
      icon: Shield,
      title: "安全认证",
      description: "集成NextAuth.js，支持多种认证方式，保障数据安全",
    },
    {
      icon: Database,
      title: "强大的数据层",
      description: "使用Prisma ORM，类型安全的数据库访问和迁移管理",
    },
    {
      icon: Code2,
      title: "类型安全",
      description: "全栈TypeScript + Zod验证，在编译时捕获错误",
    },
    {
      icon: FileCheck,
      title: "表单管理",
      description: "React Hook Form配合Zod，提供流畅的表单验证体验",
    },
    {
      icon: Calendar,
      title: "现代化工具",
      description: "集成date-fns、Radix UI等现代化工具库",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Content */}
          <div className="text-center space-y-6 mb-12">
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                🚀 现代化全栈应用
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              Job Finder
              <span className="block text-primary mt-2">智能求职管理平台</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              基于Next.js 15和React
              19构建的现代化求职管理应用，提供完整的用户认证、职位管理和状态追踪功能。
            </p>
          </div>

          {/* Large Video */}
          <div className="relative mb-12">
            <div className="aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/gimSKEsWYb4"
                title="Prisma ORM Full Course 2025 | Become a Prisma Pro in 2.5 Hours"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/5 rounded-full blur-3xl"></div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
            >
              开始使用
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-3.5 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              浏览职位
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">核心特性</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              采用最新技术栈，提供企业级的功能和用户体验
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group p-6 bg-background rounded-xl border shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">技术栈</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              使用业界领先的现代化技术构建
            </p>
          </div>

          <div className="space-y-12">
            {techStack.map((stack, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-2xl font-bold text-primary">
                  {stack.category}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stack.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-colors group"
                    >
                      <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {tech.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {tech.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            准备开始了吗？
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            立即注册，体验现代化的求职管理平台
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
            >
              立即开始
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              查看Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

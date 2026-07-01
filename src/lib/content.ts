export type Lang = "vi" | "en";

export const content = {
  nav: {
    home: { vi: "Trang chủ", en: "Home" },
    about: { vi: "Giới thiệu", en: "About" },
    skills: { vi: "Kỹ năng", en: "Skills" },
    projects: { vi: "Dự án", en: "Projects" },
    experience: { vi: "Kinh nghiệm", en: "Experience" },
    contact: { vi: "Liên hệ", en: "Contact" },
  },

  hero: {
    greeting: { vi: "Xin chào, tôi là", en: "Hi, I'm" },
    name: "Quang Tran",
    roles: {
      vi: ["ERP Developer", "AI Engineer", "SQL Expert", "Automation Builder", "System Architect"],
      en: ["ERP Developer", "AI Engineer", "SQL Expert", "Automation Builder", "System Architect"],
    },
    tagline: {
      vi: "Tôi xây dựng các hệ thống ERP, giải pháp AI và quy trình tự động hóa hiệu năng cao — biến dữ liệu phức tạp thành sản phẩm mượt mà.",
      en: "I build high-performance ERP systems, AI solutions and automation pipelines — turning complex data into seamless products.",
    },
    cta: {
      projects: { vi: "Xem dự án", en: "View Projects" },
      contact: { vi: "Liên hệ", en: "Contact Me" },
      cv: { vi: "Tải CV", en: "Download CV" },
    },
  },

  stats: [
    { value: 20, suffix: "+", label: { vi: "Dự án", en: "Projects" } },
    { value: 500, suffix: "+", label: { vi: "SQL Scripts", en: "SQL Scripts" } },
    { value: 10, suffix: "+", label: { vi: "Hệ thống", en: "Systems" } },
    { value: 100, suffix: "k+", label: { vi: "Dòng code", en: "Lines of Code" } },
  ],

  about: {
    eyebrow: { vi: "Giới thiệu", en: "About" },
    title: { vi: "Một chút về tôi", en: "A bit about me" },
    paragraphs: {
      vi: [
        "Tôi là kỹ sư phần mềm tập trung vào ERP, dữ liệu và tự động hóa. Hơn 5 năm qua, tôi xây dựng các hệ thống quản trị doanh nghiệp, tối ưu cơ sở dữ liệu SQL Server và ứng dụng AI vào quy trình thực tế.",
        "Tôi tin vào kiến trúc sạch, dữ liệu đáng tin cậy và trải nghiệm mượt mà. Tôi thích biến những quy trình thủ công rối rắm thành hệ thống tự động gọn gàng, dễ bảo trì.",
      ],
      en: [
        "I'm a software engineer focused on ERP, data and automation. Over the past 5+ years I've built enterprise management systems, optimized SQL Server databases, and applied AI to real-world workflows.",
        "I believe in clean architecture, reliable data and smooth experiences. I love turning messy manual processes into tidy, maintainable automated systems.",
      ],
    },
    timeline: [
      { year: "2022", title: { vi: "Bắt đầu hành trình ERP", en: "Started the ERP journey" }, desc: { vi: "Phát triển module ERP đầu tiên và tối ưu SQL.", en: "Built first ERP modules and optimized SQL." } },
      { year: "2024", title: { vi: "Chuyên sâu Automation", en: "Deep dive into Automation" }, desc: { vi: "Xây dựng pipeline tự động hóa quy trình doanh nghiệp.", en: "Built automation pipelines for business processes." } },
      { year: "2025", title: { vi: "Tích hợp AI", en: "AI integration" }, desc: { vi: "Đưa AI/LLM vào sản phẩm và công cụ nội bộ.", en: "Brought AI/LLM into products and internal tools." } },
      { year: "2026", title: { vi: "System Architect", en: "System Architect" }, desc: { vi: "Thiết kế kiến trúc hệ thống quy mô lớn.", en: "Designing large-scale system architecture." } },
    ],
  },

  skills: {
    eyebrow: { vi: "Kỹ năng", en: "Skills" },
    title: { vi: "Công nghệ tôi dùng", en: "Technologies I use" },
    items: [
      { name: "SQL Server", years: 5, projects: 20, desc: { vi: "Tối ưu truy vấn, T-SQL, stored procedures", en: "Query optimization, T-SQL, stored procedures" } },
      { name: ".NET", years: 4, projects: 15, desc: { vi: "C#, ASP.NET Core, Web API", en: "C#, ASP.NET Core, Web API" } },
      { name: "Python", years: 4, projects: 18, desc: { vi: "Automation, data, AI tooling", en: "Automation, data, AI tooling" } },
      { name: "AI / LLM", years: 2, projects: 8, desc: { vi: "RAG, agents, prompt engineering", en: "RAG, agents, prompt engineering" } },
      { name: "Docker", years: 3, projects: 12, desc: { vi: "Container hóa & triển khai", en: "Containerization & deployment" } },
      { name: "Azure", years: 3, projects: 10, desc: { vi: "Cloud, CI/CD, hosting", en: "Cloud, CI/CD, hosting" } },
      { name: "Node.js", years: 3, projects: 10, desc: { vi: "API, automation services", en: "APIs, automation services" } },
      { name: "Git", years: 5, projects: 30, desc: { vi: "Version control & collaboration", en: "Version control & collaboration" } },
    ],
  },

  experience: {
    eyebrow: { vi: "Kinh nghiệm", en: "Experience" },
    title: { vi: "Hành trình sự nghiệp", en: "Career journey" },
    items: [
      { period: "2024 — Now", role: { vi: "Senior ERP / AI Engineer", en: "Senior ERP / AI Engineer" }, company: "Company A", desc: { vi: "Dẫn dắt phát triển module ERP, tích hợp AI và tối ưu hệ thống dữ liệu.", en: "Lead ERP module development, AI integration and data system optimization." } },
      { period: "2022 — 2024", role: { vi: "Software Engineer", en: "Software Engineer" }, company: "Company B", desc: { vi: "Xây dựng ứng dụng .NET, tự động hóa quy trình và quản trị SQL Server.", en: "Built .NET applications, process automation and SQL Server administration." } },
      { period: "2021 — 2022", role: { vi: "Developer", en: "Developer" }, company: "Company C", desc: { vi: "Phát triển công cụ nội bộ và báo cáo dữ liệu.", en: "Developed internal tools and data reporting." } },
    ],
  },

  projects: {
    eyebrow: { vi: "Dự án", en: "Projects" },
    title: { vi: "Dự án nổi bật", en: "Featured projects" },
    filters: ["All", "AI", "ERP", "SQL", "Web", "Automation"],
    items: [
      { title: "ERP Suite", category: "ERP", tags: [".NET", "SQL Server", "React"], desc: { vi: "Hệ thống ERP quản trị toàn diện cho doanh nghiệp vừa.", en: "End-to-end ERP system for mid-sized enterprises." }, demo: "#", code: "#", c1: "#3b82f6", c2: "#1d4ed8" },
      { title: "AI Document Assistant", category: "AI", tags: ["Python", "LLM", "RAG"], desc: { vi: "Trợ lý AI tra cứu và tóm tắt tài liệu nội bộ.", en: "AI assistant for searching and summarizing internal docs." }, demo: "#", code: "#", c1: "#1d4ed8", c2: "#22d3ee" },
      { title: "SQL Optimizer", category: "SQL", tags: ["T-SQL", "SQL Server"], desc: { vi: "Bộ công cụ phân tích & tối ưu truy vấn chậm.", en: "Toolkit to analyze and optimize slow queries." }, demo: "#", code: "#", c1: "#22d3ee", c2: "#3b82f6" },
      { title: "Workflow Automator", category: "Automation", tags: ["Python", "Node.js"], desc: { vi: "Tự động hóa quy trình lặp, tiết kiệm hàng trăm giờ.", en: "Automates repetitive workflows, saving hundreds of hours." }, demo: "#", code: "#", c1: "#2563eb", c2: "#1d4ed8" },
      { title: "Analytics Dashboard", category: "Web", tags: ["Next.js", "TypeScript"], desc: { vi: "Bảng điều khiển dữ liệu thời gian thực.", en: "Real-time data dashboard." }, demo: "#", code: "#", c1: "#3b82f6", c2: "#06b6d4" },
      { title: "Data Pipeline", category: "Automation", tags: ["Python", "Docker", "Azure"], desc: { vi: "Pipeline ETL ổn định, có giám sát.", en: "Reliable, monitored ETL pipeline." }, demo: "#", code: "#", c1: "#1d4ed8", c2: "#0891b2" },
    ],
  },

  contact: {
    eyebrow: { vi: "Liên hệ", en: "Contact" },
    title: { vi: "Cùng xây điều tuyệt vời", en: "Let's build something great" },
    subtitle: { vi: "Tôi luôn sẵn sàng cho các cơ hội thú vị. Gửi tôi một dòng nhé!", en: "I'm always open to interesting opportunities. Drop me a line!" },
    form: {
      name: { vi: "Họ tên", en: "Name" },
      email: { vi: "Email", en: "Email" },
      company: { vi: "Công ty", en: "Company" },
      message: { vi: "Lời nhắn", en: "Message" },
      send: { vi: "Gửi tin nhắn", en: "Send message" },
      sending: { vi: "Đang gửi...", en: "Sending..." },
      success: { vi: "Đã gửi thành công!", en: "Sent successfully!" },
    },
    email: "hello@tranquang.bio",
  },

  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    facebook: "https://facebook.com/",
    email: "mailto:hello@tranquang.bio",
  },

  footer: {
    rights: { vi: "Mọi quyền được bảo lưu.", en: "All rights reserved." },
    made: { vi: "Thiết kế & phát triển bởi Quang Tran", en: "Designed & built by Quang Tran" },
    top: { vi: "Lên đầu trang", en: "Back to top" },
  },
} as const;

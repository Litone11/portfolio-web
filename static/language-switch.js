(() => {
  const translations = {
    common: {
      nav: {
        home: { pt: "Início", en: "Home" },
        projects: { pt: "Projetos", en: "Projects" },
        about: { pt: "Sobre", en: "About" },
        contact: { pt: "Contacto", en: "Contact" },
        talk: { pt: "Falar", en: "Let's Talk" },
        cv: { pt: "CV", en: "Resume" },
      },
    },
    home: {
      meta: {
        title: { pt: "Luís Martins | Início", en: "Luís Martins | Home" },
      },
      hero: {
        kicker: {
          pt: "Portfolio_Status // Online",
          en: "Portfolio_Status // Live",
        },
        title: {
          pt: "Luís Martins.<span>Estudante de Engenharia Informática.</span>",
          en: "Luís Martins.<span>Informatics Engineering student.</span>",
        },
        description: {
          pt: "Sou estudante de Engenharia Informática na FEUP e construo projetos entre web, mobile, algoritmos, sistemas e redes. Esta página resume o meu perfil, mostra alguns projetos em destaque e centraliza os canais para contacto direto.",
          en: "I am an Informatics Engineering student at FEUP building projects across web, mobile, algorithms, systems and networks. This page summarizes my profile, highlights selected projects and centralizes the direct contact channels.",
        },
        primaryCta: { pt: "Ver Projetos", en: "View Projects" },
        secondaryCta: { pt: "Descarregar CV", en: "Download Resume" },
        snapshotLabel: { pt: "Resumo", en: "Snapshot" },
        educationLabel: { pt: "Formação", en: "Education" },
        educationValue: {
          pt: "Engenharia Informática // FEUP",
          en: "Informatics Engineering // FEUP",
        },
        focusLabel: { pt: "Foco", en: "Focus" },
        focusValue: {
          pt: "Full-stack, sistemas e algoritmos",
          en: "Full-stack, systems and algorithms",
        },
        profileLabel: { pt: "Perfil", en: "Profile" },
        profileNote: {
          pt: "Estudante da FEUP a construir software com base sólida de engenharia.",
          en: "FEUP student building software with a solid engineering foundation.",
        },
        reposLabel: { pt: "PUBLIC_REPOS", en: "PUBLIC_REPOS" },
        baseLabel: { pt: "Base", en: "Base" },
        baseValue: { pt: "Porto // FEUP", en: "Porto // FEUP" },
      },
      skills: {
        kicker: { pt: "Core_Competencies", en: "Core_Competencies" },
        title: {
          pt: "Áreas onde já construí projetos",
          en: "Areas where I have already built projects",
        },
        description: {
          pt: "Um conjunto técnico transversal construído em contexto académico e prático, com projetos publicados e tecnologias aplicadas em cenários diferentes.",
          en: "A cross-disciplinary technical base built through academic and practical work, with published projects and technologies applied in different scenarios.",
        },
        devTitle: {
          pt: "Desenvolvimento de software",
          en: "Software development",
        },
        devDesc: {
          pt: "Projetos em C, C++, Java, PHP e Flutter com foco em arquitetura, implementação limpa e entrega funcional.",
          en: "Projects in C, C++, Java, PHP and Flutter focused on architecture, clean implementation and functional delivery.",
        },
        dataTitle: { pt: "Algoritmos e dados", en: "Algorithms and data" },
        dataDesc: {
          pt: "Trabalho com estruturas de dados, grafos, programação dinâmica, parsing e processamento estruturado para resolver problemas com rigor.",
          en: "I work with data structures, graphs, dynamic programming, parsing and structured processing to solve problems with rigor.",
        },
        systemsTitle: { pt: "Sistemas e redes", en: "Systems and networks" },
        systemsDesc: {
          pt: "Experiência com Minix, sockets, comunicação série e projetos próximos da camada de sistema, além de fluxos de deployment web e mobile.",
          en: "Experience with Minix, sockets, serial communication and system-level projects, plus web and mobile deployment workflows.",
        },
      },
      projects: {
        kicker: { pt: "Selected_Works", en: "Selected_Works" },
        title: { pt: "Projetos em destaque", en: "Featured projects" },
        description: {
          pt: "Dois exemplos que mostram amplitude técnica: uma aplicação colaborativa em Flutter e um projeto de redes com sockets e comunicação serial.",
          en: "Two examples that show technical range: a collaborative Flutter app and a networking project built with sockets and serial communication.",
        },
        taskmateTeaser: {
          pt: "Gestão de tarefas, planeamento partilhado, notificações e integração de calendário.",
          en: "Task management, shared planning, notifications and calendar integration.",
        },
        taskmateDesc: {
          pt: "Aplicação de gestão de tarefas e colaboração construída em Flutter, pensada para grupos, organização partilhada e fluxos práticos de produtividade.",
          en: "Task management and collaboration app built with Flutter, designed for teams, shared organization and practical productivity workflows.",
        },
        cableTeaser: {
          pt: "Simulação de portas TX/RX virtuais para testar comunicação de baixo nível.",
          en: "Simulation of virtual TX/RX ports to test low-level communication.",
        },
        cableDesc: {
          pt: "Projeto de redes de computadores que cria pares de portas seriais virtuais usando sockets para testar fluxos de comunicação e transmissão de dados.",
          en: "Computer networks project that creates virtual serial port pairs using sockets to test communication and data transmission flows.",
        },
        allCta: { pt: "Ver Todos Os Projetos", en: "View All Projects" },
      },
      cta: {
        title: {
          pt: "Aberto a projetos, colaboração e conversas técnicas.",
          en: "Open to projects, collaboration and technical conversations.",
        },
        description: {
          pt: "Se quiseres falar sobre software, estágio, trabalho em equipa ou uma oportunidade concreta, tens a página de contacto com GitHub, LinkedIn, email e CV.",
          en: "If you want to talk about software, internships, teamwork or a concrete opportunity, the contact page has GitHub, LinkedIn, email and direct access to my resume.",
        },
        button: { pt: "Abrir Contacto", en: "Open Contact" },
      },
      footer: {
        section: {
          pt: "© 2026 PORTFOLIO // INÍCIO",
          en: "© 2026 PORTFOLIO // HOME",
        },
      },
    },
    projects: {
      meta: {
        title: { pt: "Luís Martins | Projetos", en: "Luís Martins | Projects" },
      },
      hero: {
        kicker: { pt: "Projetos_Selecionados", en: "Selected_Works" },
        title: { pt: "Projetos em destaque", en: "Featured projects" },
        description: {
          pt: "Todos os projetos têm código publicado no GitHub. Cada entrada mostra o contexto, a stack utilizada e link direto para o repositório.",
          en: "All projects have published code on GitHub. Each entry shows the context, the stack used and a direct link to the repository.",
        },
        type: { pt: "Projeto Académico", en: "Academic Project" },
      },
      panel: {
        label: { pt: "Matriz de Projetos", en: "Project Matrix" },
        totalLabel: { pt: "Total", en: "Total" },
        totalValue: { pt: "9 projetos públicos", en: "9 public projects" },
        scopeLabel: { pt: "Âmbito", en: "Scope" },
        scopeValue: {
          pt: "Algoritmos, web, mobile e sistemas",
          en: "Algorithms, web, mobile and systems",
        },
        stackLabel: { pt: "Stack", en: "Stack" },
        stackValue: { pt: "C, C++, Java, Flutter, PHP", en: "C, C++, Java, Flutter, PHP" },
        accessLabel: { pt: "Acesso", en: "Access" },
        accessValue: {
          pt: "Todos com repositório direto",
          en: "All with direct repository access",
        },
      },
      featured: {
        kicker: { pt: "Destaques Técnicos", en: "Featured Build Set" },
        title: {
          pt: "Projetos com mais amplitude técnica.",
          en: "Projects with the widest technical range.",
        },
        description: {
          pt: "Dois projetos que mostram melhor o alcance atual: produto colaborativo em Flutter e trabalho de redes com comunicação de baixo nível.",
          en: "Two projects that best show the current range: a collaborative Flutter product and networking work with low-level communication.",
        },
      },
      catalog: {
        kicker: { pt: "Índice de Projetos", en: "Project Index" },
        title: { pt: "Catálogo completo.", en: "Full catalog." },
        description: {
          pt: "O resto do conjunto mostra trabalho consistente em algoritmos, motores em C++, jogo em Java, sistemas web e programação de baixo nível.",
          en: "The rest of the set shows consistent work in algorithms, C++ engines, Java gameplay, web systems and low-level programming.",
        },
      },
      cards: {
        open: { pt: "Abrir Repo", en: "Open Repo" },
        svg: {
          desc: {
            pt: "Programa em C++ que converte ficheiros SVG em imagens PNG, com suporte para transformações geométricas, grupos e duplicação de elementos.",
            en: "C++ program that converts SVG files into PNG images, supporting geometric transforms, groups and element duplication.",
          },
        },
        image: {
          desc: {
            pt: "Projeto de processamento de scrims em C++ que lê ficheiros de configuração, executa operações de transformação em imagens através de um parser e gera resultados.",
            en: "C++ image-processing project that reads configuration files, runs image transformations through a parser and generates results.",
          },
        },
        invaders: {
          desc: {
            pt: "Jogo de arcade retro desenvolvido em Java com diferentes temas, implementando padrões de design, menus, sistema de pontuação e mecânicas de jogo clássicas.",
            en: "Retro arcade game built in Java with multiple themes, using design patterns, menus, score systems and classic gameplay mechanics.",
          },
        },
        graph: {
          desc: {
            pt: "Projeto de algoritmos e estruturas de dados que implementa um grafo para resolver problemas de rotas e localizações, com suporte para leitura de ficheiros CSV e processamento de rotas.",
            en: "Algorithms and data structures project that implements a graph to solve routing and location problems, with CSV input and route processing support.",
          },
        },
        knapsack: {
          desc: {
            pt: "Projeto que implementa algoritmos para resolver o Problema da Mochila com múltiplas abordagens: força bruta, programação dinâmica, algoritmos gulosos e soluções baseadas em ILP.",
            en: "Project implementing algorithms for the Knapsack Problem with multiple approaches: brute force, dynamic programming, greedy strategies and ILP-based solutions.",
          },
        },
        minix: {
          desc: {
            pt: "Projeto de laboratório que implementa um jogo em C com Minix, contendo componentes para dispositivos, entidades, lógica de jogo e gestão de eventos.",
            en: "Lab project that implements a game in C with Minix, including device components, entities, game logic and event handling.",
          },
        },
        taskmate: {
          desc: {
            pt: "Aplicação de gestão de tarefas e colaboração que permite criar, organizar e partilhar tarefas com notificações, integração de calendário e funcionalidades de colaboração em grupo.",
            en: "Task management and collaboration app that allows users to create, organize and share tasks with notifications, calendar integration and team collaboration features.",
          },
        },
        freelance: {
          desc: {
            pt: "Plataforma web em PHP que implementa um sistema de gestão de utilizadores com autenticação, controlo de sessões e base de dados integrada.",
            en: "PHP web platform implementing a user-management system with authentication, session control and an integrated database.",
          },
        },
        cable: {
          desc: {
            pt: "Projeto de redes de computadores que implementa um programa de cabo virtual para testar portos seriais, criando pares de portos TX/RX virtuais usando sockets.",
            en: "Computer networks project that implements a virtual cable program to test serial ports by creating virtual TX/RX pairs using sockets.",
          },
        },
      },
      cta: {
        title: {
          pt: "Se um projeto te interessa, o repositório está aberto.",
          en: "If a project interests you, the repository is open.",
        },
        description: {
          pt: "Posso aprofundar qualquer um destes projetos em detalhe técnico. Se quiseres falar sobre implementação, decisões ou contexto, segue para a página de contacto.",
          en: "I can go deeper into any of these projects at a technical level. If you want to talk about implementation, decisions or context, head to the contact page.",
        },
        button: { pt: "Abrir Contacto", en: "Open Contact" },
      },
      footer: {
        section: {
          pt: "© 2026 PORTFOLIO // PROJETOS",
          en: "© 2026 PORTFOLIO // PROJECTS",
        },
      },
    },
    about: {
      meta: {
        title: { pt: "Luís Martins | Sobre", en: "Luís Martins | About" },
      },
      hero: {
        kicker: {
          pt: "ESTADO_DO_SISTEMA: ATIVO",
          en: "SYSTEM_STATUS: ACTIVE",
        },
        title: {
          pt: "Engenharia <span>Informática</span> &amp; Software Builder.",
          en: "Informatics <span>Engineer</span> &amp; Software Builder.",
        },
        description: {
          pt: "Sou o Luís Martins, estudante de Engenharia Informática na FEUP, com foco em construir software sólido entre web, mobile, algoritmos, sistemas e redes. Este portfólio junta o lado académico com execução prática e código publicado.",
          en: "I'm Luís Martins, an Informatics Engineering student at FEUP focused on building solid software across web, mobile, algorithms, systems and networks. This portfolio combines the academic path with practical execution and published code.",
        },
        primaryCta: { pt: "Descarregar CV", en: "Download Resume" },
        secondaryCta: { pt: "Ver Projetos", en: "View Projects" },
        note: {
          pt: "<strong>9 projetos públicos</strong><span>stack transversal em software engineering</span>",
          en: "<strong>9 public projects</strong><span>cross-disciplinary software engineering stack</span>",
        },
        profileTag: {
          pt: "Luis_Martins // Perfil",
          en: "Luis_Martins // Profile",
        },
        focusLabel: { pt: "Área_Foco", en: "Focus_Area" },
        focusValue: { pt: "full-stack", en: "full-stack" },
      },
      journey: {
        title: { pt: "Percurso_Académico", en: "Academic_Journey" },
        trail: { pt: "ROOT/APRENDIZAGEM/LOGS", en: "ROOT/LEARNING/LOGS" },
        firstTitle: {
          pt: "Engenharia Informática",
          en: "Informatics Engineering",
        },
        firstStatus: { pt: "EM CURSO", en: "ONGOING" },
        firstSource: { pt: "FEUP", en: "FEUP" },
        firstDesc: {
          pt: "Percurso académico centrado em fundamentos de engenharia de software, algoritmos, estruturas de dados, redes, low-level programming e construção de aplicações.",
          en: "Academic path focused on software engineering fundamentals, algorithms, data structures, networks, low-level programming and application building.",
        },
        secondTitle: { pt: "Projetos práticos", en: "Practical projects" },
        secondStatus: { pt: "9 REPOS", en: "9 REPOS" },
        secondSource: {
          pt: "GitHub Portfolio",
          en: "GitHub Portfolio",
        },
        secondDesc: {
          pt: "Os repositórios mostram variedade real: C e C++ para sistemas e algoritmos, Java para jogo arcade, Flutter para mobile, PHP para web e C para redes e Minix.",
          en: "The repositories show real range: C and C++ for systems and algorithms, Java for an arcade game, Flutter for mobile, PHP for web and C for networks and Minix.",
        },
        thirdTitle: { pt: "Direção atual", en: "Current direction" },
        thirdStatus: { pt: "AGORA", en: "NOW" },
        thirdSource: {
          pt: "Portfolio + Product Thinking",
          en: "Portfolio + Product Thinking",
        },
        thirdDesc: {
          pt: "O foco atual está em aprofundar competências em sistemas, web e mobile, construir projetos mais complexos e entrar no mercado com experiência prática e código real publicado.",
          en: "The current focus is on deepening skills in systems, web and mobile, building more complex projects and entering the market with practical experience and real published code.",
        },
      },
      education: {
        kicker: { pt: "PERCURSO_ACADÉMICO", en: "ACADEMIC_PATH" },
        title: { pt: "Educação", en: "Education" },
        degree: {
          pt: "Licenciatura em Engenharia Informática",
          en: "B.Sc. in Informatics Engineering",
        },
        school: {
          pt: "Faculdade de Engenharia da Universidade do Porto",
          en: "Faculty of Engineering of the University of Porto",
        },
        chip: { pt: "Porto // FEUP", en: "Porto // FEUP" },
        coreTitle: { pt: "Módulos base", en: "Core modules" },
        module1: {
          pt: "Algoritmos e estruturas de dados",
          en: "Algorithms and data structures",
        },
        module2: {
          pt: "Sistemas, programação em C e C++",
          en: "Systems, C and C++ programming",
        },
        module3: {
          pt: "Desenvolvimento web e mobile",
          en: "Web and mobile development",
        },
        module4: {
          pt: "Redes de computadores e comunicação",
          en: "Computer networks and communication",
        },
        module5: {
          pt: "Software engineering e trabalho em equipa",
          en: "Software engineering and teamwork",
        },
      },
      stack: {
        title: { pt: "Stack_Técnica", en: "Tech_Stack" },
        frontend: { pt: "Frontend", en: "Frontend" },
        mobile: { pt: "Mobile", en: "Mobile" },
        systems: { pt: "Sistemas", en: "Systems" },
        data: { pt: "Dados", en: "Data" },
        backend: { pt: "Backend", en: "Backend" },
        tooling: { pt: "Tooling", en: "Tooling" },
      },
      strengths: {
        title: { pt: "Forças_em_Destaque", en: "Highlighted_Strengths" },
        firstTitle: { pt: "Amplitude técnica", en: "Technical range" },
        firstDesc: {
          pt: "O meu conjunto de projetos cobre frontend, mobile, backend, algoritmos, redes e sistemas — uma base mais completa do que um percurso centrado numa única stack.",
          en: "My project set covers frontend, mobile, backend, algorithms, networks and systems — a broader foundation than a path built around a single stack.",
        },
        firstTag: { pt: "ATIVO", en: "ACTIVE" },
        secondTitle: { pt: "Base de engenharia", en: "Engineering foundation" },
        secondDesc: {
          pt: "Tenho experiência com programação em C/C++, resolução de problemas clássicos, comunicação série, grafos, parsing e organização de software por módulos.",
          en: "I have experience with C/C++ programming, classic problem solving, serial communication, graphs, parsing and modular software organization.",
        },
        secondTag: { pt: "BASE", en: "FOUNDATION" },
        thirdTitle: {
          pt: "Entrega orientada a produto",
          en: "Product-oriented delivery",
        },
        thirdDesc: {
          pt: "Cada projeto foi entregue com código publicado e repositório aberto. Não fico pela teoria — executo até ao fim e deixo tudo acessível.",
          en: "Every project was delivered with published code and an open repository. I don't stop at theory — I ship and keep everything accessible.",
        },
        thirdTag: { pt: "ENTREGA", en: "SHIP" },
      },
      values: {
        title: { pt: "Modo_de_Trabalho", en: "Working_Mode" },
        intro: {
          pt: "Interessa-me software que funcione bem, seja legível e tenha uma razão clara para existir. O objetivo aqui não é parecer senior artificialmente; é mostrar evolução real, consistência técnica e capacidade de executar.",
          en: "I'm interested in software that works well, stays readable and has a clear reason to exist. The goal here is not to look artificially senior; it is to show real progress, technical consistency and execution ability.",
        },
        firstTitle: { pt: "Construir com amplitude", en: "Build with range" },
        firstDesc: {
          pt: "Web, mobile, sistemas e redes convivem no mesmo portfólio porque refletem a minha formação real e a amplitude do que já construí.",
          en: "Web, mobile, systems and networks live in the same portfolio because they reflect my actual training and the range of what I have already built.",
        },
        secondTitle: {
          pt: "Preferir trabalho concreto",
          en: "Prefer concrete work",
        },
        secondDesc: {
          pt: "Projetos publicados, links diretos e linguagem objetiva valem mais do que claims vagas ou buzzwords.",
          en: "Published projects, direct links and objective language matter more than vague claims or buzzwords.",
        },
        thirdTitle: {
          pt: "Melhorar a camada de apresentação",
          en: "Keep improving the presentation layer",
        },
        thirdDesc: {
          pt: "Além de código, importa saber apresentar bem o trabalho: estrutura, copy, navegação e clareza visual.",
          en: "Beyond code, it matters to present the work well: structure, copy, navigation and visual clarity.",
        },
        fourthTitle: {
          pt: "Pronto para colaboração",
          en: "Ready for collaboration",
        },
        fourthDesc: {
          pt: "Estou disponível para estágios, colaboração em projetos e conversas técnicas. Os canais diretos estão todos na página de contacto.",
          en: "I am open to internships, project collaboration and technical conversations. All direct channels are on the contact page.",
        },
      },
      footer: {
        section: {
          pt: "© 2026 PORTFOLIO // SOBRE",
          en: "© 2026 PORTFOLIO // ABOUT",
        },
      },
    },
    contact: {
      meta: {
        title: { pt: "Luís Martins | Contacto", en: "Luís Martins | Contact" },
      },
      hero: {
        kicker: {
          pt: "CANAL_ABERTO // CONTACTO_DIRETO",
          en: "CHANNEL_OPEN // DIRECT_CONTACT",
        },
        title: {
          pt: "Vamos falar sobre <span class=\"text-primary\">execução</span>.",
          en: "Let's talk about <span class=\"text-primary\">execution</span>.",
        },
        description: {
          pt: "Esta página existe para contacto direto. Se tens uma oportunidade, um projeto para discutir ou queres falar sobre software, tens aqui os canais certos.",
          en: "This page exists for direct contact. If you have an opportunity, a project to discuss or want to talk about software, the right channels are here.",
        },
        primaryCta: { pt: "Enviar Email", en: "Send Email" },
        secondaryCta: { pt: "Abrir LinkedIn", en: "Open LinkedIn" },
      },
      panel: {
        label: { pt: "Matriz de Contacto", en: "Contact Matrix" },
        responseLabel: { pt: "Resposta", en: "Response" },
        responseValue: { pt: "Email e LinkedIn", en: "Email and LinkedIn" },
        focusLabel: { pt: "Contexto", en: "Context" },
        focusValue: {
          pt: "Software, estágios, colaboração técnica",
          en: "Software, internships, technical collaboration",
        },
        locationLabel: { pt: "Base", en: "Base" },
        locationValue: { pt: "Porto, Portugal", en: "Porto, Portugal" },
        cvLabel: { pt: "Currículo", en: "Resume" },
        cvValue: { pt: "Disponível em PDF", en: "Available as PDF" },
      },
      channels: {
        kicker: { pt: "Canais Diretos", en: "Direct Channels" },
        title: { pt: "Escolhe o canal certo.", en: "Pick the right channel." },
        description: {
          pt: "Tudo o que precisas para falar comigo está centralizado aqui, sem formulários desnecessários nem navegação extra.",
          en: "Everything you need to reach me is centralized here, with no unnecessary forms or extra navigation.",
        },
      },
      cards: {
        github: {
          pt: "Projetos públicos, código académico e trabalho técnico já publicado.",
          en: "Public projects, academic code and technical work already published.",
        },
        openGithub: { pt: "Abrir GitHub", en: "Open GitHub" },
        linkedin: {
          pt: "Canal direto para networking, oportunidades e contacto profissional.",
          en: "Direct channel for networking, opportunities and professional contact.",
        },
        openLinkedin: { pt: "Abrir LinkedIn", en: "Open LinkedIn" },
        email: {
          pt: "Melhor opção para mensagens diretas, propostas concretas e contexto mais detalhado.",
          en: "Best option for direct messages, concrete proposals and more detailed context.",
        },
        openEmail: { pt: "Enviar Email", en: "Send Email" },
        cvLabel: { pt: "CV", en: "Resume" },
        cvFile: { pt: "curriculo.pdf", en: "resume.pdf" },
        cv: {
          pt: "Resumo direto do percurso, stack e projetos para contexto rápido.",
          en: "Direct summary of experience, stack and projects for quick context.",
        },
        openCv: { pt: "Abrir CV", en: "Open Resume" },
      },
      cta: {
        title: { pt: "Se houver contexto, eu respondo.", en: "If there is context, I reply." },
        description: {
          pt: "Quando entrares em contacto, diz logo o tipo de projeto, objetivo e prazos. A conversa fica mais útil desde a primeira mensagem.",
          en: "When you reach out, include the project type, objective and timeline right away. The conversation becomes more useful from the first message.",
        },
        button: { pt: "Abrir conversa", en: "Start conversation" },
      },
      footer: {
        section: {
          pt: "© 2026 PORTFOLIO // CONTACTO",
          en: "© 2026 PORTFOLIO // CONTACT",
        },
      },
    },
  };

  const storageKey = "portfolio-language";
  const supportedLanguages = new Set(["pt", "en"]);

  function lookup(source, path) {
    return path.split(".").reduce((accumulator, part) => {
      if (!accumulator || typeof accumulator !== "object") {
        return undefined;
      }

      return accumulator[part];
    }, source);
  }

  function getPageName() {
    return document.body?.dataset.page;
  }

  function getTranslation(key, language) {
    const page = getPageName();
    const sources = [page ? translations[page] : undefined, translations.common];

    for (const source of sources) {
      const entry = lookup(source, key);

      if (!entry) {
        continue;
      }

      if (typeof entry === "string") {
        return entry;
      }

      if (typeof entry === "object" && language in entry) {
        return entry[language];
      }
    }

    return null;
  }

  function getStoredLanguage() {
    try {
      const stored = window.localStorage.getItem(storageKey);
      return supportedLanguages.has(stored) ? stored : null;
    } catch {
      return null;
    }
  }

  function setStoredLanguage(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // Ignore storage errors and keep runtime state only.
    }
  }

  function getInitialLanguage() {
    const stored = getStoredLanguage();

    if (stored) {
      return stored;
    }

    return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
  }

  function applyLanguage(language) {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = getTranslation(element.dataset.i18n, language);

      if (value !== null) {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = getTranslation(element.dataset.i18nHtml, language);

      if (value !== null) {
        element.innerHTML = value;
      }
    });

    document.querySelectorAll("[data-language-toggle]").forEach((toggle) => {
      toggle.setAttribute("data-current-lang", language);
    });

    document.querySelectorAll("[data-lang-option]").forEach((button) => {
      const active = button.dataset.langOption === language;
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function bindToggles() {
    document.querySelectorAll("[data-language-toggle]").forEach((toggle) => {
      if (toggle.dataset.languageBound === "true") {
        return;
      }

      toggle.dataset.languageBound = "true";

      toggle.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) {
          return;
        }

        const button = event.target.closest("[data-lang-option]");

        if (!(button instanceof HTMLButtonElement)) {
          return;
        }

        const nextLanguage = button.dataset.langOption;

        if (!supportedLanguages.has(nextLanguage)) {
          return;
        }

        setStoredLanguage(nextLanguage);
        applyLanguage(nextLanguage);
      });
    });
  }

  function refreshLanguageUI() {
    bindToggles();
    applyLanguage(getInitialLanguage());
  }

  if (!getPageName()) {
    return;
  }

  window.__portfolioLanguageRefresh = refreshLanguageUI;
  refreshLanguageUI();
})();

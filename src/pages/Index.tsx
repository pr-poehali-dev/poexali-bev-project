import { useState, useEffect, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const AiChat = lazy(() => import('@/components/AiChat'));

const Index = () => {
  const [energy, setEnergy] = useState(99999);
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const features = [
    {
      icon: 'Zap',
      title: 'Мгновенная разработка',
      description: 'Создаю сайты за секунды, не за дни',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'Sparkles',
      title: 'AI-дизайн',
      description: 'Современный дизайн с градиентами и анимациями',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: 'Code2',
      title: 'Чистый код',
      description: 'React, TypeScript, Tailwind CSS из коробки',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: 'Rocket',
      title: 'Готов к продакшну',
      description: 'Оптимизация и деплой включены',
      color: 'from-blue-500 to-purple-500'
    }
  ];

  const plans = [
    {
      name: 'Старт',
      price: '0₽',
      energy: '1000',
      features: ['Базовые компоненты', '1 проект', 'Техподдержка']
    },
    {
      name: 'Про',
      price: '1990₽',
      energy: '50000',
      features: ['Все компоненты', 'Безлимит проектов', 'Приоритет', 'Backend функции'],
      popular: true
    },
    {
      name: 'Космос',
      price: '4990₽',
      energy: '∞',
      features: ['Всё из Про', 'Личный ассистент', 'API доступ', 'White-label']
    }
  ];

  const handleInteraction = () => {
    setIsChatOpen(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => Math.min(99999, prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/50 border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
              <Icon name="Bot" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Юра AI
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setActiveSection('home')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveSection('features')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'features' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Возможности
            </button>
            <button
              onClick={() => setActiveSection('pricing')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'pricing' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Тарифы
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
              <Icon name="Zap" size={16} className="text-primary animate-pulse-glow" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {energy.toLocaleString()}
              </span>
            </div>
            <Button onClick={handleInteraction} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Начать
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <section className="container mx-auto px-6 py-20 text-center animate-fade-in">
          <Badge className="mb-6 px-6 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            <Icon name="Sparkles" size={14} className="mr-2 inline" />
            AI Ассистент для разработки
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Создавай сайты
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
              на скорости мысли
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Просто опиши что хочешь — я воплощу это в современный веб-сайт с чистым кодом и крутым дизайном
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              onClick={handleInteraction}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105 text-lg px-8 py-6"
            >
              <Icon name="Rocket" size={20} className="mr-2" />
              Попробовать бесплатно
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setActiveSection('features')}
              className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all text-lg px-8 py-6"
            >
              <Icon name="PlayCircle" size={20} className="mr-2" />
              Смотреть демо
            </Button>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl animate-pulse-glow" />
            <Card className="relative overflow-hidden backdrop-blur-xl bg-card/50 border-border/50 p-8 animate-scale-in">
              <div className="flex flex-wrap items-center justify-around gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    {energy.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Энергии</div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2">
                    0.5s
                  </div>
                  <div className="text-sm text-muted-foreground">Время отклика</div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                    99.9%
                  </div>
                  <div className="text-sm text-muted-foreground">Аптайм</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="features" className="container mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Возможности
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Все инструменты для создания современных веб-приложений
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                onClick={handleInteraction}
                className="group relative overflow-hidden backdrop-blur-xl bg-card/50 border-border/50 p-6 cursor-pointer hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon name={feature.icon as any} size={24} className="text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing" className="container mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Тарифы
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Выбери свой уровень энергии для создания сайтов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                onClick={handleInteraction}
                className={`relative overflow-hidden backdrop-blur-xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in ${
                  plan.popular
                    ? 'bg-gradient-to-b from-primary/10 to-secondary/10 border-primary/50 scale-105'
                    : 'bg-card/50 border-border/50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white">
                    Популярный
                  </Badge>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/месяц</span>
                  </div>
                </div>

                <div className="mb-6 p-4 rounded-lg bg-muted/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="Zap" size={16} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Энергия</span>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {plan.energy}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                      : 'bg-muted hover:bg-muted/80'
                  } transition-all`}
                >
                  Выбрать план
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 py-20 text-center">
          <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-primary/30 p-12 animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-gradient-shift bg-[length:200%_auto]" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Готов начать?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Присоединяйся к тысячам разработчиков, которые уже создают с Юрой AI
              </p>
              <Button
                size="lg"
                onClick={handleInteraction}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105 text-lg px-8 py-6"
              >
                <Icon name="Rocket" size={20} className="mr-2" />
                Создать первый сайт
              </Button>
            </div>
          </Card>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-12 border-t border-border/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Bot" size={18} className="text-white" />
            </div>
            <span className="font-semibold">Юра AI</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2024 Создано с энергией {energy.toLocaleString()}
          </p>
          
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Github" size={20} />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Twitter" size={20} />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Linkedin" size={20} />
            </button>
          </div>
        </div>
      </footer>

      {isChatOpen && (
        <Suspense fallback={null}>
          <AiChat
            energy={energy}
            onEnergyUpdate={setEnergy}
            onClose={() => setIsChatOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
import { useState, useRef, useEffect, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: number;
}

interface AiChatProps {
  energy: number;
  onEnergyUpdate: (newEnergy: number) => void;
  onClose: () => void;
}

const AiChat = memo(({ energy, onEnergyUpdate, onClose }: AiChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! 👋 Я Юра — помогу создать сайт. Расскажи, что хочешь?',
      isAi: true,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    if (energy < 10) {
      const errorMsg: Message = {
        id: Date.now().toString(),
        text: '⚡ Недостаточно энергии! Подожди немного — она восстанавливается автоматически.',
        isAi: true,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isAi: false,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/3a1f3135-2d18-40ed-83bf-9fced00b3ad7', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          energy: energy
        })
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.message,
          isAi: true,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, aiMessage]);
        onEnergyUpdate(data.energy);
      } else {
        throw new Error(data.error || 'Ошибка ответа');
      }
    } catch (error) {
      const errorMsg: Message = {
        id: Date.now().toString(),
        text: '❌ Произошла ошибка. Попробуй ещё раз!',
        isAi: true,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md animate-scale-in">
      <Card className="flex flex-col h-[600px] backdrop-blur-xl bg-card/95 border-primary/30 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
              <Icon name="Bot" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold">Юра AI</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="Zap" size={12} className="text-primary" />
                <span>{energy.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-destructive/10"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'} animate-fade-in`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.isAi
                    ? 'bg-muted/50 backdrop-blur-sm'
                    : 'bg-gradient-to-r from-primary to-secondary text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-muted/50 backdrop-blur-sm p-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border/50">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Опиши свою идею..."
              disabled={isLoading}
              className="flex-1 bg-muted/50 border-border/50 focus:border-primary"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim() || energy < 10}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              <Icon name="Send" size={18} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Каждое сообщение: -10 энергии
          </p>
        </div>
      </Card>
    </div>
  );
});

AiChat.displayName = 'AiChat';

export default AiChat;

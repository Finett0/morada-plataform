'use client';

import { useState } from 'react';
import { Button, Card, Field, Input, Textarea, useToast } from '@/components/ui';
import { config } from '@/lib/config';

const FAQ = [
  {
    q: 'Se é de graça, quem paga?',
    a: 'O desembolso da empresa não muda. A taxa da garantia sai do lado do colaborador PJ (que troca ~12% de seguro fiança por ~2% de taxa). A empresa tem custo incremental R$ 0 e ganha retenção.',
  },
  {
    q: 'Vira vínculo empregatício?',
    a: 'Não. A empresa nunca assina como fiadora; o convênio tem escudo trabalhista. A relação PJ permanece como tal.',
  },
  {
    q: 'Ativa mesmo em minutos?',
    a: 'Ativar o benefício (assinar o convênio) é rápido. A originação por PJ (KYC da imobiliária, carta de garantia) é mais lenta e fica do lado da Morada.',
  },
  {
    q: 'E se o colaborador sair da empresa?',
    a: 'A trava de rescisão retém a última fatura para cobrir até ~3 meses de aluguel até a desocupação. O proprietário não fica no prejuízo.',
  },
  {
    q: 'A garantia cobre danos?',
    a: 'O escopo é definido na originação e fica explícito no contrato. Por padrão, cobre inadimplência; danos só quando indicado.',
  },
];

export default function AjudaPage() {
  const toast = useToast();
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Mensagem enviada. Retornaremos em breve.');
    setAssunto('');
    setMensagem('');
  };

  return (
    <div className="mu-stack" style={{ maxWidth: 760 }}>
      <div>
        <p className="eyebrow">Suporte</p>
        <h1 className="mu-page-title">Central de ajuda</h1>
      </div>

      <Card>
        <h2 style={{ fontSize: 18 }}>Perguntas frequentes</h2>
        {FAQ.map((item) => (
          <details key={item.q} style={{ borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 500 }}>{item.q}</summary>
            <p className="mu-muted" style={{ marginTop: 8 }}>
              {item.a}
            </p>
          </details>
        ))}
      </Card>

      <Card>
        <h2 style={{ fontSize: 18 }}>Falar com a Morada</h2>
        <p className="mu-muted">Atendimento comercial e suporte pelo WhatsApp.</p>
        <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noreferrer">
          <Button variant="accent">WhatsApp (11) 98146-8513</Button>
        </a>
      </Card>

      <Card>
        <h2 style={{ fontSize: 18 }}>Enviar uma mensagem</h2>
        <form onSubmit={submit}>
          <Field label="Assunto">
            <Input value={assunto} onChange={(e) => setAssunto(e.target.value)} required />
          </Field>
          <Field label="Mensagem">
            <Textarea rows={4} value={mensagem} onChange={(e) => setMensagem(e.target.value)} required />
          </Field>
          <Button type="submit" disabled={!assunto || !mensagem}>
            Enviar
          </Button>
        </form>
      </Card>
    </div>
  );
}

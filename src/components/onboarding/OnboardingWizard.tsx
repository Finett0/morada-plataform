'use client';

import { useState } from 'react';
import { Button, Card, Field, Input, Select, Stepper, Banner } from '@/components/ui';
import { useAtivarBeneficio } from '@/hooks/useOnboarding';
import { errorMessage } from '@/lib/form';

const STEPS = ['Dados da empresa', 'Faturamento', 'Convênio', 'Confirmação'];

export function OnboardingWizard({
  empresa,
}: {
  empresa: { razaoSocial: string; cnpj: string };
}) {
  const ativar = useAtivarBeneficio();
  const [step, setStep] = useState(0);
  const [endereco, setEndereco] = useState('');
  const [representante, setRepresentante] = useState('');
  const [vencimento, setVencimento] = useState('10');
  const [emailFinanceiro, setEmailFinanceiro] = useState('');
  const [leuConvenio, setLeuConvenio] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const kycValido = endereco.trim().length > 2 && representante.trim().length > 2;
  const billingValido = emailFinanceiro.includes('@');

  return (
    <div>
      <p className="eyebrow">Ativação</p>
      <h1 className="mu-page-title">Onboarding da empresa</h1>
      <Stepper steps={STEPS} current={step} />

      <Card large>
        {step === 0 && (
          <div>
            <h2 style={{ fontSize: 20 }}>Dados da empresa</h2>
            <Field label="Razão social">
              <Input value={empresa.razaoSocial} disabled />
            </Field>
            <Field label="CNPJ">
              <Input value={empresa.cnpj} disabled />
            </Field>
            <Field label="Endereço">
              <Input value={endereco} onChange={(e) => setEndereco(e.target.value)} />
            </Field>
            <Field label="Representante legal">
              <Input value={representante} onChange={(e) => setRepresentante(e.target.value)} />
            </Field>
            <div className="mu-row" style={{ justifyContent: 'flex-end' }}>
              <Button onClick={next} disabled={!kycValido}>
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 20 }}>Faturamento</h2>
            <p className="mu-muted">A empresa paga uma única fatura consolidada por mês.</p>
            <Field label="Dia de vencimento">
              <Select value={vencimento} onChange={(e) => setVencimento(e.target.value)}>
                {['5', '10', '15', '20', '25'].map((d) => (
                  <option key={d} value={d}>
                    Dia {d}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="E-mail do financeiro">
              <Input
                type="email"
                value={emailFinanceiro}
                onChange={(e) => setEmailFinanceiro(e.target.value)}
              />
            </Field>
            <div className="mu-row mu-row--between">
              <Button variant="secondary" onClick={back}>
                Voltar
              </Button>
              <Button onClick={next} disabled={!billingValido}>
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 20 }}>Convênio B2B de roteamento</h2>
            <div
              style={{
                maxHeight: 240,
                overflow: 'auto',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-chip)',
                padding: 16,
                margin: '12px 0',
                fontSize: 14,
              }}
            >
              <p>
                Este convênio habilita o benefício de moradia para os profissionais PJ da empresa,
                mediante roteamento de pagamentos.
              </p>
              <p>
                <strong>Cláusula de não-fiador.</strong> A empresa <strong>não</strong> figura como
                fiadora da locação em nenhuma hipótese. A garantia é prestada pela Morada
                (modalidade fiança).
              </p>
              <p>
                <strong>Trava de rescisão.</strong> No desligamento de um colaborador, a empresa
                retém a última fatura para cobrir até ~3 meses de aluguel até a desocupação.
              </p>
              <p className="mu-muted">Valores ilustrativos. Não constitui parecer jurídico.</p>
            </div>
            <Banner tone="warn">
              A empresa nunca é fiadora. O convênio inclui a trava de rescisão.
            </Banner>
            <label className="mu-row" style={{ fontSize: 14, margin: '16px 0' }}>
              <input
                type="checkbox"
                checked={leuConvenio}
                onChange={(e) => setLeuConvenio(e.target.checked)}
              />
              Li e aceito os termos do convênio.
            </label>
            <div className="mu-row mu-row--between">
              <Button variant="secondary" onClick={back}>
                Voltar
              </Button>
              <Button onClick={next} disabled={!leuConvenio}>
                Assinar convênio
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 20 }}>Tudo pronto</h2>
            <p className="mu-muted">
              Revise e ative o benefício. Em seguida você poderá cadastrar o primeiro colaborador.
            </p>
            <ul style={{ fontSize: 14 }}>
              <li>Endereço: {endereco}</li>
              <li>Representante: {representante}</li>
              <li>Vencimento: dia {vencimento}</li>
              <li>Financeiro: {emailFinanceiro}</li>
              <li>Convênio: assinado</li>
            </ul>
            {ativar.isError ? (
              <Banner tone="warn">{errorMessage(ativar.error)}</Banner>
            ) : null}
            <div className="mu-row mu-row--between" style={{ marginTop: 16 }}>
              <Button variant="secondary" onClick={back}>
                Voltar
              </Button>
              <Button
                variant="accent"
                onClick={() => ativar.mutate({ endereco })}
                disabled={ativar.isPending}
              >
                {ativar.isPending ? 'Ativando…' : 'Ativar benefício'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

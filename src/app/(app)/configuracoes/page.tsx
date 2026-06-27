'use client';

import { useEffect, useState } from 'react';
import {
  Badge,
  Banner,
  Button,
  Card,
  ConfirmModal,
  Field,
  Input,
  Modal,
  Select,
  Spinner,
  Table,
  type Column,
} from '@/components/ui';
import {
  useUsuarios,
  useConvidarUsuario,
  useAlterarPapel,
  useRemoverUsuario,
  useEmpresa,
  useAtualizarEmpresa,
} from '@/hooks/useConfiguracoes';
import { usePermissions } from '@/hooks/useSession';
import { useAuditoria } from '@/hooks/useAuditoria';
import { usuarioStatus } from '@/lib/status';
import { PAPEL_LABEL, type EventoAuditoria, type Papel, type Usuario } from '@/lib/types';
import { formatCNPJ, formatDate } from '@/lib/format';
import { errorMessage } from '@/lib/form';
import { useToast } from '@/components/ui';

const TABS = ['Empresa', 'Usuários', 'Faturamento', 'Segurança', 'Auditoria'] as const;
type Tab = (typeof TABS)[number];

export default function ConfiguracoesPage() {
  const { can } = usePermissions();
  const [tab, setTab] = useState<Tab>('Empresa');

  if (!can('config:editar')) {
    return <Banner tone="warn">Você não tem permissão para acessar as configurações.</Banner>;
  }

  return (
    <div className="mu-stack">
      <div>
        <p className="eyebrow">Administração</p>
        <h1 className="mu-page-title">Configurações</h1>
      </div>

      <div className="mu-row" style={{ gap: 8, borderBottom: '1px solid var(--line)' }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="mu-btn mu-btn--ghost"
            style={{
              borderRadius: 0,
              borderBottom: tab === t ? '2px solid var(--moss)' : '2px solid transparent',
              color: tab === t ? 'var(--ink)' : 'var(--muted)',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Empresa' && <EmpresaTab />}
      {tab === 'Usuários' && <UsuariosTab />}
      {tab === 'Faturamento' && <FaturamentoTab />}
      {tab === 'Segurança' && <SegurancaTab />}
      {tab === 'Auditoria' && <AuditoriaTab />}
    </div>
  );
}

function EmpresaTab() {
  const { data, isLoading } = useEmpresa();
  const salvar = useAtualizarEmpresa();
  const [razaoSocial, setRazao] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(() => {
    if (data?.empresa) {
      setRazao(data.empresa.razaoSocial);
      setEndereco(data.empresa.endereco ?? '');
    }
  }, [data]);

  if (isLoading || !data) return <Spinner />;

  return (
    <Card large style={{ maxWidth: 560 }}>
      <Field label="Razão social">
        <Input value={razaoSocial} onChange={(e) => setRazao(e.target.value)} />
      </Field>
      <Field label="CNPJ">
        <Input value={formatCNPJ(data.empresa.cnpj)} disabled />
      </Field>
      <Field label="Endereço">
        <Input value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      </Field>
      <Button onClick={() => salvar.mutate({ razaoSocial, endereco })} disabled={salvar.isPending}>
        {salvar.isPending ? 'Salvando…' : 'Salvar'}
      </Button>
    </Card>
  );
}

function UsuariosTab() {
  const { data, isLoading, error } = useUsuarios();
  const convidar = useConvidarUsuario();
  const alterar = useAlterarPapel();
  const remover = useRemoverUsuario();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [papel, setPapel] = useState<Papel>('rh');
  const [removendo, setRemovendo] = useState<Usuario | null>(null);

  const cols: Column<Usuario>[] = [
    { key: 'nome', header: 'Nome', render: (u) => <strong>{u.nome}</strong> },
    { key: 'email', header: 'E-mail', render: (u) => u.email },
    {
      key: 'papel',
      header: 'Papel',
      render: (u) => (
        <Select
          value={u.papel}
          onChange={(e) => alterar.mutate({ id: u.id, papel: e.target.value as Papel })}
          style={{ maxWidth: 160 }}
        >
          {(Object.keys(PAPEL_LABEL) as Papel[]).map((p) => (
            <option key={p} value={p}>
              {PAPEL_LABEL[p]}
            </option>
          ))}
        </Select>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (u) => {
        const s = usuarioStatus[u.status];
        return <Badge tone={s.tone}>{s.label}</Badge>;
      },
    },
    {
      key: 'acao',
      header: '',
      render: (u) => (
        <Button variant="ghost" onClick={() => setRemovendo(u)}>
          Remover
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <div className="mu-row mu-row--between" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, margin: 0 }}>Usuários e papéis</h2>
        <Button onClick={() => setInviteOpen(true)}>Convidar usuário</Button>
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Banner tone="warn">Não foi possível carregar os usuários.</Banner>
      ) : (
        <Table columns={cols} rows={data?.usuarios ?? []} rowKey={(u) => u.id} />
      )}

      <Modal
        open={inviteOpen}
        title="Convidar usuário"
        onClose={() => setInviteOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setInviteOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() =>
                convidar.mutate(
                  { email, papel },
                  {
                    onSuccess: () => {
                      setInviteOpen(false);
                      setEmail('');
                    },
                  },
                )
              }
              disabled={convidar.isPending || !email.includes('@')}
            >
              Enviar convite
            </Button>
          </>
        }
      >
        {convidar.isError ? <Banner tone="warn">{errorMessage(convidar.error)}</Banner> : null}
        <Field label="E-mail">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Papel">
          <Select value={papel} onChange={(e) => setPapel(e.target.value as Papel)}>
            {(Object.keys(PAPEL_LABEL) as Papel[]).map((p) => (
              <option key={p} value={p}>
                {PAPEL_LABEL[p]}
              </option>
            ))}
          </Select>
        </Field>
      </Modal>

      <ConfirmModal
        open={!!removendo}
        title="Remover usuário"
        description={`Remover ${removendo?.nome}? Esta ação não pode ser desfeita.`}
        confirmLabel="Remover"
        danger
        loading={remover.isPending}
        onCancel={() => setRemovendo(null)}
        onConfirm={() =>
          removendo &&
          remover.mutate(removendo.id, {
            onSuccess: () => setRemovendo(null),
            onError: () => setRemovendo(null),
          })
        }
      />
    </Card>
  );
}

function FaturamentoTab() {
  return (
    <Card large style={{ maxWidth: 560 }}>
      <Field label="Método de pagamento">
        <Select defaultValue="boleto">
          <option value="boleto">Boleto</option>
          <option value="pix">Pix</option>
          <option value="ted">TED</option>
        </Select>
      </Field>
      <Field label="Dia de vencimento">
        <Select defaultValue="10">
          {['5', '10', '15', '20', '25'].map((d) => (
            <option key={d} value={d}>
              Dia {d}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="E-mail do financeiro">
        <Input type="email" placeholder="financeiro@empresa.com" />
      </Field>
      <Button>Salvar</Button>
    </Card>
  );
}

function AuditoriaTab() {
  const { data, isLoading, error } = useAuditoria();
  const toast = useToast();

  const cols: Column<EventoAuditoria>[] = [
    { key: 'data', header: 'Data', render: (e) => formatDate(e.timestamp) },
    { key: 'usuario', header: 'Usuário', render: (e) => e.usuario },
    { key: 'papel', header: 'Papel', render: (e) => PAPEL_LABEL[e.papel] },
    { key: 'acao', header: 'Ação', render: (e) => <code>{e.acao}</code> },
    { key: 'entidade', header: 'Entidade', render: (e) => e.entidade },
  ];

  return (
    <Card>
      <div className="mu-row mu-row--between" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, margin: 0 }}>Trilha de auditoria</h2>
        <Button variant="secondary" onClick={() => toast.success('Auditoria exportada.')}>
          Exportar
        </Button>
      </div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Banner tone="warn">Não foi possível carregar a auditoria.</Banner>
      ) : (
        <Table columns={cols} rows={data?.eventos ?? []} rowKey={(e) => e.id} />
      )}
    </Card>
  );
}

function SegurancaTab() {
  return (
    <Card large style={{ maxWidth: 560 }}>
      <Field label="Senha atual">
        <Input type="password" />
      </Field>
      <Field label="Nova senha" hint="Mínimo 8 caracteres">
        <Input type="password" />
      </Field>
      <Button>Trocar senha</Button>
      <p className="mu-muted" style={{ marginTop: 16 }}>
        Autenticação de dois fatores (2FA) e gestão de sessões ativas: em breve.
      </p>
    </Card>
  );
}

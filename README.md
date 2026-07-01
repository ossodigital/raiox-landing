# RAIOX Landing

Landing page oficial do RAIOX, produto da OSSO DIGITAL para diagnosticar gargalos de vendas e atendimento e orientar ações comerciais com mais clareza.

Repositório oficial: [ossodigital/raiox-landing](https://github.com/ossodigital/raiox-landing)

## Objetivo comercial

Apresentar a oferta RAIOX, explicar o valor do diagnóstico e converter visitantes em conversas comerciais qualificadas. Na V1, a conversão acontece pelo WhatsApp e todo o atendimento é humano.

## Status atual

- Landing publicada na Vercel.
- Deploy automático conectado ao repositório oficial no GitHub.
- `index.html` e `report.html` servidos a partir da raiz.
- Dez CTAs direcionados ao WhatsApp provisório `5511989886009`.
- Botão flutuante do WhatsApp ativo.
- Oferta e atendimento realizados manualmente.
- Sem integração com o OSSO ENGINE nesta versão.
- OSSO ENGINE permanece focado no nicho de tattoo por enquanto.

## Stack

- HTML5
- CSS3
- JavaScript sem framework
- Git e GitHub
- Vercel para hospedagem e deploy automático

## Estrutura de arquivos

```text
raiox-landing/
├── index.html          # Landing principal
├── report.html         # Modelo de relatório RAIOX
├── assets/             # Favicons e imagens
├── scripts/            # Comportamento da landing e do relatório
├── styles/             # Estilos da landing e do relatório
├── docs/               # Documentação de produto e marketing
├── package.json        # Metadados do projeto estático
├── vercel.json         # Configuração de URLs da Vercel
├── CHECKPOINTS.md      # Marcos oficiais validados
├── ROADMAP.md          # Evolução planejada do produto
└── CHANGELOG.md        # Histórico de mudanças
```

## Fluxo V1

1. O visitante acessa a landing RAIOX.
2. Conhece o diagnóstico, seus benefícios e a oferta.
3. Clica em um dos CTAs da página.
4. É direcionado ao WhatsApp humano com uma mensagem pronta.
5. A equipe realiza a qualificação e apresenta a oferta manualmente.

O fluxo V1 não utiliza OSSO ENGINE, automação multinicho, formulário ou banco de dados.

## Próximos passos

- Adicionar formulário e captura estruturada de leads.
- Persistir os dados no Supabase.
- Criar um dashboard simples para acompanhamento.
- Evoluir para auditoria e score automáticos com IA.
- Gerar relatórios em PDF.
- Preparar o RAIOX para operação multinicho.

Consulte [ROADMAP.md](ROADMAP.md) para o detalhamento por versão.

# Auditoria integral e baseline congelada — RAIOX Landing V1

## 1. Identificação

- Repositório: `ossodigital/raiox-landing`
- Branch auditada: `main`
- Commit de baseline: `b7984a2`
- Domínio: `https://raiox.ossodigital.com.br`
- Quantidade de arquivos rastreados: 44
- Placeholders vazios: 13
- Arquitetura atual: HTML, CSS, JavaScript e SVG estáticos, sem build, banco, autenticação ou backend.

## 2. Regra de congelamento

Os itens abaixo constituem o **V1 Runtime Frozen Set**. Não podem ser alterados por missões da plataforma sem change request específico, teste de regressão e release próprio da landing:

```text
index.html
report.html
404.html
legal/privacy.html
legal/terms.html
pages/obrigado.html
assets/favicon.svg
assets/og-raiox.svg
scripts/script.js
scripts/report.js
styles/style.css
styles/report.css
styles/legal.css
package.json
vercel.json
robots.txt
sitemap.xml
```

Também permanecem externos à plataforma o domínio público, o projeto Vercel, os CTAs e a documentação operacional V1.

## 3. Integridade da baseline

| Arquivo | SHA-256 |
|---|---|
| `index.html` | `1ffea57a52658422553f666ad5aeeb5dc105605ee14d61b78d0eee89909442c7` |
| `report.html` | `1a5ed1bba19e5b65210ddf830236451532a6871fa74f4c3bd6eed97b33b412e0` |
| `404.html` | `9d9eb9fa183b395dead2956bb01ec8324847cfe03ceb331566f7957ad422cdab` |
| `legal/privacy.html` | `8ebecbae95d3120d91c51ae5203b703e785e7c5f5f39985537f43111d6b7b0cb` |
| `legal/terms.html` | `d83e8f6637624077f1931d5eedbadfe7ecc404f3917fb86538acd16cadbcd052` |
| `pages/obrigado.html` | `3b6576e5a90fe08c3722c870a311d99fed4d1dfc1869fa1c6f9662917aff1dfe` |
| `scripts/script.js` | `e51ee7e77ccf3c2367f6542238b1da1ae30c15732651510e21745958b79942c2` |
| `scripts/report.js` | `6e1a906c5db8759054247492d9b1103f9d798d0e00ab2a98a8c3938e6c213e13` |
| `styles/style.css` | `b17118e02da77878bdd269cc32e553a6cef5bbd88286bc4473931ece7734f674` |
| `styles/report.css` | `c146151ae6ec6dbd73a3958d33fecb4d3bcd8e69094845bceb6de6aba92bb6aa` |
| `styles/legal.css` | `30c3a78413be8b871207b36fa88684034ec6cbcd48b4935bfc4b3e345b87e503` |
| `assets/favicon.svg` | `45bedacd523e9d222a2d5b8a1900018a56e69ef037533dcc0c04a0767a380bd3` |
| `assets/og-raiox.svg` | `943c895323fbdb2fa85b2b441f8e3530a1caf8538852bd84b5422ba7aeb58f8d` |
| `package.json` | `7c4e1f0eb73a4c8909947a1cd2c686a899152429444a833188d25c2c90578c6d` |
| `vercel.json` | `3dbafe0f8b790deb20f72e6299c833b323c7aec6cb1e4342f6529576d05f1e22` |
| `robots.txt` | `2515c122c021e20a26d240ac75eb9fa87868694fa254dd98a5b5103be127666e` |
| `sitemap.xml` | `f41cc4e2ea7a34f1d344d4bed04614cec9ed1d3015a8a035af543079898374c2` |

## 4. Capacidades existentes

| Capacidade | Estado | Reuso na plataforma |
|---|---|---|
| Landing comercial e SEO | produção | somente link/UTM; não importar código |
| Relatório demonstrativo | produção | referência visual e taxonomia inicial |
| WhatsApp humano | produção | fallback e canal comercial externo |
| Páginas legais | produção | referência; plataforma exigirá documentos próprios |
| Página de obrigado e 404 | produção | sem reuso de código |
| Menu, accordion e reveal | JavaScript local | não migrar; UI da plataforma terá biblioteca própria |
| Configuração do relatório | objeto JS manual | extrair conceitos, nunca executar em produção SaaS |
| Score e faixas | demonstração | hipótese metodológica a validar e versionar |
| Dez dimensões de auditoria | demonstração | catálogo inicial, não esquema fixo |
| Impressão do relatório | `window.print()` | referência; substituir por export versionado assíncrono |
| Documentos comercial/operacional | completos | fonte para requisitos e estados do workflow |

## 5. Achados técnicos

### Pontos fortes

- Ativo estático de baixo acoplamento, pequeno custo operacional e deploy simples.
- Identidade visual consistente, páginas responsivas e relatório demonstrativo imprimível.
- CTA e mensagem do WhatsApp padronizados.
- Processo comercial, coleta e entrega manual já documentados.
- Estrutura do relatório revela linguagem de domínio útil: áreas, achados, impacto, recomendação, prioridade e plano de ação.

### Limitações conhecidas

- `scripts/report.js` concentra dados, apresentação e regras demonstrativas em um único arquivo.
- Relatórios reais exigem edição manual do objeto `CONFIG`, sem validação, histórico ou segregação de cliente.
- Score e faixas são código de demonstração, não metodologia formal auditável.
- Não há autenticação, autorização, banco, trilha de auditoria, anexos privados ou recuperação de desastre.
- Não há testes automatizados, lint, CI de qualidade, analytics ou SLO.
- Política de privacidade ainda descreve exclusivamente a V1 e precisa de nova versão antes da plataforma.
- Oferta e preço de R$ 197 pertencem ao serviço V1; não definem unit economics do SaaS.
- Imagem Open Graph em SVG pode ter compatibilidade desigual fora do navegador.

### Placeholders detectados

Treze arquivos vazios (`MISSION.md`, `VISION.md`, `TODO.md`, `api/README.md`, `database/README.md`, entre outros) não representam implementação existente e não devem ser tratados como módulos reaproveitáveis.

## 6. Estratégia de reaproveitamento

1. **Marca e experiência:** transformar cores, tipografia, espaçamento e componentes aprovados em tokens documentados; nenhuma cópia direta antes de revisão de licença e acessibilidade.
2. **Taxonomia:** converter as dez áreas do demo em uma metodologia versionada e configurável.
3. **Relatório:** usar a hierarquia visual como referência para o template de `report_version`, mantendo snapshots imutáveis.
4. **Operação:** mapear os estados manuais documentados para uma máquina de estados aprovada.
5. **Comercial:** manter a landing como aquisição; acrescentar somente um link futuro para a plataforma após consentimento e readiness.
6. **Legal:** separar políticas do site público das políticas da plataforma autenticada.

## 7. Itens explicitamente não reutilizados

- Objeto `CONFIG` e funções de renderização de `scripts/report.js`.
- Manipulação direta do DOM do V1.
- CSS monolítico/minificado.
- Caminhos internos, projeto Vercel e pipeline da landing.
- Dados fictícios, scores, empresas e recomendações do relatório demo.
- Preço V1 como regra automática de cobrança.

## 8. Contrato de dependência externa

| Direção | Permitido | Proibido |
|---|---|---|
| Landing → Plataforma | HTTPS para URL pública, UTM e `referrer` minimizado | chamada com segredo, sessão compartilhada ou acesso ao banco |
| Plataforma → Landing | link para home, termos públicos e demo | importar assets em runtime ou depender da estrutura HTML |
| Analytics | campanha agregada com consentimento aplicável | enviar conteúdo de auditoria ou dados sensíveis |
| Release | versões independentes | deploy acoplado ou submódulo Git obrigatório |

## 9. Critério de preservação desta missão

A Foundation é válida somente se os 17 hashes do Runtime Frozen Set permanecerem idênticos ao baseline. Alterações em documentação fora desse conjunto são permitidas.

## 10. Inventário integral dos 44 arquivos da baseline

| Grupo | Arquivos | Classificação |
|---|---|---|
| Deploy público | `index.html`, `report.html`, `404.html`, `legal/privacy.html`, `legal/terms.html`, `pages/obrigado.html` | runtime congelado |
| Estilos | `styles/style.css`, `styles/report.css`, `styles/legal.css` | runtime congelado |
| Scripts | `scripts/script.js`, `scripts/report.js` | runtime congelado |
| Assets | `assets/favicon.svg`, `assets/og-raiox.svg` | runtime congelado |
| Infra estática | `package.json`, `vercel.json`, `robots.txt`, `sitemap.xml`, `.gitignore` | deploy congelado; `.gitignore` vazio |
| Release V1 | `README.md`, `CHANGELOG.md`, `CHECKPOINTS.md`, `ROADMAP.md`, `VERSION.md`, `RELEASE_NOTES.md` | documentação viva; pode registrar a plataforma sem mudar o V1 |
| Comercial V1 | `docs/comercial/FUNIL_RAIOX_V1.md`, `docs/comercial/OFERTA_RAIOX_V1.md`, `docs/comercial/SCRIPT_WHATSAPP_RAIOX.md` | requisito de domínio reutilizável por referência |
| Operacional V1 | `docs/operacional/CHECKLIST_CLIENTE_RAIOX.md`, `docs/operacional/CONTROLE_OPERACAO_RAIOX_V1.md`, `docs/operacional/ENTREGA_RAIOX_V1.md` | requisito de workflow reutilizável por referência |
| Relatórios de release | `docs/RELEASE_FINAL_RAIOX_V1.md`, `docs/REPORT_V1.md` | evidência histórica |
| Placeholders raiz | `LICENSE`, `MISSION.md`, `TODO.md`, `VISION.md` | vazios; não constituem capacidade |
| Placeholders técnicos | `api/README.md`, `database/README.md`, `checkpoints/CP-001.md` | vazios; não constituem backend/database/checkpoint válido |
| Placeholders de conteúdo | `docs/BRIEFING.md`, `docs/COPY.md`, `docs/FUNIL.md`, `docs/OFERTA.md`, `docs/SEO.md` | vazios; não constituem especificação |

Conclusão do inventário: todo arquivo rastreado foi classificado como runtime/deploy congelado, documentação aproveitável por referência, evidência histórica ou placeholder sem implementação.

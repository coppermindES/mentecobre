# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

This is a **multi-context** repo. Read the glossary for the context you are working in.

## Contexts

| Context | Path | What it is |
| ------- | ---- | ---------- |
| `api`   | `api/` | Django backend. Apps: `authentication`, `coppermind`, `common`, `main` |
| `spa`   | `spa/` | Vite + React frontend |

`docker/` holds deployment plumbing for both contexts. It is not a context of its
own: decisions about it belong in the root `docs/adr/`.

## Before exploring, read these

- **`GLOSSARY-MAP.md`** at the repo root: it points at one `GLOSSARY.md` per
  context. Read each one relevant to the topic.
- **`docs/adr/`**: system-wide decisions that span both contexts.
- **`<context>/docs/adr/`**: decisions scoped to the context you're working in
  (e.g. `api/docs/adr/`).

If any of these files don't exist, **proceed silently**. Don't flag their absence;
don't suggest creating them upfront. The `/domain-modeling` skill creates them
lazily when terms or decisions actually get resolved.

## File structure

```
/
├── GLOSSARY-MAP.md
├── docs/adr/                    ← system-wide decisions
├── api/
│   ├── GLOSSARY.md
│   └── docs/adr/                ← backend decisions
├── spa/
│   ├── GLOSSARY.md
│   └── docs/adr/                ← frontend decisions
└── docker/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal,
a hypothesis, a test name), use the term as defined in that context's
`GLOSSARY.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're
inventing language the project doesn't use (reconsider) or there's a real gap
(note it for `/domain-modeling`).

If the concept spans both contexts — a "chapter", a "translation unit", a
"revision" — prefer the root `GLOSSARY-MAP.md` and settle the shared term in one
place rather than letting `api/` and `spa/` drift apart.

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than
silently overriding:

> _Contradicts ADR-0007 (...), but worth reopening because…_

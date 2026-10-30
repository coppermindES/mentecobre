# Issue tracker: GitHub (read-only for agents)

Issues and specs for this repo live as GitHub issues in `coppermindES/mentecobre`.

**Agents do not create, edit, label, or close issues here.** The maintainer writes
issues by hand in the GitHub web UI, then invokes a skill to read them and plan.
Implementation is done by hand too.

Use the `gh` CLI for reads. `gh auth login` must have been run once on this
machine, or every read command below fails.

## Conventions

- **Read an issue**: `gh issue view <number> --json number,title,body,labels,comments`
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`
- **Read a PR**: `gh pr view <number>`; resolve a bare `#42` with `gh pr view 42`, falling back to `gh issue view 42`.

Infer the repo from `git remote -v`; `gh` does this automatically inside a clone.

## When a skill says "publish to the issue tracker"

Do not call `gh issue create`. Instead, output the finished issue as a fenced
markdown block — title, body, suggested labels — so the maintainer can paste it
into GitHub. Say explicitly that it was not filed.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above.

## Triage

No triage workflow is configured for this repo and no label vocabulary is in
use. Skills should not apply labels. If a skill wants to classify work, describe
the classification in prose instead.

# v2 마이그레이션 실행 순서

레이팅 시스템 ELO 재설계, 중복 제거, 해설 전면 보강을 위한 v2 마이그레이션입니다.

## 실행 순서 (반드시 이 순서대로)

```bash
# 1) 정리: 중복 삭제, 부정형 문제 이름 변경, 난이도 재분류
psql $DATABASE_URL -f migration-v2-cleanup.sql

# 2) 해설 보강 (4개 파일, 순서 무관)
psql $DATABASE_URL -f migration-v2-explanations-common.sql
psql $DATABASE_URL -f migration-v2-explanations-rare.sql
psql $DATABASE_URL -f migration-v2-explanations-epic.sql
psql $DATABASE_URL -f migration-v2-explanations-legendary.sql
```

또는 Supabase 대시보드 SQL Editor에 위 5개 파일 내용을 순서대로 붙여 실행.

## 변경 사항

**1. 중복 제거 (1건)**
- `KV Cache가 LLM 추론을 빠르게 하는 원리는?` (Legendary) — 삭제. Epic의 `KV 캐시(KV Cache)가 LLM 추론에서 중요한 이유는?`만 유지.

**2. 난이도 재분류 (2건)**
- `BERT와 GPT의 근본적인 차이는?`: Epic → Rare
- `RAG(Retrieval-Augmented Generation)의 핵심 아이디어는?`: Epic → Rare

**3. 부정형 문제 명확화 (7건) — 의도 강조**
- "특징이 아닌 것은?" → "에 대한 설명 중 틀린 것은?"
- "효과가 아닌 것은?" → "효과로 옳지 않은 것은?"
- "단점이 아닌 것은?" → "단점으로 옳지 않은 것은?" 등

**4. 해설 전면 보강 (134문제)**
- 평균 1줄 → 평균 4~5줄로 확장
- AI 비전공자도 이해 가능한 직관적 비유·메커니즘·면접 답변법 포함
- 첫 줄: 핵심 정의 + 비유
- 중간: 메커니즘·이유
- 마지막: 면접에서 강조할 포인트, 실무 사례

## 코드 변경

`lib/rating.ts` — ELO 알고리즘 기반으로 전면 재작성 (단순 가산점 → 기대값 vs 실제 성과 + 동적 K-factor).

`app/result/page.tsx` — `updateRating(userId, answers)` 시그니처 변경 반영.

## 롤백

`migration-v2-cleanup.sql`은 BEGIN/COMMIT 트랜잭션이라 실패 시 자동 롤백됩니다. 실행 전 수동 백업 권장:

```bash
pg_dump --table=questions $DATABASE_URL > backup-questions.sql
```

-- v2 마이그레이션: 중복 제거, 난이도 재분류, 부정형 문제 명확화
-- 실행 전 백업 권장: pg_dump --table=questions > backup.sql

BEGIN;

-- 1) 중복 제거: KV Cache 동일 문제 2개 중 Legendary 버전 삭제 (Epic 버전 유지)
DELETE FROM questions
WHERE content = 'KV Cache가 LLM 추론을 빠르게 하는 원리는?'
  AND difficulty = 'legendary';

-- 2) 난이도 재분류: 너무 빈출 상식인 Epic 문제를 Rare로 강등
UPDATE questions
SET difficulty = 'rare'
WHERE content = 'BERT와 GPT의 근본적인 차이는?';

UPDATE questions
SET difficulty = 'rare'
WHERE content = 'RAG(Retrieval-Augmented Generation)의 핵심 아이디어는?';

-- 3) 부정형 문제 명확화: "특징이 아닌 것은?" → "틀린 설명을 고르세요" (의도 강조)
UPDATE questions
SET content = '결정 트리(Decision Tree)에 대한 설명 중 틀린 것은?'
WHERE content = '결정 트리(Decision Tree)의 특징이 아닌 것은?';

UPDATE questions
SET content = '배치 정규화(Batch Normalization)의 효과로 옳지 않은 것은?'
WHERE content = '배치 정규화(Batch Normalization)의 효과가 아닌 것은?';

UPDATE questions
SET content = 'K-means 클러스터링의 단점으로 옳지 않은 것은?'
WHERE content = 'K-means 클러스터링의 단점이 아닌 것은?';

UPDATE questions
SET content = '데이터 불균형(Imbalanced Data) 문제 해결 방법으로 옳지 않은 것은?'
WHERE content = '데이터 불균형(Imbalanced Data) 문제 해결 방법이 아닌 것은?';

UPDATE questions
SET content = '결측값(Missing Value) 처리 방법으로 옳지 않은 것은?'
WHERE content = '결측값(Missing Value) 처리 방법으로 적절하지 않은 것은?';

UPDATE questions
SET content = 'AI 모델의 추론(Inference) 최적화 기법으로 옳지 않은 것은?'
WHERE content = 'AI 모델의 추론(Inference) 최적화 기법이 아닌 것은?';

UPDATE questions
SET content = 'ML 모델의 재현성(Reproducibility)을 보장하는 방법으로 옳지 않은 것은?'
WHERE content = 'ML 모델의 재현성(Reproducibility)을 보장하는 방법이 아닌 것은?';

COMMIT;

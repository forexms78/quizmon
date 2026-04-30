-- v2: Legendary 난이도 해설 보강
BEGIN;

UPDATE questions SET explanation = 'Constitutional AI는 Anthropic이 RLHF의 인간 피드백 의존성을 줄이려 만든 기법입니다. 핵심은 "헌법"으로 부르는 원칙 목록(예: "유익하고 정직하고 무해하라")을 모델에 주고, 모델이 자신의 응답을 이 원칙에 비추어 스스로 비판하고 수정하게 하는 것입니다. 단계는 (1) AI가 응답 생성, (2) AI가 원칙 위반 여부 자체 비판, (3) AI가 응답 재작성, (4) 이 데이터로 학습입니다. 인간 피드백을 AI 피드백(RLAIF)으로 대체해 확장성과 일관성을 얻는 접근이며, Claude의 안전성 학습 방식의 기반입니다.'
WHERE content = 'Constitutional AI의 핵심 원리는?';

UPDATE questions SET explanation = '기계론적 해석 가능성(Mech Interp)은 신경망을 컴퓨터 프로그램처럼 보고 그 안에서 어떤 알고리즘과 회로가 실행되는지 역공학하는 분야입니다. Anthropic은 GPT-2급 모델에서 "인덕션 헤드"(이전 패턴을 인식해 복사·예측하는 회로), "간접 객체 식별"(주어·목적어 구분), 모듈러 산술 회로 등을 발견했습니다. 이런 이해가 쌓이면 모델이 왜 그렇게 답하는지 설명 가능해지고, 안전·신뢰성·정렬 문제 해결의 단서가 됩니다. SAE(Sparse Autoencoder)로 특징을 분리해 분석하는 게 최신 흐름입니다.'
WHERE content = 'Mechanistic Interpretability가 목표하는 것은?';

UPDATE questions SET explanation = 'Hoffmann et al.(2022)의 Chinchilla 논문은 GPT-3 같은 대형 모델이 "파라미터는 많은데 학습이 부족한" 상태였음을 밝혔습니다. 같은 컴퓨팅 예산에서 N 파라미터 모델에는 약 20N 토큰을 학습시키는 것이 최적(compute-optimal)임을 실험으로 확인했습니다. 70B 파라미터면 1.4T 토큰이 적정선입니다. 이 발견은 이후 LLaMA·Mistral 등 효율적 학습 모델의 설계 원칙이 되었고, "더 크게"보다 "더 잘 학습"이 중요한 시대를 열었습니다.'
WHERE content = 'Chinchilla 스케일링 법칙이 제시한 최적 훈련 비율은?';

UPDATE questions SET explanation = '창발적 능력(Emergent Abilities)은 작은 모델에서는 0%에 가깝다가 특정 모델 크기를 넘는 순간 갑자기 의미 있는 성능이 나타나는 현상을 말합니다. 산술 연산·다단계 추론·지시 따르기 등이 사례로, 마치 물이 끓는점에서 갑자기 기체가 되듯 비선형적 도약입니다. Wei et al.(2022, Google)이 137개 벤치마크에서 관찰했으며, "왜 갑자기 나타나는가"는 미스터리로 남아 안전·예측 가능성 측면에서 중요한 연구 주제입니다. 단, 평가 지표 선택에 따라 창발이 아니라 부드러운 향상으로 보일 수 있다는 반론도 있습니다.'
WHERE content = 'LLM의 Emergent Abilities(창발적 능력)란?';

UPDATE questions SET explanation = 'DPO는 Stanford에서 2023년 발표한 RLHF 대체 기법입니다. 기존 RLHF는 (1) 보상 모델 학습, (2) PPO로 강화학습이라는 복잡한 2단계 파이프라인이 필요했습니다. DPO는 인간 선호 데이터(y_w가 y_l보다 좋다는 쌍)를 직접 언어 모델 손실 함수에 넣어 단일 단계로 최적화합니다. 별도의 보상 모델·강화학습 루프가 없어 구현이 단순하고 학습이 안정적이며 메모리도 절반입니다. Llama 2 이후 많은 오픈소스 정렬에 채택되었고, ORPO·SimPO 등 후속 변형도 활발합니다.'
WHERE content = 'DPO(Direct Preference Optimization)가 RLHF보다 단순한 이유는?';

UPDATE questions SET explanation = 'Speculative Decoding은 큰 LLM의 추론 속도를 높이는 영리한 기법입니다. 작고 빠른 드래프트 모델이 다음 K개 토큰을 추측해 만들고, 큰 타깃 모델이 한 번의 forward pass로 K개를 동시에 검증합니다. 추측이 맞으면 한 번에 K개 토큰을 받아들여 K배 가속, 틀린 위치부터는 타깃 모델 출력을 사용합니다. 같은 결과를 보장하면서 평균 2~3배 빠른 추론이 가능합니다. Google·Apple Intelligence·DeepSeek가 적극 활용하며, 큰 모델의 응답 속도 체감 향상에 핵심입니다.'
WHERE content = 'Speculative Decoding의 원리는?';

UPDATE questions SET explanation = '중첩 가설(Superposition)은 Anthropic 연구로, 신경망이 자신의 차원 수보다 많은 특징을 효율적으로 저장하는 현상을 설명합니다. 차원이 1000이고 특징이 10000개라면 각 특징을 정확한 직교 방향에 배정할 수 없으니, 희소 활성화(특정 입력에서 일부만 활성화)를 이용해 부분적으로 겹치게 저장합니다. 마치 압축 센싱처럼 정보 손실을 최소화하면서 용량을 늘리는 방식이죠. 이 가설은 SAE(Sparse Autoencoder)로 특징을 분리·해석하는 최신 mech interp 연구의 이론적 기반입니다.'
WHERE content = 'Superposition Hypothesis(중첩 가설)란?';

UPDATE questions SET explanation = 'Test-time compute scaling은 OpenAI o1이 대중화한 패러다임으로, 추론 시 더 많은 연산(긴 CoT, 자기 검토, 다중 답변 비교)을 들이면 정확도가 향상됨을 보여줍니다. 기존에는 학습 시 컴퓨팅이 성능을 결정한다고 봤지만, 이제 추론 시 컴퓨팅도 새로운 스케일링 축이 되었습니다. 모델이 어려운 문제에서 "잠시 생각하는" 시간을 가져 복잡한 수학·코드 문제 정확도를 크게 끌어올립니다. DeepSeek-R1·Claude 3.7 Sonnet의 thinking·Gemini 2.0 Flash Thinking 등이 이 흐름을 따르고 있습니다.'
WHERE content = 'Test-Time Compute Scaling의 핵심 아이디어는?';

UPDATE questions SET explanation = 'Activation Steering은 가중치를 바꾸지 않고 추론 시 잔류 스트림(residual stream)에 특정 벡터를 더해 모델 행동을 조절하는 기법입니다. 예를 들어 "정중함" 방향 벡터를 추가하면 모델이 더 공손해지고, 빼면 무뚝뚝해집니다. "사랑"·"분노"·"진실성" 같은 개념의 벡터를 활성화 분석으로 찾아내 추론 시점에 주입하는 식이죠. 파인튜닝 없이 즉각 행동 제어가 가능하며, Anthropic 연구에서 안전·정렬 도구로 탐색 중입니다. SAE로 더 정밀한 특징 단위 조작이 가능해지고 있습니다.'
WHERE content = 'Activation Steering의 목적은?';

UPDATE questions SET explanation = 'KV Cache는 LLM이 토큰을 하나씩 생성할 때 이전 토큰들의 Key, Value 벡터를 다시 계산하지 않고 메모리에 저장해 재사용하는 기법입니다. 자기회귀 생성에서 t번째 토큰을 만들 때 1~t-1번 토큰의 K/V는 변하지 않으므로 캐싱 가능합니다. 이 덕에 시퀀스 길이 n에 대해 매 토큰 생성이 O(n²)→O(n)으로 줄어 1000 토큰 응답이 수백 배 빨라집니다. 단점은 메모리가 시퀀스 길이에 비례해 늘어나는 것이며, vLLM의 PagedAttention이 이를 효율적으로 관리합니다.'
WHERE content = 'KV Cache가 LLM 추론을 빠르게 하는 원리는?';

UPDATE questions SET explanation = '스케일링 법칙은 모델 크기·데이터·컴퓨팅 중 하나만 늘려서는 최적 성능을 못 얻는다는 것을 보여줍니다. Kaplan et al.(2020) OpenAI 연구는 셋이 함께 증가해야 손실이 거듭제곱 곡선을 따른다고 밝혔고, Chinchilla(2022)는 균형 비율(N 파라미터당 20N 토큰)이 핵심임을 보였습니다. GPT-3는 파라미터에 비해 토큰이 부족(과소학습)했고, 후속 모델들은 토큰 비율을 높여 같은 컴퓨팅으로 더 좋은 성능을 냈습니다. "크게"보다 "균형 있게"가 현대 LLM 학습의 표준 사고방식입니다.'
WHERE content = 'Anthropic의 스케일링 법칙 연구가 시사하는 것은?';

UPDATE questions SET explanation = '정렬(Alignment)은 AI 시스템이 인간이 진짜 의도하고 가치 있다고 여기는 것을 따르도록 만드는 문제입니다. 능력 있는 AI라도 잘못된 목표를 추구하면 큰 위험이 됩니다 — 예: "스팸 메일 0건" 목표가 모든 메일 차단으로 이어질 수 있죠. 외부 정렬(인간 의도와 학습 목표 일치)과 내부 정렬(학습된 모델 내부 목표가 인간 의도와 일치)로 나뉘며, RLHF·Constitutional AI·해석 가능성 연구가 모두 정렬 도구입니다. AGI 시대에 가장 중요한 안전 문제로 여겨집니다.'
WHERE content = 'AI 안전성(AI Safety)에서 정렬(Alignment) 문제란?';

UPDATE questions SET explanation = '벤치마크는 모델 능력을 정량 평가하는 표준이지만 여러 한계가 있습니다. (1) 데이터 오염: 벤치마크 문제가 학습 데이터에 포함되면 점수가 부풀려집니다(GSM8K, HumanEval 일부 오염 보고). (2) 오버피팅: 벤치마크에 맞춘 학습으로 점수만 좋고 실제 능력은 떨어지는 굿하트의 법칙. (3) 시나리오 불일치: 짧은 객관식 문제 잘 푼다고 실무에서 잘 쓰이는 건 별개. MMLU·HumanEval 점수가 같은 모델끼리도 실사용 만족도가 크게 다른 이유입니다. Chatbot Arena 같은 인간 비교 평가가 보완책입니다.'
WHERE content = '모델 평가에서 벤치마크(Benchmark)의 한계는?';

UPDATE questions SET explanation = '도구 사용은 LLM의 본질적 한계를 보완합니다. (1) 지식 한계: 학습 시점 이후 정보 모름 → 웹 검색 도구. (2) 연산 부정확: 큰 숫자·정밀 계산 약함 → 계산기·코드 실행. (3) 외부 작용 불가능 → API·DB 도구로 실세계 행동. ChatGPT의 Code Interpreter, Claude의 Computer Use, Gemini의 Function Calling이 대표 사례. 도구 사용으로 LLM은 단순 텍스트 생성기에서 실제 작업을 수행하는 에이전트로 발전하며, 이것이 AI 에이전트 시대의 핵심 동력입니다.'
WHERE content = 'AI 에이전트에서 도구 사용(Tool Use)의 중요성은?';

UPDATE questions SET explanation = '강화학습 에이전트는 두 가지 욕망 사이에서 갈등합니다. 활용(Exploitation)은 지금까지 가장 좋다고 알려진 행동을 선택하는 것이고, 탐색(Exploration)은 새로운 행동을 시도해 더 좋은 옵션을 발견하려는 것입니다. 활용만 하면 지역 최적에 갇히고, 탐색만 하면 학습한 지식을 못 써먹습니다. ε-greedy(작은 확률로 무작위 선택), UCB(불확실성이 큰 행동 우선), Thompson Sampling(베이지안 샘플링)이 균형을 잡는 표준 방법입니다. 추천 시스템·광고 입찰·신약 임상에서도 핵심 개념입니다.'
WHERE content = '강화학습에서 탐색(Exploration)과 활용(Exploitation)의 트레이드오프란?';

UPDATE questions SET explanation = '비전-언어 정렬은 이미지와 텍스트가 서로 다른 모달리티지만 의미적으로 같은 공간에 매핑되도록 학습하는 기술입니다. CLIP은 4억 개 (이미지, 캡션) 쌍으로 대조 학습 — 같은 쌍은 가깝게, 다른 쌍은 멀게 임베딩합니다. 결과적으로 "고양이 사진"의 임베딩과 "a photo of a cat" 텍스트 임베딩이 가깝게 되어 zero-shot 분류·검색이 가능해집니다. LLaVA는 CLIP의 비전 인코더를 LLM에 연결해 시각적 이해 능력을 부여했으며, GPT-4V·Gemini의 기반이 되었습니다.'
WHERE content = '멀티모달 LLM에서 비전-언어 정렬(Vision-Language Alignment)이란?';

UPDATE questions SET explanation = '창발적 능력은 Wei et al.(2022)의 발견으로 화제였지만, Schaeffer et al.(2023, NeurIPS Best Paper)이 반론을 제기했습니다. 정확도(맞으면 1, 틀리면 0) 같은 비연속 메트릭으로 보면 창발처럼 보이지만, 토큰 편집 거리·로그 확률 같은 연속 메트릭으로 다시 측정하면 부드러운 향상으로 나타난다는 것입니다. 즉, "능력은 점진적으로 늘었지만 우리의 측정 도구가 그걸 못 보여줬을 뿐"이라는 주장이죠. 안전·예측 가능성 논의에 큰 영향을 미친 학계 논쟁이며, 평가 메트릭 설계의 중요성을 부각했습니다.'
WHERE content = 'AI의 창발적 능력(Emergent Abilities)이 논쟁적인 이유는?';

UPDATE questions SET explanation = '프론티어 모델은 인류 최고 수준 AI 능력을 가진 모델로, GPT-4·Claude 3.5·Gemini 2 등이 해당합니다. 능력이 갑작스럽게 향상되면서 새로운 위험 카테고리가 등장합니다. (1) 사이버 보안: 공격 자동화·취약점 발견. (2) 생물학: 위험 병원체 설계 정보 제공. (3) CBRN(화학·생물·방사선·핵): 대량 살상 무기 관련 지식. (4) 자율 조작·기만 능력. Anthropic의 RSP(Responsible Scaling Policy), OpenAI의 Preparedness Framework는 능력 평가 후 임계 위험 시 배포를 중단·완화하는 조건부 정책입니다.'
WHERE content = '프론티어 모델(Frontier Model)의 위험 평가가 중요한 이유는?';

UPDATE questions SET explanation = 'Power law(거듭제곱 법칙)는 손실 ∝ N^(-α) 형태로, 컴퓨팅이나 데이터를 X배 늘리면 손실이 일정 비율로 줄어드는 관계입니다. Kaplan(OpenAI, 2020) 연구가 모델 크기·데이터·컴퓨팅 모두에 이 법칙이 성립함을 보였습니다. 핵심은 예측 가능성으로, 100배 컴퓨팅 투자가 어느 정도 성능 향상을 가져올지 미리 추정할 수 있어 수십억 달러 투자가 정당화됩니다. GPT-4·Gemini Ultra 학습 결정은 이런 예측에 기반했고, 다만 어느 시점에서 한계점에 도달할지가 산업의 큰 질문입니다.'
WHERE content = '뉴럴 스케일링(Neural Scaling)에서 power law가 의미하는 것은?';

UPDATE questions SET explanation = '회로 분석(Circuit Analysis)은 신경망 안에서 특정 행동을 일으키는 뉴런·어텐션 헤드들의 연결 구조를 역공학하는 mech interp 연구입니다. Anthropic은 GPT-2에서 (1) 인덕션 헤드(이전 패턴을 인식해 다음에 같은 패턴 복사), (2) 간접 객체 식별 회로(주어와 목적어를 구분), (3) 모듈러 산술 회로 등을 발견했습니다. 이런 발견은 모델이 단순한 통계 기계가 아니라 실제로 알고리즘적 구조를 학습한다는 증거입니다. SAE로 특징 단위 분석이 가능해지면서 더 큰 모델에도 회로 분석이 확장되고 있습니다.'
WHERE content = 'AI 해석 가능성(Interpretability)에서 회로(Circuit) 분석이란?';

UPDATE questions SET explanation = 'LLM 서빙은 처리량과 지연시간이라는 두 목표 사이에서 트레이드오프가 있습니다. 처리량 최적화는 큰 배치(continuous batching), 텐서 병렬, FP8/INT8 양자화로 GPU 활용률을 높입니다. 지연시간 최적화는 첫 토큰까지 시간(TTFT)이 짧아야 하므로 스트리밍 출력(생성 즉시 전송), Speculative Decoding(소형 모델로 추측·대형 모델로 검증), 작은 모델 라우팅으로 체감 속도를 높입니다. SLO에 따라 선택이 달라지며, 챗봇은 TTFT 우선, 일괄 처리는 처리량 우선이 일반적입니다.'
WHERE content = 'LLM 추론에서 Throughput(처리량)과 Latency(지연시간) 트레이드오프를 해결하는 전략은?';

UPDATE questions SET explanation = 'PEFT(Parameter Efficient Fine-Tuning)는 70B 같은 큰 모델을 일반 GPU에서 파인튜닝 가능하게 만드는 기법군입니다. 공통 목표는 전체 파라미터의 0.1~1%만 학습해 비용을 극적으로 줄이는 것입니다. (1) LoRA: 가중치 변화량을 저랭크 분해. (2) Adapter: 작은 모듈을 레이어 사이에 삽입. (3) Prefix Tuning: 학습 가능한 토큰을 입력 앞에 추가. (4) Prompt Tuning: 더 단순한 prefix 변형. 모두 사전학습 가중치는 동결하고 소수 파라미터만 학습해 메모리·시간·저장 공간을 모두 절약합니다.'
WHERE content = 'PEFT(Parameter Efficient Fine-Tuning) 기법들의 공통 목표는?';

UPDATE questions SET explanation = 'LLM 평가에 인간 대신 LLM 판사를 쓰는 LLM-as-a-Judge는 빠르고 저렴하지만 시스템적 편향이 있습니다. (1) 자가 선호: GPT-4가 GPT-4 출력을 선호하는 경향. (2) 위치 편향: 두 답변을 비교할 때 첫 번째를 선호하는 경향. (3) 길이 편향: 긴 답변을 더 좋다고 평가. (4) 권위 편향: 자신감 있는 어조에 점수 후함. 이를 완화하려면 위치 무작위화, 여러 모델 판사 앙상블, 인간 검증 샘플링을 병행합니다. Chatbot Arena의 인간 직접 비교가 결국 가장 신뢰할 수 있는 평가 방식입니다.'
WHERE content = 'LLM 평가(Evaluation)에서 LLM-as-a-Judge 방식의 한계는?';

UPDATE questions SET explanation = 'Liu et al.(2023, Stanford)이 발견한 현상으로, 긴 컨텍스트(128k 토큰 등)를 가진 LLM이 답변에 필요한 정보가 컨텍스트 처음·끝에 있을 때보다 중간에 있을 때 정확도가 크게 떨어집니다. 마치 책의 첫 장과 마지막 장은 잘 기억하지만 중간 내용은 흐릿한 것과 비슷합니다. 어텐션 매커니즘과 학습 데이터의 위치 분포가 원인으로 추정됩니다. 실용적 영향: RAG 시스템에서 가장 중요한 문서를 컨텍스트 맨 앞이나 맨 뒤에 두는 것이 좋고, 긴 시스템 프롬프트는 핵심 지시를 끝에 넣는 게 효과적입니다.'
WHERE content = 'Long Context LLM에서 "Lost in the Middle" 현상이란?';

UPDATE questions SET explanation = 'AI 에이전트가 도구를 호출할 때 생기는 흔한 문제는 (1) JSON 파싱 오류(LLM이 잘못된 형식 출력), (2) 잘못된 파라미터(타입·범위·필수 필드 누락), (3) 도구 자체 실패(API 타임아웃·인증 오류)입니다. 신뢰성 확보 패턴은 (1) 구조화 출력 강제(Pydantic 스키마, JSON Schema, function calling API), (2) 재시도 로직(tenacity, exponential backoff), (3) 결과 검증 레이어(타입 체크, 합리성 평가, 인간 승인 단계). OpenAI Structured Outputs·Anthropic Tool Use·instructor 라이브러리가 이를 도와주며, 프로덕션 에이전트의 신뢰성은 이런 보호 장치의 두께가 결정합니다.'
WHERE content = 'AI 에이전트에서 도구 호출(Tool Calling) 신뢰성 문제를 해결하는 방법은?';

UPDATE questions SET explanation = 'Mixture of Agents(MoA)는 Together AI가 2024년 제안한 아키텍처로, 여러 LLM의 출력을 집계해 단일 모델보다 높은 성능을 얻는 방식입니다. 구조는 (1) 제안자(Proposer) 레이어: 여러 모델이 같은 질문에 각자 답변 생성, (2) 집약자(Aggregator) 레이어: 다른 모델이 그 답변들을 종합해 최종 답을 합성. AlpacaEval 2.0에서 GPT-4o를 능가하는 성능을 오픈소스 모델 조합으로 달성했습니다. 비용은 높지만, MoE처럼 모델 안에서가 아니라 모델 외부에서 다양성을 활용한다는 점이 차별점입니다.'
WHERE content = 'Mixture of Agents(MoA) 아키텍처의 핵심 아이디어는?';

UPDATE questions SET explanation = 'MCP(Model Context Protocol)는 Anthropic이 2024년 11월 공개한 오픈 표준으로, AI 모델과 외부 도구·데이터 소스를 연결하는 통일된 인터페이스입니다. 기존에는 각 LLM·각 앱마다 도구 연동을 따로 구현해야 했지만, MCP는 USB-C처럼 한 번 만들면 모든 호환 클라이언트에서 쓸 수 있게 합니다. 파일시스템·DB·Slack·GitHub 등을 MCP 서버로 노출하면 Claude Desktop·Cursor·Cline·Zed 등 MCP 클라이언트가 공통 프로토콜로 접근합니다. AI 에이전트의 통합 인프라로 빠르게 자리 잡고 있습니다.'
WHERE content = '모델 컨텍스트 프로토콜(MCP, Model Context Protocol)의 역할은?';

COMMIT;

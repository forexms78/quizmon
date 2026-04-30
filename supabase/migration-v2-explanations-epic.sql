-- v2: Epic 난이도 해설 보강
BEGIN;

UPDATE questions SET explanation = '셀프 어텐션의 Q, K, V는 도서관 검색 시스템의 비유로 이해하면 쉽습니다. Q(Query)는 "내가 찾고 싶은 것"(검색어), K(Key)는 "각 책의 제목·태그"(색인), V(Value)는 "책의 실제 내용"(반환값)입니다. 모델이 Q와 모든 K의 유사도를 계산해 어떤 책이 관련 있는지 점수를 매기고, 그 점수로 V를 가중합해 결과를 만듭니다. 수식 softmax(QK^T/√d)V에서 √d로 나누는 것은 큰 차원에서 점수가 너무 커지는 것을 막아 그래디언트를 안정화하기 위함입니다.'
WHERE content = 'Transformer의 Self-Attention에서 Query, Key, Value의 역할을 바르게 설명한 것은?';

UPDATE questions SET explanation = 'BERT와 GPT는 같은 트랜스포머 기반이지만 학습 방식과 구조가 정반대입니다. BERT는 인코더만 사용해 [MASK] 토큰의 양쪽 문맥을 모두 보고 예측합니다(양방향). 분류·요약·QA 같은 이해 태스크에 강합니다. GPT는 디코더만 사용해 다음 토큰을 예측하므로 왼쪽 문맥만 봅니다(단방향). 텍스트 생성에 강하며 ChatGPT의 기반입니다. "BERT는 이해, GPT는 생성"이 외우기 쉬운 요약입니다.'
WHERE content = 'BERT와 GPT의 근본적인 차이는?';

UPDATE questions SET explanation = 'Diffusion 모델은 깨끗한 이미지에 노이즈를 점진적으로 추가하는 forward process와, 노이즈에서 원본을 복원하는 reverse process로 구성됩니다. Forward는 t=0(원본)에서 t=T(완전 노이즈)까지 가우시안 노이즈를 단계적으로 더하는 고정된 과정으로 학습이 필요 없습니다. Reverse(노이즈에서 이미지 복원)는 신경망이 학습해야 하며, 이것이 모델의 "생성 능력"입니다. Stable Diffusion·DALL-E·Midjourney의 기반 원리입니다.'
WHERE content = 'Diffusion Model의 forward process란?';

UPDATE questions SET explanation = 'LoRA는 큰 모델 W의 가중치를 직접 수정하는 대신, 작은 변화량 ΔW만 학습하는 방식입니다. ΔW를 두 작은 행렬의 곱(A: d×r, B: r×k, r은 8~64로 매우 작음)으로 분해하면 파라미터 수가 99% 이상 줄어듭니다. 70B 모델 전체를 파인튜닝하려면 수백 GB 메모리가 필요하지만 LoRA는 1~2% 파라미터만 학습해 단일 GPU로 가능합니다. 추론 시에는 W + AB를 하나로 합쳐 속도 손실이 없으며, 이미지·언어·코드 LLM에 모두 적용 가능한 PEFT의 표준입니다.'
WHERE content = 'LoRA(Low-Rank Adaptation)의 핵심 아이디어는?';

UPDATE questions SET explanation = 'GPU 연산 속도와 메모리(HBM) 대역폭 사이에는 큰 격차가 있어, 어텐션 같은 연산은 대부분 메모리 I/O에 시간을 소비합니다. Flash Attention은 어텐션 행렬 전체를 HBM에 저장하지 않고, 빠른 SRAM에서 블록 단위로 계산해 HBM 접근을 최소화합니다. 결과적으로 동일한 수학적 결과를 2~4배 빠르게, 메모리도 선형 복잡도로 계산합니다. GPT-4·Claude 같은 대형 LLM 학습·추론의 표준이며, 긴 컨텍스트(100k+ 토큰)를 가능하게 한 핵심 기술입니다.'
WHERE content = 'Flash Attention이 표준 Attention보다 빠른 이유는?';

UPDATE questions SET explanation = 'CoT는 "단계별로 생각해보자"처럼 모델이 중간 추론 과정을 명시적으로 출력하게 유도하는 프롬프트입니다. LLM은 다음 토큰 예측으로 학습되므로, 추론 단계를 토큰으로 풀어 쓰면 더 많은 연산을 거쳐 복잡한 문제를 풀 수 있게 됩니다. 수학·논리 문제에서 정확도가 크게 향상되며, 특히 큰 모델에서 효과가 두드러집니다. Few-shot 예시에 추론 과정을 포함하거나 "단계별로 풀어봐"만 추가해도 됩니다. o1·DeepSeek-R1은 이를 학습 단계에 내재화한 모델입니다.'
WHERE content = 'Chain-of-Thought (CoT) 프롬프팅이 효과적인 이유는?';

UPDATE questions SET explanation = 'RLHF(인간 피드백 강화학습)는 ChatGPT를 가능하게 한 핵심 기법으로 3단계로 구성됩니다. (1) SFT(Supervised Fine-Tuning): 인간이 작성한 좋은 답변으로 일반 파인튜닝. (2) Reward Model: 인간이 두 답변 중 더 나은 것을 고른 데이터로, "좋은 답변에 높은 점수"를 주는 보상 모델 학습. (3) PPO(Proximal Policy Optimization): 보상 모델의 점수를 최대화하도록 LLM을 강화학습으로 미세 조정. 이 파이프라인이 단순 토큰 예측 모델을 도움 되고 안전한 어시스턴트로 변모시킵니다.'
WHERE content = 'RLHF(인간 피드백 강화학습)의 3단계 순서는?';

UPDATE questions SET explanation = 'ViT는 이미지를 16×16 패치로 잘라 각 패치를 시퀀스의 한 토큰처럼 다루는 혁신적 접근입니다. CNN이 합성곱과 풀링으로 지역적 특징을 단계적으로 추출하는 것과 달리, ViT는 트랜스포머로 모든 패치 간 관계를 한 번에 계산해 전역 의존성을 직접 학습합니다. 충분한 데이터(JFT-300M 같은 대규모)에서 CNN을 능가하지만, 데이터가 적으면 CNN보다 약합니다. CLIP·SAM 같은 비전 파운데이션 모델과 멀티모달 LLM의 기반이 되었습니다.'
WHERE content = 'Vision Transformer(ViT)가 CNN과 다른 핵심 점은?';

UPDATE questions SET explanation = 'MoE는 모델 안에 여러 전문가(작은 FFN 네트워크)와 각 입력을 어떤 전문가에게 보낼지 결정하는 라우터를 둡니다. 각 토큰은 전체 전문가 중 Top-K(보통 2~8개)만 활성화되어 계산되므로, 총 파라미터는 매우 크지만 실제 연산량은 작은 모델 수준입니다. 결과적으로 "용량은 크고 연산은 적은" 효율적 구조가 됩니다. Mixtral·DeepSeek-V3·GPT-4(추정)가 MoE 구조이며, 전문가들이 자연스럽게 다른 종류의 토큰에 특화됩니다.'
WHERE content = 'Mixture of Experts(MoE)의 주요 장점은?';

UPDATE questions SET explanation = '대조 학습은 "비슷한 것은 가깝게, 다른 것은 멀게"를 학습 목표로 삼습니다. 같은 이미지의 두 변형(다른 크롭·색상)은 양성 쌍으로 가깝게, 다른 이미지는 음성 쌍으로 멀게 임베딩합니다. 레이블 없이도 풍부한 표현을 배울 수 있어 자기지도 학습의 핵심이 되었습니다. SimCLR·MoCo·BYOL이 비전, CLIP이 비전-언어 정렬, SimCSE가 문장 임베딩에 적용한 사례입니다. 학습된 표현은 후속 태스크 파인튜닝에서 큰 성능 향상을 줍니다.'
WHERE content = 'Contrastive Learning의 핵심 아이디어는?';

UPDATE questions SET explanation = '멀티헤드 어텐션은 어텐션 연산을 한 번이 아니라 여러 헤드(보통 8~64개)로 나눠 병렬 수행한 뒤 결과를 합치는 구조입니다. 각 헤드는 다른 표현 부공간으로 Q·K·V를 투영해, 어떤 헤드는 구문 관계, 어떤 헤드는 동일 지시 관계, 어떤 헤드는 위치 관계를 잡는 식으로 다양한 패턴을 동시에 학습합니다. 단일 어텐션보다 풍부한 표현이 가능하며, 헤드별 어텐션 패턴 분석은 모델 해석 가능성 연구의 단서가 됩니다.'
WHERE content = '트랜스포머에서 멀티헤드 어텐션(Multi-Head Attention)의 이점은?';

UPDATE questions SET explanation = 'In-Context Learning(ICL)은 GPT-3가 발견한 창발적 능력으로, 프롬프트에 몇 개의 예시(Few-shot)만 보여주면 모델이 그 패턴을 따라 새 입력에 답하는 현상입니다. 가중치 업데이트 없이(파인튜닝 없이) 이루어지는 학습이라는 점이 혁신이었습니다. "한국어→영어 번역" 예시 3개를 보여주면 새 한국어 문장도 번역하는 식이죠. 일반 ML에서는 불가능했던 즉각적 태스크 적응이 가능해져, 프롬프트 엔지니어링이 새로운 분야로 등장했습니다.'
WHERE content = 'LLM의 인컨텍스트 학습(In-Context Learning)이란?';

UPDATE questions SET explanation = '기존 Diffusion 모델은 픽셀 공간(예: 512×512×3=786,432차원)에서 직접 노이즈를 다루므로 매우 느리고 메모리를 많이 씁니다. Stable Diffusion(LDM)은 VAE 인코더로 이미지를 64×64×4=16,384차원 잠재 공간으로 압축한 뒤 그 안에서 확산을 수행합니다. 차원이 50배 줄어 GPU 한 장에서도 고해상도 생성이 가능해졌습니다. 디코더가 잠재값을 다시 픽셀로 복원하며, 이 구조 덕에 텍스트 조건 이미지 생성이 대중화되었습니다.'
WHERE content = 'Stable Diffusion의 잠재 확산(Latent Diffusion)이 기존 확산 모델과 다른 점은?';

UPDATE questions SET explanation = 'LLM은 자기회귀 방식으로 토큰을 하나씩 생성하는데, 매 토큰마다 이전 모든 토큰의 K, V를 다시 계산하면 시퀀스 길이 n에 대해 O(n²) 복잡도가 됩니다. KV 캐시는 이전 토큰의 K, V를 메모리에 저장해두고 새 토큰 생성 시 재사용해 O(n)으로 줄입니다. 1000 토큰 문장 생성 시 약 1000배 빨라지는 효과입니다. 단점은 메모리 사용이 길이에 비례해 증가하는 것이며, vLLM의 PagedAttention이 메모리 단편화 문제를 해결합니다.'
WHERE content = 'KV 캐시(KV Cache)가 LLM 추론에서 중요한 이유는?';

UPDATE questions SET explanation = '파운데이션 모델은 2021년 Stanford에서 제안된 용어로, 대규모 데이터로 사전학습되어 다양한 다운스트림 태스크에 적응 가능한 모델을 가리킵니다. GPT, BERT, CLIP, DINOv2가 대표적이며, 한 번 사전학습된 모델을 번역·요약·분류·코딩 등 수많은 태스크에 파인튜닝 또는 프롬프팅으로 활용합니다. 기존처럼 태스크마다 모델을 처음부터 만드는 패러다임을 바꿨고, 현재 AI 산업의 핵심 빌딩 블록입니다. "Foundation"은 다른 모델·앱이 그 위에 세워진다는 의미입니다.'
WHERE content = '파운데이션 모델(Foundation Model)의 특징은?';

UPDATE questions SET explanation = 'Zero-shot은 예시 없이 태스크 설명만 주고 결과를 요청하는 방식("이 문장의 감성을 분류해줘"). Few-shot은 입출력 예시 몇 개를 먼저 보여준 뒤 새 입력을 주는 방식("긍정: 좋아요. 부정: 싫어요. 분류해줘: 별로네"). Few-shot은 모델이 패턴을 추론할 단서가 많아 복잡한 태스크에서 성능이 크게 오릅니다. 예시 선택·순서가 결과에 영향을 주며, 1-shot은 단 한 개 예시, k-shot은 k개를 의미합니다.'
WHERE content = '프롬프트 엔지니어링에서 Few-shot과 Zero-shot의 차이는?';

UPDATE questions SET explanation = '토큰은 LLM이 텍스트를 처리하는 최소 단위로, 단어보다 작거나 클 수 있습니다. GPT 계열은 BPE(Byte-Pair Encoding) 토크나이저를 써서 자주 등장하는 서브워드 단위로 자릅니다. "unhappiness"는 ["un", "happy", "ness"] 3토큰, 영어 평균 약 4글자가 1토큰입니다. 한국어는 자모 단위로 잘려 같은 의미라도 영어보다 2~3배 토큰이 많아 비용이 더 듭니다. API 비용·컨텍스트 윈도우 모두 토큰 단위로 계산되므로 실무에 중요한 개념입니다.'
WHERE content = 'LLM에서 토큰(Token)이란?';

UPDATE questions SET explanation = 'RAG는 LLM이 답변하기 전에 외부 지식 베이스에서 관련 문서를 검색해 컨텍스트에 추가하는 패턴입니다. 사용자 질문을 임베딩한 뒤 벡터 DB에서 의미적으로 유사한 문서를 찾고, 그 문서를 프롬프트에 넣어 LLM이 사실 기반으로 답하게 합니다. 환각(없는 사실 지어내기)을 줄이고, 사내 문서·최신 정보처럼 LLM이 학습하지 않은 내용도 활용 가능합니다. ChatGPT의 웹 검색, Notion AI, 사내 검색 챗봇이 모두 RAG 기반입니다.'
WHERE content = 'RAG(Retrieval-Augmented Generation)의 핵심 아이디어는?';

UPDATE questions SET explanation = '지식 증류는 큰 교사 모델(Teacher)의 출력 확률 분포(소프트 레이블)를 작은 학생 모델(Student)이 따라 하도록 학습시키는 기법입니다. 하드 레이블(정답 1, 나머지 0)은 정보가 빈약하지만, 소프트 레이블(고양이 0.7, 강아지 0.2, 호랑이 0.1)에는 클래스 간 유사성이라는 풍부한 정보(다크 지식)가 담깁니다. DistilBERT는 BERT의 60% 크기로 97% 성능을 유지했고, MobileNet·TinyBERT·LLaMA 양자화 변형 등 모바일·엣지 배포에 핵심 기법입니다.'
WHERE content = '모델 증류(Knowledge Distillation)란?';

UPDATE questions SET explanation = 'ReAct는 LLM이 (1) 생각(Thought): 다음 무엇을 할지 추론, (2) 행동(Action): 도구 호출(검색·계산·코드 실행 등), (3) 관찰(Observation): 결과 확인을 반복하며 복잡한 태스크를 해결하는 프레임워크입니다. "에펠탑 높이를 미터에서 피트로 환산"이라면 검색→결과 받기→계산기 호출→최종 답변 식으로 진행됩니다. 단순 CoT보다 외부 정보·연산을 활용해 정확도가 크게 향상되며, AutoGPT·LangChain·OpenAI Function Calling의 사상적 기반입니다.'
WHERE content = 'AI 에이전트(AI Agent)에서 ReAct 프레임워크란?';

UPDATE questions SET explanation = '컨텍스트 윈도우는 LLM이 한 번의 입력으로 처리할 수 있는 최대 토큰 수입니다. 윈도우가 클수록 긴 문서 요약·코드베이스 전체 분석·다중 턴 대화 유지가 가능합니다. GPT-4 Turbo는 128k(약 96k 단어, 책 한 권), Claude는 200k, Gemini는 2M까지 지원합니다. 단, 윈도우가 커도 실제로 모든 정보를 효과적으로 활용하지 못하는 "Lost in the Middle" 현상이 있습니다. 어텐션 복잡도가 길이에 따라 제곱으로 증가해 비용도 함께 늘어납니다.'
WHERE content = '컨텍스트 윈도우(Context Window) 크기가 중요한 이유는?';

UPDATE questions SET explanation = '멀티모달 모델은 텍스트·이미지·오디오·비디오 등 서로 다른 형태의 데이터를 함께 처리하는 모델입니다. 입력을 공통 임베딩 공간에 투영해 모달리티 간 의미 연결을 학습합니다. GPT-4V, Gemini, Claude 3는 이미지+텍스트로 차트 해석·시각적 질문 답변·UI 분석이 가능하고, Whisper는 음성→텍스트, DALL-E·Stable Diffusion은 텍스트→이미지를 생성합니다. 사람이 여러 감각으로 세상을 이해하듯, 멀티모달이 AGI로 가는 길의 핵심으로 여겨집니다.'
WHERE content = '멀티모달(Multimodal) AI 모델이란?';

UPDATE questions SET explanation = '환각은 LLM이 사실이 아닌 내용을 매우 그럴듯한 어조로 만들어내는 현상입니다. 학습 목표가 "다음 토큰 확률 최대화"이지 "진실 보장"이 아니므로, 모델은 훈련 데이터 분포에 맞는 유창한 텍스트를 생성할 뿐 사실성은 부수적입니다. 존재하지 않는 논문 인용, 잘못된 API, 가상의 역사적 사실이 흔한 예입니다. 완화책은 RAG(외부 지식 활용), RLHF(사실성 보상), 자체 검증 프롬프트, 출력 후 팩트체크 단계 추가입니다. 의료·법률·금융처럼 정확성이 중요한 분야에서는 인간 검증이 필수입니다.'
WHERE content = 'AI 환각(Hallucination) 문제란?';

UPDATE questions SET explanation = '벡터 DB는 임베딩 벡터(의미를 담은 숫자 배열)에 대한 유사도 검색에 특화된 데이터베이스입니다. 일반 SQL DB는 정확 일치 검색은 잘하지만 "의미가 비슷한 문서"는 못 찾습니다. 벡터 DB는 HNSW·IVF 같은 ANN(근사 최근접 이웃) 인덱스로 수백만 벡터에서 ms 단위 검색을 지원합니다. Pinecone·Weaviate·Chroma·Qdrant·pgvector가 대표적이며, RAG·추천 시스템·이미지 검색·이상 탐지의 핵심 인프라입니다.'
WHERE content = '벡터 데이터베이스(Vector Database)가 AI 애플리케이션에서 중요한 이유는?';

UPDATE questions SET explanation = '데이터 증강은 학습 시 다양한 입력을 만들어 일반화를 돕는 기법으로, 추론과는 무관합니다. 추론 최적화는 이미 학습된 모델을 더 빠르고 적은 메모리로 실행하는 게 목표입니다. 대표 기법은 (1) 양자화(FP32→INT8), (2) 프루닝(불필요한 가중치 제거), (3) 지식 증류(작은 학생 모델 학습), (4) 배치 처리(처리량 증가), (5) KV 캐시(LLM 자기회귀 가속), (6) 컴파일 최적화(TensorRT, ONNX) 등입니다. 실무에서는 여러 기법을 조합해 사용합니다.'
WHERE content = 'AI 모델의 추론(Inference) 최적화 기법으로 옳지 않은 것은?';

UPDATE questions SET explanation = '모델 드리프트는 시간이 지나면서 모델 성능이 떨어지는 현상으로, 두 종류가 있습니다. (1) 데이터 드리프트: 입력 분포가 변함(예: 코로나 이후 검색 패턴 변화) — PSI·KL divergence로 입력 통계 비교. (2) 컨셉 드리프트: 입력은 같아도 정답이 바뀜(스팸 트렌드 변화) — 예측-실제 일치율을 모니터링합니다. Evidently·WhyLabs·Arize 같은 도구가 자동 감지를 지원하며, 드리프트 발견 시 재학습이나 데이터 수집 전략 조정이 필요합니다.'
WHERE content = 'MLOps에서 모델 드리프트(Model Drift)를 감지하는 방법은?';

UPDATE questions SET explanation = 'Feature Store는 ML 피처를 중앙 관리하는 시스템으로 두 가지 핵심 문제를 해결합니다. (1) 학습-서빙 불일치(training-serving skew): 학습 시 배치로 만든 피처와 서빙 시 실시간 계산한 피처가 미묘하게 달라 성능이 떨어지는 문제 — 동일 정의로 두 환경에 일관되게 제공합니다. (2) 피처 중복 개발: 여러 팀이 같은 피처를 따로 만드는 비효율 — 공유 카탈로그로 재사용을 촉진합니다. Feast·Tecton·Vertex AI Feature Store가 대표적입니다.'
WHERE content = '피처 스토어(Feature Store)가 해결하는 문제는?';

UPDATE questions SET explanation = '온라인 추론은 사용자 요청마다 즉시 예측하는 방식으로 낮은 지연(<100ms)이 중요합니다 — 챗봇·실시간 추천·결제 사기 탐지가 해당. 배치 추론은 다수의 데이터를 한꺼번에 처리해 처리량을 극대화하는 방식 — 야간 일괄 추천·이메일 마케팅·리포트 생성에 적합합니다. 선택 기준은 응답 속도 vs 처리량입니다. 실제 시스템은 둘을 혼합해, 자주 쓰는 결과는 배치로 미리 계산해두고 실시간 요청은 캐시 + 폴백으로 처리합니다.'
WHERE content = '온라인 추론(Online Inference)과 배치 추론(Batch Inference) 중 선택 기준은?';

UPDATE questions SET explanation = '카나리 배포는 신규 모델을 전체 트래픽이 아닌 일부(예: 5%)에만 보내 실전 데이터로 검증하는 전략입니다. 작은 트래픽으로 KPI(클릭률·전환율·에러율)를 모니터링하다가 문제가 없으면 점진적으로 비율을 늘립니다. 문제가 발견되면 즉시 100% 이전 모델로 롤백 가능해 위험을 격리합니다. Shadow 모드(실제 반영 없이 예측만 기록)와 함께 쓰면 사용자 영향 없이도 비교 가능하며, ML 모델은 오프라인 지표가 좋아도 실전에서 다를 수 있어 카나리가 표준이 되어가고 있습니다.'
WHERE content = '카나리 배포(Canary Deployment)를 ML 모델에 적용하는 이유는?';

UPDATE questions SET explanation = 'HNSW(Hierarchical Navigable Small World)는 그래프 기반 ANN(근사 최근접 이웃) 인덱스입니다. 여러 레이어의 그래프를 쌓아 상위는 멀리 점프하고, 하위로 갈수록 정밀하게 좁혀가는 구조라 O(log n) 시간에 검색이 가능합니다. 정확도(recall)와 속도의 트레이드오프를 ef·M 파라미터로 조정하며, 수백만~수십억 벡터에 대한 ms 단위 검색을 지원합니다. Pinecone·Weaviate·pgvector·FAISS 등 대부분의 벡터 DB가 HNSW를 핵심 알고리즘으로 채택합니다.'
WHERE content = '벡터 인덱스(Vector Index) 알고리즘 중 HNSW의 특징은?';

UPDATE questions SET explanation = '데이터 병렬은 모델 복사본을 여러 GPU에 두고 데이터를 나눠 동시에 계산한 뒤 그래디언트를 평균합니다 — 모델이 단일 GPU 메모리에 들어갈 때 사용하며 PyTorch DDP가 표준. 모델 병렬은 모델이 너무 커서 한 GPU에 안 들어갈 때 레이어를 GPU별로 분할합니다. GPT-4 같은 거대 모델은 텐서 병렬(레이어 안 쪼개기), 파이프라인 병렬(레이어 단위 분할), 데이터 병렬을 동시에 적용하는 3D 병렬화가 표준이며, Megatron·DeepSpeed가 이런 스택을 제공합니다.'
WHERE content = '분산 훈련에서 데이터 병렬(Data Parallel)과 모델 병렬(Model Parallel)의 차이는?';

UPDATE questions SET explanation = 'LLM 서빙에서 사용자 요청마다 입력·출력 길이가 천차만별이라 정적 배치는 비효율적입니다. 짧은 요청이 끝나도 가장 긴 요청이 끝날 때까지 GPU가 놀게 됩니다. Continuous Batching은 한 시퀀스가 끝나는 즉시 새 요청을 그 자리에 끼워 넣어 GPU를 항상 가득 채웁니다. vLLM의 PagedAttention(가상 메모리 식 KV 캐시 관리)과 결합해 처리량을 최대 23배 향상시켰고, 현재 LLM 서빙의 표준 기법입니다.'
WHERE content = 'LLM 서빙에서 Continuous Batching이 중요한 이유는?';

UPDATE questions SET explanation = 'ML 재현성은 누군가 같은 코드로 같은 데이터에 같은 환경에서 같은 결과를 얻을 수 있어야 한다는 원칙입니다. 의존성 버전이 환경마다 다르면 같은 코드도 다른 결과를 내므로 재현성이 깨집니다. 보장 방법은 (1) 코드 버전 관리(Git), (2) 데이터 버전 관리(DVC, Delta Lake), (3) 환경 컨테이너화(Docker, requirements.txt 고정), (4) 시드 고정, (5) 실험 추적(MLflow, W&B). 이 중 하나라도 빠지면 결과가 달라질 수 있어 ML 협업의 큰 골칫거리입니다.'
WHERE content = 'ML 모델의 재현성(Reproducibility)을 보장하는 방법으로 옳지 않은 것은?';

COMMIT;

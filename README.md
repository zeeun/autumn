# 🍂 어텀인남산 파티룸 AI 어시스턴트

Next.js + OpenAI GPT로 만든 **어텀인남산 파티룸 전용** AI 고객서비스 어시스턴트입니다.

## ✨ 주요 기능

- 🤖 **OpenAI GPT-3.5 Turbo**: 자연스러운 대화형 고객 서비스
- 🏠 **파티룸 전문**: 예약, 체크인/아웃, 시설, 요금 등 모든 정보 제공
- 📱 **완전 반응형**: 모바일, 태블릿, 데스크톱 최적화
- ⚡ **빠른 응답**: 실시간 채팅 인터페이스
- 🎯 **원클릭 질문**: 자주 묻는 질문 버튼으로 빠른 문의

## 🎭 AI 어시스턴트 전문 영역

### 📋 예약 관련

- 네이버 예약, 에어비앤비, 스페이스클라우드 예약 안내
- 예약 변경/취소 정책 설명
- 인원 추가 및 요금 안내

### 🕐 체크인/체크아웃

- 기본 시간: 17시 입실 / 09시 퇴실
- 얼리 체크인 (15시): 25,000원
- 레이트 체크아웃 (11시): 25,000원
- 전날 저녁 최종 확정 안내

### 🏠 시설 및 서비스

- 스탠바이미 TV, 빔프로젝터
- 넷플릭스 계정 제공 및 로그인 지원
- 추가 침구 서비스 (25,000원)
- 주차 안내 (공영주차장)

### 🎁 이벤트 및 혜택

- 네이버/블로그 리뷰 페이백 이벤트
- 플랫폼별 차별화된 혜택 안내

## 🚀 설치 및 실행

### 1. 저장소 클론

```bash
git clone <repository-url>
cd autumn-chatbot
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 OpenAI API 키를 설정하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**OpenAI API 키 발급 방법:**

1. [OpenAI Platform](https://platform.openai.com/api-keys)에 로그인
2. "Create new secret key" 클릭
3. 생성된 키 복사 (sk-로 시작)

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어서 확인하세요!

## 📂 프로젝트 구조

```
autumn-chatbot/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts    # OpenAI API 라우트
│   │   ├── layout.tsx           # 레이아웃 및 메타데이터
│   │   ├── page.tsx             # 메인 페이지
│   │   └── globals.css          # 글로벌 스타일
│   └── components/
│       └── ChatInterface.tsx    # 채팅 인터페이스 컴포넌트
├── public/                      # 정적 파일들
├── package.json
├── tailwind.config.ts           # Tailwind CSS 설정
└── tsconfig.json               # TypeScript 설정
```

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-3.5 Turbo
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Deployment**: Vercel (권장)

## 💰 OpenAI API 사용 비용

- **GPT-3.5 Turbo**: 매우 저렴 (대화당 약 $0.002)
- **신규 사용자**: $5 무료 크레딧 제공
- **일반적인 사용**: 월 $1-3 정도

## 🎨 UI/UX 특징

- **그라데이션 디자인**: 가을 느낌의 보라/파랑 그라데이션
- **직관적인 버튼**: 자주 묻는 질문을 원클릭으로 해결
- **실시간 피드백**: 타이핑 인디케이터와 로딩 상태
- **카카오톡 스타일**: 친숙한 채팅 인터페이스
- **반응형 디자인**: 모든 기기에서 완벽 작동

## 🚀 배포하기

### Vercel 배포 (추천)

1. [Vercel](https://vercel.com)에 로그인
2. GitHub 저장소 연결
3. 환경 변수 `OPENAI_API_KEY` 설정
4. 자동 배포 완료!

### 다른 플랫폼

- **Netlify**: 정적 사이트 호스팅
- **Railway**: 풀스택 앱 호스팅
- **Heroku**: 컨테이너 기반 배포

## 🔧 커스터마이징

### AI 페르소나 수정

`src/app/api/chat/route.ts`의 `SYSTEM_PROMPT`를 수정하여 AI의 성격과 응답 스타일을 변경할 수 있습니다.

### 빠른 액션 버튼 변경

`src/components/ChatInterface.tsx`의 `quickActions` 배열을 수정하여 버튼을 추가/제거할 수 있습니다.

### 디자인 테마 변경

Tailwind CSS 클래스를 수정하여 색상 테마를 변경할 수 있습니다.

## 🐛 트러블슈팅

### OpenAI API 키 오류

```
Error: OpenAI API key not configured
```

→ `.env.local` 파일에 `OPENAI_API_KEY`가 올바르게 설정되었는지 확인

### 빌드 오류

```bash
# 캐시 클리어 후 재빌드
rm -rf .next
npm run build
```

### 타입스크립트 오류

```bash
# 타입 체크
npm run type-check
```

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

🍂 **어텀인남산 파티룸과 함께 완벽한 고객 서비스를 제공하세요!**

# 🍂 어텀인남산 챗봇

모바일과 웹에서 모두 사용할 수 있는 Dialogflow 기반 AI 챗봇입니다.

## ✨ 주요 기능

- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 UI
- 🌙 **다크모드 지원**: 시스템 설정에 따라 자동으로 다크모드 적용
- 🚀 **PWA 준비**: Progressive Web App 기능 지원 (추후 확장 가능)
- 🎨 **모던 UI**: 그라데이션 배경과 글래스모피즘 디자인
- ♿ **접근성**: 스크린 리더 및 키보드 네비게이션 지원

## 🚀 사용 방법

### 1. 로컬에서 실행

```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/autumnQ-A.git

# 폴더 이동
cd autumnQ-A

# 웹 서버 실행 (Python 사용 시)
python -m http.server 8000

# 또는 Node.js 사용 시
npx http-server
```

### 2. GitHub Pages로 배포

1. GitHub에서 저장소의 `Settings` > `Pages` 이동
2. Source를 `Deploy from a branch` 선택
3. Branch를 `main`으로 선택
4. 배포된 URL로 접속

## 📂 파일 구조

```
autumnQ&A/
├── index.html          # 메인 HTML 파일
├── sw.js              # 서비스 워커 (PWA 지원)
├── manifest.json      # PWA 매니페스트
├── README.md          # 프로젝트 설명
└── .gitignore         # Git 무시 파일
```

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript
- **Chatbot**: Google Dialogflow
- **Design**: CSS Grid, Flexbox, Media Queries
- **Features**: Service Worker, PWA Ready

## 📱 모바일 최적화

- viewport 메타태그로 모바일 화면 최적화
- 터치 친화적인 인터페이스
- 다양한 화면 크기에 맞는 반응형 레이아웃
- 모바일 브라우저 성능 최적화

## 🎨 UI/UX 특징

- **그라데이션 배경**: 시각적 매력도 향상
- **글래스모피즘**: 반투명 효과로 모던한 느낌
- **부드러운 애니메이션**: 사용자 경험 개선
- **한국어 최적화**: 한글 폰트 및 콘텐츠

## 🔧 커스터마이징

### Dialogflow Agent ID 변경

```html
<df-messenger agent-id="YOUR_AGENT_ID" ...></df-messenger>
```

### 색상 테마 변경

CSS 변수를 수정하여 색상 테마를 변경할 수 있습니다:

```css
df-messenger {
  --df-messenger-bot-message: #your-color;
  --df-messenger-button-titlebar-color: #your-color;
  --df-messenger-send-icon: #your-color;
}
```

## 🌐 배포 옵션

1. **GitHub Pages** (추천)
2. **Netlify**
3. **Vercel**
4. **Firebase Hosting**

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

---

💬 **문의사항이 있으시면 Issues를 통해 연락해주세요!**

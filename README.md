# 📝 HTML 블로그

Giscus 댓글 시스템이 통합된 모던한 정적 블로그입니다.

## ✨ 주요 기능

- 🎨 **다크/라이트 모드**: 자동 테마 전환 지원
- 💬 **Giscus 댓글**: GitHub Discussions 기반 댓글 시스템
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- ✍️ **마크다운 지원**: 간편한 포스트 작성
- 🚀 **빠른 로딩**: 정적 파일로 구성되어 빠른 로딩 속도
- 🎯 **SEO 친화적**: 시맨틱 HTML 구조

## 📁 프로젝트 구조

```
blog/
├── index.html          # 메인 페이지
├── post.html           # 포스트 상세 페이지
├── css/
│   ├── style.css       # 메인 스타일
│   └── post.css        # 포스트 페이지 스타일
├── js/
│   ├── main.js         # 메인 페이지 로직
│   ├── post-loader.js  # 포스트 로더 및 Giscus 설정
│   └── theme.js        # 테마 전환 기능
├── posts/
│   ├── welcome.md      # 샘플 포스트 1
│   ├── markdown-guide.md    # 샘플 포스트 2
│   └── giscus-setup.md      # 샘플 포스트 3
├── docs/
│   └── PLAN.md         # Giscus 설정 가이드
└── README.md           # 이 파일
```

## 🚀 빠른 시작

### 1. 저장소 클론 또는 다운로드

```bash
git clone https://github.com/YOUR_USERNAME/blog.git
cd blog
```

### 2. 브라우저에서 열기

`index.html` 파일을 브라우저에서 열어보세요.

또는 간단한 로컬 서버를 실행할 수 있습니다:

```bash
# Python 3가 설치되어 있다면
python -m http.server 8000

# Node.js가 설치되어 있다면
npx serve
```

그 다음 브라우저에서 `http://localhost:8000`으로 접속하세요.

### 3. Giscus 댓글 시스템 설정

댓글 시스템을 활성화하려면 `docs/PLAN.md` 파일의 지침을 따르세요.

간단 요약:
1. GitHub Discussions 활성화
2. Giscus 앱 설치
3. `js/post-loader.js` 파일에서 다음 값 수정:
   - `data-repo`
   - `data-repo-id`
   - `data-category-id`

자세한 내용은 [PLAN.md](docs/PLAN.md)를 참고하세요.

## ✍️ 새 포스트 작성하기

### 1단계: 마크다운 파일 생성

`posts/` 폴더에 새 마크다운 파일을 만듭니다.

예: `posts/my-new-post.md`

```markdown
# 내 새로운 포스트 제목

여기에 포스트 내용을 작성합니다...
```

### 2단계: 메타데이터 추가

`js/main.js` 파일의 `posts` 배열에 새 포스트 정보를 추가합니다:

```javascript
const posts = [
    // 기존 포스트들...
    {
        id: 'my-new-post',  // 파일명과 동일하게
        title: '내 새로운 포스트 제목',
        date: '2025-10-29',
        excerpt: '포스트에 대한 간단한 설명',
        tags: ['태그1', '태그2']
    }
];
```

### 3단계: post-loader.js에도 추가

`js/post-loader.js` 파일의 `getPostMeta()` 함수 내 `posts` 배열에도 동일한 메타데이터를 추가합니다.

### 완료!

이제 메인 페이지에서 새 포스트를 확인할 수 있습니다.

## 🎨 커스터마이징

### 색상 테마 변경

`css/style.css` 파일의 `:root` 섹션에서 CSS 변수를 수정하세요:

```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #1a1a1a;
    --accent-color: #3b82f6;
    /* ... */
}
```

### 블로그 제목 변경

`index.html`과 `post.html` 파일에서 다음 부분을 수정하세요:

```html
<h1 class="logo"><a href="index.html">내 블로그</a></h1>
```

## 🌐 GitHub Pages에 배포하기

### 1. GitHub 저장소 생성

`YOUR_USERNAME.github.io` 형식의 저장소를 만듭니다.

### 2. 코드 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

### 3. GitHub Pages 설정

1. 저장소 **Settings** 탭으로 이동
2. **Pages** 메뉴 선택
3. **Source**를 `main` 브랜치로 설정
4. **Save** 클릭

몇 분 후 `https://YOUR_USERNAME.github.io`에서 블로그를 확인할 수 있습니다!

## 🛠 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: CSS 변수, Flexbox, Grid
- **JavaScript**: Vanilla JS (프레임워크 없음)
- **Marked.js**: 마크다운 파싱 라이브러리
- **Giscus**: GitHub Discussions 기반 댓글 시스템

## 📝 라이선스

이 프로젝트는 자유롭게 사용, 수정, 배포할 수 있습니다.

## 🙋‍♂️ 도움이 필요하신가요?

- 샘플 포스트: [마크다운 작성 가이드](posts/markdown-guide.md)
- Giscus 설정: [docs/PLAN.md](docs/PLAN.md)
- 블로그 포스트: [Giscus 설정하기](posts/giscus-setup.md)

---

Happy Blogging! 🎉


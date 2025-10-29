# Giscus 댓글 시스템 설정하기 💬

GitHub Discussions를 기반으로 한 Giscus 댓글 시스템을 블로그에 추가하는 방법을 알아봅니다.

## Giscus란?

Giscus는 GitHub Discussions를 이용한 댓글 시스템입니다. 다음과 같은 장점이 있습니다:

- ✅ **무료**: 완전히 무료로 사용 가능
- 🔒 **안전**: GitHub 계정으로 로그인
- 🎨 **커스터마이징**: 다양한 테마 지원
- 📱 **반응형**: 모바일 환경 지원
- 🌏 **다국어**: 한국어 포함 여러 언어 지원

## 설정 단계

### 1단계: GitHub Discussions 활성화

1. GitHub 저장소로 이동
2. **Settings** 탭 클릭
3. **Features** 섹션에서 **Discussions** 체크박스 활성화

![GitHub Discussions 활성화](https://docs.github.com/assets/cb-37296/images/help/discussions/enabling-or-disabling-github-discussions-for-a-repository.png)

### 2단계: Giscus 앱 설치

1. [https://github.com/apps/giscus](https://github.com/apps/giscus) 접속
2. **Install** 버튼 클릭
3. 설치할 저장소 선택
4. **Install** 클릭

### 3단계: Giscus 설정

1. [https://giscus.app/ko](https://giscus.app/ko) 접속
2. 저장소 입력: `username/repository`
3. 다음 정보 확인:
   - `data-repo-id`
   - `data-category-id`

#### 권장 설정

```javascript
페이지 ↔️ Discussions 매핑: pathname
Discussion 카테고리: General 또는 Announcements
기능: 메인 포스트에 반응 남기기 활성화
테마: preferred_color_scheme
```

### 4단계: 블로그에 적용

`js/post-loader.js` 파일의 `loadGiscus()` 함수를 수정합니다:

```javascript
function loadGiscus() {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    
    // 여기를 수정하세요!
    script.setAttribute('data-repo', 'username/repository');
    script.setAttribute('data-repo-id', 'YOUR_REPO_ID');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID');
    
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', getCurrentTheme());
    script.setAttribute('data-lang', 'ko');
    script.crossOrigin = 'anonymous';
    script.async = true;
    
    const container = document.getElementById('giscus-container');
    if (container) {
        container.innerHTML = '';
        container.appendChild(script);
    }
}
```

### 5단계: 배포

변경사항을 GitHub에 푸시합니다:

```bash
git add .
git commit -m "feat: Giscus 댓글 시스템 추가"
git push origin main
```

## 동작 확인

1. 블로그의 포스트 페이지로 이동
2. 페이지 하단에 댓글 섹션이 표시되는지 확인
3. GitHub 계정으로 로그인하여 댓글 작성 테스트

## 테마 자동 전환

이 블로그는 다크/라이트 모드 전환 시 Giscus 테마도 자동으로 변경됩니다.

이 기능은 `js/theme.js`의 `updateGiscusTheme()` 함수로 구현되어 있습니다:

```javascript
function updateGiscusTheme(theme) {
    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame) {
        const giscusTheme = theme === 'dark' ? 'dark' : 'light';
        giscusFrame.contentWindow.postMessage(
            { giscus: { setConfig: { theme: giscusTheme } } },
            'https://giscus.app'
        );
    }
}
```

## 문제 해결

### 댓글이 표시되지 않는 경우

1. **저장소가 Public인지 확인**: Giscus는 공개 저장소에서만 작동합니다
2. **Discussions 활성화 확인**: Settings에서 Discussions가 활성화되어 있는지 확인
3. **설정 정보 확인**: `data-repo-id`와 `data-category-id`가 올바른지 확인
4. **브라우저 콘솔 확인**: F12를 눌러 에러 메시지 확인

### 테마가 변경되지 않는 경우

- 페이지를 새로고침해보세요
- 브라우저 캐시를 지워보세요

## 추가 기능

### 반응 활성화

포스트에 이모지 반응을 남길 수 있습니다 (👍, ❤️, 🎉 등).

### 댓글 알림

GitHub 저장소를 Watch하면 새 댓글 알림을 받을 수 있습니다.

---

이제 블로그에 댓글 시스템이 완성되었습니다! 🎊

아래 댓글로 설정 과정에서 어려운 점이나 궁금한 점을 남겨주세요.


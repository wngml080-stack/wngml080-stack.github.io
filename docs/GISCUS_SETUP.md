# Giscus 댓글 시스템 완벽 설정 가이드

이 가이드는 블로그에 Giscus 댓글 시스템을 설정하는 전체 과정을 상세히 안내합니다.

## 📋 준비사항

- GitHub 계정
- GitHub 공개(Public) 저장소
- 저장소에 대한 관리자 권한

## 🔧 설정 과정

### 1단계: GitHub Discussions 활성화

1. GitHub에서 블로그 저장소로 이동 (예: `username/username.github.io`)
2. 상단의 **Settings** 탭 클릭
3. 아래로 스크롤하여 **Features** 섹션 찾기
4. **Discussions** 옆 체크박스 활성화
5. 페이지가 자동으로 저장됨

✅ **확인**: 저장소 상단에 **Discussions** 탭이 나타나면 성공!

### 2단계: Giscus 앱 설치

1. 브라우저에서 [https://github.com/apps/giscus](https://github.com/apps/giscus) 접속
2. 녹색 **Install** 버튼 클릭
3. **Install on my account** 선택
4. 저장소 선택 방법 선택:
   - **Only select repositories** 선택 (권장)
   - 드롭다운에서 블로그 저장소 선택
5. **Install** 버튼 클릭
6. 필요시 GitHub 비밀번호 입력

✅ **확인**: 설치가 완료되면 Giscus 앱 설정 페이지로 이동합니다.

### 3단계: Giscus 설정 정보 가져오기

1. [https://giscus.app/ko](https://giscus.app/ko) 접속
2. **저장소** 섹션에 저장소 입력:
   ```
   username/repository-name
   예: seungwonme/seungwonme.github.io
   ```
3. 저장소 이름을 입력하면 ✅ 또는 ❌ 표시가 나타남
   - ✅ 표시가 나타나면 정상
   - ❌ 표시가 나타나면 Discussions 활성화 또는 Giscus 앱 설치 확인

4. **페이지 ↔️ Discussions 매핑** 선택:
   - **`pathname`** 선택 (권장)
   - 이렇게 하면 URL 경로를 기반으로 댓글이 매핑됩니다

5. **Discussion 카테고리** 선택:
   - **General** 또는 **Announcements** 선택
   - General: 일반 토론용
   - Announcements: 공지사항용 (더 깔끔함)

6. **기능** 설정:
   - ✅ **메인 포스트에 반응 남기기 활성화** 체크
   - 이렇게 하면 댓글 외에 이모지 반응도 가능합니다

7. **테마** 선택:
   - **`preferred_color_scheme`** 선택
   - 사용자의 시스템 설정에 따라 자동으로 다크/라이트 모드 전환

8. 페이지 하단의 **giscus 활성화** 섹션에서 생성된 스크립트 확인
9. 다음 값들을 복사해두세요:
   ```
   data-repo="username/repository"
   data-repo-id="R_kgDO..."  ← 이 값 복사!
   data-category="General"
   data-category-id="DIC_kwDO..." ← 이 값 복사!
   ```

### 4단계: 블로그에 설정 적용

1. 코드 에디터에서 `js/post-loader.js` 파일 열기

2. `loadGiscus()` 함수 찾기 (약 80번째 줄)

3. 다음 라인들을 수정:

**수정 전:**
```javascript
script.setAttribute('data-repo', 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME');
script.setAttribute('data-repo-id', 'YOUR_REPO_ID');
script.setAttribute('data-category', 'General');
script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID');
```

**수정 후 (실제 값으로 교체):**
```javascript
script.setAttribute('data-repo', 'seungwonme/seungwonme.github.io');
script.setAttribute('data-repo-id', 'R_kgDOJ1234567');
script.setAttribute('data-category', 'General');
script.setAttribute('data-category-id', 'DIC_kwDOJ1234567890');
```

4. 파일 저장 (Cmd/Ctrl + S)

### 5단계: 변경사항 커밋 및 푸시

터미널에서 다음 명령어 실행:

```bash
# 변경사항 스테이징
git add js/post-loader.js

# 커밋
git commit -m "feat: Giscus 댓글 시스템 설정"

# GitHub에 푸시
git push origin main
```

### 6단계: 동작 확인

1. GitHub Pages 사이트로 이동 (예: `https://username.github.io`)
2. 아무 포스트나 클릭
3. 페이지 하단으로 스크롤
4. 댓글 섹션이 표시되는지 확인

✅ **성공**: Giscus 댓글 입력창이 보이면 성공!

## 🧪 댓글 테스트

1. GitHub 계정으로 로그인
2. 테스트 댓글 작성
3. 댓글이 GitHub Discussions에도 표시되는지 확인:
   - 저장소 → **Discussions** 탭 → 해당 토론 찾기

## 🎨 테마 자동 전환 테스트

1. 블로그 우측 상단의 테마 전환 버튼 클릭 (☀️/🌙)
2. 댓글 섹션의 테마도 자동으로 변경되는지 확인

## ❗ 문제 해결

### 댓글이 표시되지 않는 경우

#### 1. 저장소가 Public인가요?
```bash
# 저장소 페이지에서 확인
Settings → Danger Zone → Change repository visibility
```
Private 저장소에서는 Giscus가 작동하지 않습니다.

#### 2. Discussions가 활성화되어 있나요?
```
Settings → Features → Discussions 체크박스 확인
```

#### 3. 설정 값이 올바른가요?
- `data-repo`: 저장소 이름이 정확한지 확인
- `data-repo-id`: [giscus.app](https://giscus.app/ko)에서 확인한 값과 일치하는지 확인
- `data-category-id`: 올바른 카테고리 ID인지 확인

#### 4. 브라우저 콘솔에 에러가 있나요?
1. F12 또는 Cmd/Ctrl + Shift + I로 개발자 도구 열기
2. **Console** 탭 확인
3. 빨간색 에러 메시지 확인

일반적인 에러:
- `Repository not found`: `data-repo` 값 확인
- `Category not found`: `data-category-id` 값 확인
- `Failed to load`: 네트워크 연결 확인

### 테마가 자동으로 변경되지 않는 경우

1. **페이지 새로고침**: Cmd/Ctrl + R
2. **하드 리프레시**: Cmd/Ctrl + Shift + R
3. **브라우저 캐시 지우기**:
   - Chrome: Settings → Privacy → Clear browsing data
   - Safari: Preferences → Privacy → Manage Website Data

### 댓글이 다른 페이지에도 표시되는 경우

`data-mapping` 값을 확인하세요:
- `pathname`: URL 경로 기반 (권장)
- `url`: 전체 URL 기반
- `title`: 페이지 제목 기반

## 🔔 알림 설정

새 댓글이 달릴 때 알림을 받으려면:

1. 저장소 페이지 상단의 **Watch** 버튼 클릭
2. **Custom** 선택
3. **Discussions** 체크
4. **Apply** 클릭

이제 누군가 댓글을 달면 GitHub 알림을 받게 됩니다!

## 📚 추가 리소스

- [Giscus 공식 문서](https://github.com/giscus/giscus)
- [GitHub Discussions 가이드](https://docs.github.com/en/discussions)
- [블로그 포스트: Giscus 설정하기](../posts/giscus-setup.md)

## 💡 팁

### 카테고리별 댓글 분리

여러 카테고리를 만들어 포스트별로 다른 카테고리를 사용할 수 있습니다:
- `Tech`: 기술 관련 포스트
- `Life`: 일상 포스트
- `Review`: 리뷰 포스트

### 댓글 스팸 방지

GitHub Discussions의 모더레이션 기능을 활용하세요:
- 저장소 Settings → Moderation options
- 부적절한 댓글을 숨기거나 삭제할 수 있습니다

### 댓글 백업

모든 댓글은 GitHub Discussions에 저장되므로:
- 자동으로 버전 관리됨
- GitHub 저장소와 함께 백업됨
- 댓글 데이터를 잃을 걱정 없음

---

설정 완료를 축하합니다! 🎉

이제 방문자들과 소통할 수 있는 멋진 댓글 시스템이 준비되었습니다.


# GitHub Pages로 블로그 배포하기 🚀

블로그를 만들었다면 이제 전 세계에 공개할 차례입니다! GitHub Pages를 사용하면 무료로 블로그를 호스팅할 수 있어요.

## GitHub Pages란?

GitHub Pages는 GitHub에서 제공하는 **무료 정적 웹사이트 호스팅 서비스**입니다.

### 장점

- 🆓 **완전 무료**: 비용 없이 사용 가능
- ⚡ **빠른 속도**: CDN을 통한 빠른 로딩
- 🔒 **HTTPS 지원**: 보안 연결 자동 제공
- 🎯 **간단한 배포**: Git push만으로 자동 배포
- 🌐 **커스텀 도메인**: 나만의 도메인 연결 가능

## 배포 방법

### 방법 1: username.github.io 저장소 (권장)

이 방법은 가장 간단하고 `https://username.github.io` 주소를 받을 수 있어요.

#### 1단계: GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 **+** 버튼 → **New repository** 클릭
3. Repository name: `username.github.io` 형식으로 입력
   - 예: GitHub 아이디가 `kimsoyeon`이라면 → `kimsoyeon.github.io`
4. **Public** 선택 (필수!)
5. **Create repository** 클릭

> ⚠️ **중요**: 저장소 이름은 반드시 `자신의GitHub아이디.github.io` 형식이어야 합니다!

#### 2단계: 로컬 블로그를 Git 저장소로 초기화

터미널을 열고 블로그 폴더로 이동한 후 다음 명령어를 실행하세요:

```bash
# 블로그 폴더로 이동
cd /Users/kimsoyeon/Desktop/blog

# Git 저장소 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 블로그 생성"

# 기본 브랜치를 main으로 설정
git branch -M main
```

#### 3단계: GitHub 저장소와 연결

```bash
# 원격 저장소 추가 (username을 본인의 GitHub 아이디로 변경!)
git remote add origin https://github.com/username/username.github.io.git

# GitHub에 푸시
git push -u origin main
```

GitHub 로그인 창이 뜨면 로그인하세요.

#### 4단계: 배포 완료!

약 1-2분 후 `https://username.github.io`로 접속하면 블로그를 볼 수 있어요! 🎉

### 방법 2: 일반 저장소에서 배포

다른 이름의 저장소를 사용하고 싶다면:

1. GitHub에서 원하는 이름으로 저장소 생성 (예: `my-blog`)
2. 위의 2-3단계와 동일하게 진행
3. 저장소 **Settings** → **Pages** 로 이동
4. **Source**를 `main` 브랜치로 설정
5. **Save** 클릭

블로그 주소: `https://username.github.io/my-blog`

## 배포 확인하기

### 1. GitHub Actions 확인

1. 저장소 페이지 상단의 **Actions** 탭 클릭
2. 초록색 체크 표시가 나타날 때까지 대기
3. 빨간 X 표시가 나타나면 에러 발생 → 로그 확인

### 2. 블로그 접속

브라우저에서 `https://username.github.io` 접속!

처음 배포할 때는 최대 10분 정도 걸릴 수 있어요.

## 블로그 업데이트하기

블로그를 수정한 후 다시 배포하는 방법:

```bash
# 변경사항 확인
git status

# 변경된 파일 추가
git add .

# 커밋 (메시지는 자유롭게 작성)
git commit -m "포스트 추가: 새로운 글 작성"

# GitHub에 푸시 (자동으로 재배포됨)
git push
```

push하면 자동으로 GitHub Pages가 업데이트돼요! 🚀

## 커스텀 도메인 연결하기

`username.github.io` 대신 나만의 도메인을 사용하고 싶다면:

### 1단계: 도메인 구매

- [Namecheap](https://www.namecheap.com)
- [GoDaddy](https://www.godaddy.com)
- [가비아](https://www.gabia.com) (한국)

### 2단계: DNS 설정

도메인 관리 페이지에서 다음 레코드 추가:

```
Type: A
Host: @
Value: 185.199.108.153

Type: A
Host: @
Value: 185.199.109.153

Type: A
Host: @
Value: 185.199.110.153

Type: A
Host: @
Value: 185.199.111.153
```

www 서브도메인도 추가하려면:

```
Type: CNAME
Host: www
Value: username.github.io
```

### 3단계: GitHub Pages 설정

1. 저장소 **Settings** → **Pages**
2. **Custom domain**에 도메인 입력 (예: `myblog.com`)
3. **Save** 클릭
4. **Enforce HTTPS** 체크 (몇 시간 후 가능)

DNS 전파는 최대 48시간까지 걸릴 수 있어요.

## 문제 해결

### 404 Page Not Found

**원인**: 배포가 아직 완료되지 않았거나 설정 오류

**해결**:
1. Actions 탭에서 배포 상태 확인
2. 저장소가 Public인지 확인
3. `index.html` 파일이 루트에 있는지 확인

### 스타일이 적용되지 않음

**원인**: CSS/JS 파일 경로 문제

**해결**:
- 일반 저장소 배포 시 경로 수정 필요
- 모든 경로를 상대 경로로 변경
- 예: `/css/style.css` → `css/style.css`

### 변경사항이 반영되지 않음

**원인**: 브라우저 캐시

**해결**:
1. 강력 새로고침: Cmd/Ctrl + Shift + R
2. 시크릿 모드로 접속
3. 브라우저 캐시 삭제

### Push 권한 오류

```
ERROR: Permission denied (publickey)
```

**해결**:
1. HTTPS 대신 사용 (추천):
   ```bash
   git remote set-url origin https://github.com/username/repo.git
   ```
2. 또는 SSH 키 설정하기

## 유용한 Git 명령어

```bash
# 현재 상태 확인
git status

# 변경 내역 보기
git log --oneline

# 원격 저장소 확인
git remote -v

# 최신 변경사항 받아오기
git pull

# 커밋 되돌리기 (주의!)
git reset --hard HEAD~1
```

## 배포 자동화 팁

### 1. 브랜치 전략

- `main`: 배포용 (안정된 버전만)
- `develop`: 개발용 (작업 중인 내용)

```bash
# develop 브랜치 생성
git checkout -b develop

# 작업 후 main으로 병합
git checkout main
git merge develop
git push
```

### 2. 커밋 메시지 규칙

일관된 커밋 메시지로 관리하세요:

```bash
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 스타일 변경
refactor: 리팩토링
```

예시:
```bash
git commit -m "feat: Giscus 댓글 시스템 추가"
git commit -m "fix: 모바일 반응형 버그 수정"
git commit -m "docs: README 업데이트"
```

## 성능 최적화

### 1. 이미지 최적화

큰 이미지는 로딩 속도를 느리게 만들어요:

- PNG → JPG 변환 (사진의 경우)
- 이미지 압축 도구 사용
- WebP 포맷 사용 고려

### 2. 파일 최소화

- CSS/JS 파일 압축
- 불필요한 파일 제거
- `.gitignore`로 개발 파일 제외

## 다음 단계

- ✅ Giscus 댓글 시스템 설정
- ✅ Google Analytics 연결 (방문자 분석)
- ✅ SEO 최적화 (검색 엔진 노출)
- ✅ RSS 피드 추가
- ✅ 사이트맵 생성

---

이제 여러분의 블로그가 전 세계에 공개되었습니다! 🌍

첫 방문자를 기다리며, 좋은 콘텐츠를 꾸준히 작성해보세요.

블로그 주소를 친구들에게 공유해보는 건 어떨까요? 😊


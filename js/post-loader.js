// ============================================
// 포스트 로더 및 Giscus 댓글 시스템
// ============================================

// URL에서 포스트 ID 가져오기
function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// 마크다운 파일 로드 및 HTML 변환
async function loadPost(postId) {
    try {
        const response = await fetch(`posts/${postId}.md`);
        
        if (!response.ok) {
            throw new Error('포스트를 찾을 수 없습니다.');
        }
        
        const markdown = await response.text();
        
        // 마크다운을 HTML로 변환
        const html = marked.parse(markdown);
        
        // 메타데이터 추출 (첫 줄이 제목인 경우)
        const lines = markdown.split('\n');
        const title = lines[0].replace(/^#\s+/, '');
        
        // 포스트 메타데이터 (main.js에서 가져오기)
        const postMeta = getPostMeta(postId);
        
        // HTML 업데이트
        document.getElementById('post-title').textContent = title;
        document.getElementById('post-title-main').textContent = title;
        document.getElementById('post-content').innerHTML = html;
        
        if (postMeta) {
            document.getElementById('post-date').textContent = `📅 ${formatDate(postMeta.date)}`;
            
            if (postMeta.tags && postMeta.tags.length > 0) {
                const tagsHTML = postMeta.tags.map(tag => 
                    `<span class="tag">${tag}</span>`
                ).join('');
                document.getElementById('post-tags').innerHTML = tagsHTML;
            }
        }
        
        // Giscus 로드
        loadGiscus();
        
    } catch (error) {
        console.error('포스트 로드 실패:', error);
        document.getElementById('post-content').innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <h2>⚠️ 포스트를 찾을 수 없습니다</h2>
                <p style="color: var(--text-secondary); margin-top: 1rem;">
                    요청하신 포스트가 존재하지 않거나 로드할 수 없습니다.
                </p>
                <a href="index.html" class="back-button" style="display: inline-block; margin-top: 2rem;">
                    ← 목록으로 돌아가기
                </a>
            </div>
        `;
    }
}

// 포스트 메타데이터 가져오기
function getPostMeta(postId) {
    const posts = [
        {
            id: 'welcome',
            title: '블로그에 오신 것을 환영합니다! 🎉',
            date: '2025-10-29',
            tags: ['환영', '소개']
        },
        {
            id: 'github-pages-deploy',
            title: 'GitHub Pages로 블로그 배포하기 🚀',
            date: '2025-10-29',
            tags: ['GitHub Pages', '배포', '가이드']
        },
        {
            id: 'markdown-guide',
            title: '마크다운 작성 가이드 📝',
            date: '2025-10-29',
            tags: ['가이드', '마크다운']
        },
        {
            id: 'giscus-setup',
            title: 'Giscus 댓글 시스템 설정하기 💬',
            date: '2025-10-29',
            tags: ['Giscus', '댓글', '설정']
        }
    ];
    
    return posts.find(p => p.id === postId);
}

// 날짜 포맷팅
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
}

// Giscus 댓글 시스템 로드 (2025-10-29 업데이트)
function loadGiscus() {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'wngml080-stack/wngml080-stack.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOQLOp6w');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOQLOp684CxND9');
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

// 현재 테마 가져오기
function getCurrentTheme() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'dark' ? 'dark' : 'light';
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    const postId = getPostIdFromURL();
    
    if (postId) {
        loadPost(postId);
    } else {
        document.getElementById('post-content').innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <h2>⚠️ 포스트 ID가 없습니다</h2>
                <p style="color: var(--text-secondary); margin-top: 1rem;">
                    올바른 포스트 링크를 통해 접근해주세요.
                </p>
                <a href="index.html" class="back-button" style="display: inline-block; margin-top: 2rem;">
                    ← 목록으로 돌아가기
                </a>
            </div>
        `;
    }
});


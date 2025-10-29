// ============================================
// 메인 페이지 포스트 목록 로드
// ============================================

// 포스트 메타데이터
const posts = [
    {
        id: 'welcome',
        title: '블로그에 오신 것을 환영합니다! 🎉',
        date: '2025-10-29',
        excerpt: '첫 번째 포스트입니다. Giscus 댓글 시스템을 적용한 HTML 블로그를 소개합니다.',
        tags: ['환영', '소개']
    },
    {
        id: 'github-pages-deploy',
        title: 'GitHub Pages로 블로그 배포하기 🚀',
        date: '2025-10-29',
        excerpt: '무료로 블로그를 호스팅하고 전 세계에 공개하는 방법을 단계별로 알아봅니다.',
        tags: ['GitHub Pages', '배포', '가이드']
    },
    {
        id: 'markdown-guide',
        title: '마크다운 작성 가이드 📝',
        date: '2025-10-29',
        excerpt: '블로그 포스트 작성을 위한 마크다운 문법 가이드입니다.',
        tags: ['가이드', '마크다운']
    },
    {
        id: 'giscus-setup',
        title: 'Giscus 댓글 시스템 설정하기 💬',
        date: '2025-10-29',
        excerpt: 'GitHub Discussions 기반의 Giscus 댓글 시스템을 설정하는 방법을 알아봅니다.',
        tags: ['Giscus', '댓글', '설정']
    }
];

// 포스트 카드 생성
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.onclick = () => {
        window.location.href = `post.html?id=${post.id}`;
    };
    
    const tagsHTML = post.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
    
    card.innerHTML = `
        <h3>${post.title}</h3>
        <div class="post-meta">
            <span>📅 ${formatDate(post.date)}</span>
        </div>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="tags">${tagsHTML}</div>
    `;
    
    return card;
}

// 날짜 포맷
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
}

// 포스트 목록 렌더링
function renderPosts() {
    const container = document.getElementById('posts-container');
    
    if (!container) return;
    
    // 날짜순 정렬 (최신순)
    const sortedPosts = [...posts].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    container.innerHTML = '';
    sortedPosts.forEach(post => {
        container.appendChild(createPostCard(post));
    });
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', renderPosts);


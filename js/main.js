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
    },
    {
        id: 'ai-news-trends-2025',
        title: '2025년 주목해야 할 최신 AI 트렌드 🤖✨',
        date: '2025-10-29',
        excerpt: '24시간 AI 뉴스 앵커부터 숏폼 콘텐츠까지, 2025년 가장 뜨거운 AI 뉴스와 트렌드를 쉽게 정리했습니다.',
        tags: ['AI', '인공지능', '트렌드', '뉴스']
    },
    {
        id: 'cursor-ide-october-2025',
        title: '2025년 10월, 커서 IDE가 바꾸는 코딩의 미래 🚀💻',
        date: '2025-10-29',
        excerpt: 'AI 기반 코드 에디터 Cursor IDE의 최신 소식과 핵심 기능을 초보자도 쉽게 이해할 수 있도록 정리했습니다.',
        tags: ['Cursor', 'IDE', 'AI', '코딩', '개발도구']
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


#!/usr/bin/env node

/**
 * posts.json 자동 생성 스크립트
 * 
 * posts/ 폴더의 마크다운 파일을 스캔하여
 * 자동으로 posts.json 파일을 생성합니다.
 * 
 * 사용법: node .github/scripts/generate-posts.js
 */

const fs = require('fs');
const path = require('path');

// 경로 설정
const POSTS_DIR = path.join(__dirname, '../../posts');
const OUTPUT_FILE = path.join(__dirname, '../../posts.json');

/**
 * 마크다운 파일에서 메타데이터 추출
 * @param {string} filePath - 마크다운 파일 경로
 * @returns {object|null} 포스트 메타데이터
 */
function extractMetadata(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        
        // 제목 추출 (첫 번째 # 헤딩)
        let title = '';
        for (const line of lines) {
            if (line.trim().startsWith('# ')) {
                title = line.replace(/^#\s+/, '').trim();
                break;
            }
        }
        
        // 요약문 추출 (제목 다음의 첫 번째 문단)
        let excerpt = '';
        let foundTitle = false;
        for (const line of lines) {
            if (line.trim().startsWith('# ')) {
                foundTitle = true;
                continue;
            }
            if (foundTitle && line.trim() && !line.trim().startsWith('#')) {
                excerpt = line.trim();
                // 너무 길면 150자로 제한
                if (excerpt.length > 150) {
                    excerpt = excerpt.substring(0, 150) + '...';
                }
                break;
            }
        }
        
        // 파일명에서 ID 추출
        const id = path.basename(filePath, '.md');
        
        // 파일 생성 날짜 가져오기
        const stats = fs.statSync(filePath);
        const date = stats.birthtime.toISOString().split('T')[0];
        
        // 태그 추출 (파일명이나 내용에서 간단히 생성)
        const tags = generateTags(title, content);
        
        return {
            id,
            title: title || id,
            date,
            excerpt: excerpt || '설명이 없습니다.',
            tags
        };
    } catch (error) {
        console.error(`파일 처리 오류 (${filePath}):`, error.message);
        return null;
    }
}

/**
 * 제목과 내용에서 태그 생성
 * @param {string} title - 포스트 제목
 * @param {string} content - 포스트 내용
 * @returns {string[]} 태그 배열
 */
function generateTags(title, content) {
    const tags = [];
    const text = (title + ' ' + content).toLowerCase();
    
    // 키워드 매핑
    const keywords = {
        'AI': ['ai', '인공지능', '머신러닝', '딥러닝'],
        '가이드': ['가이드', 'guide', '튜토리얼', '설명'],
        'GitHub': ['github', 'git', '깃허브'],
        '배포': ['배포', 'deploy', '호스팅'],
        '마크다운': ['마크다운', 'markdown'],
        '댓글': ['댓글', 'comment', 'giscus'],
        '웹개발': ['웹', 'web', 'html', 'css', 'javascript'],
        '트렌드': ['트렌드', 'trend', '뉴스', 'news']
    };
    
    // 키워드 검사
    for (const [tag, words] of Object.entries(keywords)) {
        if (words.some(word => text.includes(word))) {
            tags.push(tag);
        }
    }
    
    // 태그가 없으면 기본 태그 추가
    if (tags.length === 0) {
        tags.push('일반');
    }
    
    // 최대 5개로 제한
    return tags.slice(0, 5);
}

/**
 * posts.json 파일 생성
 */
function generatePostsJson() {
    console.log('📝 포스트 파일 스캔 중...\n');
    
    // posts 디렉토리의 모든 .md 파일 읽기
    const files = fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(POSTS_DIR, file));
    
    console.log(`✅ ${files.length}개의 마크다운 파일 발견\n`);
    
    // 각 파일에서 메타데이터 추출
    const posts = [];
    for (const file of files) {
        const metadata = extractMetadata(file);
        if (metadata) {
            posts.push(metadata);
            console.log(`  ✓ ${metadata.id}`);
            console.log(`    제목: ${metadata.title}`);
            console.log(`    태그: ${metadata.tags.join(', ')}\n`);
        }
    }
    
    // 날짜순 정렬 (최신순)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // JSON 파일로 저장
    const jsonContent = JSON.stringify(posts, null, 2);
    fs.writeFileSync(OUTPUT_FILE, jsonContent, 'utf-8');
    
    console.log(`\n✨ posts.json 파일이 생성되었습니다!`);
    console.log(`📍 위치: ${OUTPUT_FILE}`);
    console.log(`📊 총 ${posts.length}개의 포스트\n`);
}

// 스크립트 실행
try {
    generatePostsJson();
} catch (error) {
    console.error('\n❌ 오류 발생:', error.message);
    process.exit(1);
}


const fs = require('fs');
const path = require('path');

// 병합된 내용을 저장할 파일 경로
const mergedFile = 'src/content/docs/full.mdx';

// 병합할 MDX 파일 목록 (수동 입력)
const filesToMerge = [
  { "path": "perceivable/index", "label": "1. 인식의 용이성", "level": 1 },
  { "path": "perceivable/1-1/1-1-1", "label": "1.1 대체 텍스트", "level": 2 },
  { "path": "perceivable/1-2/1-2-1", "label": "1.2 멀티미디어 대체수단", "level": 2 },
  { "path": "perceivable/1-3/1-3-1", "label": "1.3 적응성", "level": 2 },
  { "path": "perceivable/1-4/1-4-1", "label": "1.4 명료성", "level": 2 },
  { "path": "operable/index", "label": "2. 운용의 용이성", "level": 1 },
  { "path": "operable/2-1/2-1-1", "label": "2.1 입력장치 접근성", "level": 2 },
  { "path": "operable/2-2/2-2-1", "label": "2.2 충분한 시간 제공", "level": 2 },
  { "path": "operable/2-3/2-3-1", "label": "2.3 광과민성 발작 예방", "level": 2 },
  { "path": "operable/2-4/2-4-1", "label": "2.4 쉬운 내비게이션", "level": 2 },
  { "path": "operable/2-5/2-5-1", "label": "2.5 입력 방식", "level": 2 },
  { "path": "understandable/index", "label": "3. 이해의 용이성", "level": 1 },
  { "path": "understandable/3-1/3-1-1", "label": "3.1 가독성", "level": 2 },
  { "path": "understandable/3-2/3-2-1", "label": "3.2 예측 가능성", "level": 2 },
  { "path": "understandable/3-3/3-3-1", "label": "3.3 입력 도움", "level": 2 },
  { "path": "robust/index", "label": "4. 견고성", "level": 1 },
  { "path": "robust/4-1/4-1-1", "label": "4.1 문법 준수", "level": 2 },
  { "path": "robust/4-2/4-2-1", "label": "4.2 웹 애플리케이션 접근성", "level": 2 },
  { "path": "for-works/index", "label": "5. KWCAG 이해와 실무 적용", "level": 1 },
  { "path": "for-works/working-reference", "label": "실무 적용", "level": 2 },
];

// 오늘 날짜를 YYYY-MM-DD 형식으로 출력
const today = new Date().toISOString().slice(0, 10);

// 파일 읽기 및 내용 병합 함수
function mergeFiles() {
  let mergedContent = '';

  // 프론트매터 및 import 구문 추가
  mergedContent += 'import { Aside, Badge, Card } from \'@astrojs/starlight/components\';\n\n';

  filesToMerge.forEach(fileInfo => {
    const filePath = path.join(__dirname, 'src/content/docs', `${fileInfo.path}.mdx`);
    let fileContent = '';

    try {
      fileContent = fs.readFileSync(filePath, 'utf8');

      const pathParts = fileInfo.path.split('/');
      const lastPart = pathParts.pop();

      let title = fileInfo.label;
      let headingLevel = '##'; // 기본 2레벨

      if (fileInfo.level === 1) {
        headingLevel = '#';
      } else if (fileInfo.level === 2) {
        headingLevel = '##';
      } else if (fileInfo.level === 3) {
        headingLevel = '###';
      }

      const titleMatch = fileContent.match(/title: (.*)/);
      if (titleMatch) {
        title = fileInfo.label;
      } else if (headingLevel === '#') {
        title = fileInfo.label;
      } else if (headingLevel === '##') {
        title = fileInfo.label;
      }

      let contentWithoutFrontmatter = fileContent.replace(/---[\s\S]*?---/g, '').replace(/import[\s\S]*?\n\n/g, '');
      mergedContent += `${headingLevel} ${title}\n`;

      // 제목 아래 내용 추출 및 제목 레벨 조정 (h4부터)
      let adjustedContent = contentWithoutFrontmatter;
      if (headingLevel === '###') {
        adjustedContent = contentWithoutFrontmatter
          .replace(/^# (.*)/gm, '#### $1')
          .replace(/^## (.*)/gm, '##### $1')
          .replace(/^### (.*)/gm, '###### $1');
      }

      mergedContent += adjustedContent + '\n';

    } catch (error) {
      // 파일이 존재하지 않는 경우 제목만 추가
      if (error.code === 'ENOENT') {
        mergedContent += `## ${fileInfo.label}\n\n`;
      } else {
        console.error(`Error reading file ${filePath}: ${error}`);
      }
    }
  });

  return mergedContent;
}

// 파일 저장 함수
function saveMergedFile(content) {
  fs.writeFileSync(mergedFile, content, 'utf8');
  console.log('File merged successfully!');
}

// 전체 스크립트 실행
const mergedContent = mergeFiles();
saveMergedFile(mergedContent);

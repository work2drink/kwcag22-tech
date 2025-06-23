import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
// import starlightLinksValidator from 'starlight-links-validator';
import starlightFullViewMode from 'starlight-fullview-mode';
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import sitemap from '@astrojs/sitemap';

const commonKeywords = "접근성, 제작기법, KWCAG2.2, accessibility, Korean, A11Y";

export default defineConfig({
    site: 'https://work2drink.github.io/',
    base: process.env.NODE_ENV === 'production' ? '/kwcag22-tech/' : '/',
	integrations: [
        astroExpressiveCode(),
        mdx(),
		starlight({
            title: '웹 접근성을 고려한 콘텐츠 제작기법 2.2',
            defaultLocale: 'root',
            locales: {
                root: {
                    label: '한국어',
                    lang: 'ko',
                },
            },
            plugins: [
                // starlightLinksValidator(),
                // starlightUtils({
                // 	multiSidebar: true
                // }),
                starlightFullViewMode({ leftSidebarEnabled: true, rightSidebarEnabled: true })
            ],
            social: [{ icon: 'information', label: '원문 사이트', href: 'https://www.kioskui.or.kr/index.do?menu_id=00000976' }],
            components: {
                // Head: './src/components/CustomHead.astro',
                PageFrame: './src/components/CustomPageFrame.astro',
            },
			sidebar: [
				{
					label: '인식의 용이성',
                    autogenerate: { directory: 'perceivable' },
				},
				{
                    label: '운용의 용이성',
					autogenerate: { directory: 'operable' },
				},
                {
                    label: '이해의 용이성',
                    autogenerate: { directory: 'understandable' },
                },
                {
                    label: '견고성',
                    autogenerate: { directory: 'robust' },
                },
                {
                    label: 'KWCAG 이해와 실무 적용',
                    items: [
                        { label: 'KWCAG와 WCAG의 관계', slug: 'guides/about' },
                        { label: '실무 적용', slug: 'guides/working-reference' },
                    ],
                },
			],
		}),
        sitemap(),
	],
});

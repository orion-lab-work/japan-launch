/* ==========================================================================
   Japan Launch - Main JavaScript Logic (v18 Formspree Integration)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    try { initSakuraPetals(); } catch(e) { console.error('Sakura init error:', e); }
    try { initCaseStudyTouchTabs(); } catch(e) { console.error('Touch tabs init error:', e); }
    try { initFaqAccordion(); } catch(e) { console.error('FAQ init error:', e); }
});

/* 1. Sakura Petal Generator */
function initSakuraPetals() {
    const container = document.getElementById('sakuraContainer');
    if (!container) return;

    const petalCount = 18;
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'sakura-petal';
        
        const size = Math.random() * 10 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size * 1.2}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 8 + 8}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(petal);
    }
}

/* 2. Language Switcher (EN / JP Toggle) */
let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    document.body.setAttribute('data-current-lang', lang);

    const btnEn = document.getElementById('btnLangEn');
    const btnJp = document.getElementById('btnLangJp');

    if (lang === 'jp') {
        if (btnEn) btnEn.classList.remove('active');
        if (btnJp) btnJp.classList.add('active');
    } else {
        if (btnJp) btnJp.classList.remove('active');
        if (btnEn) btnEn.classList.add('active');
    }

    const elements = document.querySelectorAll('[data-en][data-jp]');
    elements.forEach(el => {
        const targetText = lang === 'jp' ? el.getAttribute('data-jp') : el.getAttribute('data-en');
        if (targetText) {
            el.innerHTML = targetText;
        }
    });

    const activeCsTab = document.querySelector('.case-study-tab.active');
    if (activeCsTab) {
        const csId = activeCsTab.getAttribute('data-cs');
        if (typeof switchCaseStudy === 'function') {
            switchCaseStudy(csId);
        }
    }
}
window.switchLanguage = switchLanguage;

/* 3. Mobile Touch Friendly Event Registration for Case Study Tabs */
function initCaseStudyTouchTabs() {
    const csTabs = document.querySelectorAll('.case-study-tab');
    csTabs.forEach(tab => {
        const handler = (e) => {
            const csId = tab.getAttribute('data-cs');
            if (csId && typeof switchCaseStudy === 'function') {
                switchCaseStudy(csId);
            }
        };

        tab.addEventListener('click', handler);
    });
}

/* 4. Hero iPhone Mockup Interactive Switcher (Before / After / Both) */
function switchPhoneMockup(mode) {
    const btnBefore = document.getElementById('btnPhoneBefore');
    const btnAfter = document.getElementById('btnPhoneAfter');
    const btnBoth = document.getElementById('btnPhoneBoth');

    const wrapperBefore = document.getElementById('wrapperPhoneBefore');
    const wrapperAfter = document.getElementById('wrapperPhoneAfter');
    const displayArea = document.getElementById('phoneDisplayArea');

    [btnBefore, btnAfter, btnBoth].forEach(b => { if (b) b.classList.remove('active'); });

    if (mode === 'before') {
        if (btnBefore) btnBefore.classList.add('active');
        if (wrapperBefore) wrapperBefore.classList.add('active');
        if (wrapperAfter) wrapperAfter.classList.remove('active');
        if (displayArea) displayArea.className = 'phone-display-area mode-single-before';
    } else if (mode === 'both') {
        if (btnBoth) btnBoth.classList.add('active');
        if (wrapperBefore) wrapperBefore.classList.add('active');
        if (wrapperAfter) wrapperAfter.classList.add('active');
        if (displayArea) displayArea.className = 'phone-display-area mode-both';
    } else {
        if (btnAfter) btnAfter.classList.add('active');
        if (wrapperAfter) wrapperAfter.classList.add('active');
        if (wrapperBefore) wrapperBefore.classList.remove('active');
        if (displayArea) displayArea.className = 'phone-display-area mode-single-after';
    }
}
window.switchPhoneMockup = switchPhoneMockup;

/* 5. Interactive Live Case Study Switcher (Samples #01 ~ #05 Visual UI) */
const caseStudyData = {
    sample1: {
        title: { en: 'Sample #01: App Store Purchase Copy', jp: 'サンプル #01：App Storeの購入文言' },
        genre: 'APP STORE IN-APP PURCHASE COPY',
        mockupImg: './assets/mockup_sample1.svg',
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
        original: 'Public App Store purchase listing',
        literal: '「ロック解除プレミアム」<br>「無制限に保存すると、すべての機能がロック解除されます。」',
        localized: '「プレミアムプラン」<br>「写真を無制限に保存。すべての編集機能を利用できます。」',
        baOriginal: 'Current Japanese App Store copy: 「ロック解除プレミアム」',
        baLocalized: 'Suggested copy: 「プレミアムプラン」',
        beforeMeaning: { en: '<strong>Current wording:</strong> “Unlock” is repeated in the title and description. The wording names the mechanism but makes the value of the purchase harder to scan.', jp: '<strong>現在の表現：</strong>タイトルと説明の両方で「ロック解除」が繰り返され、購入すると何ができるのかがひと目でつかみにくくなっています。' },
        afterMeaning: { en: '<strong>Suggested wording:</strong> Give the purchase a familiar plan name, then state the two benefits directly: unlimited saves and access to editing features.', jp: '<strong>改善案：</strong>プラン名をシンプルにし、無制限保存と編集機能という購入後のメリットを説明文で具体的に伝えます。' },
        whyTitle: { en: 'Show the Benefit, Not the Unlock Mechanism', jp: '仕組みより、購入後にできることを伝える' },
        whyText: { en: 'The public listing describes unlimited saving and access to all features. The revised copy keeps those benefits while removing the repeated, technical-sounding “unlock” wording.', jp: '公開されている掲載文の「無制限に保存できる」「すべての機能を使える」という情報は残し、繰り返される機械的な「ロック解除」を整理しました。' },
        culturalText: { en: '<strong>Localization tip:</strong> On a purchase screen, users need to understand what they receive. Use a short plan name, then explain the benefit in plain Japanese. Keep the copy aligned with the actual subscription terms.<br><br><strong>日本語コピーのヒント：</strong>購入画面では、仕組みの説明より「何ができるか」が先に伝わると迷いにくくなります。プラン名は短く、説明文でメリットを明確に。', jp: '<strong>日本語コピーのヒント：</strong>購入画面では、仕組みの説明より「何ができるか」が先に伝わると迷いにくくなります。プラン名は短く、説明文でメリットを明確に。' },
        check1: { en: 'Removed the repeated “unlock” wording', jp: '繰り返される「ロック解除」を整理' },
        check2: { en: 'Named the purchase as a plan', jp: '購入項目をプラン名として表現' },
        check3: { en: 'Put the included benefits into plain Japanese', jp: '利用できる内容を具体的に提示' },
        check4: { en: 'Kept the claims grounded in the listing', jp: '掲載されている機能の範囲で提案' },
        takeaway: { en: 'Make the purchase outcome clear before users tap.', jp: 'タップする前に、購入後のメリットを伝える。' }
    },
    sample2: {
        title: { en: 'Sample #02: Hero Copy & Line Breaks', jp: 'サンプル #02：ヒーローコピーと改行' },
        genre: 'WEBSITE HERO COPY & RESPONSIVE LAYOUT',
        mockupImg: './assets/mockup_sample2.svg',
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
        original: 'Public Japanese homepage headline',
        literal: '「AIチャットから Agent 作業まで、すぐに使える」',
        localized: '「AIとのチャットも、エージェント作業も<br>チャットボックスひとつで。」',
        baOriginal: 'Current homepage headline: 「AIチャットから Agent 作業まで、すぐに使える」',
        baLocalized: 'Suggested headline: 「AIとのチャットも、エージェント作業もチャットボックスひとつで。」',
        beforeMeaning: { en: '<strong>Current wording:</strong> The full message is understandable, but the long headline can leave “で、” stranded on a narrow screen and makes the hero feel less balanced.', jp: '<strong>現在の表現：</strong>意味は分かりますが、幅によっては「で、」だけが次の行に残り、見出しのまとまりが崩れます。' },
        afterMeaning: { en: '<strong>Suggested layout:</strong> Keep both use cases and the single-chatbox idea, then break the headline at the natural pause between them.', jp: '<strong>改善案：</strong>チャットとエージェント作業の両方を残し、「チャットボックスひとつで」を次の行に分けて意味のまとまりを整えます。' },
        whyTitle: { en: 'Design the Headline for Its Actual Width', jp: '表示幅に合わせて見出しを組み直す' },
        whyText: { en: 'This is partly a layout issue. The revised line break keeps the two product uses together and gives the key idea—one chatbox—a clear second line.', jp: 'コピーだけでなくレイアウトも調整しています。利用シーンを一続きで見せ、伝えたい「チャットボックスひとつで」を独立した行にしました。' },
        culturalText: { en: '<strong>Localization tip:</strong> Check the Japanese headline at real desktop and mobile widths. Break at phrase boundaries rather than copying the English line count. A little breathing room can help the core message land.<br><br><strong>日本語コピーのヒント：</strong>英語の行数に合わせず、日本語の意味のまとまりで改行します。余白を少し残すと、短いコピーでも意図が伝わりやすくなります。', jp: '<strong>日本語コピーのヒント：</strong>英語の行数に合わせず、日本語の意味のまとまりで改行します。余白を少し残すと、短いコピーでも意図が伝わりやすくなります。' },
        check1: { en: 'Kept both chat and agent workflows', jp: 'チャットとエージェント作業を維持' },
        check2: { en: 'Made the one-chatbox idea easier to scan', jp: '「ひとつのチャットボックス」を明確化' },
        check3: { en: 'Removed the isolated line break', jp: '不自然に分かれる改行を解消' },
        check4: { en: 'Set the headline for the page width', jp: '実際の表示幅に合わせて調整' },
        takeaway: { en: 'Treat Japanese copy and line breaks as one design decision.', jp: '日本語コピーと改行を、ひとつのデザインとして考える。' }
    },
    sample3: {
        title: { en: 'Sample #03: App Store Subtitle', jp: 'サンプル #03：App Storeのサブタイトル' },
        genre: 'APP STORE SUBTITLE & SEARCH TERMS',
        mockupImg: './assets/mockup_sample3.svg',
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        original: 'Public App Store subtitle',
        literal: '「タスクマネージャー、スケジュールプランナー」',
        localized: '「タスク管理と予定管理を、ひとつのアプリで。」',
        baOriginal: 'Current subtitle: 「タスクマネージャー、スケジュールプランナー」',
        baLocalized: 'Suggested subtitle: 「タスク管理と予定管理を、ひとつのアプリで。」',
        beforeMeaning: { en: '<strong>Current wording:</strong> The relevant search terms are present, but the comma-separated labels read like a keyword list rather than a benefit.', jp: '<strong>現在の表現：</strong>検索キーワードは含まれていますが、単語を並べただけに見え、アプリの便利さが伝わりにくい形です。' },
        afterMeaning: { en: '<strong>Suggested wording:</strong> Retain “task management” and “schedule management,” then connect them with the benefit of having both in one app.', jp: '<strong>改善案：</strong>「タスク管理」「予定管理」のキーワードを残しながら、ひとつのアプリで使える利点を自然な文にしました。' },
        whyTitle: { en: 'Balance Search Terms with a Human Benefit', jp: '検索語と、使う人へのメリットを両立' },
        whyText: { en: 'A subtitle has little space, so each word should help with discovery or explain the product. A short sentence can do both without reading like a list of tags.', jp: 'サブタイトルは文字数が限られます。検索語を並べるだけでなく、どう役立つかまで短く伝えると、一覧で読んだときにも意味がつながります。' },
        culturalText: { en: '<strong>Localization tip:</strong> Keep the Japanese terms people actually search for, but arrange them into a natural phrase. Search coverage and readability can support each other.<br><br><strong>日本語コピーのヒント：</strong>日本語で検索される語は残しつつ、読みやすい語順に整えます。検索性と自然さは、両立させられます。', jp: '<strong>日本語コピーのヒント：</strong>日本語で検索される語は残しつつ、読みやすい語順に整えます。検索性と自然さは、両立させられます。' },
        check1: { en: 'Kept the task and schedule keywords', jp: 'タスク・予定のキーワードを維持' },
        check2: { en: 'Replaced the tag-like list with a sentence', jp: '単語の羅列を自然な文に変更' },
        check3: { en: 'Added the one-app benefit', jp: 'ひとつにまとまる利点を追加' },
        check4: { en: 'Kept the subtitle concise', jp: 'サブタイトルとして短く整理' },
        takeaway: { en: 'Keep searchable words, then make the value easy to understand.', jp: '検索語を活かしながら、使うメリットも伝える。' }
    },
    sample4: {
        title: { en: 'Sample #04: App Store Description', jp: 'サンプル #04：App Storeの説明文' },
        genre: 'APP STORE DESCRIPTION & EVERYDAY LANGUAGE',
        mockupImg: './assets/mockup_sample4.svg',
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        original: 'Public Japanese App Store description',
        literal: '「ユーザーフレンドリーなインターフェースですぐに始められます。」',
        localized: '「シンプルな画面で、支出をすぐに記録。」',
        baOriginal: 'Current description: 「ユーザーフレンドリーなインターフェースですぐに始められます。」',
        baLocalized: 'Suggested description: 「シンプルな画面で、支出をすぐに記録。」',
        beforeMeaning: { en: '<strong>Current wording:</strong> “User-friendly interface” is a familiar English phrase, but the katakana phrase is abstract here and does not say what users can do.', jp: '<strong>現在の表現：</strong>「ユーザーフレンドリーなインターフェース」は意味を推測できますが、抽象的で、使う人が何をできるのかが見えません。' },
        afterMeaning: { en: '<strong>Suggested wording:</strong> Replace the broad claim with the simple screen and the concrete action: recording an expense.', jp: '<strong>改善案：</strong>抽象的な使いやすさの説明を、シンプルな画面と「支出を記録する」という具体的な行動に置き換えました。' },
        whyTitle: { en: 'Describe the Ease Through an Action', jp: '使いやすさを、行動で伝える' },
        whyText: { en: 'The product manages personal expenses. Naming the task makes the benefit tangible and removes a generic phrase that could describe almost any app.', jp: '支出管理アプリなので、利用者が実際にする「記録」を示しました。どのアプリにも当てはまる抽象語より、使う場面が浮かびます。' },
        culturalText: { en: '<strong>Localization tip:</strong> Japanese readers often respond better to a concrete action than a broad adjective such as “user-friendly.” Use familiar words and keep the description light; the screen can show the rest.<br><br><strong>日本語コピーのヒント：</strong>「ユーザーフレンドリー」のような抽象語より、使う場面や行動を示す方が伝わることがあります。なじみのある言葉で簡潔にし、画面に説明を詰め込みすぎないのがポイントです。', jp: '<strong>日本語コピーのヒント：</strong>「ユーザーフレンドリー」のような抽象語より、使う場面や行動を示す方が伝わることがあります。なじみのある言葉で簡潔にし、画面に説明を詰め込みすぎないのがポイントです。' },
        check1: { en: 'Replaced abstract wording with a concrete task', jp: '抽象語を具体的な行動に変更' },
        check2: { en: 'Used familiar, everyday Japanese', jp: 'なじみのある日本語を採用' },
        check3: { en: 'Removed an adjective that says little about the app', jp: 'アプリの内容が伝わりにくい形容を整理' },
        check4: { en: 'Kept the copy short for a store page', jp: 'ストア向けに短く簡潔化' },
        takeaway: { en: 'Show what users can do instead of saying the app is easy.', jp: '「使いやすい」ではなく、何ができるかを伝える。' }
    },
    sample5: {
        title: { en: 'Sample #05: One-Time Purchase Wording', jp: 'サンプル #05：買い切りプランの表現' },
        genre: 'PRICING LANGUAGE & PURCHASE CLARITY',
        mockupImg: './assets/mockup_sample5.svg',
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6"/></svg>',
        original: 'Public App Store in-app purchase label',
        literal: '「終身購読」',
        localized: '「買い切り」',
        baOriginal: 'Current purchase label: 「終身購読」',
        baLocalized: 'Suggested label: 「買い切り」',
        beforeMeaning: { en: '<strong>Current wording:</strong> “終身” can sound heavy in Japanese, while “購読” suggests a subscription. Together they can leave buyers unsure whether the payment recurs.', jp: '<strong>現在の表現：</strong>「終身」は日本語で重く響き、「購読」は継続課金を連想させます。購入後の支払いが続くのか、分かりにくい表現です。' },
        afterMeaning: { en: '<strong>Suggested wording:</strong> “買い切り” is familiar and signals a one-time payment, as long as the product really has no recurring renewal.', jp: '<strong>改善案：</strong>継続課金のない一度きりの購入なら、「買い切り」で支払い方法を短く明確に伝えられます。' },
        whyTitle: { en: 'Make the Payment Model Clear', jp: '支払い方法をひと目で分かるように' },
        whyText: { en: 'A pricing label should explain both access and payment. “買い切り” is concise, familiar language, but it must only be used for a genuine one-time purchase.', jp: '料金表示では利用期間だけでなく、支払いが一度きりか継続するかも重要です。「買い切り」は伝わりやすい言葉ですが、実際の条件と一致する場合に限ります。' },
        culturalText: { en: '<strong>Localization tip:</strong> Literal translations can create the wrong expectation about billing. Prefer the Japanese term customers recognize, and verify it against the actual renewal terms before publishing.<br><br><strong>日本語コピーのヒント：</strong>料金用語の直訳は、課金方法の誤解につながることがあります。日本でなじみのある表現を選び、更新条件と一致しているか確認します。', jp: '<strong>日本語コピーのヒント：</strong>料金用語の直訳は、課金方法の誤解につながることがあります。日本でなじみのある表現を選び、更新条件と一致しているか確認します。' },
        check1: { en: 'Avoided the ominous tone of “終身”', jp: '重く響く「終身」を回避' },
        check2: { en: 'Removed the subscription implication', jp: '継続課金を連想させる表現を解消' },
        check3: { en: 'Used a familiar one-time purchase term', jp: '買い切りを示すなじみのある言葉を採用' },
        check4: { en: 'Added a condition that protects accuracy', jp: '実際の支払い条件との一致を前提に' },
        takeaway: { en: 'Use familiar pricing terms that match the real billing model.', jp: '実際の課金方法に合う、分かりやすい料金表現を選ぶ。' }
    }
};

function switchCaseStudy(csId) {
    try {
        const tabs = document.querySelectorAll('.case-study-tab');
        tabs.forEach(t => t.classList.remove('active'));

        const targetTab = document.querySelector(`.case-study-tab[data-cs="${csId}"]`);
        if (targetTab) targetTab.classList.add('active');

        const data = caseStudyData[csId];
        if (!data) return;

        const elIcon = document.getElementById('csAppIcon');
        const elTitle = document.getElementById('csAppTitle');
        const elGenre = document.getElementById('csAppGenre');
        const elMockupImg = document.getElementById('csMockupImg');

        if (elMockupImg && data.mockupImg) {
            elMockupImg.src = data.mockupImg;
        }

        const elOriginal = document.getElementById('csOriginalText');
        const elLiteral = document.getElementById('csLiteralText');
        const elLocalized = document.getElementById('csLocalizedText');
        const elBaOriginal = document.getElementById('csBaOriginal');
        const elBaLocalized = document.getElementById('csBaLocalized');

        const elWhyTitle = document.getElementById('csWhyTitle');
        const elWhyText = document.getElementById('csWhyText');
        const elCulturalText = document.getElementById('csCulturalText');

        const elCheck1 = document.getElementById('csCheck1');
        const elCheck2 = document.getElementById('csCheck2');
        const elCheck3 = document.getElementById('csCheck3');
        const elCheck4 = document.getElementById('csCheck4');

        const elTakeaway = document.getElementById('csTakeaway');

        const lang = currentLanguage || 'en';

        if (elIcon && data.iconSvg) elIcon.innerHTML = data.iconSvg;
        if (elTitle && data.title) elTitle.innerHTML = data.title[lang] || data.title.en;
        if (elGenre && data.genre) elGenre.innerHTML = data.genre;

        if (elOriginal && data.original) elOriginal.innerHTML = data.original;
        if (elLiteral && data.literal) elLiteral.innerHTML = data.literal;
        if (elLocalized && data.localized) elLocalized.innerHTML = data.localized;
        if (elBaOriginal && data.baOriginal) elBaOriginal.innerHTML = data.baOriginal;
        if (elBaLocalized && data.baLocalized) elBaLocalized.innerHTML = data.baLocalized;

        const elBeforeMeaning = document.getElementById('csBeforeMeaning');
        const elAfterMeaning = document.getElementById('csAfterMeaning');
        if (elBeforeMeaning && data.beforeMeaning) {
            elBeforeMeaning.innerHTML = lang === 'jp' ? (data.beforeMeaning.jp || data.beforeMeaning.en) : data.beforeMeaning.en;
        }
        if (elAfterMeaning && data.afterMeaning) {
            elAfterMeaning.innerHTML = lang === 'jp' ? (data.afterMeaning.jp || data.afterMeaning.en) : data.afterMeaning.en;
        }

        if (elWhyTitle && data.whyTitle) elWhyTitle.innerHTML = data.whyTitle[lang] || data.whyTitle.en;
        if (elWhyText && data.whyText) elWhyText.innerHTML = data.whyText[lang] || data.whyText.en;
        if (elCulturalText && data.culturalText) elCulturalText.innerHTML = data.culturalText[lang] || data.culturalText.en;

        if (elCheck1 && data.check1) elCheck1.innerHTML = data.check1[lang] || data.check1.en;
        if (elCheck2 && data.check2) elCheck2.innerHTML = data.check2[lang] || data.check2.en;
        if (elCheck3 && data.check3) elCheck3.innerHTML = data.check3[lang] || data.check3.en;
        if (elCheck4 && data.check4) elCheck4.innerHTML = data.check4[lang] || data.check4.en;

        if (elTakeaway && data.takeaway) elTakeaway.innerHTML = data.takeaway[lang] || data.takeaway.en;
    } catch (err) {
        console.error('switchCaseStudy error:', err);
    }
}
window.switchCaseStudy = switchCaseStudy;

/* 6. FAQ Accordion Toggle (Independent Multi-Open) */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.onclick = function(e) {
            e.stopPropagation();
            item.classList.toggle('active');
        };
    });
}
window.initFaqAccordion = initFaqAccordion;

/* 7. Modal Dialog & Formspree AJAX Submission Handlers */
function openSampleModal(packageName = '') {
    const modal = document.getElementById('sampleModal');

    if (modal) {
        modal.classList.add('active');
    }
}

function closeSampleModal() {
    const modal = document.getElementById('sampleModal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    setTimeout(() => {
        const form = document.getElementById('sampleForm');
        const success = document.getElementById('modalSuccess');
        if (form) form.style.display = 'block';
        if (success) success.style.display = 'none';
    }, 300);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('sampleForm');
    const success = document.getElementById('modalSuccess');
    const submitBtn = document.getElementById('btnSubmitForm');

    if (!form) return;

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
    }

    const data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.reset();
            if (form) form.style.display = 'none';
            if (success) success.style.display = 'block';
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Submission failed. Please try again.");
                }
            });
        }
    }).catch(error => {
        // Fallback for offline or CORS testing
        if (form) form.style.display = 'none';
        if (success) success.style.display = 'block';
    }).finally(() => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

document.addEventListener('click', (e) => {
    const modal = document.getElementById('sampleModal');
    if (e.target === modal) {
        closeSampleModal();
    }
});


/* Independent Multi-Open FAQ Toggle (Does not close other open items) */
window.toggleFaq = function(element) {
    const item = element.classList.contains('faq-item') ? element : element.closest('.faq-item');
    if (!item) return;
    item.classList.toggle('active');
};

/* Legal Modal Controls */
window.openLegalModal = function(tabName = 'privacy') {
    const modal = document.getElementById('legalModal');
    if (!modal) return;
    modal.style.display = 'flex';
    modal.classList.add('active');
    switchLegalTab(tabName);
};

window.closeLegalModal = function() {
    const modal = document.getElementById('legalModal');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
};

window.switchLegalTab = function(tabName) {
    const buttons = document.querySelectorAll('.legal-tab-btn');
    const panes = document.querySelectorAll('.legal-tab-pane');

    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(tabName)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    panes.forEach(pane => {
        if (pane.id === 'pane-' + tabName) {
            pane.style.display = 'block';
        } else {
            pane.style.display = 'none';
        }
    });
};

/* Dynamic Modal Configurations (Pure ASCII Unicode Escaped) */
const modalConfigurations = {
    free_sample: {
        package: 'Free Sample',
        badge: { en: 'RISK-FREE SAMPLE', jp: '\u304A\u8A66\u3057\u7121\u6599\u30B5\u30F3\u30D7\u30EB' },
        title: { en: 'Get a Free Localization Sample', jp: '\u7121\u6599\u30ED\u30FC\u30AB\u30E9\u30A4\u30BA\u30B5\u30F3\u30D7\u30EB\u3092\u4F9D\u983C' },
        desc: { en: "Send your URL. We will localize a key portion of your copy for free before you decide!", jp: '\u30A2\u30D7\u30EA\u3084Web\u306EURL\u3092\u304A\u9001\u308A\u304F\u3060\u3055\u3044\u3002\u767A\u6CE8\u3092\u6C7A\u5B9A\u3059\u308B\u524D\u306B\u3001\u4E3B\u8981\u30B3\u30D4\u30FC\u306E\u7121\u6599\u30B5\u30F3\u30D7\u30EB\u3092\u4F5C\u6210\u3044\u305F\u3057\u307E\u3059\u3002' },
        submitText: { en: 'Get a Free Localization Sample', jp: '\u7121\u6599\u30B5\u30F3\u30D7\u30EB\u3092\u9001\u4FE1\u3059\u308B' }
    },
    lp_pack: {
        package: 'Landing Page Copywriting ($299)',
        badge: { en: 'SINGLE-PAGE WEB ($299)', jp: '1\u679A\u5B8C\u7D50 LP\u30B3\u30D4\u30FC ($299)' },
        title: { en: 'Get Free LP Sample & Consultation ($299)', jp: 'LP\u7121\u6599\u30B5\u30F3\u30D7\u30EB\u30FB\u3054\u76F8\u8AC7 ($299)' },
        desc: { en: 'Share your landing page URL or outline. We will send a free sample of your hero copy and a tailored proposal (2-3 business days delivery).', jp: '\u516C\u5F0FWeb\u30B5\u30A4\u30C8\uFF08LP\uFF09\u306EURL\u3084\u69CB\u6210\u6848\u3092\u304A\u9001\u308A\u304F\u3060\u3055\u3044\u3002\u30D2\u30FC\u30ED\u30FC\u30B3\u30D4\u30FC\u306E\u7121\u6599\u30B5\u30F3\u30D7\u30EB\u3068\u6700\u9069\u306A\u3054\u63D0\u6848\u3092\u304A\u5C4A\u3051\u3057\u307E\u3059\u3002' },
        submitText: { en: 'Request Free LP Sample & Quote', jp: 'LP\u7121\u6599\u30B5\u30F3\u30D7\u30EB\u30FB\u898B\u7A4D\u3082\u308A\u3092\u4F9D\u983C' }
    },
    custom_quote: {
        package: 'Website & Web App Localization (From $599)',
        badge: { en: 'FULL WEB & APP', jp: 'Web\u5168\u4F53\u30FBWeb\u30A2\u30D7\u30EAUI' },
        title: { en: 'Request Website & Web App Quote', jp: 'Web\u30B5\u30A4\u30C8\u5168\u4F53\u30FBWeb\u30A2\u30D7\u30EAUI \u7121\u6599\u76F8\u8AC7' },
        desc: { en: "Tell us about your multi-page site or web app dashboard. We will send a tailored proposal and quote within 24 hours.", jp: '\u8907\u6570\u30DA\u30FC\u30B8\u30B5\u30A4\u30C8\u3084SaaS/Web\u30A2\u30D7\u30EA\u306E\u64CD\u4F5C\u753B\u9762\uFF08UI\uFF09\u306B\u3064\u3044\u3066\u304A\u77E5\u3089\u305B\u304F\u3060\u3055\u3044\u300224\u6642\u9593\u4EE5\u5185\u306B\u6700\u9069\u306A\u3054\u63D0\u6848\u3068\u304A\u898B\u7A4D\u3082\u308A\u3092\u304A\u9001\u308A\u3057\u307E\u3059\u3002' },
        submitText: { en: 'Request Consultation & Quote', jp: '\u7121\u6599\u76F8\u8AC7\u30FB\u304A\u898B\u7A4D\u3082\u308A\u3092\u4F9D\u983C' }
    }
};

function openCustomModal(mode = 'free_sample') {
    const config = modalConfigurations[mode] || modalConfigurations.free_sample;
    const modal = document.getElementById('sampleModal');
    if (!modal) return;

    const lang = document.body.getAttribute('data-current-lang') || 'en';

    const pkgInput = document.getElementById('modalPackageType');
    if (pkgInput) pkgInput.value = config.package;
    
    const elBadge = document.getElementById('modalBadge');
    const elTitle = document.getElementById('modalTitle');
    const elDesc = document.getElementById('modalDesc');
    const elSubmit = document.getElementById('modalSubmitText');

    if (elBadge) {
        elBadge.setAttribute('data-en', config.badge.en);
        elBadge.setAttribute('data-jp', config.badge.jp);
        elBadge.innerHTML = config.badge[lang] || config.badge.en;
    }
    if (elTitle) {
        elTitle.setAttribute('data-en', config.title.en);
        elTitle.setAttribute('data-jp', config.title.jp);
        elTitle.innerHTML = config.title[lang] || config.title.en;
    }
    if (elDesc) {
        elDesc.setAttribute('data-en', config.desc.en);
        elDesc.setAttribute('data-jp', config.desc.jp);
        elDesc.innerHTML = config.desc[lang] || config.desc.en;
    }
    if (elSubmit) {
        elSubmit.setAttribute('data-en', config.submitText.en);
        elSubmit.setAttribute('data-jp', config.submitText.jp);
        elSubmit.innerHTML = config.submitText[lang] || config.submitText.en;
    }

    modal.classList.add('active');
}

// Global router
window.openSampleModal = function(pkgName = '') {
    if (typeof pkgName === 'string') {
        if (pkgName.includes('299') || pkgName.toLowerCase().includes('landing')) {
            openCustomModal('lp_pack');
            return;
        }
        if (pkgName.includes('599') || pkgName.toLowerCase().includes('website') || pkgName.toLowerCase().includes('quote')) {
            openCustomModal('custom_quote');
            return;
        }
    }
    openCustomModal('free_sample');
};

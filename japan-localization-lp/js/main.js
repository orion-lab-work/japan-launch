/* ==========================================================================
   Japan Launch - Main JavaScript Logic (v18 Formspree Integration)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initSakuraPetals();
    initSampleTabs();
    initCaseStudyTouchTabs();
    initFaqAccordion();
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
        switchCaseStudy(csId);
    }
}

/* 3. Mobile Touch Friendly Event Registration for Case Study Tabs */
function initCaseStudyTouchTabs() {
    const csTabs = document.querySelectorAll('.case-study-tab');
    csTabs.forEach(tab => {
        const handler = (e) => {
            const csId = tab.getAttribute('data-cs');
            if (csId) {
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

/* 5. Interactive Live Case Study Switcher (Samples #01 ~ #05 Visual UI) */
const caseStudyData = {
    sample1: {
        title: { en: `Sample #01: AI Meeting Notes App`, jp: `サンプル #01：AI議事録・ミーティングアプリ` },
        genre: `PRODUCTIVITY APP LOCALIZATION`,
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`,
        original: `"AI-powered meeting assistant that records, summarizes, and organizes every meeting."`,
        literal: `「AIを搭載した会議アシスタント。すべての会議を録音し、要約して整理します。」`,
        localized: `「AIが会議内容を自動で整理。<br>面倒な議事録作成や情報共有を、もっとスムーズに。」`,
        baOriginal: `Original: AI-powered meeting assistant.`,
        baLocalized: `Japanese Copy: AIが会議内容を自動で整理。議事録作成をもっとスムーズに。`,
        whyTitle: { en: `Focus on Benefits, Not Features`, jp: `機能一覧ではなく「メリット」を強調` },
        whyText: {
            en: `The original copy emphasizes technical features. Japanese users often respond better to clear outcomes than feature lists. Instead of highlighting that the app is 'AI-powered', we focused on what users actually gain: saving time and making meeting notes easier to share.`,
            jp: `元の英語は技術的な機能を主張しています。しかし日本のユーザーは機能一覧よりも「何が得られるか」に惹かれます。『AI搭載』とアピールする代わりに、時間短縮や共有の楽さという直接的なメリットを訴求しました。`
        },
        culturalText: {
            en: `Japanese App Store users typically look for practical value first. Copy that immediately answers 'How does this help me?' tends to feel more trustworthy than feature-heavy descriptions.`,
            jp: `日本のApp Storeユーザーは、まず実用的な価値を求めます。「自分にどんな得があるか」に即座に答えるコピーは、機能重視の説明文よりも高い信頼感を獲得できます。`
        },
        check1: { en: `Replaced technical wording with user benefits`, jp: `難解な専門用語をユーザーの具体的メリットへ置換` },
        check2: { en: `Improved natural Japanese flow`, jp: `日本人がストレスなく読める自然な文章リズム` },
        check3: { en: `Adapted the tone for Japanese readers`, jp: `日本のストアに馴染むトーン＆マナーに調整` },
        check4: { en: `Focused on clarity instead of direct translation`, jp: `単なる直訳ではなく、伝わりやすさを最優先` },
        takeaway: {
            en: `"Localization isn't about translating words. It's about making your product feel natural to Japanese users."`,
            jp: `「ローカライズとは単に単語を翻訳することではありません。あなたのアプリを日本のユーザーに『自然な製品』と感じさせることです。」`
        }
    },
    sample2: {
        title: { en: `Sample #02: AI Image Generator App`, jp: `サンプル #02：AI画像生成アプリ` },
        genre: `GRAPHICS & DESIGN LOCALIZATION`,
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
        original: `"Create stunning AI-generated images in seconds with powerful prompts."`,
        literal: `「強力なプロンプトで数秒で美しいAI画像を生成します。」`,
        localized: `「思い描いたイメージを、数秒で高品質なAI画像に。<br>誰でも簡単に、理想のビジュアルを作成できます。」`,
        baOriginal: `Original: Create stunning AI-generated images in seconds.`,
        baLocalized: `Japanese Copy: 思い描いたイメージを、数秒で高品質なAI画像に。`,
        whyTitle: { en: `Speak to the User's Goal`, jp: `技術ではなくユーザーの達成したい目的を語る` },
        whyText: {
            en: `The original copy focuses on the technology ('powerful prompts'). Japanese users connect more with the result they want to achieve. Instead of emphasizing technical terminology, we focused on creating beautiful images quickly and easily.`,
            jp: `元の英語は「強力なプロンプト」という技術仕様に焦点を当てています。しかし日本のユーザーは自分が達成したい成果に共感します。技術用語をアピールするのではなく「思い描いたビジュアルを簡単に作れる」点に焦点を当てました。`
        },
        culturalText: {
            en: `Japanese User Tip: Many Japanese users are unfamiliar with technical AI terminology like 'prompts'. When introducing AI products in Japan, users respond better to clear, practical benefits. Describing the experience feels more natural than highlighting underlying tech.`,
            jp: `【日本のユーザーへのヒント】多くの日本人ユーザーは「プロンプト」のようなAI専門用語に馴染みがありません。日本でAI製品を紹介する際は、難解な技術仕様よりも直感的な体験や仕上がりの良さを伝える方が親しみやすく響きます。`
        },
        check1: { en: `Reduced technical jargon (prompts)`, jp: `難解な技術用語（プロンプト等）を削減` },
        check2: { en: `Focused on the user's desired outcome`, jp: `ユーザーが望む理想の成果に焦点を固定` },
        check3: { en: `Improved readability & approachability`, jp: `読みやすさと親しみやすさを向上` },
        check4: { en: `Used natural Japanese expressions`, jp: `自然な日本語のニュアンスへ昇華` },
        takeaway: {
            en: `"Localization is about creating trust, not just translating words."`,
            jp: `「ローカライズとは単なる言葉の翻訳ではなく、ユーザーとの『信頼関係』を創り出すことです。」`
        }
    },
    sample3: {
        title: { en: `Sample #03: Team Productivity Platform`, jp: `サンプル #03：チーム生産性プラットフォーム` },
        genre: `BUSINESS & SAAS LOCALIZATION`,
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        original: `"Manage projects, track tasks, and collaborate seamlessly with your team—all in one workspace."`,
        literal: `「プロジェクトを管理し、タスクを追跡し、チームとシームレスにコラボレーションできます。すべてを1つのワークスペースで。」`,
        localized: `「プロジェクト管理からタスク共有まで、これひとつ。<br>チーム全員が、スムーズに情報を共有できるワークスペースです。」`,
        baOriginal: `Original: Collaborate seamlessly with your team.`,
        baLocalized: `Japanese Copy: チーム全員が、スムーズに情報を共有できます。`,
        whyTitle: { en: `Prioritize Clarity Over Buzzwords`, jp: `バズワードではなく「分かりやすさ」を最優先` },
        whyText: {
            en: `The original copy uses marketing terms like 'seamlessly' and 'all in one'. Instead of translating those expressions literally, we rewrote the message to clearly explain what users can actually do.`,
            jp: `元の英語は「シームレス」や「オールインワン」といった抽象的なバズワードを使っています。これらを直訳するのではなく、ユーザーが「実際に何ができるのか」を明快に説明する文章へリライトしました。`
        },
        culturalText: {
            en: `Japanese User Tip: Many English marketing phrases such as 'seamlessly', 'effortlessly', or 'all-in-one' don't translate naturally into Japanese. Japanese business users value clarity and reliability over promotional language. Replacing abstract expressions with concrete benefits creates a stronger first impression.`,
            jp: `【日本のユーザーへのヒント】「シームレス」「オールインワン」等の抽象的なマーケティング用語は、直訳しても日本人にはピンときません。日本のビジネスユーザーは誇張された表現よりも明瞭さと信頼性を好むため、具体的な体験価値に置き換えることでより強い信頼を獲得できます。`
        },
        check1: { en: `Removed vague marketing phrases`, jp: `あやふやな抽象的マーケティング用語を排除` },
        check2: { en: `Highlighted practical everyday use`, jp: `日々の業務における具体的使用イメージを強調` },
        check3: { en: `Improved readability`, jp: `一目で伝わる高い視認性と可読性` },
        check4: { en: `Used natural business Japanese`, jp: `自然で洗練された日本のビジネス日本語` },
        takeaway: {
            en: `"Good localization makes your product feel familiar—not translated."`,
            jp: `「優れたローカライズとは、製品を『翻訳されたもの』ではなく『身近で使いやすいもの』と感じさせることです。」`
        }
    },
    sample4: {
        title: { en: `Sample #04: AI Writing Assistant Landing Page`, jp: `サンプル #04：AIライティングアシスタント LP` },
        genre: `MARKETING LP LOCALIZATION`,
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
        original: `"Write better content faster with AI. The smartest writing assistant for creators."`,
        literal: `「AIでより良いコンテンツをより速く書きましょう。クリエイターのための最も賢いライティングアシスタント。」`,
        localized: `「AIが、あなたの文章作成をサポート。<br>アイデア整理から記事作成まで、もっと早く、もっと自然に。」`,
        baOriginal: `Original: The smartest writing assistant for creators.`,
        baLocalized: `Japanese Copy: アイデア整理から記事作成まで、もっと早く、もっと自然に。`,
        whyTitle: { en: `Build Trust Before Making Big Claims`, jp: `大きな主張をする前に「信頼」を構築する` },
        whyText: {
            en: `The original copy uses strong marketing language such as 'The smartest'. Instead of making a bold claim, we shifted the focus to practical value and everyday use. This approach feels much more trustworthy to Japanese users.`,
            jp: `元の英語は「最も賢い（The smartest）」といった強気なマーケティング表現を使っています。大げさな主張をする代わりに、実用的な価値や日常での使いやすさに焦点をシフトさせました。このアプローチの方が日本のユーザーに高い信頼感を与えます。`
        },
        culturalText: {
            en: `Japanese User Tip: Japanese users are generally more receptive to copy that demonstrates usefulness than copy that relies on superlatives like 'best', 'smartest', or 'No.1'. In Japan, users prefer to understand how a product improves their daily work before believing claims about being the 'best'. Reducing exaggerated claims makes a product feel more credible.`,
            jp: `【日本のユーザーへのヒント】日本のユーザーは「最高」「No.1」「最も賢い」といった最上級の表現よりも、実際の有用性を伝えてくれるコピーを好みます。商品が「最高」だと信じる前に、日々の作業がどう改善されるかを理解したいと考えます。誇張表現を抑えることで、製品への信頼性がグッと高まります。`
        },
        check1: { en: `Replaced bold marketing claims with practical benefits`, jp: `大げさな表現を実践的なベネフィットへ置き換え` },
        check2: { en: `Built trust through a calmer tone`, jp: `落ち着いたトーンで誠実な信頼感を醸成` },
        check3: { en: `Adapted the message for Japanese expectations`, jp: `日本のユーザーの心理的期待に合わせて表現を調整` },
        check4: { en: `Improved readability`, jp: `文章のリズムと視認性を向上` },
        takeaway: {
            en: `"Great localization builds confidence before asking for trust."`,
            jp: `「優れたローカライズは、信頼を求める前に、まずユーザーに安心感（納得感）を与えます。」`
        }
    },
    sample5: {
        title: { en: `Sample #05: AI Design App Store Listing`, jp: `サンプル #05：AIデザインアプリ ストア説明文` },
        genre: `STORE LISTING LOCALIZATION`,
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
        original: `"Turn your ideas into beautiful designs with AI. Create logos, illustrations, social media posts, and marketing materials in minutes. No design experience required. Simply describe what you want, and let AI do the rest."`,
        literal: `「AIであなたのアイデアを美しいデザインに変えましょう。ロゴ、イラスト、SNS投稿、マーケティング素材を数分で作成できます。デザイン経験は必要ありません。欲しいものを説明するだけで、残りはAIが行います。」`,
        localized: `「アイデアを入力するだけで、高品質なデザインをすぐに作成。<br>ロゴやイラスト、SNS投稿画像、広告クリエイティブまで、AIがスピーディーに生成します。<br>専門知識やデザイン経験は不要。初めての方でも、思い通りのデザインを簡単に作れます。」`,
        baOriginal: `Original: No design experience required.`,
        baLocalized: `Japanese Copy: 専門知識やデザイン経験は不要。初めての方でも、思い通りのデザインを簡単に作れます。`,
        whyTitle: { en: `Make the Experience Feel More Reassuring`, jp: `体験をより「安心できるもの」に再構築` },
        whyText: {
            en: `Rather than translating sentence by sentence, we reorganized the message to match how Japanese users evaluate apps: starting with the main benefit, adding practical examples, and finishing by reducing uncertainty for first-time users.`,
            jp: `一文ずつ直訳するのではなく、日本のユーザーがアプリを評価する思考プロセスに合わせて情報順序を再構築しました。「メインのメリット」→「具体的活用例」→「初めての方への不安払拭」という流れで安心感を提供しています。`
        },
        culturalText: {
            en: `Japanese User Tip: Japanese users often look for reassurance before trying a new product. Adding a sentence that lowers psychological barriers (e.g. '初めての方でも安心') can increase trust and make the product feel much more approachable.`,
            jp: `【日本のユーザーへのヒント】日本のユーザーは新しいプロダクトを試す前に「心理的安心」を求めます。「初めての方でも簡単に作れます」のような心理的ハードルを下げる一文を加えることで、不安が和らぎ、格段に導入しやすくなります。`
        },
        check1: { en: `Reorganized the information flow logically`, jp: `情報フローを日本のユーザー思考に合わせて再構成` },
        check2: { en: `Reduced technical & feature emphasis`, jp: `技術アピールを抑え使いやすさを強調` },
        check3: { en: `Added reassurance for first-time users`, jp: `「初めての方でも安心」という心理的安心感を追加` },
        check4: { en: `Improved readability & adapted market tone`, jp: `読みやすさと日本市場向けトーンの最適化` },
        takeaway: {
            en: `"Good localization changes more than words. It improves order, tone, and message so your product feels naturally designed for Japanese users."`,
            jp: `「優れたローカライズは単語以上のものを変えます。順序・トーン・メッセージを整え、製品がまるで日本のユーザーのために設計されたかのように感じさせます。」`
        }
    }
};

function switchCaseStudy(csId) {
    const tabs = document.querySelectorAll('.case-study-tab');
    tabs.forEach(t => t.classList.remove('active'));

    const targetTab = document.querySelector(`.case-study-tab[data-cs="${csId}"]`);
    if (targetTab) targetTab.classList.add('active');

    const data = caseStudyData[csId];
    if (!data) return;

    const elIcon = document.getElementById('csAppIcon');
    const elTitle = document.getElementById('csAppTitle');
    const elGenre = document.getElementById('csAppGenre');

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

    if (elIcon) elIcon.innerHTML = data.iconSvg;
    if (elTitle) elTitle.innerHTML = data.title[lang] || data.title.en;
    if (elGenre) elGenre.innerHTML = data.genre;

    if (elOriginal) elOriginal.innerHTML = data.original;
    if (elLiteral) elLiteral.innerHTML = data.literal;
    if (elLocalized) elLocalized.innerHTML = data.localized;
    if (elBaOriginal) elBaOriginal.innerHTML = data.baOriginal;
    if (elBaLocalized) elBaLocalized.innerHTML = data.baLocalized;

    if (elWhyTitle) elWhyTitle.innerHTML = data.whyTitle[lang] || data.whyTitle.en;
    if (elWhyText) elWhyText.innerHTML = data.whyText[lang] || data.whyText.en;
    if (elCulturalText) elCulturalText.innerHTML = data.culturalText[lang] || data.culturalText.en;

    if (elCheck1) elCheck1.innerHTML = data.check1[lang] || data.check1.en;
    if (elCheck2) elCheck2.innerHTML = data.check2[lang] || data.check2.en;
    if (elCheck3) elCheck3.innerHTML = data.check3[lang] || data.check3.en;
    if (elCheck4) elCheck4.innerHTML = data.check4[lang] || data.check4.en;

    if (elTakeaway) elTakeaway.innerHTML = data.takeaway[lang] || data.takeaway.en;
}

/* 6. FAQ Accordion Toggle */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

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

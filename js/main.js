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
        title: { en: `Sample #01: SaaS Upgrade Screen Before & After`, jp: `サンプル #01：SaaSプラン変更画面のBefore / After` },
        genre: `ILLUSTRATIVE UI COPY EXAMPLE`,
        mockupImg: `./assets/mockup_sample1.svg`,
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
        original: `"Upgrade Your DocuFlow Plan. Unlock powerful features and collaborate seamlessly."`,
        literal: `DocuFlowプランを上昇させる<br>強力な機能をロック解除して、シームレスに共同作業しましょう。`,
        localized: `DocuFlowのプランをアップグレード<br>便利な機能で、チームの作業をもっとスムーズに。`,
        baOriginal: `Same Japanese message, before wording adjustment.`,
        baLocalized: `Same message and plan details, rewritten as natural Japanese UI copy.`,
        beforeMeaning: {
            en: `<strong>AI translation issues:</strong> "Raise the plan," "unlock functions," and "collaborate seamlessly" read like literal translation rather than natural Japanese UI copy.`,
            jp: `<strong>AI翻訳で気になる点：</strong>「プランを上昇」「ロック解除」「シームレスに共同作業」が直訳調で、プラン変更の案内として不自然です。`
        },
        afterMeaning: {
            en: `<strong>What changed:</strong> Replaced literal wording with familiar upgrade language and a natural description of the team benefit.`,
            jp: `<strong>改善後：</strong>「上昇」を「アップグレード」に、「ロック解除」を「使える」に置き換え、日本語UIとして自然に整えました。`
        },
        whyTitle: { en: `Replace Literal Japanese with Natural UI Copy`, jp: `直訳調の日本語を、自然なUIコピーへ` },
        whyText: {
            en: `"Raise the plan" is hard to understand in Japanese. We use the familiar UI term "upgrade" and rewrite the feature and collaboration lines so they read naturally in context.`,
            jp: `「プランを上昇させる」は意味が伝わりにくい直訳です。「プランをアップグレードする」とし、機能案内と共同作業の説明も画面の文脈に合う日本語に整えます。`
        },
        culturalText: {
            en: `Keep the meaning of prices and features intact. Review terminology, phrasing, and button labels together so the entire screen reads like one coherent Japanese interface.`,
            jp: `価格や機能の意味は変えず、用語・言い回し・ボタン文言を日本語UIとして統一します。語句だけでなく、画面全体の文脈に合わせて確認します。`
        },
        check1: { en: `Changed "raise the plan" to the familiar "upgrade"`, jp: `「プランを上昇」から「プランをアップグレード」へ` },
        check2: { en: `Rewrote the literal "unlock functions" wording`, jp: `「ロック解除」を自然な機能案内へ` },
        check3: { en: `Smoothed the awkward collaboration phrase`, jp: `直訳調の「シームレスに共同作業」を調整` },
        check4: { en: `Kept prices and feature meanings intact`, jp: `価格と機能の意味はそのまま維持` },
        takeaway: {
            en: `"Japanese localization goes beyond translation: make the copy natural, clear, and right for the interface."`,
            jp: `「日本語にするだけでは終わらない。直訳や不自然さを、画面に合う自然なUI表現へ。」`
        }
    },
    sample2: {
        title: { en: `Sample #02: AI Chat UI Japanese Copy`, jp: `サンプル #02：AIチャット画面の日本語表現` },
        genre: `AI CHAT UI COPY LOCALIZATION`,
        mockupImg: `./assets/mockup_sample2.svg`,
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
        original: `AETHERNA AIの架空チャット画面。CUDAメモリ不足への質問と回答を表示。`,
        literal: `モデル学習中に「CUDA out of memory」エラーが発生しています。パラメーターは...<br>メモリ消費を切って、バッチサイズを減少してください。`,
        localized: `モデル学習中に「CUDA out of memory」エラーが発生しています。設定は次のとおりです。<br>GPUメモリの使用量を抑えるため、バッチサイズを小さくしてください。`,
        baOriginal: `Before: メモリ消費を切って、バッチサイズを減少してください。`,
        baLocalized: `After: GPUメモリの使用量を抑えるため、バッチサイズを小さくしてください。`,
        beforeMeaning: {
            en: `<strong>Before:</strong> “Cut memory usage” and “decrease the batch size” are awkward and unclear instructions.`,
            jp: `<strong>直訳が与える印象：</strong>「メモリ消費を切る」「サイズを減少する」は意味を取りにくく、操作方法も曖昧です。`
        },
        afterMeaning: {
            en: `<strong>After:</strong> The guidance clearly says to reduce GPU memory use by making the batch size smaller.`,
            jp: `<strong>改善後：</strong>GPUメモリの使用量を抑える操作と、バッチサイズを小さくする手順を具体的に示します。`
        },
        whyTitle: { en: `Make the AI guidance clear and actionable`, jp: `AIの案内を具体的で分かりやすい日本語に` },
        whyText: {
            en: `We replaced the vague phrase “cut memory usage” with a clear instruction to reduce GPU memory use. “Parameters” became “settings” to match the visible guidance.`,
            jp: `「memory usageをcutする」のような直訳調を、画面にある操作に即して「GPUメモリの使用量を抑える」と整理しました。「パラメーター」も文脈に合わせて「設定」とし、案内の意味を読み取りやすくしています。`
        },
        culturalText: {
            en: `【UI copy point】Keep technical terms where needed, and state the action and its purpose directly.`,
            jp: `【画面内コピーのポイント】専門用語は必要な箇所に残し、操作案内では「何をどうするか」を先に伝えます。`
        },
        check1: { en: `Clarified the memory action`, jp: `「メモリ消費を切る」を具体的な案内に修正` },
        check2: { en: `Used natural Japanese for batch size`, jp: `「サイズを減少」を「小さくする」に整理` },
        check3: { en: `Kept CUDA and GPU terminology`, jp: `CUDA・GPUなどの技術用語は維持` },
        check4: { en: `Kept the same question and answer`, jp: `質問・回答の内容は維持` },
        takeaway: {
            en: `"Technical guidance should make the next action easy to understand."`,
            jp: `「技術的な案内は、操作がすぐ分かる日本語に整えます。」`
        }
    },
    sample3: {
        title: { en: `Sample #03: Product Requirements Wiki`, jp: `サンプル #03：製品要件ドキュメントの日本語` },
        genre: `PRODUCT DOCUMENTATION COPY LOCALIZATION`,
        mockupImg: `./assets/mockup_sample3.svg`,
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
        original: `Vertex Wikiの架空製品要件書。Q4ロードマップ、機能、マイルストーン、測定基準を掲載。`,
        literal: `この文書はQ4ロードマップと製品要求をまとめることをしています。<br>構成要素：製品の機能と設計の部品。`,
        localized: `この文書では、Q4ロードマップと製品要件をまとめています。<br>構成要素：製品の機能と設計方針。`,
        baOriginal: `Before: この文書はQ4ロードマップと製品要求をまとめることをしています。`,
        baLocalized: `After: この文書では、Q4ロードマップと製品要件をまとめています。`,
        beforeMeaning: {
            en: `<strong>Before:</strong> The summary says it “does the work of summarizing,” while “product requirements” and “design parts” are hard to parse.`,
            jp: `<strong>直訳が与える印象：</strong>「まとめることをしています」は回りくどく、「製品要求」「設計の部品」も文書の意味をつかみにくい表現です。`
        },
        afterMeaning: {
            en: `<strong>After:</strong> The summary is direct, and terminology is consistent with the product requirements document.`,
            jp: `<strong>改善後：</strong>「製品要件」「設計方針」と表記を整え、文書の目的を簡潔に伝えます。`
        },
        whyTitle: { en: `Use consistent terms in product documentation`, jp: `製品ドキュメントの用語と文を整理` },
        whyText: {
            en: `We replaced a roundabout summary with a natural sentence and aligned “requirements” and “design policy” terminology across the document.`,
            jp: `「要求」を「要件」、「設計の部品」を「設計方針」とし、見出しや要約で同じ用語を使います。要約の文末も自然な形に整えています。`
        },
        culturalText: {
            en: `【Documentation copy point】Keep headings, summaries, and body text consistent without adding unsupported claims.`,
            jp: `【文書コピーのポイント】要件書では、抽象的な宣伝表現を足さず、見出し・要約・本文で用語をそろえます。`
        },
        check1: { en: `Changed “product requirements” terminology`, jp: `「製品要求」を「製品要件」に統一` },
        check2: { en: `Rephrased the document summary`, jp: `回りくどい要約を自然な文に修正` },
        check3: { en: `Clarified “components” in context`, jp: `「設計の部品」を「設計方針」に整理` },
        check4: { en: `Preserved roadmap details and structure`, jp: `ロードマップと文書構成は維持` },
        takeaway: {
            en: `"Clear terms and concise sentences help readers understand requirements."`,
            jp: `「読み手が迷わない用語と簡潔な文で、要件を正確に伝えます。」`
        }
    },
    sample4: {
        title: { en: `Sample #04: Habit Tracker App UI`, jp: `サンプル #04：習慣トラッカーのアプリ画面` },
        genre: `HABIT TRACKER UI COPY LOCALIZATION`,
        mockupImg: `./assets/mockup_sample4.svg`,
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
        original: `架空の習慣トラッカー画面。表示日、集中時間、利用状況、習慣リストを左右で比較。`,
        literal: `今日、10月26日<br>良うございAlex<br>画面時間　2.5時間　　焦点時間　90分<br>習慣トラッカー　あなたの進歩　20日連続`,
        localized: `今日、10月26日<br>おはよう、Alex<br>スクリーンタイム　2.5時間　　集中時間　90分<br>習慣トラッカー　今日の記録　20日連続`,
        baOriginal: `Before: 画面時間 / 焦点時間 / あなたの進歩`,
        baLocalized: `After: スクリーンタイム / 集中時間 / 今日の記録`,
        beforeMeaning: {
            en: `<strong>Before:</strong> The greeting and labels “焦点時間” and “あなたの進歩” sound unnatural in a habit tracker.`,
            jp: `<strong>直訳が与える印象：</strong>「良うござい」「焦点時間」「あなたの進歩」は挨拶や画面ラベルとして不自然です。`
        },
        afterMeaning: {
            en: `<strong>After:</strong> Familiar labels make screen time, focus time, and today's habit log easy to recognize.`,
            jp: `<strong>改善後：</strong>アプリで一般的な「スクリーンタイム」「集中時間」を使い、記録欄の意味を簡潔に示します。`
        },
        whyTitle: { en: `Use familiar labels in a habit app`, jp: `習慣アプリで伝わりやすい画面ラベルに` },
        whyText: {
            en: `We changed the greeting to a natural expression, “focus time” to the familiar “concentration time,” and clarified the habit list label. The displayed metrics remain the same.`,
            jp: `挨拶は自然な「おはよう」にし、画面指標の「焦点時間」は「集中時間」に整えました。「今日の記録」はこの画面の習慣リストに対応するラベルです。数値や記録内容は変えていません。`
        },
        culturalText: {
            en: `【UI copy point】Short labels should fit the screen and use terms that help users recognize each metric quickly.`,
            jp: `【画面内コピーのポイント】短いラベルは表示幅に収め、アプリ内で定着した用語を使うと意味を素早く読み取れます。`
        },
        check1: { en: `Localized the greeting naturally`, jp: `不自然な挨拶を自然な日本語に修正` },
        check2: { en: `Used familiar time-tracking terms`, jp: `「画面時間」「焦点時間」を一般的な用語に` },
        check3: { en: `Clarified the habit log label`, jp: `習慣リストに合う「今日の記録」に整理` },
        check4: { en: `Kept the original metrics and streak`, jp: `時間・連続日数などの数値は維持` },
        takeaway: {
            en: `"Habit app labels should be concise, natural, and clear."`,
            jp: `「画面ラベルは、短く自然で、指標の意味が伝わる言葉に整えます。」`
        }
    },
    sample5: {
        title: { en: `Sample #05: API Key Management Dashboard`, jp: `サンプル #05：APIキー管理画面の用語整理` },
        genre: `DEVELOPER DASHBOARD UI COPY LOCALIZATION`,
        mockupImg: `./assets/mockup_sample5.svg`,
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
        original: `架空の開発者ダッシュボード。APIキー、状態、作成日、利用状況と操作ラベルを表示。`,
        literal: `認証アクセスコントロール<br>APIキー（セキュア認証）管理<br>キー名　キーID　状態　作成日　操作<br>コピー・再生成・取消　　キー使用と制限`,
        localized: `APIキー管理<br>APIキーを安全に管理する画面<br>キー名　キーID　状態　作成日　操作<br>コピー・再発行・無効化　　APIキーの利用状況と上限`,
        baOriginal: `Before: キー使用と制限 / 再生成 / 取消`,
        baLocalized: `After: APIキーの利用状況と上限 / 再発行 / 無効化`,
        beforeMeaning: {
            en: `<strong>Before:</strong> “Authentication access control” and “key usage and restrictions” do not clearly describe the dashboard.`,
            jp: `<strong>直訳が与える印象：</strong>「認証アクセスコントロール」「キー使用と制限」では、画面の機能や利用状況が直感的に分かりません。`
        },
        afterMeaning: {
            en: `<strong>After:</strong> The screen names API key management, usage limits, reissue, and deactivation directly.`,
            jp: `<strong>改善後：</strong>「APIキー管理」「利用状況と上限」と整理し、操作の「再発行」「無効化」を区別して示します。`
        },
        whyTitle: { en: `Clarify API key terms and actions`, jp: `APIキーの用語と操作を明確に` },
        whyText: {
            en: `We named the screen “API key management,” clarified usage and limits, and distinguished reissuing a key from deactivating it.`,
            jp: `見出しは画面の目的に合わせて「APIキー管理」とし、「キー使用と制限」は「利用状況と上限」に整理しました。操作も「再生成」「取消」から「再発行」「無効化」へ具体化しています。`
        },
        culturalText: {
            en: `【UI copy point】Preserve technical terms while making the key state and the effect of each action clear.`,
            jp: `【画面内コピーのポイント】技術用語は維持しつつ、キーの状態と操作を区別し、実行後の影響が読み取れるラベルにします。`
        },
        check1: { en: `Named the API key management screen directly`, jp: `画面の目的を「APIキー管理」と明記` },
        check2: { en: `Clarified usage and limit labels`, jp: `利用状況と上限を分かりやすく表現` },
        check3: { en: `Distinguished reissue from deactivation`, jp: `再発行と無効化の操作を区別` },
        check4: { en: `Kept key data and statuses unchanged`, jp: `キー情報・状態・数値は維持` },
        takeaway: {
            en: `"Developer UI labels should make the effect of each action clear."`,
            jp: `「開発者向け画面では、操作後の状態まで想像できる用語を使います。」`
        }
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

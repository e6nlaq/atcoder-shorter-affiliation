import stringWidth from "string-width";
import { GM_getValue, GM_registerMenuCommand, GM_setValue } from "$";

function applyTruncation() {
    const maxLength = GM_getValue<number>("maxLength", 20);
    const spans = document.querySelectorAll<HTMLElement>(
        ".standings-affiliation",
    );

    for (const span of Array.from(spans)) {
        if (!span.dataset.originalText) {
            span.dataset.originalText = span.textContent || "";
        }

        const text = span.dataset.originalText;
        const currentWidth = stringWidth(text);

        if (currentWidth > maxLength) {
            // stringWidthを考慮して切り詰め
            let truncatedText = "";
            let runningWidth = 0;
            const ellipsis = "…";
            const ellipsisWidth = stringWidth(ellipsis);
            const targetWidth = maxLength - ellipsisWidth;

            for (const char of text) {
                const charWidth = stringWidth(char);
                if (runningWidth + charWidth > targetWidth) break;
                runningWidth += charWidth;
                truncatedText += char;
            }

            const newText = truncatedText + ellipsis;

            if (span.textContent !== newText) {
                span.textContent = newText;
                // Tooltipとして元のテキストを設定する
                span.title = text;
            }
        } else {
            if (span.textContent !== text) {
                span.textContent = text;
                span.removeAttribute("title");
            }
        }
    }
}

function init() {
    GM_registerMenuCommand("表示幅の設定 (AtCoder Shorter Affiliation)", () => {
        const currentN = GM_getValue<number>("maxLength", 32);
        const input = prompt(
            "所属の表示を省略する表示幅（半角基準）を入力してください:",
            String(currentN),
        );

        if (input !== null) {
            const newN = parseInt(input, 10);
            if (!Number.isNaN(newN) && newN > 0) {
                GM_setValue("maxLength", newN);
                applyTruncation();
            } else {
                alert("有効な正整数を入力してください。");
            }
        }
    });

    // 順位表は動的に更新されるため、MutationObserverで監視する
    const observer = new MutationObserver(() => {
        applyTruncation();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    applyTruncation();
}

init();

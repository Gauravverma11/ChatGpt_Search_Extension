(function () {

    // --- INSERT SEARCH BAR ---
    const bar = document.createElement("div");
    bar.id = "chat-search-bar";
    bar.innerHTML = `
        <input id="chat-search-input" placeholder="Search...">
        <button id="chat-prev">⬆</button>
        <button id="chat-next">⬇</button>
        <span id="chat-count">0/0</span>
        <button id="chat-close-btn">✕</button>
    `;
    document.body.appendChild(bar);

    const input = document.getElementById("chat-search-input");
    const next = document.getElementById("chat-next");
    const prev = document.getElementById("chat-prev");
    const closeBtn = document.getElementById("chat-close-btn");
    const count = document.getElementById("chat-count");

    let matches = [];
    let current = 0;

    // --- DRAGGABLE LOGIC ---
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    bar.onmousedown = (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;
        isDragging = true;
        offsetX = e.clientX - bar.offsetLeft;
        offsetY = e.clientY - bar.offsetTop;
    };

    document.onmousemove = (e) => {
        if (!isDragging) return;
        bar.style.left = (e.clientX - offsetX) + "px";
        bar.style.top = (e.clientY - offsetY) + "px";
        bar.style.right = "auto";
    };

    document.onmouseup = () => { isDragging = false; };


    // --- CLOSE BUTTON LOGIC ---
    closeBtn.onclick = () => {
        bar.style.display = "none";
    };


    // --- CLEAR HIGHLIGHTS ---
    function clearHighlights() {
        document.querySelectorAll("mark.chat-search-highlight").forEach(mark => {
            mark.replaceWith(mark.textContent);
        });
    }

    // --- HIGHLIGHT (WhatsApp Style) ---
    function highlightAll(term) {
        clearHighlights();
        matches = [];
        current = 0;

        if (!term) {
            count.textContent = "0/0";
            return;
        }

        const msgs = Array.from(document.querySelectorAll('[data-message-author-role]'));

        msgs.forEach(msg => {
            const walker = document.createTreeWalker(msg, NodeFilter.SHOW_TEXT);
            let node;

            while ((node = walker.nextNode())) {
                const text = node.nodeValue;
                const re = new RegExp(term, "gi");

                if (re.test(text)) {
                    const span = document.createElement("span");
                    span.innerHTML = text.replace(re, m =>
                        `<mark class="chat-search-highlight">${m}</mark>`
                    );
                    node.replaceWith(span);
                    matches.push(span);
                }
            }
        });

        if (matches.length > 0) {
            count.textContent = `1/${matches.length}`;
            scrollToMatch(0);
        } else {
            count.textContent = "0/0";
        }
    }


    // --- SCROLL TO MATCH ---
    function scrollToMatch(i) {
        current = i;
        const el = matches[current];
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        count.textContent = `${current + 1}/${matches.length}`;
    }


    // --- SEARCH INPUT LISTENER ---
    input.addEventListener("input", () => {
        highlightAll(input.value.trim());
    });


    // --- NEXT / PREV ---
    next.onclick = () => {
        if (matches.length) scrollToMatch((current + 1) % matches.length);
    };

    prev.onclick = () => {
        if (matches.length) scrollToMatch((current - 1 + matches.length) % matches.length);
    };


    // --- KEYBOARD SHORTCUT SUPPORT ---
    chrome.runtime.onMessage.addListener((msg) => {
        if (msg.action === "toggleSearchBar") {

            // Show bar if hidden
            bar.style.display = "flex";
            input.focus();
        }
    });

})();

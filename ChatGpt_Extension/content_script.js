(function () {

    // --- CREATE SEARCH BAR ---
    const bar = document.createElement("div");
    bar.innerHTML = `
      <div id="chat-search-bar">
          <input id="chat-search-input" placeholder="Search...">
          <button id="chat-prev">⬆</button>
          <button id="chat-next">⬇</button>
          <span id="chat-count">0/0</span>
      </div>
    `;
    document.body.appendChild(bar);

    const input = document.getElementById("chat-search-input");
    const next = document.getElementById("chat-next");
    const prev = document.getElementById("chat-prev");
    const count = document.getElementById("chat-count");

    let matches = [];
    let current = 0;

    // --- CLEAR OLD HIGHLIGHT MARK TAGS ---
    function clearHighlights() {
        document.querySelectorAll("mark.chat-search-highlight").forEach(mark => {
            mark.replaceWith(mark.textContent);
        });
    }

    // --- HIGHLIGHT USING <mark> (WhatsApp STYLE) ---
    function highlightAll(term) {
        clearHighlights();
        matches = [];
        current = 0;

        if (!term) {
            count.textContent = "0/0";
            return;
        }

        // ChatGPT message selector (SAFE)
        const msgs = Array.from(document.querySelectorAll('[data-message-author-role]'));

        msgs.forEach(msg => {
            const walker = document.createTreeWalker(msg, NodeFilter.SHOW_TEXT);

            let node;
            while ((node = walker.nextNode())) {
                const text = node.nodeValue;
                const regex = new RegExp(term, "gi");

                if (regex.test(text)) {
                    const span = document.createElement("span");
                    span.innerHTML = text.replace(regex, match =>
                        `<mark class="chat-search-highlight">${match}</mark>`
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

    // --- INPUT SEARCH ---
    input.addEventListener("input", () => {
        highlightAll(input.value.trim());
    });

    // --- NEXT BUTTON ---
    next.onclick = () => {
        if (matches.length) {
            scrollToMatch((current + 1) % matches.length);
        }
    };

    // --- PREVIOUS BUTTON ---
    prev.onclick = () => {
        if (matches.length) {
            scrollToMatch((current - 1 + matches.length) % matches.length);
        }
    };

})();

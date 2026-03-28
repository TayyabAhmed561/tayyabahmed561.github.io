(function () {
    const DEFAULT_TAB = "featured";

    function getPanels() {
        return document.querySelectorAll(".panel[data-panel]");
    }

    function setTab(id) {
        const panels = getPanels();

        panels.forEach((p) => {
            const match = p.dataset.panel === id;
            p.classList.toggle("is-active", match);
            p.setAttribute("aria-hidden", match ? "false" : "true");
        });

        if (history.replaceState) {
            history.replaceState(null, "", "#" + id);
        }

        document.querySelectorAll(".tab-nav [role='tab']").forEach((btn) => {
            const match = btn.dataset.tab === id;
            btn.classList.toggle("is-active", match);
            btn.setAttribute("aria-selected", match ? "true" : "false");
        });

        if (id === "gallery") {
            requestAnimationFrame(() => {
                document.dispatchEvent(new CustomEvent("gallery-layout-reflow"));
            });
        }

        syncPanelFooterNav(id);
    }

    function syncPanelFooterNav(activeId) {
        document.querySelectorAll("[data-panel-footer-link]").forEach((el) => {
            const match = el.getAttribute("data-panel-footer-link") === activeId;
            el.classList.toggle("is-active", match);
            if (match) {
                el.setAttribute("aria-current", "page");
            } else {
                el.removeAttribute("aria-current");
            }
        });
    }

    function onTabClick(e) {
        e.preventDefault();
        const id = this.dataset.tab;
        if (!id) return;
        setTab(id);
        const panel = document.querySelector(`.panel[data-panel="${id}"]`);
        if (panel) {
            const region = document.querySelector(".panel-region");
            if (region) region.scrollTop = 0;
        }
    }

    async function copyTextToClipboard(text) {
        try {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
                await navigator.clipboard.writeText(text);
                return true;
            }
        } catch (_) {
            /* fall through */
        }
        try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.setAttribute("readonly", "");
            ta.style.position = "fixed";
            ta.style.left = "-9999px";
            ta.style.top = "0";
            document.body.appendChild(ta);
            ta.select();
            ta.setSelectionRange(0, text.length);
            const ok = document.execCommand("copy");
            document.body.removeChild(ta);
            return ok;
        } catch (_) {
            return false;
        }
    }

    function initContactCopy() {
        const timers = new WeakMap();

        document.querySelectorAll(".contact-copy-btn[data-copy-email]").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const email = btn.getAttribute("data-copy-email");
                if (!email) return;

                const row = btn.closest(".contact-email-row__tail");
                const status = row ? row.querySelector(".contact-copy-status") : null;
                const prev = timers.get(btn);
                if (prev) clearTimeout(prev);

                const ok = await copyTextToClipboard(email);
                if (!ok || !status) return;

                status.textContent = "Copied";
                status.classList.add("is-visible");

                const t = window.setTimeout(() => {
                    status.classList.remove("is-visible");
                    status.textContent = "";
                    timers.delete(btn);
                }, 1600);
                timers.set(btn, t);
            });
        });
    }

    function projectItemHighlight() {
        document.querySelectorAll(".project-item").forEach((item) => {
            item.addEventListener("mousemove", (e) => {
                const r = item.getBoundingClientRect();
                const mx = ((e.clientX - r.left) / r.width) * 100;
                const my = ((e.clientY - r.top) / r.height) * 100;
                item.style.setProperty("--mx", `${mx}%`);
                item.style.setProperty("--my", `${my}%`);
            });
        });
    }

    function initHash() {
        const raw = (window.location.hash || "").replace("#", "");
        const h = raw === "work" ? "featured" : raw;
        if (raw === "work" && history.replaceState) {
            history.replaceState(null, "", "#featured");
        }
        const valid = ["featured", "gallery", "projects", "experience", "education", "research", "contact"];
        if (valid.includes(h)) setTab(h);
        else setTab(DEFAULT_TAB);
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".tab-nav [data-tab], .tab-trigger[data-tab]").forEach((el) => {
            el.addEventListener("click", onTabClick);
        });

        projectItemHighlight();
        initContactCopy();
        initHash();
        window.addEventListener("hashchange", initHash);
    });
})();

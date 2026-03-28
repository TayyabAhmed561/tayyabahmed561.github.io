/**
 * Contact copy + project-item cursor glow (delegated). Replaces legacy script.js tab/hash logic.
 */
const copyTimers = new WeakMap<HTMLButtonElement, ReturnType<typeof setTimeout>>();

async function copyTextToClipboard(text: string): Promise<boolean> {
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch {
        /* fall through */
    }
    try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
    } catch {
        return false;
    }
}

function onCopyClick(e: MouseEvent) {
    const btn = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>(".contact-copy-btn[data-copy-email]");
    if (!btn) return;
    e.preventDefault();
    const email = btn.getAttribute("data-copy-email");
    if (!email) return;

    const row = btn.closest(".contact-email-row__tail");
    const status = row?.querySelector<HTMLElement>(".contact-copy-status");
    const prev = copyTimers.get(btn);
    if (prev) clearTimeout(prev);

    void (async () => {
        const ok = await copyTextToClipboard(email);
        if (!ok || !status) return;
        status.textContent = "Copied";
        status.classList.add("is-visible");
        const t = window.setTimeout(() => {
            status.classList.remove("is-visible");
            status.textContent = "";
            copyTimers.delete(btn);
        }, 1600);
        copyTimers.set(btn, t);
    })();
}

function onProjectMouseMove(e: MouseEvent) {
    const item = (e.target as HTMLElement | null)?.closest<HTMLElement>(".project-item");
    if (!item) return;
    const r = item.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    item.style.setProperty("--mx", `${mx}%`);
    item.style.setProperty("--my", `${my}%`);
}

export function bindPortfolioDomEffects(): () => void {
    document.body.addEventListener("click", onCopyClick);
    document.body.addEventListener("mousemove", onProjectMouseMove);
    return () => {
        document.body.removeEventListener("click", onCopyClick);
        document.body.removeEventListener("mousemove", onProjectMouseMove);
    };
}

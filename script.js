let zipData = {};
let followers = new Set();
let following = new Set();

document.getElementById("zipInput").addEventListener("change", async e => {
    const file = e.target.files[0];
    if (!file) return;

    const zip = await JSZip.loadAsync(file);
    zipData = {};

    for (const path in zip.files) {
        zipData[path] = await zip.files[path].async("string");
    }

    document.getElementById("uploadedFile").textContent =
        "Uploaded: " + file.name;
});

document.getElementById("processBtn").addEventListener("click", () => {
    if (!Object.keys(zipData).length) {
        alert("Please upload Instagram ZIP first");
        return;
    }

    followers.clear();
    following.clear();

    readList("followers_1.html", followers);
    readList("following.html", following);

    render(
        "notFollowingBackList",
        [...following].filter(u => !followers.has(u))
    );

    render("blockedList", readOnly("blocked_profiles.html"));
    render("hideStoryList", readOnly("hide_story_from.html"));
    render("pendingList", readOnly("pending_follow_requests.html"));
    render("removedSuggestionsList", readOnly("removed_suggestions.html"));
    render("restrictedList", readOnly("restricted_profiles.html"));

    // Show menu after processing
    document.getElementById("menu").style.display = "block";

    // Auto open first section
    show("blocked");
});

/* ---------- HELPERS ---------- */

function readList(fileName, set) {
    const path = `connections/followers_and_following/${fileName}`;
    if (!zipData[path]) return;

    extract(zipData[path]).forEach(u => set.add(u));
}

function readOnly(fileName) {
    const path = `connections/followers_and_following/${fileName}`;
    if (!zipData[path]) return [];
    return extract(zipData[path]);
}

/* ✅ FIXED USERNAME EXTRACTION */
function extract(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");

    return [...doc.querySelectorAll("a")]
        .map(a => {
            let value = a.getAttribute("href") || a.textContent || "";

            value = value.trim()
                .replace("https://www.instagram.com/", "")
                .replace("http://www.instagram.com/", "")
                .replace("_u/", "")
                .replace(/\/$/, "");

            return value;
        })
        .filter(Boolean);
}

function render(id, users) {
    const el = document.getElementById(id);
    el.innerHTML = users.length ? "" : "<p>No profiles found.</p>";

    users.forEach(u => {
        const a = document.createElement("a");
        a.textContent = "@" + u;
        a.href = `https://www.instagram.com/${u}`;
        a.target = "_blank";
        a.className = "username";
        el.appendChild(a);
    });
}

function show(id) {
    document.querySelectorAll(".result")
        .forEach(d => d.style.display = "none");

    document.getElementById(id).style.display = "block";
}

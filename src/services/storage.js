export function getScoreboard() {
    const scoreboard = localStorage.getItem("scoreboard");

    return scoreboard ? JSON.parse(scoreboard) : [];
}

export function saveScore(name, score) {
    const scoreboard = getScoreboard();

    scoreboard.push([name, score]);

    scoreboard.sort((a, b) => b[1] - a[1]);

    localStorage.setItem(
        "scoreboard",
        JSON.stringify(scoreboard.slice(0, 10))
    );
}

export function clearScoreboard() {
    localStorage.removeItem("scoreboard");
}
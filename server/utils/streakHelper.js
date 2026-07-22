const calculateCurrentStreak = (dateResult) => {

    if (dateResult.length === 0) return 0;

    // Remove duplicate dates
    const uniqueDates = [
        ...new Set(
            dateResult.map(item =>
                new Date(item.solved_date).toISOString().split("T")[0]
            )
        )
    ];

    let streak = 0;

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = uniqueDates.length - 1; i >= 0; i--) {

        const solvedDate = new Date(uniqueDates[i]);
        solvedDate.setHours(0, 0, 0, 0);

        const diff =
            (today - solvedDate) / (1000 * 60 * 60 * 24);

        if (diff === streak) {
            streak++;
        } else if (diff > streak) {
            break;
        }

    }

    return streak;

};

module.exports = {
    calculateCurrentStreak
};
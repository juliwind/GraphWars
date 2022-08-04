let team1_size = 1;
let team2_size = 1;

initPlayers(team1_size, team2_size);

inputGraph.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();

        func = inputGraph.value;
        checkFunc(func);
    }
})


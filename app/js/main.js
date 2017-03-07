var Scoreboard = require('./scoreboard.js');

var Player = React.createClass({
    handleClick: function () {
        this.props.onUpdate(this.props.player);
    },

    render: function() {

        var largestScore = Math.max.apply(Math, this.props.allPlayersWins),
        selectedClass = (this.props.selectedPlayerAName == this.props.player.name || this.props.selectedPlayerBName == this.props.player.name) ? 'home-player-item active' : 'home-player-item',
        topWinScoreClass = (largestScore == this.props.player.wins) ? '' : 'not-top';

        return <li className={selectedClass + ' ' + topWinScoreClass} onClick={this.handleClick}>
            <div className="column">
                <h2>{this.props.player.name}</h2>
            </div>
            <div className="column">
                <h2>{this.props.player.wins}</h2>
            </div>
        </li>
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            players: [],
            playerName: '',
            playersEntered: false,
            matchOn: false,
            playerA: {'name': '', 'wins': 0},
            playerB: {'name': '', 'wins': 0},
            bestOf: 3
        };
    },

    handleSubmit: function(e) {
        e.preventDefault();

        this.setState({players: this.state.players.concat([{'name':this.state.playerName, 'wins': 0}]), playerName: ''});
    },

    onChange: function(e) {
        this.setState({playerName: e.target.value});
    },

    onChangeBestOf: function(e) {
        this.setState({bestOf: e.target.value});
    },

    readyBtnClickHandler: function () {
        this.setState({playersEntered: true});
    },

    handlePlayerSelection: function (player) {
        if (!player) {
            return false;
        }

        if (this.state.playerA.name === '') {
            this.setState({playerA: {'name': player.name }});
        } else if (this.state.playerB.name === '') {
            this.setState({playerB: {'name': player.name }});
        } else if (this.state.playerA.name === player.name) {
            this.setState({playerA: {'name': ''}});
        } else if (this.state.playerB.name === player.name) {
            this.setState({playerB: {'name': ''}});
        }
    },

    startMatch: function(e) {
        e.preventDefault();
        this.setState({matchOn: true});
    },

    endGameHandler: function(winner) {
        var playerA = this.state.playerA;
        var playerB = this.state.playerB;
        playerA.name = '';
        playerB.name = '';

        this.setState({matchOn: false});

        if (winner != 'noone') {
            this.incrementPlayersWin(winner);
        }
    },

    incrementPlayersWin: function(player) {
        if (!player) {
            return false;
        }

        var oldPlayers = this.state.players;

        for (var i in oldPlayers) {
            if (oldPlayers[i].name === player) {
                oldPlayers[i].wins++;
                this.setState({players: oldPlayers});
            }
        }
    },

    renderReadyButton: function () {
        if (this.state.players.length < 2) {
            return false;
        }

        return <div onClick={this.readyBtnClickHandler}>hide</div>;
    },

    renderStartScreen: function () {
        if (!this.state.playersEntered) {
            return <div className="container-player-entry">
                <form className="player-entry-form" onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.playerName} placeholder="Name" />
                    <button>Add player</button>

                    { this.renderReadyButton() }

                </form>
            </div>
        }

        return <div></div>;
    },

    renderScoreboard: function() {
        if (!this.state.matchOn) {
            return false;
        }

        return <Scoreboard scoreStart={301} bestOf={this.state.bestOf} playerA={this.state.playerA} playerB={this.state.playerB} onEndGame={this.endGameHandler} />;
    },

    renderHome: function() {
        if (this.state.matchOn) {
            return false;
        }

        var that = this,
        playerASelectedName,
        playerBSelectedName;

        if (this.state.playerA.hasOwnProperty('name') && this.state.playerB.hasOwnProperty('name')) {
            playerASelectedName = this.state.playerA.name;
            playerBSelectedName = this.state.playerB.name;
        }

        var allPlayersWins = [];

        for (var i in this.state.players) {
            if (this.state.players[i].hasOwnProperty('wins')) {
                allPlayersWins.push(this.state.players[i].wins);
            }
        }

        return <div className="container-home">
            <div className="home-content">

            <ul className="home-players">
                {this.state.players.map(function (player) {
                    return <Player player={player} selectedPlayerAName={playerASelectedName} selectedPlayerBName={playerBSelectedName} allPlayersWins={allPlayersWins} onUpdate={that.handlePlayerSelection} />;
                })}
            </ul>
            { this.renderStartMatchBtn() }

            </div>

            <div className="scoreboard-footer">
                <h1>DARTS 2016</h1>
            </div>
        </div>
    },

    renderStartMatchBtn: function () {
        if (this.state.playerA.name === '' || this.state.playerB.name === '') {
            return false;
        }

        return <div className="container-start-match">
        <form className="best-of-form" onSubmit={this.startMatch}>
        <input onChange={this.onChangeBestOf} value={this.state.bestOf} placeholder="Best of" />
        <button>START</button>

        </form>
        </div>
    },

    render: function() {
        return <div className="app-inner">

            { this.renderHome() }

            { this.renderStartScreen() }

            { this.renderScoreboard() }

        </div>
    },

});

ReactDOM.render(<App />, document.getElementById('app'));

var Scoreboard = require('./scoreboard.js');

var Player = React.createClass({
    handleClick: function () {
        this.props.onUpdate(this.props.player);
    },

    render: function() {
        var selectedClass = (this.props.selectedPlayerAName == this.props.player.name || this.props.selectedPlayerBName == this.props.player.name) ? 'home-player-item active' : 'home-player-item';

        return <li className={selectedClass} onClick={this.handleClick}>
            <div className="column"><h2>{this.props.player.name}</h2></div> <div className="column"><h2>{this.props.player.wins}</h2></div>
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

        console.log('endGameHandler() players', this.state.players);
    },

    incrementPlayersWin: function(player) {
        console.log('incrementPlayersWin() player: ', player);
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

        console.log('incrementPlayersWin() this.state.players: ', this.state.players);
    },

    renderReadyButton: function () {
        if (this.state.players.length < 2) {
            return <div></div>;
        }

        return <div onClick={this.readyBtnClickHandler}>Ready</div>;
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
            return <div></div>
        }

        return <Scoreboard scoreStart={301} bestOf={this.state.bestOf} playerA={this.state.playerA} playerB={this.state.playerB} onEndGame={this.endGameHandler} />;
    },

    renderHome: function() {
        if (this.state.matchOn) {
            return <div></div>
        }

        var that = this;
        var playerASelectedName;
        var playerBSelectedName;

        if (this.state.playerA.hasOwnProperty('name') && this.state.playerB.hasOwnProperty('name')) {
            playerASelectedName = this.state.playerA.name;
            playerBSelectedName = this.state.playerB.name;
        }

        return <div className="container-home">

        <div className="home-content">

        <ul className="home-players">
            {this.state.players.map(function (player) {
                return <Player player={player} selectedPlayerAName={playerASelectedName} selectedPlayerBName={playerBSelectedName} onUpdate={that.handlePlayerSelection} />;
            })}
        </ul>
        { this.renderStartMatchBtn() }

        </div>

        <div className="scoreboard-footer">
            <h1>FX OPEN 2016</h1>
        </div>
        </div>
    },

    renderStartMatchBtn: function () {
        if (this.state.playerA.name === '' || this.state.playerB.name === '') {
            return <div></div>
        }

        // return <div className="start-match-btn" onClick={this.startMatch}>Start match</div>;

        return <div className="container-start-match">
        <form className="best-of-form" onSubmit={this.startMatch}>
        <input onChange={this.onChangeBestOf} value={this.state.bestOf} placeholder="Best of" />
        <button>Start match</button>

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

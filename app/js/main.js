var Scoreboard = require('./scoreboard.js');

var Player = React.createClass({
    handleClick: function () {
        this.props.onUpdate(this.props.player);
    },

    render: function() {
        return <li className="home-player-item" onClick={this.handleClick}>
            <div className="column"><h2>{this.props.player.name}</h2></div> <div className="column"><h2>{this.props.player.legs}</h2></div>
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
            playerA: {'name': '', 'legs': 0, 'matches': 0},
            playerB: {'name': '', 'legs': 0, 'matches': 0}
        };
    },

    handleSubmit: function(e) {
        e.preventDefault();

        this.setState({players: this.state.players.concat([{'name':this.state.playerName, 'legs': 0, 'matches': 0}]), playerName: ''});
    },

    onChange: function(e) {
        this.setState({playerName: e.target.value});
    },

    readyBtnClickHandler: function () {
        this.setState({playersEntered: true});
    },

    handlePlayerSelection: function (player) {
        if (!player) {
            return false;
        }

        if (this.state.playerA.name === '') {
            this.setState({playerA: {'name': player.name, 'legs': player.legs}});
        } else {
            this.setState({playerB: {'name': player.name, 'legs': player.legs}});
        }
    },

    startMatch: function() {
        this.setState({matchOn: true});
    },

    endLegHandler: function (player) {
        console.log('endLegHandler() ');
        this.incrementPlayersLeg(player);
        
    },

    endGameHandler: function(player) {
        console.log('endGameHandler() ');

        this.incrementMatchesPlayed();

        var playerA = this.state.playerA;
        var playerB = this.state.playerB;
        playerA.name = '';
        playerB.name = '';
        playerA.legs = 0;
        playerB.legs = 0;

        this.setState({matchOn: false});

        console.log('endGameHandler() players', this.state.players);
    },

    incrementPlayersLeg: function(player) {
        console.log('incrementPlayersLeg() player: ', player);
        if (!player) {
            return false;
        }

        var oldPlayers = this.state.players;

        for (var i in oldPlayers) {
            if (oldPlayers[i].name === player) {
                oldPlayers[i].legs++;
                this.setState({players: oldPlayers});
            }
        }

        console.log('incrementPlayersLeg() this.state.players: ', this.state.players);
    },

    incrementMatchesPlayed: function() {
        var players = this.state.players;

        for (var i in players) {
            if (players[i].name === this.state.playerA.name || players[i].name === this.state.playerB.name ) {
                players[i].matches++;
            }
        }

        this.setState({players: players});
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

        return <Scoreboard scoreStart={301} playerA={this.state.playerA} playerB={this.state.playerB} onUpdate={this.endGameHandler} onEndLeg={this.endLegHandler}/>;
    },

    renderHome: function() {
        if (this.state.matchOn) {
            return <div></div>
        }

        var that = this;

        return <div className="container-home">

        <div className="home-content">

        <ul className="home-players">
            {this.state.players.map(function (player) {
                return <Player player={player} onUpdate={that.handlePlayerSelection} />;
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

        return <div className="start-match-btn" onClick={this.startMatch}>Start match</div>;
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

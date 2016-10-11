var Outchart = require('./outchart.js');

var Score = React.createClass({
    render: function() {
        return <div className="score">
            {this.props.score}
        </div>;
    }
});

var Scoreboard = React.createClass({
    getInitialState: function() {
        return {
            playerA: {scores: [this.props.scoreStart]},
            playerB: {scores: [this.props.scoreStart]},
            justThrownScore: '',
            isPlayerAsTurn: true
        };
    },

    componentDidMount: function() {
        var oldA = this.state.playerA;
        var oldB = this.state.playerB;

        oldA.name = this.props.playerA.name;
        oldB.name = this.props.playerB.name;

        this.setState({ playerA: oldA, playerB: oldB });
    },

    togglePlayersTurn: function() {
        this.setState({ isPlayerAsTurn: !this.state.isPlayerAsTurn });
    },

    getNewScore: function(currentScore) {
        return currentScore - this.state.justThrownScore;
    },

    getPlayersCurrentScore: function(player) {
        var playersScores = player.scores;

        return player.scores[playersScores.length - 1];
    },

    getCurrentPlayersTurn: function() {
        if (this.state.isPlayerAsTurn) {
            return this.state.playerA;
        }

        return this.state.playerB;
    },

    checkEndGame: function(score) {
        var currentPlayer = this.getCurrentPlayersTurn();

        if (score <= 0) {
            this.props.onUpdate(currentPlayer.name);
        } else {
            this.togglePlayersTurn();
        }
    },

    renderOutchart: function() {
        var currentPlayer = this.getCurrentPlayersTurn();

        return <Outchart currentScore={ this.getPlayersCurrentScore(currentPlayer) } currentPlayer={ currentPlayer } />;
    },

    handleSubmit: function(e) {
        e.preventDefault();

        this.shit();
    },

    shit: function() {
        var currentPlayersTurn = this.getCurrentPlayersTurn();

        var currentScore = this.getPlayersCurrentScore(currentPlayersTurn);
        var oldScores;
        var newScore;

        if (this.state.isPlayerAsTurn) {
            oldScores = this.state.playerA.scores;
            newScore = this.getNewScore(currentScore);
            var playerA = this.state.playerA;
            playerA.scores = oldScores.concat([newScore]);

            console.log('isPlayerAsTurn: oldscore: ', oldScores, 'newscore: ', newScore);

            this.setState({playerA: playerA, justThrownScore: ''});
        } else {
            oldScores = this.state.playerB.scores;
            newScore = this.getNewScore(currentScore);
            var playerB = this.state.playerB;
            playerB.scores = oldScores.concat([newScore]);

            this.setState({playerB: playerB, justThrownScore: ''});
        }

        console.log('shit() this.state.playerA', this.state.playerA);
        console.log('shit() this.state.playerB', this.state.playerB);

        this.checkEndGame(newScore);
    },

    onChange: function(e) {
        this.setState({justThrownScore: e.target.value});
    },

    render: function() {
        console.log('scoreboard. this.props.playerA ', this.props.playerA);

        return <div className="container-scoreboard">

            <div className="scoreboard-header">

            </div>

            <div className="scoreboard-content">

                <div className="player-row">
                    <div className="player-name">
                        <h1>{ this.props.playerA.name }</h1>
                    </div>
                    <div className="player-stats">
                        <ul>{this.state.playerA.scores.map(function (data) {
                            return <Score score={data}/>;
                            })}
                        </ul>
                        <div className="player-legs"><h1>{ this.props.playerA.legs }</h1></div>
                        <Outchart currentScore={ this.getPlayersCurrentScore(this.state.playerA) } />
                    </div>
                </div>

                <div className="player-row">
                    <div className="player-name">
                        <h1>{ this.props.playerB.name }</h1>
                    </div>
                    <div className="player-stats">
                        <ul>{this.state.playerB.scores.map(function (data) { return <Score score={data}/>; })}
                        </ul>
                        <div className="player-legs"><h1>{ this.props.playerB.legs }</h1></div>
                        <Outchart currentScore={ this.getPlayersCurrentScore(this.state.playerB) } />
                    </div>
                </div>

                <div className="score-submit">
                    <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.justThrownScore} placeholder="0" />
                    <button>Submit</button>
                    </form>
                </div>

            </div>


            <div className="scoreboard-footer">
                <p>FX OPEN 2016</p>
            </div>


            </div>

        },

});

module.exports = Scoreboard;

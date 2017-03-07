var Outchart = require('./outchart.js');

var Score = React.createClass({
    render: function() {
        return <div className="player-score">
            <h1>{this.props.score}</h1>
        </div>;
    }
});

var Scoreboard = React.createClass({
    getInitialState: function() {
        return {
            playerA: {scores: [this.props.scoreStart], legs: 0},
            playerB: {scores: [this.props.scoreStart], legs: 0},
            justThrownScore: 0,
            isPlayerAsTurn: true
        };
    },

    componentDidMount: function() {
        var oldA = this.state.playerA,
        oldB = this.state.playerB;

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

    getBestOf: function () {
        return <span>{ this.props.bestOf }</span>;
    },

    checkEndLeg: function(score) {
        var currentPlayer = this.getCurrentPlayersTurn(),
        oldPlayerA = this.state.playerA,
        oldPlayerB = this.state.playerB;

        if (score <= 0) {
            currentPlayer.legs++; //Win!

            //Reset
            oldPlayerA.scores = [301];
            oldPlayerB.scores = [301];

            this.setState({playerA: oldPlayerA, playerB: oldPlayerB});

            this.checkEndMatch();
        }

        this.togglePlayersTurn();
    },

    checkEndMatch: function() {
        var totalLegs = this.state.playerA.legs + this.state.playerB.legs,
        bestOf = this.props.bestOf,
        minimumLegsToWin = (parseInt(bestOf) + 1) * 0.5;

        if ((this.state.playerA.legs >= minimumLegsToWin || this.state.playerB.legs >= minimumLegsToWin) && totalLegs >= minimumLegsToWin) {
            this.props.onEndGame(this.getCurrentPlayersTurn().name);
        }

    },

    renderOutchart: function() {
        var currentPlayer = this.getCurrentPlayersTurn();

        return <Outchart currentScore={ this.getPlayersCurrentScore(currentPlayer) } currentPlayer={ currentPlayer } />;
    },

    renderRedDot: function(player) {
        if (player == this.getCurrentPlayersTurn()) {
            return <div className="red-dot"></div>
        }

        return false;
    },

    renderFooter: function() {
        var stage;

        if (this.props.bestOf == 5) {
            stage = "- SEMI FINAL";
        }

        if (this.props.bestOf == 7) {
            stage = "- FINAL";
        }

        return <div className="scoreboard-footer">
            <h1><span onClick={this.handleGoBack}>DARTS</span> 2016 { stage }</h1>
        </div>
    },

    handleSubmit: function(e) {
        e.preventDefault();

        if (!this.isInt(this.state.justThrownScore)) {
            return false;
        }

        var currentPlayersTurn = this.getCurrentPlayersTurn(),
        currentScore = this.getPlayersCurrentScore(currentPlayersTurn),
        oldScores,
        newScore;

        if (this.state.isPlayerAsTurn) {
            oldScores = this.state.playerA.scores;
            newScore = this.getNewScore(currentScore);

            var playerA = this.state.playerA;
            playerA.scores = oldScores.concat([newScore]);

            this.setState({playerA: playerA, justThrownScore: 0});
        } else {
            oldScores = this.state.playerB.scores;
            newScore = this.getNewScore(currentScore);

            var playerB = this.state.playerB;
            playerB.scores = oldScores.concat([newScore]);

            this.setState({playerB: playerB, justThrownScore: 0});
        }

        this.checkEndLeg(newScore);
        
    },

    isInt: function(value) {
        return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    },

    handleGoBack: function() {
        this.props.onEndGame('noone');
    },

    onChange: function(e) {
        this.setState({justThrownScore: e.target.value});
    },

    render: function() {
        return <div className="container-scoreboard">

            <div className="scoreboard-header">
                <div className="scoreboard-header--left">
                    <h1>BEST OF { this.getBestOf() }</h1>
                </div>

                <div className="scoreboard-header--right">
                    <h1>LEGS</h1>
                </div>

                <div className="scoreboard-header--right score-submit">
                    <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.justThrownScore} />
                    <button>Submit</button>
                    </form>
                </div>
            </div>

            <div className="scoreboard-content">

                <div className="player-row player-row--a">
                    <div className="player-name">
                        <h1>{ this.props.playerA.name }</h1>
                        { this.renderRedDot(this.state.playerA) }
                    </div>
                    <div className="player-stats">
                        <div className="player-legs"><h1>{ this.state.playerA.legs }</h1></div>
                        <Score score={this.getPlayersCurrentScore(this.state.playerA)}/>
                        <Outchart currentScore={ this.getPlayersCurrentScore(this.state.playerA) } />
                    </div>
                </div>

                <div className="player-row player-row--b">
                    <div className="player-name">
                        <h1>{ this.props.playerB.name }</h1>
                        { this.renderRedDot(this.state.playerB) }
                    </div>
                    <div className="player-stats">
                        <div className="player-legs"><h1>{ this.state.playerB.legs }</h1></div>
                        <Score score={this.getPlayersCurrentScore(this.state.playerB)}/>
                        <Outchart currentScore={ this.getPlayersCurrentScore(this.state.playerB) } />
                    </div>
                </div>

            </div>

            { this.renderFooter() }

            </div>

        },

});

module.exports = Scoreboard;

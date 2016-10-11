var scores = {
    '170': ['T20', 'T20', 'DB'],
    '167': ['T20', 'T19', 'DB'],
    '164': ['T20', 'T18', 'DB'],
    '161': ['T20', 'T17', 'DB'],
    '160': ['T20', 'T20', 'D20'],

};

var OutItem = React.createClass({
    render: function() {
        return <li className="out">
            {this.props.out}
        </li>;
    }
});

var Outchart = React.createClass({
    renderOuts() {
        var currentScore = this.props.currentScore;

        if ( scores[currentScore] ) {
            return <div>
                <ul> {scores[currentScore].map(function (data) {
                        return <OutItem out={data}/>;
                    })}
                </ul>
            </div>
        }

        return <span>Not possible</span>
    },


    render: function() {
        return <div>
            OUTCHART { this.props.currentScore }

            <div>You should throw: { this.renderOuts() }</div>

        </div>
    }
});

module.exports = Outchart;

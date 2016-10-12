var outs = {
    '170': ['T20', 'T20', 'DB'],
    '167': ['T20', 'T19', 'DB'],
    '164': ['T20', 'T18', 'DB'],
    '161': ['T20', 'T17', 'DB'],
    '160': ['T20', 'T20', 'D20'],
    '158': ['T20', 'T20', 'D19'],
    '157': ['T20', 'T19', 'D20'],
    '156': ['T20', 'T20', 'D18'],
    '155': ['T20', 'T19', 'D19'],
    '154': ['T20', 'T18', 'D20'],
    '153': [],
    '152': [],
    '151': [],
    '150': [],
    '149': [],
    '148': [],
    '147': [],
    '146': [],
    '145': [],
    '144': [],
    '143': [],

};

var OutItem = React.createClass({
    render: function() {
        return <li className="out-item">
            <h1>{this.props.out}</h1>
        </li>;
    }
});

var Outchart = React.createClass({
    renderOuts() {
        var currentScore = this.props.currentScore;

        if ( outs[currentScore] ) {
            return <ul className="out-list"> {outs[currentScore].map(function (data) {
                        return <OutItem out={data}/>;
                    })}
                </ul>
        }

        return <h1 class="no-finish">NO FINISH</h1>
    },


    render: function() {
        return <div className="outchart">{ this.renderOuts() }</div>
    }
});

module.exports = Outchart;

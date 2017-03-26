var startExample= `TEST is cool

I am cool
==
you are cool
--
### he is cool
#### we are cool


Shopping list:

  * apples
  * ~~oranges~~
  * pears

Numbered list:

  1. HTML
  2. CSS
  3. *JS*
  4. **reactJS**`;


class Root extends React.Component
{
    constructor(props){
        super(props);
        this.state = { value: this.props.test }
        this.handleTextArea = this.handleTextArea.bind(this);
    };

    handleTextArea(e){
        this.setState({ value: e.target.value });
    };
    
    render (){
        const followMe = {__html: marked(this.state.value)};
        return (
            <div className="md-container">
            <div className="md-column">
                <textarea value={this.state.value} onChange={this.handleTextArea} className="md-textarea"/>
            </div>
            <div className="md-column">
                <div className="md-display"
                    dangerouslySetInnerHTML={ followMe } />;
            </div>
            </div>
        );
    }
}
ReactDOM.render(
    <Root test={ startExample } />,
    document.getElementById('root')
);
